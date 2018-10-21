/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopStoreGoods extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopStoreGoods';
    }

    data({ goodsName, goodsSn, storeGoodsCatId, currentPage, pageSize } = {}) {
        return super.get('/data', {
            goodsName,
            goodsSn,
            storeGoodsCatId,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, goodsId, storeGoodsCatId, minOrderQuantity, maxOrderQuantity, orderNum, shopStoreSkuJson } = {}) {
        return super.post('/save', {
            id,
            goodsId,
            storeGoodsCatId,
            minOrderQuantity,
            maxOrderQuantity,
            orderNum,
            shopStoreSkuJson,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }
}

export default new ShopStoreGoods();
export { ShopStoreGoods };
