define(["require", "exports", "./Transaction", "./CryptoUtils", "./MathUtil", "./CnUtilNative", "./Cn"], function (require, exports, Transaction_1, CryptoUtils_1, MathUtil_1, CnUtilNative_1, Cn_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransactionsExplorer = exports.TX_EXTRA_NONCE_ENCRYPTED_PAYMENT_ID = exports.TX_EXTRA_NONCE_PAYMENT_ID = exports.TX_EXTRA_MYSTERIOUS_MINERGATE_TAG = exports.TX_EXTRA_TAG_ADDITIONAL_PUBKEYS = exports.TX_EXTRA_MERGE_MINING_TAG = exports.TX_EXTRA_NONCE = exports.TX_EXTRA_TAG_PUBKEY = exports.TX_EXTRA_TAG_PADDING = exports.TX_EXTRA_NONCE_MAX_COUNT = exports.TX_EXTRA_PADDING_MAX_COUNT = void 0;
    exports.TX_EXTRA_PADDING_MAX_COUNT = 255;
    exports.TX_EXTRA_NONCE_MAX_COUNT = 255;
    exports.TX_EXTRA_TAG_PADDING = 0x00;
    exports.TX_EXTRA_TAG_PUBKEY = 0x01;
    exports.TX_EXTRA_NONCE = 0x02;
    exports.TX_EXTRA_MERGE_MINING_TAG = 0x03;
    exports.TX_EXTRA_TAG_ADDITIONAL_PUBKEYS = 0x04;
    exports.TX_EXTRA_MYSTERIOUS_MINERGATE_TAG = 0xDE;
    exports.TX_EXTRA_NONCE_PAYMENT_ID = 0x00;
    exports.TX_EXTRA_NONCE_ENCRYPTED_PAYMENT_ID = 0x01;
    var TransactionsExplorer = /** @class */ (function () {
        function TransactionsExplorer() {
        }
        TransactionsExplorer.isMinerTx = function (rawTransaction) {
            if (rawTransaction.vin.length > 0 && rawTransaction.vin[0].type === 'ff') {
                return true;
            }
            return false;
        };
        TransactionsExplorer.parse = function (rawTransaction, wallet) {
            var transaction = null;
            var tx_pub_key = '';
            var paymentId = null;
            tx_pub_key = rawTransaction.publicKey;
            paymentId = rawTransaction.paymentId;
            var derivation = null;
            try {
                derivation = Cn_1.CnNativeBride.generate_key_derivation(tx_pub_key, wallet.keys.priv.view);
            }
            catch (e) {
                console.log('UNABLE TO CREATE DERIVATION', e);
                return null;
            }
            var outs = [];
            var ins = [];
            for (var iOut = 0; iOut < rawTransaction.vout.length; ++iOut) {
                var out = rawTransaction.vout[iOut];
                var amount = out.amount;
                var output_idx_in_tx = iOut;
                var generated_tx_pubkey = Cn_1.CnNativeBride.derive_public_key(derivation, output_idx_in_tx, wallet.keys.pub.spend); //5.5ms
                var mine_output = (out.key == generated_tx_pubkey);
                if (mine_output) {
                    var transactionOut = new Transaction_1.TransactionOut();
                    transactionOut.globalIndex = out.globalIndex;
                    transactionOut.amount = amount;
                    transactionOut.pubKey = out.key;
                    transactionOut.outputIdx = output_idx_in_tx;
                    if (wallet.keys.priv.spend !== null && wallet.keys.priv.spend !== '') {
                        var m_key_image = Cn_1.CnTransactions.generate_key_image_helper({
                            view_secret_key: wallet.keys.priv.view,
                            spend_secret_key: wallet.keys.priv.spend,
                            public_spend_key: wallet.keys.pub.spend,
                        }, tx_pub_key, output_idx_in_tx, derivation);
                        transactionOut.keyImage = m_key_image.key_image;
                        transactionOut.ephemeralPub = m_key_image.ephemeral_pub;
                    }
                    outs.push(transactionOut);
                    
                } 
            }
            if (wallet.keys.priv.spend !== null && wallet.keys.priv.spend !== '') {
                var keyImages = wallet.getTransactionKeyImages();
                for (var iIn = 0; iIn < rawTransaction.vin.length; ++iIn) {
                    var input = rawTransaction.vin[iIn];
                    if (keyImages.indexOf(input.k_image) != -1) {
                        var walletOuts = wallet.getAllOuts();
                        for (var _i = 0, walletOuts_1 = walletOuts; _i < walletOuts_1.length; _i++) {
                            var ut = walletOuts_1[_i];
                            if (ut.keyImage == input.k_image)
                            {

                                var transactionIn = new Transaction_1.TransactionIn();
                                transactionIn.amount = ut.amount;
                                transactionIn.keyImage = ut.keyImage;
                                ins.push(transactionIn);
                                break;
                            }
                        }
                    }
                }
            }
            else {
                var txOutIndexes = wallet.getTransactionOutIndexes();
                for (var iIn = 0; iIn < rawTransaction.vin.length; ++iIn) {
                    var vin = rawTransaction.vin[iIn];
                    if (!vin.key_offsets)
                        continue;
                    var absoluteOffets = vin.key_offsets.slice();
                    for (var i = 1; i < absoluteOffets.length; ++i) {
                        absoluteOffets[i] += absoluteOffets[i - 1];
                    }
                    var ownTx = -1;
                    for (var _c = 0, absoluteOffets_1 = absoluteOffets; _c < absoluteOffets_1.length; _c++) {
                        var index = absoluteOffets_1[_c];
                        if (txOutIndexes.indexOf(index) !== -1) {
                            ownTx = index;
                            break;
                        }
                    }
                    if (ownTx !== -1) {
                        var txOut = wallet.getOutWithGlobalIndex(ownTx);
                        if (txOut !== null) {
                            var transactionIn = new Transaction_1.TransactionIn();
                            transactionIn.amount = -txOut.amount;
                            transactionIn.keyImage = txOut.keyImage;
                            console.log(txOut.keyImage);
                            ins.push(transactionIn);
                        }
                    }
                }

            }
            if (outs.length > 0 || ins.length > 0) {
                transaction = new Transaction_1.Transaction();
                if (typeof rawTransaction.height !== 'undefined')
                    transaction.blockHeight = rawTransaction.height;
                if (typeof rawTransaction.timestamp !== 'undefined')
                    transaction.timestamp = rawTransaction.timestamp;
                if (typeof rawTransaction.hash !== 'undefined')
                    transaction.hash = rawTransaction.hash;
                transaction.txPubKey = tx_pub_key;
                if (paymentId !== null)
                    transaction.paymentId = paymentId;
                transaction.fees = rawTransaction.fee;
                transaction.outs = outs;
                transaction.ins = ins;
            }
            return transaction;
        };
        TransactionsExplorer.formatWalletOutsForTx = function (wallet, blockchainHeight) {
            var unspentOuts = [];
            //rct=rct_outpk + rct_mask + rct_amount
            // {"amount"          , out.amount},
            // {"public_key"      , out.out_pub_key},
            // {"index"           , out.out_index},
            // {"global_index"    , out.global_index},
            // {"rct"             , rct},
            // {"tx_id"           , out.tx_id},
            // {"tx_hash"         , tx.hash},
            // {"tx_prefix_hash"  , tx.prefix_hash},
            // {"tx_pub_key"      , tx.tx_pub_key},
            // {"timestamp"       , static_cast<uint64_t>(out.timestamp)},
            // {"height"          , tx.height},
            // {"spend_key_images", json::array()}
            for (var _i = 0, _a = wallet.getAll(); _i < _a.length; _i++) {
                var tr = _a[_i];
                if (!tr.isConfirmed(blockchainHeight)) {
                    continue;
                }
                for (var _b = 0, _c = tr.outs; _b < _c.length; _b++) {
                    var out = _c[_b];
                    var rct = '';
                    if (out.rtcAmount !== '') {
                        rct = out.rtcOutPk + out.rtcMask + out.rtcAmount;
                    }
                    else {
                        rct = Cn_1.CnTransactions.zeroCommit(Cn_1.CnUtils.d2s(out.amount));
                    }
                    unspentOuts.push({
                        keyImage: out.keyImage,
                        amount: out.amount,
                        public_key: out.pubKey,
                        index: out.outputIdx,
                        global_index: out.globalIndex,
                        rct: rct,
                        tx_pub_key: tr.txPubKey,
                    });
                }
            }
            for (var _d = 0, _e = wallet.getAll().concat(wallet.txsMem); _d < _e.length; _d++) {
                var tr = _e[_d];
                console.log(tr.ins);
                for (var _f = 0, _g = tr.ins; _f < _g.length; _f++) {
                    var i = _g[_f];
                    for (var iOut = 0; iOut < unspentOuts.length; ++iOut) {
                        var out = unspentOuts[iOut];
                        var exist = out.keyImage === i.keyImage;
                        if (exist) {
                            unspentOuts.splice(iOut, 1);
                            break;
                        }
                    }
                }
            }
            return unspentOuts;
        };
        TransactionsExplorer.createRawTx = function (dsts, wallet, rct, usingOuts, pid_encrypt, mix_outs, mixin, neededFee, payment_id) {
            if (mix_outs === void 0) { mix_outs = []; }
            return new Promise(function (resolve, reject) {
                try {
                    var realDestViewKey = undefined;
                    if (pid_encrypt) {
                        realDestViewKey = Cn_1.Cn.decode_address(dsts[0].address).view;
                    }
                    var splittedDsts = Cn_1.CnTransactions.decompose_tx_destinations(dsts, rct);
                    var signed = Cn_1.CnTransactions.create_transaction({
                        spend: wallet.keys.pub.spend,
                        view: wallet.keys.pub.view
                    }, {
                        spend: wallet.keys.priv.spend,
                        view: wallet.keys.priv.view
                    }, splittedDsts, usingOuts, mix_outs, mixin, neededFee, payment_id, pid_encrypt, realDestViewKey, 0, rct);
                    console.log("signed tx: ", signed);
                    var raw_tx_and_hash = Cn_1.CnTransactions.serialize_tx_with_hash(signed);
                    resolve({ raw: raw_tx_and_hash, signed: signed });
                }
                catch (e) {
                    reject("Failed to create transaction: " + e);
                }
            });
        };
        TransactionsExplorer.createTx = function (userDestinations, userPaymentId, wallet, blockchainHeight, obtainMixOutsCallback, confirmCallback, mixin) {
            if (userPaymentId === void 0) { userPaymentId = ''; }
            if (mixin === void 0) { mixin = config.defaultMixin; }
            return new Promise(function (resolve, reject) {
                var neededFee = new JSBigInt(window.config.coinFee);
                var pid_encrypt = false; 
                var totalAmountWithoutFee = new JSBigInt(0);
                var paymentIdIncluded = 0;
                var paymentId = '';
                var dsts = [];
                for (var _i = 0, userDestinations_1 = userDestinations; _i < userDestinations_1.length; _i++) {
                    var dest = userDestinations_1[_i];
                    totalAmountWithoutFee = totalAmountWithoutFee.add(dest.amount);
                    var target = Cn_1.Cn.decode_address(dest.address);
                    if (target.intPaymentId !== null) {
                        ++paymentIdIncluded;
                        paymentId = target.intPaymentId;
                        pid_encrypt = true;
                    }
                    dsts.push({
                        address: dest.address,
                        amount: new JSBigInt(dest.amount)
                    });
                }
                if (paymentIdIncluded > 1) {
                    reject('multiple_payment_ids');
                    return;
                }
                if (paymentId !== '' && userPaymentId !== '') {
                    reject('address_payment_id_conflict_user_payment_id');
                    return;
                }
                if (totalAmountWithoutFee.compare(0) <= 0) {
                    reject('negative_amount');
                    return;
                }
                if (paymentId === '' && userPaymentId !== '') {
                    if (userPaymentId.length <= 16 && /^[0-9a-fA-F]+$/.test(userPaymentId)) {
                        userPaymentId = ('0000000000000000' + userPaymentId).slice(-16);
                    }
                    if ((userPaymentId.length !== 16 && userPaymentId.length !== 64) ||
                        (!(/^[0-9a-fA-F]{16}$/.test(userPaymentId)) && !(/^[0-9a-fA-F]{64}$/.test(userPaymentId)))) {
                        reject('invalid_payment_id');
                        return;
                    }
                    pid_encrypt = userPaymentId.length === 16;
                    paymentId = userPaymentId;
                }
                var unspentOuts = TransactionsExplorer.formatWalletOutsForTx(wallet, blockchainHeight);
                var usingOuts = [];
                var usingOuts_amount = new JSBigInt(0);
                var unusedOuts = unspentOuts.slice(0);
                var totalAmount = totalAmountWithoutFee.add(neededFee);
                function pop_random_value(list) {
                    var idx = Math.floor(MathUtil_1.MathUtil.randomFloat() * list.length);
                    var val = list[idx];
                    list.splice(idx, 1);
                    return val;
                }
                while (usingOuts_amount.compare(totalAmount) < 0 && unusedOuts.length > 0) {
                    var out = pop_random_value(unusedOuts);
                    usingOuts.push(out);
                    usingOuts_amount = usingOuts_amount.add(out.amount);
                }
                console.log("Selected outs:", usingOuts);
                console.log('using amount of ' + (usingOuts_amount / Math.pow(10, config.coinUnitPlaces))  + ' for sending ' + (totalAmountWithoutFee/ Math.pow(10, config.coinUnitPlaces)) + ' with fees of ' + (neededFee / Math.pow(10, config.coinUnitPlaces)) + ' DNX');
                confirmCallback(totalAmountWithoutFee, neededFee).then(function () {
                    if (usingOuts_amount.compare(totalAmount) < 0) {
                        console.log("Not enough spendable outputs / balance too low (have "
                            + Cn_1.Cn.formatMoneyFull(usingOuts_amount) + " but need "
                            + Cn_1.Cn.formatMoneyFull(totalAmount)
                            + " (estimated fee " + Cn_1.Cn.formatMoneyFull(neededFee) + " DNX included)");
                        reject({ error: 'balance_too_low' });
                        return;
                    }
                    else if (usingOuts_amount.compare(totalAmount) > 0) {
                        var changeAmount = usingOuts_amount.subtract(totalAmount);
                        console.log("1) Sending change of " + Cn_1.Cn.formatMoneySymbol(changeAmount)
                            + " to " + wallet.getPublicAddress());
                        dsts.push({
                            address: wallet.getPublicAddress(),
                            amount: changeAmount
                        });
                    } 
                    console.log('destinations', dsts);
                    var amounts = [];
                    for (var l = 0; l < usingOuts.length; l++) {
                        amounts.push(usingOuts[l].amount);
                    }
                    var nbOutsNeeded = mixin + 1;
                    obtainMixOutsCallback(amounts, nbOutsNeeded).then(function (lotsMixOuts) {
                        console.log('------------------------------mix_outs');
                        console.log('amounts', amounts);
                        console.log('lots_mix_outs', lotsMixOuts);
                        TransactionsExplorer.createRawTx(dsts, wallet, false, usingOuts, pid_encrypt, lotsMixOuts, mixin, neededFee, paymentId).then(function (data) {
                            resolve(data);
                        }).catch(function (e) {
                            reject(e);
                        });
                    });
                });
            });
        };
        return TransactionsExplorer;
    }());
    exports.TransactionsExplorer = TransactionsExplorer;
});
