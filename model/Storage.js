define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Storage = void 0;
    var LocalStorage = /** @class */ (function () {
        function LocalStorage() {
        }
        LocalStorage.prototype.setItem = function (key, value) {
            window.localStorage.setItem(key, value);
            return Promise.resolve();
        };
        LocalStorage.prototype.getItem = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            var value = window.localStorage.getItem(key);
            if (value === null)
                return Promise.resolve(defaultValue);
            return Promise.resolve(value);
        };
        LocalStorage.prototype.keys = function () {
            var keys = [];
            for (var i = 0; i < window.localStorage.length; ++i) {
                var k = window.localStorage.key(i);
                if (k !== null)
                    keys.push(k);
            }
            return Promise.resolve(keys);
        };
        LocalStorage.prototype.remove = function (key) {
            window.localStorage.removeItem(key);
            return Promise.resolve();
        };
        LocalStorage.prototype.clear = function () {
            window.localStorage.clear();
            return Promise.resolve();
        };
        return LocalStorage;
    }());
    var NativeStorageWrap = /** @class */ (function () {
        function NativeStorageWrap() {
        }
        NativeStorageWrap.prototype.setItem = function (key, value) {
            return new Promise(function (resolve, reject) {
                if (window.NativeStorage)
                    window.NativeStorage.setItem(key, value, function () {
                        resolve();
                    }, function (error) {
                        reject();
                    });
                else
                    reject();
            });
        };
        NativeStorageWrap.prototype.getItem = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            return new Promise(function (resolve, reject) {
                if (window.NativeStorage)
                    window.NativeStorage.getItem(key, function () {
                        resolve(true);
                    }, function (error) {
                        if (error.code === 2)
                            resolve(defaultValue);
                        reject();
                    });
                else
                    reject();
            });
        };
        NativeStorageWrap.prototype.keys = function () {
            return new Promise(function (resolve, reject) {
                if (window.NativeStorage)
                    window.NativeStorage.keys(function (keys) {
                        resolve(keys);
                    }, function (error) {
                        reject();
                    });
                else
                    reject();
            });
        };
        NativeStorageWrap.prototype.remove = function (key) {
            return new Promise(function (resolve, reject) {
                if (window.NativeStorage)
                    window.NativeStorage.remove(key, function () {
                        resolve();
                    }, function (error) {
                        if (error.code === 2 || error.code === 3 || error.code === 4)
                            resolve();
                        reject();
                    });
                else
                    reject();
            });
        };
        NativeStorageWrap.prototype.clear = function () {
            return new Promise(function (resolve, reject) {
                if (window.NativeStorage)
                    window.NativeStorage.clear(function () {
                        resolve();
                    }, function (error) {
                        reject();
                    });
                else
                    reject();
            });
        };
        return NativeStorageWrap;
    }());
    var Storage = /** @class */ (function () {
        function Storage() {
        }
        Storage.clear = function () {
            return Storage._storage.clear();
        };
        Storage.getItem = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            return Storage._storage.getItem(key, defaultValue);
        };
        Storage.keys = function () {
            return Storage._storage.keys();
        };
        Storage.remove = function (key) {
            return Storage._storage.remove(key);
        };
        Storage.removeItem = function (key) {
            return Storage._storage.remove(key);
        };
        Storage.setItem = function (key, value) {
            return Storage._storage.setItem(key, value);
        };
        Storage._storage = new LocalStorage();
        return Storage;
    }());
    exports.Storage = Storage;
    if (window.NativeStorage) {
        Storage._storage = new NativeStorageWrap();
    }
});
