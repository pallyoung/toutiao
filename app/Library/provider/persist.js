'use strict';
import ProviderContainer from './ProviderContainer';
function persist(kv,state){
    if(!kv){
        return [];
    }
    var changed = [];
    for(let k in kv){
        let v = state[k];

        if(v){
            let name = kv[k];
            let provider = ProviderContainer.getProvider(name);
            if(provider){
                provider.set(v);
                changed.push(name);
            }
        }      
    }
    return changed;
        
}

export default persist;