
define(["require", "exports", "./model/WalletRepository"], function (require, exports, WalletRepository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function sendMessageToParent(type, data) {
        window.parent.postMessage({
            type: type,
            payload: data
        }, '*');
    }
    window.addEventListener('message', function (e) {
        //console.log(e);
        if (e.data == 'hasWallet') {
            sendMessageToParent('hasWallet', WalletRepository_1.WalletRepository.hasOneStored());
        }
    });
    sendMessageToParent('ready', null);
});
