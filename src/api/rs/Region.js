/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Rs } from './Rs';

class Region extends Rs {
    constructor() {
        super();
        this.baseUrl += '/region';
    }

    data({ pId, name, regionCode, isAvailable } = {}) {
        return super.get('/data', {
            pId,
            name,
            regionCode,
            isAvailable,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, parentId, name, regionCode, regionAlias, regionType, orderNum, isAvailable } = {}) {
        return super.post('/save', {
            id,
            parentId,
            name,
            regionCode,
            regionAlias,
            regionType,
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

    selectAll() {
        return super.get('/selectAll', {
            _isRepeat: true,
        });
    }

    /**
     * select
     * @param pId
     * @param name
     * @param _cancelSource 用于取消请求
     * @returns {AxiosPromise<any>}
     */
    select({ pId, name, _cancelSource } = {}) {
        return super.get('/select', {
            pId,
            name,
            _isRepeat: true,
            _cancelSource,
        });
    }

    loadSelectNode({ id } = {}) {
        return super.get('/loadSelectNode', {
            id,
            _isRepeat: true,
        });
    }
}

export default new Region();
export { Region };
