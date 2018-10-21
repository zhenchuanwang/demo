/**
 * Created by henian.xu on 2018/7/13.
 *
 */

import { Local } from '@/store/storage';
export const NODE_ENV = process.env.NODE_ENV || 'production';

// 模块命名空间
export const MODULE_NAMESPACE = '';

// 路由默认配置，路由表并不从此注入
export const ROUTER_DEFAULT_CONFIG = {
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
};

export const VUEX_DEFAULT_CONFIG = {};

// 是否强制所有请求访问本地 MOCK，每个请求也可以单独控制是否请求 MOCK
export const AJAX_LOCALLY_ENABLE = false;

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
    timeout: 20000,
    maxContentLength: 2000,
    headers: {
        // ...GlobalVar.reqHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
        token: (Local.get('userData') || {}).token,
    },
};
