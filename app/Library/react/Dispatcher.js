import Dispatcher from './../dispatcher';
import TargetSet from './TargetSet' ;
import Action from './../action'


function middleWare(exec){
    return function(action,payload){
        var target = payload.target;
        return exec(action,payload)
            .then(function(result){
                result.target = target;
                return result;
            });
    }
}
Action.applyMiddleWare(middleWare)
export default {
    dispatch:Dispatcher.dispatch
}