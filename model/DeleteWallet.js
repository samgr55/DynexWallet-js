
define(["require", "exports", "../model/WalletRepository", "../lib/numbersLab/DependencyInjector", "../model/Wallet", "../model/AppState"], function (require, exports, WalletRepository_1, DependencyInjector_1, Wallet_1, AppState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeleteWallet = void 0;
    var DeleteWallet = /** @class */ (function () {
        function DeleteWallet() {
        }
        DeleteWallet.deleteWallet = function () {
            //localStorage.clear();
            //window.location.href = '/';
            swal({
                title: i18n.t('settingsPage.deleteWalletModal.title'),
                html: i18n.t('settingsPage.deleteWalletModal.content'),
                showCancelButton: true,
                confirmButtonText: i18n.t('settingsPage.deleteWalletModal.confirmText'),
                cancelButtonText: i18n.t('settingsPage.deleteWalletModal.cancelText'),
                type: 'warning'
            }).then(function (result) {
                if (result.value) {
                    AppState_1.AppState.disconnect();
                    DependencyInjector_1.DependencyInjectorInstance().register(Wallet_1.Wallet.name, undefined, 'default');
                    WalletRepository_1.WalletRepository.deleteLocalCopy();
                    window.location.href = '#index';
                }
            });
        };
        return DeleteWallet;
    }());
    exports.DeleteWallet = DeleteWallet;
});
