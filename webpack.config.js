/**
 * Created by henian.xu on 2018/8/30.
 *
 */
'use strict';
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir);
}
module.exports = {
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    },
    externals: {
        globalVar: 'window.globalVar',
    },
};
