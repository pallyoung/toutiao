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
    ScrollView,
    WebView
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import { Theme } from 'react-native-improver';
import AppActions from './../../../constants/AppActions'
import Title from './Title';
import HtmlView from './HtmlView';

function wrapHtml(html) {
    return (
        `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                <title>Document</title>
            </head>
            <body>
                ${html}
                <script>
                   
                    window.onload = function(){
                        var height = document.body.offsetHeight;
                        setTimeout(function(){
                            try{
                                window.postMessage(height+'');
                            }catch(e){
                                alert(e.message)
                            }
                            },100)
                    }
                    
                </script>
            </body>
        </html>`
    )
}
class Article extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.state = {

        }
    }
    componentDidMount() {
        super.componentDidMount();
        var id = '6504120022338634254';
        try {
            id = this.getScreen().getNavigation().state.params.id;
        } catch (e) {

        }
        this.dispatch(AppActions.getArticle, { id })
    }
    render() {
        var { data } = this.state;
        if (!data) {
            return null;
        }
        return (
            <ScrollView
                style={styles.wrapper}>
                <Title
                    title={data.title} />
                <HtmlView 
                    html={data.content}/>

                {/* <WebView
                    bounces={false}
                    onMessage={({nativeEvent:{data}})=>this.setState({webViewHeight:parseFloat(data)})}
                    style={{
                        height:this.state.webViewHeight
                    }}
                    source={{ html:wrapHtml(data.content) }} /> */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        paddingHorizontal: 14,
    }
})
export default Article;