// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import PlatFormFrame from 'common-platform-frame';
import * as config from '@/config';
import GlobalVar from 'globalVar';

import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';

import inject from '@/inject';

Vue.config.productionTip = false;

Vue.use(inject);
Vue.use(PlatFormFrame, {
    router,
    store,
    globalVar: GlobalVar,
    config,
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
}).$mount('#app');
