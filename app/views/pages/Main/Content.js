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
        this.state = {

        }
    }

    _renderPager(tags) {
        if (tags) {
            return tags.map((tag, index) => {
                return (
                    <List
                        selected={index == 0}
                        ref={tag.tk}
                        key={tag.tk}
                        tk={tag.tk} />
                );
            })
        } else {
            return null;
        }
    }
    _onPageSelected = ({ nativeEvent: { position } }) => {
        var { tags } = this.props;
        var tag = tags[position];
        if (this.state.index && this.state.index !== position) {
            return;
        } else if (this.state.index && this.state.index === position) {
            this.state.index = undefined;
            return;
        }
        this.props.onPageSelected && this.props.onPageSelected(position);
        this.refs[tag.tk] && this.refs[tag.tk].init();
    }
    setPage(index) {
        var { tags } = this.props;
        var tag = tags[index];
        this.state.index = index;
        this.refs['ViewPagerRef'] && this.refs['ViewPagerRef'].setPage(index);
        this.refs[tag.tk] && this.refs[tag.tk].init();
    }
    componentDidMount() {
        super.componentDidMount();
    }
    render() {
        var { tags } = this.props;
        return (
            <ViewPager
                ref='ViewPagerRef'
                onPageSelected={this._onPageSelected}
                style={{ flex: 1 }}>
                {this._renderPager(tags)}
            </ViewPager>
        );
    }
}

export default Content;