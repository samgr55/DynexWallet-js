
define(["require", "exports", "./Context"], function (require, exports, Context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Logger = void 0;
    var Logger = /** @class */ (function () {
        function Logger() {
        }
        Object.defineProperty(Logger, "level", {
            get: function () {
                var level = Context_1.Context.getGlobalContextStorage().logLevel;
                return level;
            },
            set: function (level) {
                //console.log('Setting logger level to '+level);
                Context_1.Context.getGlobalContextStorage().logLevel = level;
            },
            enumerable: false,
            configurable: true
        });
        Logger.log = function (level, caller, message, context) {
            if (context === void 0) { context = {}; }
            if (Logger.level <= level) {
                var levelName = Logger.LEVEL_NAMES[level] === null ? '????' : Logger.LEVEL_NAMES[level];
                if (level >= Logger.ERROR) {
                    console.error(levelName + '[' + Logger.getCallerName(caller) + ']' + Logger.interpolate(message, context));
                }
                else if (level >= Logger.WARNING)
                    console.warn(levelName + '[' + Logger.getCallerName(caller) + ']' + Logger.interpolate(message, context));
                else {
                    //console.log(levelName+'['+Logger.getCallerName(caller)+']'+Logger.interpolate(message, context));
                }
            }
        };
        Logger.debug = function (caller, message, context) {
            if (context === void 0) { context = {}; }
            Logger.log(Logger.DEBUG, caller, message, context);
        };
        Logger.info = function (caller, message, context) {
            if (context === void 0) { context = {}; }
            Logger.log(Logger.INFO, caller, message, context);
        };
        Logger.notice = function (caller, message, context) {
            if (context === void 0) { context = {}; }
            Logger.log(Logger.NOTICE, caller, message, context);
        };
        Logger.warning = function (caller, message, context) {
            if (context === void 0) { context = {}; }
            Logger.log(Logger.WARNING, caller, message, context);
        };
        Logger.error = function (caller, message, context) {
            if (context === void 0) { context = {}; }
            Logger.log(Logger.ERROR, caller, message, context);
        };
        Logger.critical = function (caller, message, context) {
            if (context === void 0) { context = {}; }
            Logger.log(Logger.CRITICAL, caller, message, context);
        };
        Logger.alert = function (caller, message, context) {
            if (context === void 0) { context = {}; }
            Logger.log(Logger.ALERT, caller, message, context);
        };
        Logger.emergency = function (caller, message, context) {
            if (context === void 0) { context = {}; }
            Logger.log(Logger.EMERGENCY, caller, message, context);
        };
        Logger.interpolate = function (message, context) {
            if (context === void 0) { context = {}; }
            for (var key in context) {
                message = message.replace('{' + key + '}', context[key]);
            }
            return message;
        };
        Logger.getCallerName = function (object) {
            var type = typeof object;
            if (type === 'string') {
                return object;
            }
            else if (type === 'object') {
                var funcNameRegex = /function (.{1,})\(/;
                var results = (funcNameRegex).exec((object).constructor.toString());
                var name_1 = (results && results.length > 1) ? results[1] : '';
                if (name_1 !== '')
                    return name_1;
                funcNameRegex = /class [a-zA-Z0-9]+/;
                results = (funcNameRegex).exec((object).constructor.toString());
                return (results && results.length == 1) ? results[0].replace('class ', '') : '????';
            }
            return object;
        };
        Logger.EMERGENCY = 700;
        Logger.ALERT = 600;
        Logger.CRITICAL = 500;
        Logger.ERROR = 400;
        Logger.WARNING = 300;
        Logger.NOTICE = 200;
        Logger.INFO = 100;
        Logger.DEBUG = 0;
        Logger.LEVEL_NAMES = {
            '700': 'EMERGENCY',
            '600': 'ALERT',
            '500': 'CRITICAL',
            '400': 'ERROR',
            '300': 'WARNING',
            '200': 'NOTICE',
            '100': 'INFO',
            '0': 'DEBUG',
        };
        return Logger;
    }());
    exports.Logger = Logger;
    Logger.level = Logger.WARNING;
});
