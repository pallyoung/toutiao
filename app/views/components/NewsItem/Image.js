import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import {autoSize} from 'react-native-improver';

function Image2(props){
    return (
        <Image 
            resizeMode='stretch'
            style={{height:autoSize(74),width:autoSize(115)}}
            source={{uri:props.url}}/>
    );
}
export default Image2;