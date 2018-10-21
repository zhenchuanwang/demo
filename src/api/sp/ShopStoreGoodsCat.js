/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopStoreGoodsCat extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopStoreGoodsCat';
    }

    data({ goodsCatName, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            goodsCatName,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, goodsCatName, orderNum, isAvailable } = {}) {
        return super.post('/save', {
            id,
            goodsCatName,
            orderNum,
            isAvailable,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }

    status({ id, isAvailable }) {
        return super.post('/status', {
            id,
            isAvailable,
        });
    }

    select() {
        return super.get('/select', {});
    }
}

export default new ShopStoreGoodsCat();
export { ShopStoreGoodsCat };
