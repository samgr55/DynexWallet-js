
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Password = void 0;
    var Password = /** @class */ (function () {
        function Password() {
        }
        Password.checkPasswordConstraints = function (password, raiseError) {
            if (raiseError === void 0) { raiseError = true; }
            var anUpperCase = /[A-Z]/;
            var aLowerCase = /[a-z]/;
            var aNumber = /[0-9]/;
            var aSpecial = /[!|@|'|"|#|$|%|^|&|*|(|)|-|_]/;
            var numUpper = 0;
            var numLower = 0;
            var numNums = 0;
            var numSpecials = 0;
            for (var i = 0; i < password.length; i++) {
                if (anUpperCase.test(password[i]))
                    numUpper++;
                else if (aLowerCase.test(password[i]))
                    numLower++;
                else if (aNumber.test(password[i]))
                    numNums++;
                else if (aSpecial.test(password[i]))
                    numSpecials++;
            }
            if (password.length < 8 || numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials < 1) {
                if (raiseError) {
                    swal({
                        type: 'error',
                        title: i18n.t('global.passwordNotComplexEnoughModal.title'),
                        text: i18n.t('global.passwordInvalidRequirements'),
                        confirmButtonText: i18n.t('global.passwordNotComplexEnoughModal.confirmText'),
                    });
                }
                return false;
            }
            return true;
        };
        return Password;
    }());
    exports.Password = Password;
});
