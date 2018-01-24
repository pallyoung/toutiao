'use strict'
import Provider from './Provider';

var storageTool = {
    getter: function () {
        return Promise.resolve();
    },
    setter: function () {
        return Promise.resolve();
    }
}
class StorageProvider extends Provider {
    _synced: boolean;
    constructor(config) {
        super(config);
    }
    get() {
        if (!this._synced) {
            return storageTool.getter(this._name)
                .then((v) => {
                    if (v) {
                        this._value = v.value;
                    }
                    this._synced = true;
                    return super.get();
                })
        } else {
            return super.get();
        }
    }
    set(v) {
        super.set(v);
        storageTool.setter(this._name, { timestamp: Date.now(), value: v });

    }
}
function setStorgaeTool(tool) {
    storageTool = tool;
}

StorageProvider.setStorageTool = setStorgaeTool;
export default StorageProvider;