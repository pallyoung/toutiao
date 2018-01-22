'use strict'
class ActionVendor{
    _actionsForKey:any;
    constructor(){
        this._actionsForKey = {
            
        }
    }
    putActionByKey(key:string,action){
        var actions = this.getActionsForKey(key);
        if(!actions){
            actions = [];
            this._actionsForKey[key] = actions;
        }
        actions.push(action);
    }
    getActionsForKey(key:string):?Array{
        return this._actionsForKey[key];
    }
}
const vendor = new ActionVendor(); 

export default vendor;