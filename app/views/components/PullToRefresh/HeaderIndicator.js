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
class HeaderIndicator extends Indicator{
    constructor(...props){
        super(...props);
    }
}
export default HeaderIndicator;