'use strict' 
function limit(s,limit,suffix){
    suffix=suffix||'';
    if(!limit||!s){
        return s;
    }
    let d = s.slice(0,limit);
    if(d.length<s.length){
        d=d+suffix;
    }
    return d;
}
function leftPad(s,count,p){
    if(!s){
        return;
    }
    s=String(s);
    let length = s.length;
    if(length>=count){
        return s;
    }else{
        let rest = count-length;
        for(let i=0;i<rest;i++){
            s=p+s;
        }
    }
    return s;
}
function rightPad(s,count,p){
    if(!s){
        return;
    }
    s=String(s);
    let length = s.length;
    if(length>=count){
        return s;
    }else{
        let rest = count-length;
        for(let i=0;i<rest;i++){
            s=s+p;
        }
    }
    return s;
}
export default {
    limit,
    leftPad,
    rightPad
}