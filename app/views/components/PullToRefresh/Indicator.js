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

class Indicator extends Component {
    constructor(...props) {
        super(...props);
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
    }
    _onLayout(e) {
        var { height, width } = e.nativeEvent.layout;
        this.height = height;
        this.width = width;
        this.props.onLayout && this.props.onLayout(e);
    }
    _renderChildren(){
        
        return this.props.render&&this.props.render(layout);
    }
    onPull(y){
        
        this.y = Math.abs(y);
        var layout = {
            height:this.height,
            width:this.width,
            x:0,
            y:this.y
        }
        this.props.onPull&&this.props.onPull(layout);
    }
    onRelease(y){
        this.y = Math.abs(y);
        var layout = {
            height:this.height,
            width:this.width,
            x:0,
            y:this.y
        }
        this.props.onRelease&&this.props.onRelease(layout);
    }
    render() {
        return <View
                style = {[styles.wrapper,this.props.style]}
                onLayout={(e) => this._onLayout(e)}>
                {this.props.children}
            </View>
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'column',
        // position:'absolute',
        // left:0,
        // right:0,
    }
});

export default Indicator;