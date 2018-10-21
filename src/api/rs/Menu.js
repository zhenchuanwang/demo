/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Rs } from './Rs';

class Menu extends Rs {
    constructor() {
        super();
        this.baseUrl += '/menu';
    }

    data({ pId, appId, name, isAvailable } = {}) {
        return super.get('/data', {
            pId,
            appId,
            name,
            isAvailable,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, parentId, appId, name, href, parameter, orderNum, isAvailable, identifier, resource } = {}) {
        return super.post('/save', {
            id,
            parentId,
            appId,
            name,
            href,
            parameter,
            orderNum,
            isAvailable,
            identifier,
            resource,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }

    status({ id, isAvailable } = {}) {
        return super.post('/status', {
            id,
            isAvailable,
        });
    }

    menuResourceList({ menuId }) {
        return super.get('/menuResourceList', { menuId });
    }

    saveMenuResource(jsonData) {
        return super.postJson('/saveMenuResource', {
            ...jsonData,
        });
    }

    exists({ id, pId, name, appId } = {}) {
        return super.get('/exists', {
            id,
            pId,
            name,
            appId,
        });
    }
}

export default new Menu();
export { Menu };
