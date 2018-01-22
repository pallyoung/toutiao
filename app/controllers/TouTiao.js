'use strict'
function getTags(tags,allTags) {

    return {
            tags:tags.map((item)=>{
                return allTags[item]
            })
        };
}
function getTagsClassify(tags,allTags){
    var added = []
    var rest = [];

    allTags.forEach((item,index)=>{
        if(tags.indexOf(index)>-1){
            added.push(item);
        }else{
            rest.push(item); 
        }
    })
    return {
        added,
        rest,
        tags
    }
}
function getIndexByTag(tag,allTags){
    for(let i=allTags.length-1;i>=0;i--){
        if(allTags[i].name == tag.name){
            return i;
        }
    }
    return -1;

}
function addTag(tag,tags,allTags){
    let index = getIndexByTag(tag,allTags);
    let i = tags.indexOf(index);
    if(i==-1){
        tags.push(index);
    }
    return getTagsClassify(tags,allTags);
}
function removeTag(tag,tags,allTags){
    let index = getIndexByTag(tag,allTags);
    let i = tags.indexOf(index);
    if(i!==-1){
        tags.splice(i,1);
    }
    return getTagsClassify(tags,allTags);
}

function getNewsByTag(tagKey,){

}

/**
 * uuid
 */
function uuid(){
    return 'w:1d800173b4114055bad3dbd5ab27f86f';
}
export default {
    getTags,
    getTagsClassify,
    addTag,
    removeTag,
    uuid
}