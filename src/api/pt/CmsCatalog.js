/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Pt } from './Pt';

class CmsCatalog extends Pt {
    constructor() {
        super();
        this.baseUrl += '/cmsCatalog';
    }

    data({ pId, name, isAvailable } = {}) {
        return super.get('/data', {
            pId,
            name,
            isAvailable,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, parentId, name, cmsCatalogType, orderNum } = {}) {
        return super.post('/save', {
            id,
            parentId,
            name,
            cmsCatalogType,
            orderNum,
        });
    }

    delete({ id } = {}) {
        return super.post('/delete', {
            id,
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

    select({ pId, name } = {}) {
        return super.get('/select', {
            pId,
            name,
            _isRepeat: true,
        });
    }

    loadSelectNode({ id } = {}) {
        return super.get('/loadSelectNode', {
            id,
            _isRepeat: true,
        });
    }
}

export default new CmsCatalog();
export { CmsCatalog };
