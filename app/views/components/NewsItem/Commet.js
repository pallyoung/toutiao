import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import time from './../../../util/time';
import {autoSize} from 'react-native-improver';

function text(media_name,comment_count,publish_time){
    var text = `${media_name}  评论 ${comment_count}`;
    if(publish_time){
        text += ' '+time.parse(publish_time*1000,'MM-dd HH:mm')
    }
    return text;

}

function Commet(props){
    var {
        media_name, 
        comment_count,
        publish_time
    } = props;
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>
                {text(media_name,comment_count,publish_time)}
            </Text>
            
        </View>
    );
}

var styles = StyleSheet.create({
    wrapper:{
        marginTop:6    
    },
    text:{
        color:'#999',
        fontSize:10
    }
});
export default Commet;