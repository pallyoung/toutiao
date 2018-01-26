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
                        ref={tag.tk}
                        key={tag.tk}
                        tk={tag.tk}/>
                );
            })
        } else {
            return null;
        }
    }
    _onPageSelected=(index)=>{
        var { tags } = this.props;
        var tag = tags[index];
        this.props.onPageSelected&&this.props.onPageSelected(index);
        //this.refs[tag.tk]&&this.refs[tag.tk].fetchLatest();
    }
    setPage(index){
        this.refs['ViewPagerRef']&&this.refs['ViewPagerRef'].setPage(index);
    }
    render() {
        var { tags } = this.props;
        return (
            <ViewPager
                ref='ViewPagerRef'
                onPageSelected={this._onPageSelected}
                style = {{flex:1}}>
                {this._renderPager(tags)}
            </ViewPager>
        );
    }
}

export default Content;