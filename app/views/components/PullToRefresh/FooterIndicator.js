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

import Indicator from './Indicator';
class FooterIndicator extends Indicator{
    constructor(...props){
        super(...props);
    }
}
FooterIndicator.defaultProps = {

}
export default FooterIndicator;