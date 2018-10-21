/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import menu from './menu';
import power from './power';
import app from './app';

export default {
    namespaced: true,
    modules: {
        menu,
        power,
        app,
    },
    state: {
        status: {},
    },
    getters: {},
    mutations: {},
    actions: {},
};
