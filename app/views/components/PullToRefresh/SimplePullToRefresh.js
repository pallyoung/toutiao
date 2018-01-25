'use strict'
import React, { Component } from 'react';
import {
    ListView,
    ScrollView,
    Animated,
    FlatList,
    SectionList,
    SwipeableListView,
    VirtualizedList,
    View,
    StyleSheet
} from 'react-native';

const LIST = 'LIST';
const FOOTER = 'FOOTER';
const HEADER = 'HEADER';
import FooterIndicator from './FooterIndicator';
import HeaderIndicator from './HeaderIndicator';
import Header from './Header';
import AbstractPullToRefresh from './AbstractPullToRefresh';
class SimplePullToRefresh extends Component{
    constructor(...props){
        super(...props);
        this.state = {
            needRefresh:false
        }
    }
    _onPull(layout){

    }
    _onPullRelease(layout){
        if(layout.y>30){
            this.refs.AbstractPullToRefresh.setRefreshing(true);
            this.props.onRefreshing&&this.props.onRefreshing('header');
        }
            
    }
    _onPushRelease(layout){
        if(layout.y>30){
            this.refs.AbstractPullToRefresh.setRefreshing(true);
            this.props.onRefreshing&&this.props.onRefreshing('footer');
        }
            
    }
    refreshEnd(){
        this.refs.AbstractPullToRefresh.setRefreshing(false);
    }
    render(){
        return <AbstractPullToRefresh
                ref = {'AbstractPullToRefresh'}
                {...this.props}
                headerComponent = {<Header ref = 'header'/>}
                headerHeight = {this.props.pullEnable&&100||0}
                onPull = {(layout)=>this._onPull(layout)}
                onPullRelease = {(layout)=>{this._onPullRelease(layout)}}
                onPushRelease = {(layout)=>{this._onPushRelease(layout)}}
                footerComponent = {<Header ref = 'header'/>}
                footerHeight = {this.props.pushEnable&&100||0}
                />    
    }
}
SimplePullToRefresh.defaultProps = {
    pushEnable:true,
    pullEnable:true
}
export default SimplePullToRefresh;