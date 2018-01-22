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
/m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A1556AB6241667A&cp=5A649656774A3E1&min_behot_time=0
m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A115EA963456C0F&cp=5A64364C10DF7E1&max_behot_time=1516520724