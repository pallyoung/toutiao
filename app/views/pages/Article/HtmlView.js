'use strict'
import React from 'react';

import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import {autoSize} from 'react-native-improver';
var i = 0;
var text = ++i,
    tag_start = ++i,
    watch_tag_name = ++i,
    watch_attr_name_start = ++i,
    watch_attr_name = ++i,
    watch_attr_end = ++i,
    watch_attr_value_start = ++i,
    watch_attr_value = ++i,
    watch_tag_close = ++i,
    tag_close = ++i;

var singleTag = [
    'img',
    'br',
    'hr'
];
function Node(name) {
    return {
        type: 'node',
        name: name || '',
        children: [],
        attr: {},
        closed: false,
        parent: null
    }
}
function parseHtml(html) {
    var len = html.length;
    var i = 0;
    var c;
    var root = Node();
    var context = root;
    var status = text;
    var data = [];
    var temp;
    while (i < len) {
        c = html[i];
        switch (status) {
            case text:
                if (c === '<') {
                    if (data.length !== 0) {
                        context.children.push({
                            type: 'text',
                            child: data.join('')
                        })
                    }
                    data = [];
                    if (html[i + 1] === '/') {
                        i++;
                        status = tag_close;
                    } else {
                        status = tag_start;
                        temp = Node()
                        temp.parent = context;
                        context.children.push(temp);
                        context = temp;
                    }
                    i++;
                    break;
                } else {
                    data.push(c);
                    i++;
                    break;
                }
            case tag_start:
                if (c === ' ') {
                    status = watch_attr_name_start;
                    context.name = data.join('');
                    data = [];
                } else if (c === '>') {
                    context.name = data.join('')
                    data = [];
                    if (singleTag.indexOf(context.name) !== -1) {
                        context.closed = true;
                        context = context.parent;
                    }
                    status = text;
                } else {
                    data.push(c);
                }
                i++;
                break;
            case tag_close:
                temp = context.name;
                c = html.slice(i, i + temp.length);
                if (c === temp && html[i + temp.length] === '>') {
                    context.closed = true;
                    context = context.parent;
                    i = i + temp.length + 1;
                    status = text;
                } else {
                    throw new Error(c + ':' + temp);
                }
                break;
            case watch_attr_name_start:
                if (c !== ' ') {
                    status = watch_attr_name;
                } else {
                    i++;
                }
                break;
            case watch_attr_name:
                if (c === '=') {
                    temp = data.join('');
                    status = watch_attr_value_start;
                    context.attr[temp] = '';
                    data = [];
                } else if (c === ' ') {
                    temp = data.join('');
                    status = watch_attr_end;
                    context.attr[temp] = '';
                    data = [];
                } else {
                    data.push(c);
                }
                i++;
                break;
            case watch_attr_value_start:
                if (/[\'\"]/.test(c)) {
                    status = watch_attr_value;
                    i++;
                    break;
                } else if (c !== ' ') {
                    status = watch_attr_value;
                    break;
                } else {
                    i++;
                    break;
                }
            case watch_attr_value:
                if (/[\'\"]/.test(c)) {
                    context.attr[temp] = data.join('');
                    data = [];
                    i++;
                    status = watch_attr_end;
                    break;
                } else if (c === ' ') {
                    context.attr[temp] = data.join('');
                    data = [];
                    i++;
                    status = watch_attr_end;
                    break;
                } else {
                    data.push(c);
                    i++;
                    break;
                }
            case watch_attr_end:
                if (c === '/' && html[i + 1] === '>') {
                    context.attr[temp] = true;
                    i++;
                    context = context.parent;
                    status = text;
                } else if (c === '>') {
                    context.attr[temp] = true;
                    if (singleTag.indexOf(context.name) !== -1) {
                        context = context.parent;
                    }
                    status = text;
                } else if (c === '=') {
                    status = watch_attr_value_start;
                } else if (c !== ' ') {
                    status = watch_attr_name;
                    data.push(c);
                }
                i++;
                break;
            default:
                i++;
                break;
        }

    }
    return root;
}

var id = 1;
function parseNode(node) {
    var element;
    if (node.type === 'text') {
        return <Text 
                style={{color:'#000',fontSize:autoSize(17),lineHeight:27}}
                key={++id}>{node.child}</Text>;
    }
    switch (node.name) {
        case 'div':
            element = <View
                key={++id}
                children={node.children.map(parseNode)} />
            break;
        case 'p':
            element = <View
                key={++id}
                style={{marginTop:8}}
                children={node.children.map(parseNode)} />
            break;
        case 'img':
            element = <Image2
                key={++id}
                {...node.attr} />
            break;
        case 'span':
            element = <Text
                key={++id}
                children={node.children.map(parseNode)} />
            break;
        default:
            if (node.children[0]) {
                return parseNode(node.children[0])
            } else {
                return null;
            }
    }
    return element;

}
function Image2(props) {
    var width = autoSize(347);
    var height = width/props.img_width*props.img_height;
    return (
        <Image
            source={{ uri: props.src }}
            style={{width,height,marginVertical:4}}
        />
    );
}
function parseTree(tree) {
}
function HtmlView(props) {
    var { html } = props;
    if (!html) {
        return null;
    }
    var tree = parseHtml(html);
    return (
        <View>
            {parseNode(tree)}
        </View>
    );

}
HtmlView.parseHtml = parseHtml;
export default HtmlView;