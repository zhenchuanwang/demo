var webpackConfig = require('./webpack.config');

function buildProxy(target) {
    const res = {};
    const modules = [
        'rs', // 系统资源
        'mp', // 微信管理
        'md', // 代码生成器
        'sp', // 店铺
        'gd', // 商品
        'pm', // 活动
        'ex', // 订单
        'mb', // 会员
        'pt', // CMS
        'ms', // 平台设置
        'stat', // 统计报表
    ];

    // target: 'http://test.admin.hhmce.com',
    modules.forEach(item => {
        res[`/${item}`] = {
            target: target,
            changeOrigin: true,
            pathRewrite: {
                [`^/${item}`]: item,
            },
        };
    });
    return res;
}

module.exports = {
    pwa: {
        themeColor: '#F5A623',
    },

    lintOnSave: undefined,

    devServer: {
        port: 8080,
        proxy: buildProxy('http://192.168.1.152:7800'),
        // proxy: buildProxy('http://test.admin.hhmce.com'),
    },
    css: {
        sourceMap: true,
        loaderOptions: {
            sass: {
                data: `@import "common-platform-frame/assets/style/_index.scss";`,
            },
        },
    },

    transpileDependencies: [/\bvue-echarts\b/, /\bresize-detector\b/],

    configureWebpack: webpackConfig,

    // baseUrl: '/vue-cli3/',
    assetsDir: 'static',
};
