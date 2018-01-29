'use strict'
const PROVIDER_CHANGE_ACTION = 'LIBRARY/PROVIDER_CHANGE_ACTION';

function meaningless(v) {
    return v;
}


export default {
    PROVIDER_CHANGE_ACTION,
    actions: [
        {
            key: PROVIDER_CHANGE_ACTION,
            controller: meaningless
        }
    ]
};