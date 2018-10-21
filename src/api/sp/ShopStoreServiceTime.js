/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopStoreServiceTime extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopStoreServiceTime';
    }

    getDetail({ storeId }) {
        if (storeId) {
            return super.get('/get', {
                storeId,
            });
        } else {
            return super.get('/getCurr', {});
        }
    }

    save({ storeId, prepareGoodsDesc, prepareGoodsMode, serviceTimeJson } = {}) {
        if (storeId) {
            return super.post('/save', {
                storeId,
                prepareGoodsDesc,
                prepareGoodsMode,
                serviceTimeJson,
            });
        } else {
            return super.post('/saveCurr', {
                prepareGoodsDesc,
                prepareGoodsMode,
                serviceTimeJson,
            });
        }
    }
}

export default new ShopStoreServiceTime();
export { ShopStoreServiceTime };
