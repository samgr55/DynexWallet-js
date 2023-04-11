
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MathUtil = void 0;
    var MathUtil = /** @class */ (function () {
        function MathUtil() {
        }
        MathUtil.randomFloat = function () {
            var randomBuffer = new Uint32Array(1);
            window.crypto.getRandomValues(randomBuffer);
            return randomBuffer[0] / (0xffffffff + 1);
        };
        MathUtil.randomUint32 = function () {
            var randomBuffer = new Uint32Array(1);
            window.crypto.getRandomValues(randomBuffer);
            return randomBuffer[0];
        };
        MathUtil.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        MathUtil.randomTriangularSimplified = function (max) {
            var r = MathUtil.randomUint32() % (1 << 53);
            var frac = Math.sqrt(r / (1 << 53));
            var i = (frac * max) | 0;
            // just in case rounding up to 1 occurs after sqrt
            if (i == max)
                --i;
            return i;
        };
        return MathUtil;
    }());
    exports.MathUtil = MathUtil;
});
