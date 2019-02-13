/* global require, module */

const _ = require('lodash');
const webpackConfig = require('./base.webpack.config');
const config = require('./webpack.common.js');

webpackConfig.devServer = {
    contentBase: config.paths.public,
    hot: true,
    port: 8002,
    disableHostCheck: true,
    historyApiFallback: true,
    // when run in a container, file events may not work properly
    // For this polling is enabled
    watchOptions: {
        poll: 1000
    }
};

module.exports = _.merge({},
    webpackConfig,
    require('./dev.webpack.plugins.js')
);
