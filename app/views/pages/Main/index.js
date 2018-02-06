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
import Library from './../../../Library'
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
    _onItemPress=(i)=>{
        this.refs['ContentRef']&&this.refs['ContentRef'].setPage(i);
    }
    _onPageSelected=(position)=>{
        this.refs['HeaderRef']&&this.refs['HeaderRef'].setItem(position);
    }
    onData(data){
        console.log(data.key,222)
        if(data.key===Library.PROVIDER_CHANGE_ACTION){
            this.dispatch(AppActions.getTags)
            return true;
        }
    }
    render() {
        return (
            <View
                style = {styles.wrapper}>
                <Header 
                    ref='HeaderRef'
                    tags={this.state.tags}
                    onItemPress={this._onItemPress}
                    />
                <Content 
                    onPageSelected={this._onPageSelected}
                    ref='ContentRef'
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