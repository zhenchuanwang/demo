/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopBuyerAuthSet extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopBuyerAuthSet';
    }

    shopBuyerAuthSetList({ shopId } = {}) {
        if (shopId == null) {
            return super.get('/currShopBuyerAuthSetList', {});
        } else {
            return super.get('/shopBuyerAuthSetList', {
                shopId,
            });
        }
    }

    isNeedAudit({ shopId, authType, isNeedAudit }) {
        if (shopId == null) {
            return super.post('/isNeedAudit', {
                shopId,
                authType,
                isNeedAudit,
            });
        } else {
            return super.post('/currIsNeedAudit', {
                authType,
                isNeedAudit,
            });
        }
    }
}

export default new ShopBuyerAuthSet();
export { ShopBuyerAuthSet };
