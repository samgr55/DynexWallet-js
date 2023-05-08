
define(["require", "exports", "../WalletWatchdog"], function (require, exports, WalletWatchdog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BlockchainExplorerRpcDaemon = void 0;
    var BlockchainExplorerRpcDaemon = /** @class */ (function () {
        function BlockchainExplorerRpcDaemon(daemonAddress) {
            if (daemonAddress === void 0) { daemonAddress = null; }
            this.daemonAddress = config.nodeUrl;
            this.phpProxy = false;
            this.cacheInfo = null;
            this.cacheHeight = 0;
            this.lastTimeRetrieveInfo = 0;
            this.scannedHeight = 0;
            if (daemonAddress !== null && daemonAddress.trim() !== '') {
                this.daemonAddress = daemonAddress;
            }
        }
        BlockchainExplorerRpcDaemon.prototype.makeRpcRequest = function (method, params) {
            if (params === void 0) { params = {}; }
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: config.nodeUrl + 'json_rpc',
                    method: 'POST',
                    data: JSON.stringify({
                        jsonrpc: '2.0',
                        method: method,
                        params: params,
                        id: 1
                    }),
                    accept: 'application/json',
                    contentType: 'application/x-www-form-urlencoded',
                    
                }).done(function (raw) {
                    if (typeof raw.id === 'undefined' ||
                        typeof raw.jsonrpc === 'undefined' ||
                        raw.jsonrpc !== '2.0' ||
                        typeof raw.result !== 'object')
                        reject('Daemon response is not properly formatted');
                    else
                        resolve(raw.result);
                }).fail(function (data) {
                    reject(data);
                });
            });
        };
        BlockchainExplorerRpcDaemon.prototype.makeRequest = function (method, url, body) {
            if (body === void 0) { body = undefined; }
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: config.nodeUrl + url,
                    method: method,
                    data: typeof body === 'string' ? body : JSON.stringify(body)
                }).done(function (raw) {
                    resolve(raw);
                }).fail(function (data) {
                    reject(data);
                });
            });
        };
        BlockchainExplorerRpcDaemon.prototype.getInfo = function () {
            var _this = this;
            if (Date.now() - this.lastTimeRetrieveInfo < 20 * 1000 && this.cacheInfo !== null) {
                return Promise.resolve(this.cacheInfo);
            }
            this.lastTimeRetrieveInfo = Date.now();
            return this.makeRequest('GET', 'getinfo').then(function (data) {
                _this.cacheInfo = data;
                console.log("GetInfo: ");
                return data;
            });
        };
        BlockchainExplorerRpcDaemon.prototype.getHeight = function () {
            var _this = this;
            if (Date.now() - this.lastTimeRetrieveInfo < 20 * 1000 && this.cacheHeight !== 0) {
                return Promise.resolve(this.cacheHeight);
            }
            this.lastTimeRetrieveInfo = Date.now();
            return this.makeRequest('GET', 'getheight').then(function (data) {
                var height = parseInt(data.height);
                _this.cacheHeight = height;
                return height;
            });
        };
        BlockchainExplorerRpcDaemon.prototype.getScannedHeight = function () {
            return this.scannedHeight;
        };
        BlockchainExplorerRpcDaemon.prototype.watchdog = function (wallet) {
            var watchdog = new WalletWatchdog_1.WalletWatchdog(wallet, this);
            watchdog.loadHistory();
            return watchdog;
        };
        /**
         * Returns an array containing all numbers like [start;end]
         * @param start
         * @param end
         */
        BlockchainExplorerRpcDaemon.prototype.range = function (start, end) {
            var numbers = [];
            for (var i = start; i < end; ++i) {
                numbers.push(i);
            }
            return numbers;
        };
        BlockchainExplorerRpcDaemon.prototype.getTransactionsForBlocks = function (startBlock, endBlock, includeMinerTxs) {
            var tempStartBlock;
            if (startBlock === 0) {
                tempStartBlock = 1;
            }
            else {
                tempStartBlock = startBlock;
            }
            var heights = this.range(startBlock, endBlock);
            return this.makeRpcRequest('getblocksbyheights', {blockHeights : heights, include_miner_txs:true}).then(function (response) {
                var blocks = response.blocks;
                var txs = [];
                if (response.status !== 'OK')
                    throw 'invalid_transaction';
                
                if (blocks.length > 0) {
                    for (var i = 0; i < blocks.length; i++) {
                            for (var j = 0; j < blocks[i].transactions.length; j++) {
                                // transform Transactions
                                var rawTx = blocks[i].transactions[j];
                                var tx = {};
                                tx.fee = rawTx.fee;
                                tx.unlock_time = rawTx.unlockTime;
                                tx.height = rawTx.blockIndex;
                                tx.timestamp = rawTx.timestamp;
                                tx.hash = rawTx.hash;
                                tx.publicKey = rawTx.extra.publicKey;
                                tx.paymentId = rawTx.paymentId === "0000000000000000000000000000000000000000000000000000000000000000" ? "" : rawTx.paymentId;
                                tx.vin = [];
                                tx.vout = [];
                                //map the inputs and outputs
                                for (var x = 0; x < rawTx.inputs.length; x++) {
                                    var vin = {};
                                    var input = rawTx.inputs[x];
                                    vin.amount = input.data.input.amount;
                                    vin.k_image = input.data.input.k_image;
                                    input = null;
                                    tx.vin.push(vin);
                                }
                                for (var x = 0; x < rawTx.outputs.length; x++) {
                                    var vout = {};
                                    var output = rawTx.outputs[x];
                                    vout.amount = output.output.amount;
                                    vout.globalIndex = output.globalIndex;
                                    vout.key = output.output.target.data.key;
                                    output = null;
                                    tx.vout.push(vout);
                                }
                                rawTx = null;
                                txs.push(tx);
                            }
                        }

                    
                    return txs;
                }
                else {
                    return response.status;
                }
            
            });
        
        };
        BlockchainExplorerRpcDaemon.prototype.getTransactionPool = function () {
            return this.makeRpcRequest('gettransactionspool').then(function (response) {
                var formatted = [];
                for (var _i = 0, _a = response.transactions; _i < _a.length; _i++) {
                    var rawTx = _a[_i];
                    var tx = null;
                    try {
                        tx = rawTx.transaction;
                    }
                    catch (e) {
                        try {
                            tx = rawTx.transaction;
                        }
                        catch (e) {
                        }
                    }
                    if (tx !== null) {
                        tx.ts = rawTx.timestamp;
                        tx.height = rawTx.height;
                        tx.hash = rawTx.hash;
                        if (rawTx.output_indexes.length > 0) {
                            tx.global_index_start = rawTx.output_indexes[0];
                            tx.output_indexes = rawTx.output_indexes;
                        }
                        formatted.push(tx);
                    }
                }
                return formatted;
            });
        };
        BlockchainExplorerRpcDaemon.prototype.getRandomOuts = function (amounts, nbOutsNeeded) {
            return this.makeRequest('POST', 'getrandom_outs', {
                amounts: amounts,
                outs_count: nbOutsNeeded
            }).then(function (response) {
                if (response.status !== 'OK')
                    throw 'invalid_getrandom_outs_answer';
                if (response.outs.length > 0) {
                    console.log("Got random outs: ");
                    console.log(response.outs);
                }
                return response.outs;
            });
        };
        BlockchainExplorerRpcDaemon.prototype.sendRawTx = function (rawTx) {
            return this.makeRequest('POST', 'sendrawtransaction', {
                tx_as_hex: rawTx,
                do_not_relay: false
            }).then(function (transactions) {
                if (!transactions.status || transactions.status !== 'OK')
                    throw transactions;
            });
        };
        /* ---- I will do it later 
        BlockchainExplorerRpcDaemon.prototype.resolveOpenAlias = function (domain) {
            return this.makeRpcRequest('resolveopenalias', { url: domain }).then(function (response) {
                if (response.addresses && response.addresses.length > 0)
                    return { address: response.addresses[0], name: null };
                throw 'not_found';
            });
        };
        */ 
        BlockchainExplorerRpcDaemon.prototype.getNetworkInfo = function () {
            return this.makeRpcRequest('getlastblockheader').then(function (raw) {
                return {
                    'node': config.nodeUrl,
                    'major_version': raw.block_header['major_version'],
                    'hash': raw.block_header['hash'],
                    'reward': raw.block_header['reward'],
                    'height': raw.block_header['height'],
                    'timestamp': raw.block_header['timestamp'],
                    'difficulty': raw.block_header['difficulty']
                };
            });
        };
        BlockchainExplorerRpcDaemon.prototype.getRemoteNodeInformation = function () {
            // TODO change to /feeaddress
            return this.getInfo().then(function (info) {
                return {
                    'fee_address': info['fee_address'],
                    'status': info['status']
                };
            });
        };
        return BlockchainExplorerRpcDaemon;
    }());
    exports.BlockchainExplorerRpcDaemon = BlockchainExplorerRpcDaemon;
});
