
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
define(["require", "exports", "./Context", "./VueAnnotate"], function (require, exports, Context_1, VueAnnotate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DestructableView = void 0;
    var DestructableView = /** @class */ (function (_super) {
        __extends(DestructableView, _super);
        function DestructableView(data, vueData) {
            if (vueData === void 0) { vueData = null; }
            var _this = _super.call(this, vueData) || this;
            DestructableView_1.setCurrentAppView(_this);
            return _this;
        }
        DestructableView_1 = DestructableView;
        DestructableView.setCurrentAppView = function (view) {
            Context_1.Context.getGlobalContextStorage()['currentAppView'] = view;
        };
        DestructableView.getCurrentAppView = function () {
            return typeof Context_1.Context.getGlobalContextStorage()['currentAppView'] === 'undefined' ? null : Context_1.Context.getGlobalContextStorage()['currentAppView'];
        };
        /**
         * @returns {Promise<boolean>} return true if continue to redirect, false to cancel redirection
         */
        DestructableView.prototype.destruct = function () {
            return Promise.resolve();
        };
        var DestructableView_1;
        DestructableView = DestructableView_1 = __decorate([
            VueAnnotate_1.VueClass()
        ], DestructableView);
        return DestructableView;
    }(Vue));
    exports.DestructableView = DestructableView;
});
