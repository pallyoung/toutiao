'use strict'

'use strict'
import util from './../util';

var {
    toValue,
    copy,
    isArray,
    isObject
} = util;

class Provider{
    _value: any;
    _name: string;
    constructor(config){
        this._value = config.value;
        this._name = config.name;
    }
    get(){
        return copy(this._value);
    }
    set(value){
        this._value = copy(value);
    }
}

export default Provider;