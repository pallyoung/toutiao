'use strict'
import React,{Component} from 'react';
import Title from './Title';
import {
    View,
    StyleSheet,
    TouchableOpacity
}from 'react-native';

import {px2dp} from 'react-native-improver';

function ItemBox(props){
    var style = [styles.box]
    if(!props.borderNone){
        style.push(styles.border);
    }
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={props.onPress}
            style={style}>
            {props.children}
        </TouchableOpacity>
    );
}
var styles = StyleSheet.create({
    box:{
        marginHorizontal:15,
        paddingVertical:16
    },
    border:{
        borderBottomWidth:px2dp(1),
        borderBottomColor:'rgba(221, 221, 221, 0.6)'
    }
})

export default ItemBox;

