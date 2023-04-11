define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VueFilterHashrate = exports.VueFilterFiat = exports.VueFilterPiconero = exports.VueFilterSatoshis = void 0;
    function VueFilterSatoshis(value) {
        return '₿ ' + value.toFixed(8);
    }
    exports.VueFilterSatoshis = VueFilterSatoshis;
    function VueFilterPiconero(value) {
        return value.toFixed(12);
    }
    exports.VueFilterPiconero = VueFilterPiconero;
    function VueFilterFiat(value, currency) {
        if (currency == 'usd' || currency == 'aud' || currency == 'cad' || currency == 'nzd') {
            return '$ ' + value.toFixed(2);
        }
        if (currency == 'eur') {
            return '€ ' + value.toFixed(2);
        }
        if (currency == 'jpy') {
            return '¥ ' + value.toFixed(2);
        }
        if (currency == 'gbp') {
            return '£ ' + value.toFixed(2);
        }
        if (currency == 'chf') {
            return 'Fr. ' + value.toFixed(2);
        }
        if (currency == 'sek') {
            return 'kr ' + value.toFixed(2);
        }
        if (currency == 'czk') {
            return 'CZK ' + value.toFixed(2);
        }
        if (currency == 'eth') {
            return 'Ξ ' + value.toFixed(2);
        }
        if (currency == 'ltc') {
            return 'Ł ' + value.toFixed(2);
        }
    }
    exports.VueFilterFiat = VueFilterFiat;
    function VueFilterHashrate(hashrate) {
        var i = 0;
        var byteUnits = ['H', 'kH', 'MH', 'GH', 'TH', 'PH', 'EH', 'ZH', 'YH'];
        while (hashrate > 1000) {
            hashrate = hashrate / 1000;
            i++;
        }
        return hashrate.toFixed(2) + byteUnits[i];
    }
    exports.VueFilterHashrate = VueFilterHashrate;
});
