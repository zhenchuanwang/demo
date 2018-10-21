/**
 * Created by henian.xu on 2018/7/19.
 *
 */
import { Local } from '@/store/storage';
import { axiosInstance } from '@/api/base/HttpBase';

export default {
    namespaced: true,
    modules: {},
    state: {
        userData: Local.get('userData') || {
            token: '',
            user: {
                id: 0,
                account: '',
                fullName: '',
                appId: '',
                shop: {},
            },
        },
    },
    getters: {
        account(state) {
            return state.userData.user.account;
        },
        fullName(state) {
            return state.userData.user.fullName;
        },
        token(state) {
            return state.userData.token;
        },
    },
    mutations: {
        updateUserData(state, data) {
            state.userData = data;
            axiosInstance.defaults.headers['token'] = data.token;
            Local.set('userData', data);
            // console.log({ ...axiosInstance.defaults.headers });
        },
    },
    actions: {},
};
