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
    StyleSheet,
    ScrollView
} from 'react-native';

import { Theme, autoSize } from 'react-native-improver';
import NewsItem from './../../components/NewsItem';

function Recommend(props) {
    var data = props.data||[];
    return (
        <View>
            <View
                style={styles.row}>
                <View
                    style={styles.mark} />
                <Text
                    style={styles.title}>
                    {props.title}
                </Text>
            </View>
            <View
                style={styles.listView}>
                {data.map(function(item){
                    return (
                        <NewsItem 
                            key={item.title}/>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingTop: 14,
        paddingBottom: 8
    },
    mark: {
        backgroundColor: '#f85959',
        height: 18,
        width: 4,
        marginRight: 10
    },
    listView:{
        paddingHorizontal:14
    }

})
export default Recommend;