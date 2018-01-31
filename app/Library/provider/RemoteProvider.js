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
        this.method = config.method||'get';
        this.body = config.body;
        this.headers = config.headers;
    }
    get(){
        var headers = undefined;
        if(this.headers){
            headers = new Headers(this.headers);
        }
        return fetch(this._remote,{
            body:this.body,
            method:this.method,
            headers
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