
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
define(["require", "exports", "../model/AppState", "../lib/numbersLab/DestructableView"], function (require, exports, AppState_1, DestructableView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AppState_1.AppState.enableLeftMenu();
    var DonateView = /** @class */ (function (_super) {
        __extends(DonateView, _super);
        function DonateView(container) {
            var _this = _super.call(this, container) || this;
            var self = _this;
            return _this;
        }
        return DonateView;
    }(DestructableView_1.DestructableView));
    new DonateView('#app');
});
