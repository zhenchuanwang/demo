/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Gd } from './Gd';

class Prop extends Gd {
    constructor() {
        super();
        this.baseUrl += '/prop';
    }

    data({ keyword, propName, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            keyword,
            propName,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    selectByPage({ keyword, currentPage, pageSize } = {}) {
        return super.get('/selectByPage', {
            keyword,
            propName: keyword,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, propName, propShowName, isAvailable, orderNum } = {}) {
        return super.post('/save', {
            id,
            propName,
            propShowName,
            isAvailable,
            orderNum,
        });
    }

    saveProp({ propName } = {}) {
        return super.post('/saveProp', {
            propName,
        });
    }
}

export default new Prop();
export { Prop };
