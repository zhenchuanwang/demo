/**
 * Created by henian.xu on 2018/7/23.
 *
 */

import { Rs } from '@/api';

export default {
    namespaced: true,
    modules: {},
    state: {
        data: null,
    },
    getters: {
        appList(state) {
            return state.data;
        },
    },
    mutations: {
        _setData(state, data) {
            state.data = data;
        },
    },
    actions: {
        getAppList({ state, commit }) {
            if (state.data === null) {
                return Rs.App.selectByUser().then(json => {
                    const res = json.data;
                    commit('_setData', res.data);
                    return Promise.resolve();
                });
            }
        },
    },
};
