import AppDispatcher from './../dispatcher';
import TargetSet from './TargetSet' ;

function dispatch(action,payload){
   let id = AppDispatcher.dispatch(action,payload.payload);
   TargetSet.set(id,payload.target);
   return id;
}
export default {
    dispatch
}