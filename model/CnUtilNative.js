
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var KEY_SIZE = 32;
    var STRUCT_SIZES = {
        GE_P3: 160,
        GE_P2: 120,
        GE_P1P1: 160,
        GE_CACHED: 160,
        EC_SCALAR: 32,
        EC_POINT: 32,
        KEY_IMAGE: 32,
        GE_DSMP: 160 * 8,
        SIGNATURE: 64 // ec_scalar * 2
    };
    //let myFunc = Module_native.cwrap('myFunc', 'number', ['number', 'number']);
    var generate_key_derivation_bind = self.Module_native.cwrap('generate_key_derivation', null, ['number', 'number', 'number']);
    var derive_public_key_bind = self.Module_native.cwrap('derive_public_key', null, ['number', 'number', 'number', 'number']);
    var CnUtilNative = /** @class */ (function () {
        function CnUtilNative() {
        }
        CnUtilNative.hextobin = function (hex) {
            if (hex.length % 2 !== 0)
                throw "Hex string has invalid length!";
            var res = new Uint8Array(hex.length / 2);
            for (var i = 0; i < hex.length / 2; ++i) {
                res[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
            }
            return res;
        };
        CnUtilNative.bintohex = function (bin) {
            var out = [];
            for (var i = 0; i < bin.length; ++i) {
                out.push(("0" + bin[i].toString(16)).slice(-2));
            }
            return out.join("");
        };
        CnUtilNative.generate_key_derivation = function (pub, sec) {
            var pub_b = CnUtilNative.hextobin(pub);
            var sec_b = CnUtilNative.hextobin(sec);
            var Module_native = self.Module_native;
            var pub_m = Module_native._malloc(KEY_SIZE);
            Module_native.HEAPU8.set(pub_b, pub_m);
            var sec_m = Module_native._malloc(KEY_SIZE);
            Module_native.HEAPU8.set(sec_b, sec_m);
            var derivation_m = Module_native._malloc(KEY_SIZE);
            var r = generate_key_derivation_bind(pub_m, sec_m, derivation_m);
            Module_native._free(pub_m);
            Module_native._free(sec_m);
            var res = Module_native.HEAPU8.subarray(derivation_m, derivation_m + KEY_SIZE);
            Module_native._free(derivation_m);
            return CnUtilNative.bintohex(res);
        };
        CnUtilNative.derive_public_key = function (derivation, output_idx_in_tx, pubSpend) {
            var derivation_b = CnUtilNative.hextobin(derivation);
            var pub_spend_b = CnUtilNative.hextobin(pubSpend);
            var Module_native = self.Module_native;
            var derivation_m = Module_native._malloc(KEY_SIZE);
            Module_native.HEAPU8.set(derivation_b, derivation_m);
            var pub_spend_m = Module_native._malloc(KEY_SIZE);
            Module_native.HEAPU8.set(pub_spend_b, pub_spend_m);
            var derived_key_m = Module_native._malloc(KEY_SIZE);
            var r = derive_public_key_bind(derivation_m, output_idx_in_tx, pub_spend_m, derived_key_m);
            Module_native._free(derivation_m);
            Module_native._free(pub_spend_m);
            var res = Module_native.HEAPU8.subarray(derived_key_m, derived_key_m + KEY_SIZE);
            Module_native._free(derived_key_m);
            return CnUtilNative.bintohex(res);
        };
        return CnUtilNative;
    }());
    exports.CnUtilNative = CnUtilNative;
});
