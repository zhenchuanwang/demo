/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import Vue from 'vue';
import Vuex from 'vuex';
import { VUEX_DEFAULT_CONFIG } from '@/config';

import global from './global';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
    ...VUEX_DEFAULT_CONFIG,
    modules: {
        global,
        user,
    },
});
