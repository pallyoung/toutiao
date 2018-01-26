'use strict'
import React, { Component } from 'react';

import { View } from 'react-native';

import Title from './Title';
import ItemBox from './ItemBox';
import Commet from './Commet';
import Image from './Image';


function ImagesItem(props) {
    var {
        title
    } = props;
    return (
        <ItemBox>
            <Title title={title} />
            <View
                style={{flexDirection:'row',justifyContent:'space-around',marginTop:6}}>
                {props.image_list.map(function(image){
                    return <Image {...image} key={image.url}/>
                })}
            </View>
            <Commet {...props}/>
        </ItemBox>
    );
}

export default ImagesItem;