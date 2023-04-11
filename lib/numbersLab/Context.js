
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Context = void 0;
    var Context = /** @class */ (function () {
        function Context() {
        }
        Context.getGlobalContext = function () {
            return window;
        };
        Context.getGlobalContextStorage = function () {
            return Context.getGlobalContext()['data'];
        };
        return Context;
    }());
    exports.Context = Context;
    Context.getGlobalContext()['data'] = {};
});
