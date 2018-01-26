import TouTiao from './../controllers/TouTiao';
import AppActions from './../constants/AppActions'
import md5 from './../util/md5'
function getParam() {
    var asas;
    var cpcp;
    var t = Math.floor(Date.now() / 1e3)
        , e = t.toString(16).toUpperCase()
        , i = md5(t).toString().toUpperCase();
    if (8 != e.length) {
        asas = "479BB4B7254C150";
        cpcp = "7E0AC8874BB0985";
    } else {
        for (var n = i.slice(0, 5), o = i.slice(-5), a = "", s = 0; 5 > s; s++) {
            a += n[s] + e[s];
        }
        for (var r = "", c = 0; 5 > c; c++) {
            r += e[c + 3] + o[c];
        }
        asas = "A1" + a + e.slice(-3);
        cpcp = e.slice(0, 3) + r + "E1";
    }
    return {"as": asas,"cp":cpcp};
}

var headers = {
    'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
}

export default [
    {
        key: AppActions.getTags,
        controller: TouTiao.getTags,
    },
    {
        key: AppActions.getTagsClassify,
        controller: TouTiao.getTagsClassify,
    },
    {
        key: AppActions.addTag,
        controller: TouTiao.addTag,
        persist: {
            tags: 'tags'
        }
    },
    {
        key: AppActions.removeTag,
        controller: TouTiao.removeTag,
        persist: {
            tags: 'tags'
        }
    },
    {
        key: AppActions.getNewsByTag,
        controller: TouTiao.meaningless,
        provider: function (payload, creator, getter) {
            var remote = 'https://m.toutiao.com/list/';
            var bodys = [];
            var params = getParam();
            bodys.push(`tag=${payload.tk}`);
            bodys.push('ac=wap');
            bodys.push(`count=${payload.count||20}`);
            bodys.push(`as=${params.as}`);
            bodys.push(`cp=${params.cp}`);
            bodys.push('format=json_raw');
            if(params.min_behot_time){
                bodys.push(`min_behot_time=${params.min_behot_time}`);
            }else if(params.max_behot_time){
                bodys.push(`max_behot_time=${params.max_behot_time}`);
            }
            return [creator({
                name: 'news',
                type:'remote',
                remote: 'https://m.toutiao.com/list/?'+bodys.join('&')
            }),'news'];
        }
    },
    {
        key: AppActions.getArticle,
        controller: TouTiao.meaningless, 
        provider: function (payload, creator, getter) {
            var remote = 'https://m.toutiao.com/i';
            return [creator({
                name: 'article',
                type:'remote',
                remote: remote+payload.id+'/info/'
            })];
        }
    }
]
