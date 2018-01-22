'use strict'
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
import AppActions from './../../../constants/AppActions'
var currentTheme = Theme.getTheme();
const shadow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABXCAQAAACjUt0DAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAABIAAABXAK421QoAAAFiSURBVEjH1ZbbtoMgDERnKP//yaYPVSAhF077dHQtamU7k0RKAxwcPCF4ItF+tWMNsVZS91uJhNlRX7FGPMgizOrEObJSiZUUAnRkR6q0qnErm7Lhc9UDBaXUt0kN0FOaOo4SQ5BRCahOA3HT5KwTE50GZhV37VazJKYljjE2SE+sPsittC1XW/FmgNVsZJcvuhvrAbLqffNadPXLYgaLzs8wWSo6rk9FYdeBUW/x1DRswfS6ysuNlcDZ7ssTSCpIfDsZn/J8b+Omh8pjR/X8DkuWndwnINpOlukFbtvzVslAEmF+TCMaCC4fkr8oKUgVzmQ4IBojHfqFqwd28O0S6AXA7ib2P+HOTlzLcXZ3+tFz6yRObiOmGY+3k6ev5XN97Uq7FoCXkl5HTrT6tQiw2u1aY/TrZF551jyMFPZiOqW1O5zXiJx1PV/2Tw52tD8ddYc/9Zlq7qhBrlrtuhX/98cbycGBFpNaiv0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDItMjdUMTc6NDQ6NDErMDg6MDDFbrv7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTAyLTI3VDE3OjQ0OjQxKzA4OjAwtDMDRwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII='
class Header extends ScreenComponent {
    constructor(...props) {
        super(...props)
        this.state = {
            index: 0,
            tags: []
        }
    }
    componentDidMount() {
        super.componentDidMount();
        this.dispatch(AppActions.getTags)
    }
    onData(data){
        if(data.key===AppActions.addTag||data.key===AppActions.removeTag){
            this.dispatch(AppActions.getTags)
            return true;
        }
    }
    _onItemPress(item,index){
        this.setState({index});
        this.props.onItemPress&&this.props.onItemPress(item);
    }
    _renderItem() {
        var { tags, index } = this.state;
        return tags.map((item, i) => {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>{
                        this._onItemPress(item,i)
                    }}
                    key={item.name}
                    style={[styles.item]}>
                    <Text
                        style={[styles.itemText, i === index ? styles.currentItem : null]}
                        >
                        {item.name}
                    </Text>
                </TouchableOpacity>

            );
        })
    }
    _goChannelsManager=()=>{
        this.getScreen().getNavigation().navigate('ChannelsManager');
    }
    render() {
        return (
            <View
                style={styles.wrapper}>
                <ScrollView
                    showsHorizontalScrollIndicator ={false}
                    horizontal={true}
                    bounces={false}
                    style={styles.scroll}>
                    {this._renderItem()}
                </ScrollView>
                <Image
                    resizeMode='stretch'
                    source={{uri:(shadow)}}
                    style = {styles.listShadow}/>
                <TouchableOpacity
                    onPress = {this._goChannelsManager}
                    style = {styles.plus}
                    activeOpacity = {1}>
                    <Text
                        style = {styles.plusText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: autoSize(36),
        backgroundColor: '#f4f5f6',
        flexDirection:'row'
    },
    scroll: {
        flex: 1,
    },
    item: {
        justifyContent:'center',
        paddingHorizontal:10
    },
    itemText: {
        fontSize: autoSize(17),
        color:'#505050'
    },
    currentItem:{
        color:'#f85959'
    },
    listShadow:{
        backgroundColor:'rgba(244, 245, 246, 0.3)',
        position: 'absolute',
        right:autoSize(40),
        height:autoSize(36),
        width:10
    },
    plus:{
        width:autoSize(40),
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    plusText:{
        color:'#f85959',
        fontSize:30,
        fontWeight:'300'
    }
})

export default Header;