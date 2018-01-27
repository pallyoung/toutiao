'use strict'
import React from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet,
    ScrollView
} from 'react-native';

import { Theme,autoSize} from 'react-native-improver';

function Title(props) {
    return (
        <View
            >
            <Text
                style={styles.title}>{props.title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    title:{
        fontSize:22,
        lineHeight:33,
        color:'#000',
        fontWeight:'600',
    }
})

export default Title;