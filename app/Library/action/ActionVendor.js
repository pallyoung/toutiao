'use strict'
class ActionVendor{
    _actionsForKey:any;
    constructor(){
        this._actionsForKey = {
            
        }
    }
    putActionByKey(key:string,action){
        this._actionsForKey[key] = action;
    }
    getActionForKey(key:string){
        return this._actionsForKey[key];
    }
}
const vendor = new ActionVendor(); 

export default vendor;