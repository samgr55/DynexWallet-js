
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Observable = void 0;
    var Observable = /** @class */ (function () {
        function Observable() {
            this.observers = {};
        }
        Observable.prototype.addObserver = function (eventType, callback) {
            if (!(eventType in this.observers))
                this.observers[eventType] = [];
            this.observers[eventType].push(callback);
        };
        Observable.prototype.removeObserver = function (eventType, callback) {
            if (!(eventType in this.observers))
                return;
            for (var i in this.observers[eventType]) {
                if (this.observers[eventType][i] == callback) {
                    this.observers[eventType].splice(i, 1);
                    break;
                }
            }
        };
        Observable.prototype.notify = function (eventType, data) {
            if (eventType === void 0) { eventType = Observable.EVENT_MODIFIED; }
            if (data === void 0) { data = null; }
            if (!(eventType in this.observers))
                return;
            var observers = [];
            for (var i in this.observers[eventType]) {
                observers.push(this.observers[eventType][i]);
            }
            for (var i in observers) {
                observers[i](eventType, data);
            }
        };
        Observable.EVENT_MODIFIED = 'modified';
        return Observable;
    }());
    exports.Observable = Observable;
});
