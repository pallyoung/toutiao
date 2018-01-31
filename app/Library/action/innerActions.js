'use strict'
const PROVIDER_PERSIST_ACTION = 'LIBRARY/PROVIDER_PERSIST_ACTION';
import Provider from './../provider'
function meaningless(v) {
    return v;
}

function persist(payload){
    return Provider.persist(payload.persist,payload.state);
}
export default {
    PROVIDER_PERSIST_ACTION,
    actions: [
        {
            key:PROVIDER_PERSIST_ACTION,
            controller: persist
        }
    ]
};