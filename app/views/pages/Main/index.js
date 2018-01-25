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
    StyleSheet
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import { Theme } from 'react-native-improver';
import AppActions from './../../../constants/AppActions'
import Header from './Header';
import Content from './Content';
import {ViewPager} from 'react-native-awesome-viewpager';

var currentTheme = Theme.getTheme();

class Main extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '首页',
            header: null
        }
        this.state = {
            tags:[]
        }
    }
    componentDidMount() {
        super.componentDidMount();
        this.dispatch(AppActions.getTags)
    }
    _onItemPress=(item)=>{
        this.dispatch(AppActions.getNewsByTag,item);
    }
    onData(data){
        if(data.key===AppActions.addTag||data.key===AppActions.removeTag){
            this.dispatch(AppActions.getTags)
            return true;
        }
    }
    render() {
        return (
            <View
                style = {styles.wrapper}>
                <Header 
                    tags={this.state.tags}
                    onItemPress={this._onItemPress}
                    />
                <Content 
                    tags={this.state.tags}
                    />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper:{
        paddingTop:Platform.OS==='ios'?20:0,
        backgroundColor:'#fff',
        flexDirection:'column',
        flex:1
    }
})
export default Main;