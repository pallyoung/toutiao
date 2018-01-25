'use strict'
import {Theme} from 'react-native-improver';
import BaseTheme from './views/themes/BaseTheme';
import {NativeManager} from './native';
import BuildConfig from './BuildConfig';
import {
    setStorageTool,
    injectProvider,
    createActions
} from './Library';
import actions from './actions';
import IndexStore from './stores';
import Storage from 'react-native-storage-tool'
const STORE_PREFIX = 'MLUX_STORAGE_';

//设置主题
Theme.setTheme(BaseTheme);

function run(){
    return fetch(BuildConfig.url).then(function(){
        createActions(actions);
        setStorageTool({
            setter(key, value) {
                return Storage.setItem(STORE_PREFIX + key, value);
            },
            getter(key) {
                return Storage.getItem(STORE_PREFIX + key);
            }
        });
        injectProvider(IndexStore);

    })
}

export default {run};


