'use strict'
import Provider from './Provider';
import util from './../util';
class RemoteProvider extends Provider{
    _remote:string;
    _params:any;
    _method:string;
    constructor(config){
        super(config);
        this._remote = config.remote;
        this._method = config.method||'get';
        this._params = config.params;
    }
    get(){
        return fetch(this._remote,{
            body:this._params,
            method:this._method
        }).then(function(response){
            return response.text().then(function(text){
                return util.toValue(text);
            })
        },function(){
            return Promise.resolve(null);
        })
    }
    set(){

    }
}

export default RemoteProvider;