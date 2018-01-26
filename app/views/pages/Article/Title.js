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

import { Theme } from 'react-native-improver';

function Title(props){
    return (
        <View
            >
            <Text>{props.title}</Text>
        </View>
    );
}

export default Title;