import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import {autoSize} from 'react-native-improver';

function Title(props){
    var {
        title
    } = props;

    return (
        <View>
            <Text
                style = {styles.text}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        
    },
    text:{
        fontSize:autoSize(17),
        color:'#aaa',
    }
});
export default Title;