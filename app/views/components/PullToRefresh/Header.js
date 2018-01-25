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
    StyleSheet,
    ActivityIndicator
} from 'react-native';

class Header extends Component {
    constructor(...props){
        super(...props);
        
    }    
    render(){
        return <Animated.View
                style = {{
                    height:100,
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                <ActivityIndicator />
        </Animated.View>
    }
}
export default Header;