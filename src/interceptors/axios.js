/**
 * Created by henian.xu on 2018/7/14.
 * axios 拦截
 */

import { MessageBox, Message } from 'element-ui';
import Router from '@/router';
import GlobalVar from 'globalVar';

const requestMap = {}; // 当前请求映射表
let hasMessage401 = false;

/**
 * 重复请求处理器
 * @param request
 */
function repeatRequestHandler(request) {
    if (request._isRepeat) return;
    const { url, _isCancelBefore: isCancelBefore } = request;
    const cancel = requestMap[url];
    if (cancel) {
        if (isCancelBefore) {
            cancel({
                msg: '因重复而取消1',
                url,
                isCancelBefore,
            });
            requestMap[url] = request._cancel;
        } else {
            request._cancel({
                msg: '因重复而取消2',
                url,
                isCancelBefore,
            });
        }
    } else {
        // 新的请求
        requestMap[url] = request._cancel;
    }
}

/**
 * 响应完成 处理重复请求映射表
 * @param response
 */
function repeatRequestFinish(response) {
    const { config } = response;
    if (config && config.url) {
        delete requestMap[config.url];
    }
}

function httpStatusCodeHandler(error) {
    const { response } = error;
    if (typeof response !== 'object') return;
    const { status, data } = response;
    switch (status) {
        case 401:
            if (hasMessage401) {
                break;
            }
            if (GlobalVar.isInitAppDataEnd) {
                hasMessage401 = true;
                MessageBox.alert(data.msg, '温馨提示', {
                    type: 'error',
                }).then(() => {
                    hasMessage401 = false;
                    Router.push({
                        path: '/login',
                        query: {
                            backUrl: encodeURIComponent(Router.currentRoute.fullPath || ''),
                        },
                    });
                });
            } else {
                Router.push({
                    path: '/login',
                    query: {
                        backUrl: encodeURIComponent(Router.currentRoute.fullPath || ''),
                    },
                });
            }
            break;
    }
}

/**
 * 请求成功拦截
 * @param request
 * @returns {*}
 */
export function requestSuccess(request) {
    // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
    // ...
    repeatRequestHandler(request);
    return request;
}

/**
 * 请求失败拦截
 * @param error
 * @returns {Promise<never>}
 */
export function requestFail(error) {
    // 自定义发送请求失败逻辑，断网，请求发送监控等
    // ...
    return Promise.reject(error);
}

/**
 * 响应成功拦截
 * @param response
 * @returns {Promise<any>}
 */
export function responseSuccess(response) {
    repeatRequestFinish(response);
    const { config, data: result } = response;
    // 接口错误提示信息全局统一拦截提示
    if (!result.success) {
        if (config._isHandleError) return Promise.resolve(response);
        MessageBox.alert(result.msg, '温馨提示', {
            type: 'error',
            // callback(action) {},
        });
        return Promise.reject(response);
    } else {
        if (config._isSuccessTip) {
            Message({
                message: result.msg,
                type: 'success',
            });
        }
        return Promise.resolve(response);
    }
}

/**
 * 响应失败拦截
 * @param error
 * @returns {Promise<never>}
 */
export function responseFail(error) {
    repeatRequestFinish(error);
    httpStatusCodeHandler(error);
    return Promise.reject(error);
}
