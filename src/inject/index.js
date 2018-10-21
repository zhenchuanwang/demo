/**
 * Created by henian.xu on 2018/7/18.
 * 注入 vue 实例
 */

import { HttpInstance } from '@/api/base/HttpBase';
import * as Config from '@/config';
// import GlobalVar from 'globalVar';
import * as Api from '@/api';
// import * as Utils from '@/utils';
// import DefaultImg from '@/assets/images/default.jpg';

export default {
    install(Vue /*, options*/) {
        Vue.prototype.$http = HttpInstance;
        Vue.prototype.$config = Config;
        // Vue.prototype.$globalVar = GlobalVar;
        Vue.prototype.$api = Api;
        // Vue.prototype.$utils = Utils;
        // Vue.prototype.$defaultImg = DefaultImg;
    },
};
