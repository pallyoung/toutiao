'use strict'
import React,{Component} from 'react';
import Title from './Title';

function SimpleItem(props){
    var {
        title
    } = props;
    return (
        <View>
            <Title title={title} />
        </View>
    );
}

export default SimpleItem;