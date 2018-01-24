'use strict'
import Provider from './Provider';

class SessionProvider extends Provider{
    /**
     * 取完之后删除数据
     */
    get(){
        var value = super.get();
        this._value = null;
        return value;
    }
    
}
export default SessionProvider