'use strict'
import React,{Component} from 'react';
import {
    View
} from 'react-native'

import ImagesItem from './ImagesItem';
import SimpleItem from './SimpleItem';
import SingleImageItem from './SingleImageItem';

class NewsItems extends Component{
    constructor(...props){

    }
    render(){
        var {image_list=[]} = this.props;
        var length = image_list.length;
        if(length == 0){
            return <SimpleItem {...this.props}/>
        }else if(length >1){
            return <ImagesItem {...this.props}/>
        }else{
            return <SingleImageItem {...this.props}/>
        }
    }
}

export default NewsItems;