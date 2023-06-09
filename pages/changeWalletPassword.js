
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../lib/numbersLab/DestructableView", "../lib/numbersLab/VueAnnotate", "../model/WalletRepository", "../lib/numbersLab/DependencyInjector", "../model/Wallet", "../model/AppState", "../model/Password", "../providers/BlockchainExplorerProvider", "../model/WalletWatchdog"], function (require, exports, DestructableView_1, VueAnnotate_1, WalletRepository_1, DependencyInjector_1, Wallet_1, AppState_1, Password_1, BlockchainExplorerProvider_1, WalletWatchdog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var wallet = DependencyInjector_1.DependencyInjectorInstance().getInstance(Wallet_1.Wallet.name, 'default', false);
    var blockchainExplorer = BlockchainExplorerProvider_1.BlockchainExplorerProvider.getInstance();
    var walletWatchdog = DependencyInjector_1.DependencyInjectorInstance().getInstance(WalletWatchdog_1.WalletWatchdog.name, 'default', false);
    var ChangeWalletPasswordView = /** @class */ (function (_super) {
        __extends(ChangeWalletPasswordView, _super);
        function ChangeWalletPasswordView(container) {
            return _super.call(this, container) || this;
        }
        ChangeWalletPasswordView.prototype.oldPasswordWatch = function () {
            var wallet = WalletRepository_1.WalletRepository.getLocalWalletWithPassword(this.oldPassword);
            if (wallet !== null) {
                this.invalidOldPassword = false;
            }
            else
                this.invalidOldPassword = true;
        };
        ChangeWalletPasswordView.prototype.forceInsecurePasswordCheck = function () {
            var self = this;
            self.forceInsecurePassword = true;
        };
        ChangeWalletPasswordView.prototype.walletPasswordWatch = function () {
            if (!Password_1.Password.checkPasswordConstraints(this.walletPassword, false)) {
                this.insecurePassword = true;
            }
            else
                this.insecurePassword = false;
        };
        ChangeWalletPasswordView.prototype.changePassword = function () {
            var walletWorker = DependencyInjector_1.DependencyInjectorInstance().getInstance(AppState_1.WalletWorker.name, 'default', false);
            if (walletWorker !== null) {
                walletWorker.password = this.walletPassword;
                walletWorker.save();
                swal({
                    type: 'success',
                    title: i18n.t('changeWalletPasswordPage.modalSuccess.title'),
                    confirmButtonText: i18n.t('changeWalletPasswordPage.modalSuccess.confirmText'),
                });
                this.oldPassword = '';
                this.walletPassword = '';
                this.walletPassword2 = '';
                this.insecurePassword = false;
                this.forceInsecurePassword = false;
                this.invalidOldPassword = false;
            }
        };
        __decorate([
            VueAnnotate_1.VueVar('')
        ], ChangeWalletPasswordView.prototype, "oldPassword", void 0);
        __decorate([
            VueAnnotate_1.VueVar(false)
        ], ChangeWalletPasswordView.prototype, "invalidOldPassword", void 0);
        __decorate([
            VueAnnotate_1.VueVar('')
        ], ChangeWalletPasswordView.prototype, "walletPassword", void 0);
        __decorate([
            VueAnnotate_1.VueVar('')
        ], ChangeWalletPasswordView.prototype, "walletPassword2", void 0);
        __decorate([
            VueAnnotate_1.VueVar(false)
        ], ChangeWalletPasswordView.prototype, "insecurePassword", void 0);
        __decorate([
            VueAnnotate_1.VueVar(false)
        ], ChangeWalletPasswordView.prototype, "forceInsecurePassword", void 0);
        __decorate([
            VueAnnotate_1.VueWatched()
        ], ChangeWalletPasswordView.prototype, "oldPasswordWatch", null);
        __decorate([
            VueAnnotate_1.VueWatched()
        ], ChangeWalletPasswordView.prototype, "walletPasswordWatch", null);
        return ChangeWalletPasswordView;
    }(DestructableView_1.DestructableView));
    if (wallet !== null && blockchainExplorer !== null)
        new ChangeWalletPasswordView('#app');
    else
        window.location.href = '#index';
});
