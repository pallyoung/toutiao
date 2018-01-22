'use strict'
import React from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import ChannelsContainer from './ChannelsContainer';
import AppActions from './../../../constants/AppActions';
class ChannelsManager extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '频道管理'
        }
        this.state = {

        }
    }
    componentDidMount() {
        super.componentDidMount();
        this.dispatch(AppActions.getTagsClassify);
    }
    _removeTag=(tag)=>{
        this.dispatch(AppActions.removeTag,tag)
    }
    _addTag=(tag)=>{
        this.dispatch(AppActions.addTag,tag)
    }
    render() {
        return (
            <View
                style={styles.wrapper}>
                <ChannelsContainer
                    onItemPress={this._removeTag}
                    tags={this.state.added}
                    title='点击删除以下频道'>
                </ChannelsContainer>
                <ChannelsContainer
                    onItemPress={this._addTag}
                    tags={this.state.rest}
                    title='点击添加以下频道'>
                </ChannelsContainer>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:'#f5f5f5',
        flex:1
    }
})
export default ChannelsManager;