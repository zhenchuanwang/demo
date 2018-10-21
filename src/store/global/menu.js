/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { Rs } from '@/api';

function recursiveMenu(arr, key = 'id', res = {}) {
    arr.forEach(item => {
        const nextKey = item[key];
        if (nextKey) {
            res[nextKey] = item;
        }
        if (Array.isArray(item.children)) {
            recursiveMenu(item.children, key, res);
        }
    });
    return res;
}

export default {
    namespaced: true,
    modules: {},
    state: {
        data: null,
        headerIndex: '',
        asideIndex: '',
    },
    getters: {
        menuData(state) {
            return state.data || [];
        },
        menuIdMap(state) {
            if (!Array.isArray(state.data)) return {};
            return recursiveMenu(state.data);
        },
        menuUrlMap(state) {
            if (!Array.isArray(state.data)) return {};
            return recursiveMenu(state.data, 'url');
        },
        asideData(state, getters) {
            const menu = getters.menuIdMap[state.headerIndex] || {};
            return menu.children || [];
        },
    },
    mutations: {
        _setData(state, data) {
            state.data = data;
        },
        setHeaderIndex(state, val) {
            state.headerIndex = val;
        },
        setAsideIndex(state, val) {
            state.asideIndex = val;
        },
        clearData(state) {
            state.data = null;
        },
    },
    actions: {
        getMenuData({ commit, state }) {
            if (state.data === null) {
                return Rs.User.menu().then(json => {
                    commit('_setData', json.data.data);
                });
            }
        },
    },
};
