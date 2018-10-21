/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopStoreFreight extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopStoreFreight';
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

    save({
        storeId,
        startDeliverAmount,
        freeDeliverAmount,
        freightDesc,
        maxDeliverRange,
        maxDeliverTime,
        freightRouteJson,
    } = {}) {
        if (storeId) {
            return super.post('/save', {
                storeId,
                startDeliverAmount,
                freeDeliverAmount,
                freightDesc,
                maxDeliverRange,
                maxDeliverTime,
                freightRouteJson,
            });
        } else {
            return super.post('/saveCurr', {
                startDeliverAmount,
                freeDeliverAmount,
                freightDesc,
                maxDeliverRange,
                maxDeliverTime,
                freightRouteJson,
            });
        }
    }
}

export default new ShopStoreFreight();
export { ShopStoreFreight };
