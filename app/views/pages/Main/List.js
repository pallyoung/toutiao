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
import List from './../../components/List';
import NewsItem from './../../components/NewsItem'
import AppActions from './../../../constants/AppActions'
class List2 extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.state = {
            news: [],
            min_behot_time: undefined,
            max_behot_time: undefined
        }
    }
    onData(data) {
        if (data.key === AppActions.getNewsByTag && data.target === this) {
            var {
                news,
                min_behot_time,
                max_behot_time,
            } = this.state.news;
            var news2 = data.state.news;
            if (min_behot_time && news2[0].min_behot_time < min_behot_time) {
                news = news2.concat(news);
            } else {
                news = news.concat(news2);
            }
            let len = news.length;
            min_behot_time = news[0].min_behot_time;
            max_behot_time = news[len-1].max_behot_time;
            this.setState({
                news,
                min_behot_time,
                max_behot_time
            })
            return true;
        }
    }
    _fetchData(isLatest) {
        var tag = this.props.tag;
        var payload = {
            tk: tag
        };
        if (isLatest) {
            payload.min_behot_time = this.state.min_behot_time;
        } else {
            payload.max_behot_time = this.state.max_behot_time;
        }
        this.dispatch(AppActions.getNewsByTag, )
    }
    _fetchMore() {
        this._fetchData();
    }
    _fetchLatest() {
        this._fetchData(true);
    }
    _renderItem = ({ item }) => {
        return (
            <NewsItem
                {...item} />
        );
    }
    render() {
        return (
            <List
                data={this.state.news}
                renderItem={this._renderItem} />
        );
    }
}

export default List2;