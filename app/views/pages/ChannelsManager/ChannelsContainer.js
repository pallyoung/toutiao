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
import { Theme, autoSize,px2dp } from 'react-native-improver';

class ChannelsContainer extends ScreenComponent {
    constructor(...props) {
        super(...props)
    }
    _onItemPress=(tag)=>{
        this.props.onItemPress&&this.props.onItemPress(tag);
    }
    _renderTags(tags) {
        if (!tags) {
            return null;
        }
        return tags.map((tag) => {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>this._onItemPress(tag)}
                    style={styles.item}
                    key={tag.name}>
                    <Text>
                        {tag.name}
                    </Text>
                </TouchableOpacity>
            );
        })

    }
    render() {
        var {
            title,
            tags
        } = this.props;
        return (
            <View
                style={styles.wrapper}>
                <Text
                    style={styles.title}>
                    {title}
                </Text>
                <View
                    style={styles.contanier}>
                    {this._renderTags(tags)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
    },
    title: {
        paddingHorizontal:10,
        color: '#666',
        fontSize:12,
        paddingVertical:6
       
    },
    contanier:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        marginVertical:10,
    },
    item:{
        borderWidth:px2dp(1),
        marginHorizontal:8,
        width:(autoSize(375)-16-16*4)/4,
        height:32,
        marginBottom:10,
        borderColor:'#ccc',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    itemText:{
        fontSize:16,
        color:'#131313'
    }
})
export default ChannelsContainer;