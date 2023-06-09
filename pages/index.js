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
define(["require", "exports", "../model/WalletRepository", "../lib/numbersLab/DependencyInjector", "../lib/numbersLab/VueAnnotate", "../lib/numbersLab/DestructableView", "../model/Wallet", "../model/AppState"], function (require, exports, WalletRepository_1, DependencyInjector_1, VueAnnotate_1, DestructableView_1, Wallet_1, AppState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var wallet = DependencyInjector_1.DependencyInjectorInstance().getInstance(Wallet_1.Wallet.name, 'default', false);
    if (wallet !== null) {
        window.location.href = '#account';
    }
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView(container) {
            var _this = _super.call(this, container) || this;
            _this.isWalletLoaded = DependencyInjector_1.DependencyInjectorInstance().getInstance(Wallet_1.Wallet.name, 'default', false) !== null;
            WalletRepository_1.WalletRepository.hasOneStored().then(function (status) {
                _this.hasLocalWallet = status;
            });
            // this.importWallet();
            AppState_1.AppState.disableLeftMenu();
            return _this;
        }
        IndexView.prototype.destruct = function () {
            return _super.prototype.destruct.call(this);
        };
        IndexView.prototype.loadWallet = function () {
            AppState_1.AppState.askUserOpenWallet();
        };
        __decorate([
            VueAnnotate_1.VueVar(false)
        ], IndexView.prototype, "hasLocalWallet", void 0);
        __decorate([
            VueAnnotate_1.VueVar(false)
        ], IndexView.prototype, "isWalletLoaded", void 0);
        return IndexView;
    }(DestructableView_1.DestructableView));
    var newIndexView = new IndexView('#app');
});
