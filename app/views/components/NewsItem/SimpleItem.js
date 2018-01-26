'use strict'
import React,{Component} from 'react';
import Title from './Title';
import ItemBox from './ItemBox';
import {
    View
}from 'react-native';
import Commet from './Commet';

function SimpleItem(props){
    var {
        title
    } = props;
    return (
        <ItemBox>
            <Title 
                title={title} />
            <Commet {...props}/>
        </ItemBox>
    );
}

export default SimpleItem;