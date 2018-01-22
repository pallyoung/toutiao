'use strict'
import type StoreManager from './StoreManager';
import util from './../util';

var {
    toValue,
    copy,
    isArray,
    isObject
} = util;
class Store {
    _value: any;
    _storage: boolean;
    _storeManager: any;
    _name: string;

    constructor(storeManager, config) {
        this._value = config.value;
        this._storage = config.storage || false;
        this._name = config.name;
        this._storeManager = storeManager;
    }
    set(value) {
        this._value = copy(value);
        if (this._storage) {
            this._storeManager.syncStorage(this._name, value);
        }

    }
    get() {
        return copy(this._value);
    }
}
export default Store;