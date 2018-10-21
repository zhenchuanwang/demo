/**
 * Created by henian.xu on 2018/8/29.
 * 权限
 */

import { Rs } from '@/api';

export default {
    namespaced: true,
    modules: {},
    state: {
        dataList: null,
    },
    getters: {
        dataMapOld(state) {
            const power = {};
            const { dataList } = state;
            if (!dataList) return power;
            dataList.forEach(item => {
                const itemArr = item.split(':');
                let obj = power;
                itemArr.forEach((name, index) => {
                    if (index === itemArr.length - 1) {
                        obj[name] = true;
                    } else {
                        obj = obj[name] = obj[name] || {};
                    }
                });
            });
            return power;
        },
        dataMap(state) {
            const { dataList } = state;
            if (!dataList) return {};
            return dataList.reduce((prev, curr) => {
                prev[curr] = true;
                return prev;
            }, {});
        },
    },
    mutations: {
        setDataList(state, data) {
            state.dataList = data;
        },
        clearData(state) {
            state.dataList = null;
        },
    },
    actions: {
        getMenuResource({ commit, state }) {
            if (state.dataList !== null) return Promise.resolve();
            return Rs.User.menuResource().then(json => {
                const res = json.data;
                commit('setDataList', res.data);
            });
        },
    },
};
