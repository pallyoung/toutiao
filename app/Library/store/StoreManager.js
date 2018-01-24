'use strict'
import types from './types';
import util from './../util';

var { toValue, isArray } = util;

class StoreManager {
    _storageTool: types.StorageTool
    constructor() {
        this._storageTool = {
            setter: function () {
                return Promise.resolve();
            },
            getter: function () {
                return Promise.resolve();
            }
        }
    }
    setStorageTool(storageTool: types.StorageTool) {
        this._storageTool = storageTool;
    }
    /**
     * 
     * 
     * @param {string} name 
     * @param {any} value 
     * @returns Promise
     * 
     * @memberOf StoreManager
     */
    syncStorage(name, value) {
        if (value) {
            return this._storageTool.setter(name, value);
        } else {
            return this._storageTool.getter(name);
        }
    }
    store(config) {
        if (config.storage) {
            return this.syncStorage(config.name).then((value) => {
                if(value){
                    config.value = value;
                }else{
                    config.value = config.defaultValue;
                }
                this[config.name] = new Store(this,config);
            })
        } else {
            config.value = config.defaultValue;
            this[config.name] = new Store(this,config);
            return Promise.resolve();
        }
    }
    create(list, complete) {
        return new Promise((resolve, reject) => {
            if (isArray(list)) {
                let promises = [];
                list.forEach((config)=>{
                    promises.push(this.store(config));
                })
                Promise.all.apply(Promise,promises).then(()=>{
                    complete && complete();
                    resolve();
                })
            } else {
                this.store(config).then(() => {
                    complete && complete();
                    resolve();
                })
            }
        })



    }
}

let storeManager = new StoreManager();
export default storeManager;