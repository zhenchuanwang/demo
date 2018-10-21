/**
 * Created by henian.xu on 2018/7/17.
 *
 */

import Axios from 'axios';
import GlobalVar from 'globalVar';
import Config from './config';
import { requestSuccess, requestFail, responseSuccess, responseFail } from '@/interceptors/axios';
import { AJAX_LOCALLY_ENABLE } from '@/config';

// 全局 axios 实例
const axiosInstance = Axios.create(Config);

// 请求拦截
axiosInstance.interceptors.request.use(requestSuccess, requestFail);

// 响应拦截
axiosInstance.interceptors.response.use(responseSuccess, responseFail);

// 运用mock
let axiosInstanceMock = null;
let globalMock = false;
if (GlobalVar.isDev) {
    // TODO 有空了解一下用 process.env.NODE_ENV 来判断是否可以减少多余的包
    globalMock = AJAX_LOCALLY_ENABLE;
    axiosInstanceMock = Axios.create(Config);
    axiosInstanceMock.interceptors.request.use(requestSuccess, requestFail);
    axiosInstanceMock.interceptors.response.use(responseSuccess, responseFail);
    const { install } = require('@/mock').default;
    install(axiosInstanceMock);
}

class HttpBase {
    constructor() {
        this.baseUrl = '';
        this.axios = axiosInstance;
    }

    /**
     * 创建取消令牌
     */
    createCancelToken() {
        const cancelToken = Axios.CancelToken;
        return cancelToken.source();
    }

    /**
     * get 请求
     * @param url
     * @param params
     * @param cfg
     * @returns {AxiosPromise<any>}
     */
    get(url, params = {}, cfg = {}) {
        const cancelSource = params._cancelSource || this.createCancelToken();
        cfg = {
            ...cfg,
            _cancel: cancelSource.cancel,
            // 默认:false; 不可重复发送请求
            _isRepeat: params._isRepeat,
            // 默认:true; 当不可重复请求时,_isCancelBefore: true:取消之前的请求; false:取消之后的请求
            _isCancelBefore: params._isCancelBefore === undefined ? true : params._isCancelBefore,
            // 默认:false; 是否自已处理错误请求，false 框架统一处理,true:框架不做任何处理
            _isHandleError: params._isHandleError,
            // 默认:false; 是否自己处理成功提示, true:框架会弹出成功 message 依然会 resolve,false:框架不做任何处理
            _isSuccessTip: params._isSuccessTip,
        };
        delete params._isRepeat;
        delete params._isCancelBefore;
        delete params._isHandleError;
        delete params._isHandleSuccess;
        params = {
            ...params,
            _T: new Date().getTime(),
        };
        const Http = globalMock || (params._isMock && axiosInstanceMock) ? axiosInstanceMock : this.axios;
        return Http.get(`${this.baseUrl}${url}`, {
            ...cfg,
            params,
            cancelToken: cancelSource.token,
        });
    }

    /**
     * post 请求
     * @param url
     * @param params
     * @param cfg
     * @returns {AxiosPromise<any>}
     */
    post(url, params = {}, cfg = {}) {
        const cancelSource = params._cancelSource || this.createCancelToken();
        cfg = {
            ...cfg,
            _cancel: cancelSource.cancel,
            cancelToken: cancelSource.token,
            // 默认:false; 不可重复发送请求
            _isRepeat: params._isRepeat,
            // 默认:false(post的默认值与get的相反); 当不可重复请求时,_isCancelBefore: true:取消之前的请求; false:取消之后的请求
            _isCancelBefore: params._isCancelBefore,
            // 默认:false; 是否自已处理错误请求, false:框架统一处理,true:框架不做任何处理
            _isHandleError: params._isHandleError,
            // 默认:false; 是否自己处理成功提示, true:框架会弹出成功 message 依然会 resolve,false:框架不做任何处理
            _isSuccessTip: params._isSuccessTip,
        };
        delete params._isRepeat;
        delete params._isCancelBefore;
        delete params._isHandleError;
        delete params._isHandleSuccess;
        const Http = globalMock || (params._isMock && axiosInstanceMock) ? axiosInstanceMock : this.axios;
        return Http.post(`${this.baseUrl}${url}`, params, cfg);
    }

    /**
     * post 请求
     * @param url
     * @param params
     * @returns {AxiosPromise<any>}
     */
    postJson(url, params = {}) {
        return this.post(url, params, {
            ...Config,
            headers: { 'Content-Type': 'application/json' },
            paramsSerializer: () => {},
            transformRequest: [data => JSON.stringify(data)],
        });
    }
}

export default HttpBase;
const HttpInstance = new HttpBase();
export { HttpBase, HttpInstance, axiosInstance };
