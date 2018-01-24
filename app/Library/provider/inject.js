'use strict'

import util from './../util';
import ProviderContainer from './ProviderContainer';
import ProviderCreator from './ProviderCreator';


var {
    isArray
} = util;

function inject(configs) {
    if (isArray(configs)) {
        configs.forEach(function (config) {
            return inject(config);
        });
    } else {
        var name = config.name;
        var value = config.defaultValue;
        var provider = ProviderCreator.createProvider(config);
        ProviderContainer.setProvider(name, provider);
    }
}

export default inject;