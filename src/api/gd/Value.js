/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Gd } from './Gd';

class Value extends Gd {
    constructor() {
        super();
        this.baseUrl += '/value';
    }

    data({ keyword, valueName, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            keyword,
            valueName,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    selectByPage({ keyword, propId, currentPage, pageSize } = {}) {
        return super.get('/selectByPage', {
            keyword,
            valueName: keyword,
            propId,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, propId, valueName, isAvailable, orderNum } = {}) {
        return super.post('/save', {
            id,
            propId,
            valueName,
            isAvailable,
            orderNum,
        });
    }

    savePropValue({ propId, valueName } = {}) {
        return super.post('/savePropValue', {
            propId,
            valueName,
        });
    }
}

export default new Value();
export { Value };
