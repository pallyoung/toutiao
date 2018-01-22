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
var currentTheme = Theme.getTheme();

class Main extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '首页',
            header: null
        }
        this.state = {

        }
    }
    _onItemPress=(item)=>{
        this.dispatch(AppActions.getNewsByTag,item);
    }
    render() {
        return (
            <View
                style = {styles.wrapper}>
                <Header 
                    onItemPress={this._onItemPress}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper:{
        paddingTop:Platform.OS==='ios'?20:0,
        backgroundColor:'#fff'
    }
})
export default Main;