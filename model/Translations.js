
define(["require", "exports", "./Storage"], function (require, exports, Storage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Translations = void 0;
    var Translations = /** @class */ (function () {
        function Translations() {
        }
        Translations.getBrowserLang = function () {
            var browserUserLang = '' + (navigator.language || navigator.userLanguage);
            browserUserLang = browserUserLang.toLowerCase().split('-')[0];
            return browserUserLang;
        };
        Translations.getLang = function () {
            return Storage_1.Storage.getItem('user-lang', Translations.getBrowserLang());
        };
        Translations.setBrowserLang = function (lang) {
            Storage_1.Storage.setItem('user-lang', lang);
        };
        Translations.loadLangTranslation = function (lang) {
            //console.log('setting lang to '+lang);
            var promise;
            if (typeof Translations.storedTranslations[lang] !== 'undefined')
                promise = Promise.resolve(Translations.storedTranslations[lang]);
            else
                promise = new Promise(function (resolve, reject) {
                    $.ajax({
                        url: './translations/' + lang + '.json'
                    }).then(function (data) {
                        if (typeof data === 'string')
                            data = JSON.parse(data);
                        Translations.storedTranslations[lang] = data;
                        resolve(data);
                    }).fail(function () {
                        reject();
                    });
                });
            promise.then(function (data) {
                if (typeof data.date !== 'undefined')
                    i18n.setDateTimeFormat(lang, data.date);
                if (typeof data.number !== 'undefined')
                    i18n.setNumberFormat(lang, data.number);
                if (typeof data.messages !== 'undefined')
                    i18n.setLocaleMessage(lang, data.messages);
                i18n.locale = lang;
                $('title').html(data.website.title);
                $('meta[property="og:title"]').attr('content', data.website.title);
                $('meta[property="twitter:title"]').attr('content', data.website.title);
                $('meta[name="description"]').attr('content', data.website.description);
                $('meta[property="og:description"]').attr('content', data.website.description);
                $('meta[property="twitter:description"]').attr('content', data.website.description);
                var htmlDocument = document.querySelector('html');
                if (htmlDocument !== null)
                    htmlDocument.setAttribute('lang', lang);
            });
            return promise;
        };
        Translations.storedTranslations = {};
        return Translations;
    }());
    exports.Translations = Translations;
});
