define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CoinUri = void 0;
    var CoinUri = /** @class */ (function () {
        function CoinUri() {
        }
        CoinUri.decodeTx = function (str) {
            if (str.indexOf(CoinUri.coinTxPrefix) === 0) {
                var data = str.replace(this.coinTxPrefix, '');
                var temp = data.replace(/&/g, '?').trim();
                var exploded = temp.split('?');
                if (exploded.length == 0)
                    throw 'missing_address';
                if (exploded[0].length !== this.coinAddressLength)
                    throw 'invalid_address_length';
                var decodedUri = {
                    address: exploded[0]
                };
                for (var i = 0; i < exploded.length; ++i) {
                    var optionParts = exploded[i].split('=');
                    if (optionParts.length === 2) {
                        switch (optionParts[0].trim()) {
                            case 'payment_id':
                                decodedUri.paymentId = optionParts[1];
                                break;
                            case 'tx_payment_id':
                                decodedUri.paymentId = optionParts[1];
                                break;
                            case 'recipient_name':
                                decodedUri.recipientName = optionParts[1];
                                break;
                            case 'amount':
                                decodedUri.amount = optionParts[1];
                                break;
                            case 'tx_amount':
                                decodedUri.amount = optionParts[1];
                                break;
                            case 'tx_description':
                                decodedUri.description = optionParts[1];
                                break;
                            case 'label':
                                decodedUri.description = optionParts[1];
                                break;
                        }
                    }
                }
                return decodedUri;
            }
            throw 'missing_prefix';
        };
        CoinUri.isTxValid = function (str) {
            try {
                this.decodeTx(str);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        CoinUri.encodeTx = function (address, paymentId, amount, recipientName, description) {
            if (paymentId === void 0) { paymentId = null; }
            if (amount === void 0) { amount = null; }
            if (recipientName === void 0) { recipientName = null; }
            if (description === void 0) { description = null; }
            var encoded = this.coinTxPrefix + address;
            if (address.length !== this.coinAddressLength)
                throw 'invalid_address_length';
            if (paymentId !== null)
                encoded += '?payment_id=' + paymentId;
            if (amount !== null)
                encoded += '?amount=' + amount;
            if (recipientName !== null)
                encoded += '?recipient_name=' + recipientName;
            if (description !== null)
                encoded += '?label=' + description;
            return encoded;
        };
        CoinUri.decodeWallet = function (str) {
            if (str.indexOf(CoinUri.coinWalletPrefix) === 0) {
                var data = str.replace(this.coinWalletPrefix, '').trim();
                var exploded = data.split('?');
                if (exploded.length == 0)
                    throw 'missing_address';
                if (exploded[0].length !== this.coinAddressLength)
                    throw 'invalid_address_length';
                var decodedUri = {
                    address: exploded[0]
                };
                for (var i = 1; i < exploded.length; ++i) {
                    var optionParts = exploded[i].split('=');
                    if (optionParts.length === 2) {
                        switch (optionParts[0].trim()) {
                            case 'spend_key':
                                decodedUri.spendKey = optionParts[1];
                                break;
                            case 'view_key':
                                decodedUri.viewKey = optionParts[1];
                                break;
                            case 'mnemonic_seed':
                                decodedUri.mnemonicSeed = optionParts[1];
                                break;
                            case 'height':
                                decodedUri.height = optionParts[1];
                                break;
                            case 'nonce':
                                decodedUri.nonce = optionParts[1];
                                break;
                            case 'encrypt_method':
                                decodedUri.encryptMethod = optionParts[1];
                                break;
                        }
                    }
                }
                if (typeof decodedUri.mnemonicSeed !== 'undefined' ||
                    typeof decodedUri.spendKey !== 'undefined' ||
                    (typeof decodedUri.viewKey !== 'undefined' && typeof decodedUri.address !== 'undefined')) {
                    return decodedUri;
                }
                else
                    throw 'missing_seeds';
            }
            throw 'missing_prefix';
        };
        CoinUri.isWalletValid = function (str) {
            try {
                this.decodeWallet(str);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        CoinUri.encodeWalletKeys = function (address, spendKey, viewKey, height, encryptMethod, nonce) {
            if (viewKey === void 0) { viewKey = null; }
            if (height === void 0) { height = null; }
            if (encryptMethod === void 0) { encryptMethod = null; }
            if (nonce === void 0) { nonce = null; }
            var encoded = this.coinWalletPrefix + address;
            if (address.length !== this.coinAddressLength)
                throw 'invalid_address_length';
            if (spendKey !== null)
                encoded += '?spend_key=' + spendKey;
            if (viewKey !== null)
                encoded += '?view_key=' + viewKey;
            if (height !== null)
                encoded += '?height=' + height;
            if (nonce !== null)
                encoded += '?nonce=' + nonce;
            if (encryptMethod !== null)
                encoded += '?encrypt_method=' + encryptMethod;
            return encoded;
        };
        CoinUri.coinTxPrefix = 'Dynex:';
        CoinUri.coinWalletPrefix = 'Dynex:';
        CoinUri.coinAddressLength = 97;
        return CoinUri;
    }());
    exports.CoinUri = CoinUri;
});
