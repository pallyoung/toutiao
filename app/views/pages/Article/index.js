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
    ScrollView,
    WebView
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import { Theme } from 'react-native-improver';
import AppActions from './../../../constants/AppActions'
import Title from './Title';

class Article extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.state = {

        }
    }
    componentDidMount(){
        super.componentDidMount();
        var id = '6504120022338634254';
        try{
            id = this.getScreen().getNavigation().state.params.id;
        }catch(e){

        }
        this.dispatch(AppActions.getArticle,{id})
    }
    render(){
        var {data}=this.state;
        if(!data){
            return null;
        }
        return (
            <ScrollView>
                <Title 
                    title={data.title}/>
                {/* <WebView /> */}
            </ScrollView>
        );
    }
}

export default Article;