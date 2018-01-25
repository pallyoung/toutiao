'use strict'
import React,{Component} from 'react';
import {
    FlatList
} from 'react-native';

class List extends Component{
    constructor(...props){
        super(...props);
    }
    render(){
        return (
            <FlatList 
                {...this.props}/>
        );
    }
}

export default List;