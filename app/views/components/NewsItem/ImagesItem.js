'use strict'
import React, { Component } from 'react';

import { View } from 'react-native';

import Title from './Title';

function ImagesItem(props) {
    var {
        title
    } = props;
    return (
        <View>
            <Title title={title} />
        </View>
    );
}

export default ImagesItem;