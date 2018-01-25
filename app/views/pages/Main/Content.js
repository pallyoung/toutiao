'use strict'
import React from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import { Theme, autoSize } from 'react-native-improver';
import { ViewPager } from 'react-native-awesome-viewpager';
import List from './List';
var currentTheme = Theme.getTheme();

class Content extends ScreenComponent {
    constructor(...props) {
        super(...props);
    }
    _renderPager(tags) {
        if (tags) {
            return tags.map((tag) => {
                return (
                    <List 
                        key={tag.name}
                        name={tag.name}
                        tk={tag.tk}/>
                );
            })
        } else {
            return null;
        }
    }
    render() {
        var { tags } = this.props;
        return (
            <ViewPager
                style = {{flex:1}}>
                {this._renderPager(tags)}
            </ViewPager>
        );
    }
}

export default Content;