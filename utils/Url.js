define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Url = void 0;
    var Url = /** @class */ (function () {
        function Url() {
        }
        Url.transformSearchParametersToAssocArray = function (prmstr) {
            var params = {};
            var prmarr = prmstr.split("&");
            for (var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                if (typeof params[tmparr[0]] !== 'undefined') {
                    if (!Array.isArray(params[tmparr[0]]))
                        params[tmparr[0]] = [params[tmparr[0]]];
                    params[tmparr[0]].push(tmparr[1]);
                }
                else
                    params[tmparr[0]] = tmparr[1];
            }
            return params;
        };
        Url.getSearchParameters = function () {
            var paramsStart = window.location.href.indexOf('?');
            if (paramsStart != -1) {
                var paramsEnd = window.location.href.indexOf('#', paramsStart);
                paramsEnd = paramsEnd == -1 ? window.location.href.length : paramsEnd;
                return Url.transformSearchParametersToAssocArray(window.location.href.substring(paramsStart + 1, paramsEnd));
            }
            return {};
        };
        Url.getHashSearchParameters = function () {
            var paramsStart = window.location.hash.indexOf('?');
            if (paramsStart != -1) {
                return Url.transformSearchParametersToAssocArray(window.location.hash.substring(paramsStart + 1, window.location.hash.length));
            }
            return {};
        };
        Url.getHashSearchParameter = function (parameterName, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            var parameters = this.getHashSearchParameters();
            if (typeof parameters[parameterName] !== 'undefined')
                return parameters[parameterName];
            return defaultValue;
        };
        return Url;
    }());
    exports.Url = Url;
});
