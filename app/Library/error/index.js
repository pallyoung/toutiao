'use strict'
var userErrorHandler = function(){
    return false;
}

function defaultErrorHandler(error){
   throw error;
}

function handle(error:Error){
    if(!userErrorHandler(error)){
        defaultErrorHandler(error);
    }
}
function onError(errorHandler){
    userErrorHandler = onError;
}
export default {
    onError,
    handle
}