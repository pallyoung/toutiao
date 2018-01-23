import TouTiao from './../controllers/TouTiao';
import AppActions from './../constants/AppActions'
export default [
    {
        key:AppActions.getTags,
        controller:TouTiao.getTags,
    },
    {
        key:AppActions.getTagsClassify,
        controller:TouTiao.getTagsClassify,
    },
    {
        key:AppActions.addTag,
        controller:TouTiao.addTag,
        persist:{
            tags:'tags'
        }
    },
    {
        key:AppActions.removeTag,
        controller:TouTiao.removeTag,
        persist:{
            tags:'tags'
        }
    }
]
