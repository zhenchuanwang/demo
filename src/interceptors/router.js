/**
 * Created by henian.xu on 2018/7/14.
 *
 */

import Store from '@/store';

/**
 * 应用级的数据初始化 (在页面渲染之前)
 */

import GlobalVar from 'globalVar';

function initAppData() {
    return new Promise((resolve, reject) => {
        if (GlobalVar.isInitAppDataEnd) {
            resolve();
            return;
        }
        Promise.all([
            Store.dispatch('global/menu/getMenuData'),
            Store.dispatch('global/power/getMenuResource'),
            // Store.dispatch('global/app/getAppList'),
        ])
            .then(() => {
                GlobalVar.isInitAppDataEnd = true;
                resolve();
            })
            .catch(error => {
                const { response } = error;
                if (typeof response === 'object') {
                    const { status } = response;
                    if (status === 401) {
                        /*const err = {
                            to: '/login',
                            Original: error,
                        };*/
                        reject(error);
                        return;
                    }
                }
                // GlobalVar.isInitAppDataEnd = true;
                const err = {
                    to: '/error/500',
                    query: {
                        message: '应用级数据初始化失败',
                    },
                };
                reject(err);
            });
    });
}

/**
 * 路由前拦截
 * @param to
 * @param from
 * @param next
 */
export function routerBeforeEach(to, from, next) {
    // 这里可以做页面拦截，很多后台系统中也非常喜欢在这里面做权限处理
    if (to.path === '/login') {
        next();
        return;
    }
    initAppData()
        .then(() => {
            next();
        })
        .catch(error => {
            if (error.to) {
                const toData = {
                    path: error.to,
                    query: error.query,
                };
                next(toData);
                return;
            }
            next();
        });
}

/**
 * 路由后拦截
 * @param to
 * @param from
 */
export function routerAfterEach(/*to, from*/) {}
