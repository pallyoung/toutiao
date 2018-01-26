'use strict'
import React,{Component} from 'react';
import {
    View
}from 'react-native';
import ItemBox from './ItemBox';
import Commet from './Commet';
import Image from './Image';
import Title from './Title';
function SingleImageItem(props){
    var {
        title
    } = props;
    return (
        <ItemBox>
            <View style={{flexDirection:'row'}}>
                <Title 
                    style={{flex:1,marginRight:12}}
                    title={title} />
                <Image 
                    {...props['image_list'][0]}/>
             </View>  
            <Commet {...props}/>
        </ItemBox>
    );
}

export default SingleImageItem;