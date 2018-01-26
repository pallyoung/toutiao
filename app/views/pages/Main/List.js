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
    componentDidMount(){
        super.componentDidMount();
        if(this.props.selected){
            this.init();
        }
    }
    onData(data) {
        if (data.key === AppActions.getNewsByTag && data.target === this) {
            var {
                news,
                min_behot_time,
                max_behot_time,
            } = this.state;
            var news2 = data.state.news.data;
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
        var tk = this.props.tk;
        var payload = {
            tk: tk
        };
        if (isLatest) {
            payload.min_behot_time = this.state.min_behot_time;
        } else {
            payload.max_behot_time = this.state.max_behot_time;
        }
        this.dispatch(AppActions.getNewsByTag, payload);
    }
    init(){
        if(this.state.init){
            return;
        }else{
            this.state.init = true;
            this.fetchLatest();
        }

    }
    fetchMore() {
        this._fetchData();
    }
    fetchLatest() {
        this._fetchData(true);
    }
    _renderItem = ({ item }) => {
        return (
            <NewsItem
                {...item} />
        );
    }
    _keyExtractor = (item)=>{
        return item.title;
    }
    render() {
        if(!this.state.init){
            return null;
        }
        return (
            <List
                keyExtractor={this._keyExtractor}
                style={this.props.style}
                data={this.state.news}
                renderItem={this._renderItem} />
        );
    }
}

export default List2;