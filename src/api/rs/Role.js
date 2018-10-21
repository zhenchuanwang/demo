/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Rs } from './Rs';

class Role extends Rs {
    constructor() {
        super();
        this.baseUrl += '/role';
    }

    data({ roleName, roleCode, appId, currentPage, pageSize } = {}) {
        return super.get('/data', {
            roleName,
            roleCode,
            appId,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    getRoleMenu({ roleId } = {}) {
        return super.get('/getRoleMenu', {
            roleId,
        });
    }

    saveRoleMenu({ roleId, roleMenuStr } = {}) {
        return super.post('/saveRoleMenu', {
            roleId,
            roleMenuStr,
        });
    }

    save({ appId, id, roleName, roleCode } = {}) {
        return super.post('/save', {
            appId,
            id,
            roleName,
            roleCode,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }
}

export default new Role();
export { Role };
