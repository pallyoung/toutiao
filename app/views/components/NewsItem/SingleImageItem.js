'use strict'
import React,{Component} from 'react';

function SingleImageItem(props){
    var {
        title
    } = props;
    return (
        <View>
            <Title title={title} />
        </View>
    );
}

export default SingleImageItem;