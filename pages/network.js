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
define(["require", "exports", "../lib/numbersLab/DestructableView", "../lib/numbersLab/VueAnnotate", "../model/AppState", "../providers/BlockchainExplorerProvider", "../filters/Filters"], function (require, exports, DestructableView_1, VueAnnotate_1, AppState_1, BlockchainExplorerProvider_1, Filters_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AppState_1.AppState.enableLeftMenu();
    var blockchainExplorer = BlockchainExplorerProvider_1.BlockchainExplorerProvider.getInstance();
    var NetworkView = /** @class */ (function (_super) {
        __extends(NetworkView, _super);
        function NetworkView(container) {
            var _this = _super.call(this, container) || this;
            _this.intervalRefreshStat = 0;
            var self = _this;
            _this.intervalRefreshStat = setInterval(function () {
                self.refreshStats();
            }, 30 * 1000);
            _this.refreshStats();
            return _this;
        }
        NetworkView.prototype.destruct = function () {
            clearInterval(this.intervalRefreshStat);
            return _super.prototype.destruct.call(this);
        };
        NetworkView.prototype.refreshStats = function () {
            var _this = this;
            blockchainExplorer.getNetworkInfo().then(function (info) {
                //console.log(info);
                _this.connectedNode = info.node;
                _this.networkDifficulty = info.difficulty;
                _this.networkHashrate = Filters_1.VueFilterHashrate(info.difficulty / config.avgBlockTime);
                _this.blockchainHeight = info.height;
                _this.lastReward = info.reward / Math.pow(10, config.coinUnitPlaces);
                _this.ticker = config.coinSymbol;
                _this.lastBlockFound = info.timestamp;
            });
        };
        __decorate([
            VueAnnotate_1.VueVar(0)
        ], NetworkView.prototype, "networkHashrate", void 0);
        __decorate([
            VueAnnotate_1.VueVar(0)
        ], NetworkView.prototype, "blockchainHeight", void 0);
        __decorate([
            VueAnnotate_1.VueVar(0)
        ], NetworkView.prototype, "networkDifficulty", void 0);
        __decorate([
            VueAnnotate_1.VueVar(0)
        ], NetworkView.prototype, "lastReward", void 0);
        __decorate([
            VueAnnotate_1.VueVar(0)
        ], NetworkView.prototype, "lastBlockFound", void 0);
        __decorate([
            VueAnnotate_1.VueVar(0)
        ], NetworkView.prototype, "connectedNode", void 0);
        __decorate([
            VueAnnotate_1.VueVar(0)
        ], NetworkView.prototype, "ticker", void 0);
        NetworkView = __decorate([
            VueAnnotate_1.VueRequireFilter('hashrate', Filters_1.VueFilterHashrate)
        ], NetworkView);
        return NetworkView;
    }(DestructableView_1.DestructableView));
    new NetworkView('#app');
});
