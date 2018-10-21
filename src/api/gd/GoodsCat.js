/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Gd } from './Gd';

class GoodsCat extends Gd {
    constructor() {
        super();
        this.baseUrl += '/goodsCat';
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

    save({ id, parentId, name, shareIncomeRate, levelIncomeRate, topIncomeRate, orderNum, isAvailable } = {}) {
        return super.post('/save', {
            id,
            parentId,
            name,
            shareIncomeRate,
            levelIncomeRate,
            topIncomeRate,
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

export default new GoodsCat();
export { GoodsCat };
