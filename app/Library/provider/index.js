'use strict'
import Provider from './Provider';
import provide from './provide';
import persist from './persist';
import ProviderCreator from './ProviderCreator';
import ProviderContainer from './ProviderContainer';
import RemoteProvider from './RemoteProvider';
import SessionProvider from './SessionProvider';
import StorageProvider from './StorageProvider';


import inject from './inject';



var use = ProviderCreator.use;

use('stroage',StorageProvider);
use('remote',RemoteProvider);
use('session',SessionProvider);

export default {
    Provider,
    provide,
    inject,
    use,
    persist,
    setStorageTool:StorageProvider.setStorageTool
};