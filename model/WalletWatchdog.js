define(["require", "exports", "./Transaction", "./TransactionsExplorer"], function (require, exports, Transaction_1, TransactionsExplorer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WalletWatchdog = void 0;
    var WalletWatchdog = /** @class */ (function () {
        function WalletWatchdog(wallet, explorer) {
            this.intervalMempool = 0;
            this.stopped = false;
            this.transactionsToProcess = [];
            this.intervalTransactionsProcess = 0;
            this.workerProcessingReady = false;
            this.workerProcessingWorking = false;
            this.workerCurrentProcessing = [];
            this.workerCountProcessed = 0;
            this.lastBlockLoading = -1;
            this.lastMaximumHeight = 0;
            this.wallet = wallet;
            this.explorer = explorer;
            this.initWorker();
            this.initMempool();
        }
        WalletWatchdog.prototype.initWorker = function () {
            var self = this;
            if (this.wallet.options.customNode) {
                config.nodeUrl = this.wallet.options.nodeUrl;
            }
            else {
                var randNodeInt = Math.floor(Math.random() * Math.floor(config.nodeList.length));
                config.nodeUrl = config.nodeList[randNodeInt];
            }
            this.workerProcessing = new Worker('./workers/TransferProcessingEntrypoint.js');
            this.workerProcessing.onmessage = function (data) {
                var message = data.data;
                //console.log("InitWorker message: ");
                //console.log(message);
                if (message === 'ready') {
                    //console.info('worker ready');
                    self.signalWalletUpdate();
                }
                else if (message === 'readyWallet') {
                    self.workerProcessingReady = true;
                }
                else if (message.type) {
                    if (message.type === 'processed') {
                        var transactions = message.transactions;
                        if (transactions.length > 0) {
                            for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
                                var tx = transactions_1[_i];
                                self.wallet.addNew(Transaction_1.Transaction.fromRaw(tx));
                            }
                            self.signalWalletUpdate();
                        }
                        //if (self.workerCurrentProcessing.length > 0) {
                        //    let transactionHeight = self.workerCurrentProcessing[self.workerCurrentProcessing.length - 1].height;
                        //    if (typeof transactionHeight !== 'undefined')
                        //        self.wallet.lastHeight = transactionHeight;
                        //}
                        // we are done processing now
                        self.workerProcessingWorking = false;
                    }
                }
            };
        };
        WalletWatchdog.prototype.signalWalletUpdate = function () {
            var self = this;
            //console.log('wallet update');
            this.lastBlockLoading = -1; //reset scanning
            if (this.wallet.options.customNode) {
                config.nodeUrl = this.wallet.options.nodeUrl;
            }
            else {
                var randNodeInt = Math.floor(Math.random() * Math.floor(config.nodeList.length));
                config.nodeUrl = config.nodeList[randNodeInt];
            }
            this.workerProcessing.postMessage({
                type: 'initWallet',
                wallet: this.wallet.exportToRaw()
            });
            clearInterval(this.intervalTransactionsProcess);
            this.intervalTransactionsProcess = setInterval(function () {
                self.checkTransactionsInterval();
            }, this.wallet.options.readSpeed);
            //force mempool update after a wallet update (new tx, ...)
            self.checkMempool();
        };
        WalletWatchdog.prototype.initMempool = function (force) {
            if (force === void 0) { force = false; }
            var self = this;
            if (this.intervalMempool === 0 || force) {
                if (force && this.intervalMempool !== 0) {
                    clearInterval(this.intervalMempool);
                }
                this.intervalMempool = setInterval(function () {
                    self.checkMempool();
                }, 30 * 1000);
            }
            self.checkMempool();
        };
        WalletWatchdog.prototype.stop = function () {
            clearInterval(this.intervalTransactionsProcess);
            this.transactionsToProcess = [];
            clearInterval(this.intervalMempool);
            this.stopped = true;
        };
        WalletWatchdog.prototype.checkMempool = function () {
            var self = this;
            if (this.lastMaximumHeight - this.lastBlockLoading > 1) { //only check memory pool if the user is up to date to ensure outs & ins will be found in the wallet
                return false;
            }
            this.wallet.txsMem = [];
            this.explorer.getTransactionPool().then(function (pool) {
                if (typeof pool !== 'undefined')
                    for (var _i = 0, pool_1 = pool; _i < pool_1.length; _i++) {
                        var rawTx = pool_1[_i];
                        var tx = TransactionsExplorer_1.TransactionsExplorer.parse(rawTx, self.wallet);
                        if (tx !== null) {
                            self.wallet.txsMem.push(tx);
                        }
                    }
            }).catch(function () {
            });
            return true;
        };
        WalletWatchdog.prototype.terminateWorker = function () {
            this.workerProcessing.terminate();
            this.workerProcessingReady = false;
            this.workerCurrentProcessing = [];
            this.workerProcessingWorking = false;
            this.workerCountProcessed = 0;
        };
        WalletWatchdog.prototype.checkTransactionsInterval = function () {
            //somehow we're repeating and regressing back to re-process Tx's
            //loadHistory getting into a stack overflow ?
            //need to work out timings and ensure process does not reload when it's already running...
            if (this.workerProcessingWorking || !this.workerProcessingReady) {
                return;
            }
            //we destroy the worker in charge of decoding the transactions every 5k transactions to ensure the memory is not corrupted
            //cnUtil bug, see https://github.com/mymonero/mymonero-core-js/issues/8
            if (this.workerCountProcessed >= 5 * 1000) {
                //console.log('Recreate worker..');
                this.terminateWorker();
                this.initWorker();
                return;
            }
            // define the transactions we need to process
            var transactionsToProcess = [];
            if (this.transactionsToProcess.length > 0) {
                transactionsToProcess = this.transactionsToProcess.shift();
            }
            // check if we have anything to process
            if (transactionsToProcess.length > 0) {
                this.workerCurrentProcessing = transactionsToProcess;
                this.workerProcessingWorking = true;
                this.workerProcessing.postMessage({
                    type: 'process',
                    transactions: transactionsToProcess
                });
                ++this.workerCountProcessed;
            }
            else {
                clearInterval(this.intervalTransactionsProcess);
                this.intervalTransactionsProcess = 0;
            }
        };
        WalletWatchdog.prototype.processTransactions = function (transactions, callback) {
            var transactionsToAdd = [];
            for (var _i = 0, transactions_2 = transactions; _i < transactions_2.length; _i++) {
                var tr = transactions_2[_i];
                if (typeof tr.height !== 'undefined') {
                    if (tr.height >= this.wallet.lastHeight) {
                        transactionsToAdd.push(tr);
                    }
                }
            }
            // add the raw transaction to the processing FIFO list
            this.transactionsToProcess.push(transactionsToAdd);
            if (this.intervalTransactionsProcess === 0) {
                var self_1 = this;
                this.intervalTransactionsProcess = setInterval(function () {
                    self_1.checkTransactionsInterval();
                }, this.wallet.options.readSpeed);
            }
            // signal we are finished
            callback();
        };
        WalletWatchdog.prototype.loadHistory = function () {
            if (this.stopped)
                return;
            var self = this;
            if (this.lastBlockLoading === -1)
                this.lastBlockLoading = this.wallet.lastHeight;
            //don't reload until it's finished processing the last batch of transactions
            if (this.workerProcessingWorking || !this.workerProcessingReady) {
                setTimeout(function () {
                    self.loadHistory();
                }, 1000);
                return;
            }
            if (this.transactionsToProcess.length > 500) {
                //to ensure no pile explosion
                setTimeout(function () {
                    self.loadHistory();
                }, 2 * 1000);
                return;
            }
            // console.log('checking');
            this.explorer.getHeight().then(function (height) {
                if (height > self.lastMaximumHeight) {
                    self.lastMaximumHeight = height;
                }
                else {
                    if (self.wallet.lastHeight >= self.lastMaximumHeight) {
                        setTimeout(function () {
                            self.loadHistory();
                        }, 1000);
                        return;
                    }
                }
                // we are only here if the block is actually increased from last processing
                if (self.lastBlockLoading === -1)
                    self.lastBlockLoading = self.wallet.lastHeight;
                if (self.lastBlockLoading !== height) {
                    var previousStartBlock = Number(self.lastBlockLoading);
                    var endBlock_1 = previousStartBlock + config.syncBlockCount;
                    if (previousStartBlock > self.lastMaximumHeight)
                        previousStartBlock = self.lastMaximumHeight;
                    if (endBlock_1 > self.lastMaximumHeight)
                        endBlock_1 = self.lastMaximumHeight;
                    self.explorer.getTransactionsForBlocks(previousStartBlock, endBlock_1, true).then(function (transactions) {
                        //to ensure no pile explosion
                        if (transactions === 'OK') {
                            self.lastBlockLoading = endBlock_1;
                            self.wallet.lastHeight = endBlock_1;
                            setTimeout(function () {
                                self.loadHistory();
                            }, 10);
                        }
                        else if (transactions.length > 0) {
                            var lastTx = transactions[transactions.length - 1];
                            if (typeof lastTx.height !== 'undefined') {
                                self.lastBlockLoading = lastTx.height + 1;
                            }
                            self.processTransactions(transactions, function () {
                                self.wallet.lastHeight = endBlock_1;
                                setTimeout(function () {
                                    self.loadHistory();
                                }, 1);
                            });
                        }
                        else {
                            self.lastBlockLoading = endBlock_1;
                            self.wallet.lastHeight = endBlock_1;
                            setTimeout(function () {
                                self.loadHistory();
                            }, 30 * 1000);
                        }
                    }).catch(function () {
                        setTimeout(function () {
                            self.loadHistory();
                        }, 30 * 1000); //retry 30s later if an error occurred
                    });
                }
                else {
                    setTimeout(function () {
                        self.loadHistory();
                    }, 30 * 1000);
                }
            }).catch(function () {
                setTimeout(function () {
                    self.loadHistory();
                }, 30 * 1000); 
            });
        };
        return WalletWatchdog;
    }());
    exports.WalletWatchdog = WalletWatchdog;
});
