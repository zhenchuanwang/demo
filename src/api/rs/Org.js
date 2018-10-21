/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Rs } from './Rs';

class Org extends Rs {
    constructor() {
        super();
        this.baseUrl += '/org';
    }

    data({ pId, name, code, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            pId,
            name,
            code,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, parentId, name, code, orderNum, isAvailable } = {}) {
        return super.post('/save', {
            id,
            parentId,
            name,
            code,
            orderNum,
            isAvailable,
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

    exists({ id, pId, name } = {}) {
        return super.get('/exists', {
            id,
            pId,
            name,
        });
    }

    select({ pId, name } = {}) {
        return super.get('/select', {
            pId,
            name,
        });
    }

    selectAll() {
        return super.get('/selectAll');
    }

    loadSelectNode({ id } = {}) {
        return super.get('/loadSelectNode', {
            id,
        });
    }

    getOrgMenu({ orgId } = {}) {
        return super
            .get('/getOrgMenu', {
                orgId,
            })
            .then(json => {
                const res = json.data.data;
                res.forEach(item => {
                    const loginImage = item.loginImage;
                    const fileBasePath = item.fileBasePath;
                    if (!loginImage) {
                        item.loginImage = [];
                    } else {
                        item.loginImage = loginImage.split(',').reduce((prev, curr) => {
                            prev.push({
                                name: curr,
                                address: fileBasePath + curr,
                            });
                            return prev;
                        }, []);
                    }
                });
                return json;
            });
    }

    saveOrgMenu({ orgId, orgMenuStr, orgAppList } = {}) {
        orgAppList.forEach(item => {
            item.loginImage = item.loginImage
                .reduce((prev, curr) => {
                    prev.push(curr.name);
                    return prev;
                }, [])
                .join(',');
        });
        return super.post('/saveOrgMenu', {
            orgId,
            orgMenuStr,
            orgAppStr: JSON.stringify(orgAppList),
        });
    }
}

export default new Org();
export { Org };
