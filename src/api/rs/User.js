/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Rs } from './Rs';
import Md5 from 'md5';

class User extends Rs {
    constructor() {
        super();
        this.baseUrl += '/user';
    }

    menu() {
        return super.get('/menu').then(json => {
            return Promise.resolve(json);
        });
    }

    data({ orgId, userName, fullName, userStatus, isShopStoreUser, storeIdNE, currentPage, pageSize } = {}) {
        return super.get('/data', {
            orgId,
            userName,
            fullName,
            userStatus,
            isShopStoreUser,
            storeIdNE,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, departmentId, userName, fullName, userStatus } = {}) {
        return super.post('/save', {
            id,
            departmentId,
            userName,
            fullName,
            userStatus,
        });
    }

    exists({ id, userName, departmentId } = {}) {
        return super.get('/exists', {
            id,
            userName,
            departmentId,
        });
    }

    resetPwd({ id } = {}) {
        return super.post('/resetPwd', {
            id,
        });
    }

    getUserRole({ userId } = {}) {
        return super.get('/getUserRole', {
            userId,
        });
    }

    saveUserRole({ userId, roleIds, userAppStr } = {}) {
        return super.post('/saveUserRole', {
            userId,
            roleIds,
            userAppStr,
        });
    }

    // -- 用户登录放在这个模块下不太合理 -------------------------------
    login({ account, password, _isHandleError }) {
        return super.post('/login', {
            account,
            password: password ? Md5(password) : password,
            _isHandleError,
        });
    }

    logout() {
        return super.post('/logout');
    }

    modifyPwdByUser({ password, oldPassword }) {
        return super.post('/modifyPwdByUser', {
            password: password ? Md5(password) : password,
            oldPassword: oldPassword ? Md5(oldPassword) : oldPassword,
            _isSuccessTip: true,
        });
    }

    /**
     * 权限
     * @returns {AxiosPromise<any>}
     */
    menuResource() {
        return super.get('/menuResource');
    }

    /**
     * 清除缓存
     * @returns {AxiosPromise<any>}
     */
    clearCache() {
        return super.post('/clearCache');
    }
}

export default new User();
export { User };
