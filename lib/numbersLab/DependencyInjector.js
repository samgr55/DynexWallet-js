
define(["require", "exports", "./Context"], function (require, exports, Context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autowire = exports.DependencyInjectorInstance = exports.DependencyInjector = void 0;
    var DependencyInjector = /** @class */ (function () {
        function DependencyInjector() {
            this.values = {};
        }
        DependencyInjector.prototype.getInstance = function (name, subname, createIfPossible) {
            if (subname === void 0) { subname = 'default'; }
            if (createIfPossible === void 0) { createIfPossible = true; }
            if (typeof this.values[name + '-' + subname] != 'undefined')
                return this.values[name + '-' + subname];
            if (createIfPossible)
                return this.returnBest(name, subname);
            return null;
        };
        DependencyInjector.prototype.register = function (name, object, subname) {
            if (subname === void 0) { subname = 'default'; }
            this.values[name + '-' + subname] = object;
        };
        DependencyInjector.prototype.returnBest = function (name, subname) {
            var found = this.searchFromRequireJs(name);
            //console.log(name, subname,found);
            if (found != null) {
                this.register(name, new found(), subname);
            }
            return this.getInstance(name, subname, false);
        };
        DependencyInjector.prototype.searchFromRequireJs = function (name) {
            //noinspection TypeScriptUnresolvedVariable
            var loaded = window.require.s.contexts._.defined;
            var dependency = null;
            //console.log(loaded);
            for (var containerName in loaded) {
                var container = loaded[containerName];
                //console.log('type', typeof container, container, container[name]);
                if (typeof container[name] != 'undefined') {
                    if (!DependencyInjector.debug)
                        return container[name];
                    else {
                        if (dependency != null) {
                            //console.log('%c/!\\ Dependency injector : Multiple Classes Have the same name !! Conflict when resolving dependencies', 'background: white;color: red');
                        }
                    }
                    dependency = container[name];
                }
                else {
                    //console.log('default->', typeof container['default']);
                    if (typeof container['default'] === 'function' ||
                        typeof container['default'] === 'object') {
                        if (container['default'].name === name) {
                            if (!DependencyInjector.debug)
                                return container['default'];
                            else {
                                if (dependency != null) {
                                    //console.log('%c/!\\ Dependency injector : Multiple Classes Have the same name !! Conflict when resolving dependencies', 'background: white;color: red');
                                }
                            }
                            dependency = container['default'];
                        }
                    }
                }
            }
            return dependency;
        };
        DependencyInjector.debug = true;
        return DependencyInjector;
    }());
    exports.DependencyInjector = DependencyInjector;
    function DependencyInjectorInstance() {
        if (typeof Context_1.Context.getGlobalContext()['di'] === 'undefined' ||
            Context_1.Context.getGlobalContext()['di'] === null) {
            var Inj = new DependencyInjector();
            Context_1.Context.getGlobalContext()['di'] = Inj;
            //console.log('register');
        }
        return Context_1.Context.getGlobalContext()['di'];
    }
    exports.DependencyInjectorInstance = DependencyInjectorInstance;
    function Autowire() {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        // Inj.need(keys[0]);
        return function (target, key) {
            // property getter
            var getter = function () {
                var Inj = DependencyInjectorInstance();
                //console.log(Get: ${key} => ${_val});
                var subname = keys.length > 1 ? keys[1] : 'default';
                return Inj.getInstance(keys[0], subname);
            };
            // Delete property.
            if (delete target[key]) {
                Object.defineProperty(target, key, {
                    get: getter
                });
            }
        };
    }
    exports.Autowire = Autowire;
});
