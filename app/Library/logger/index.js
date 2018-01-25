'use strict'

function logger(exec){
    return function(action,payload){
        console.log(action.key+' dispatched');
        return exec(action,payload).then(function(result){
            console.log(action.key+' end',result.state);
            return result;
        })
    }
}

export default logger;