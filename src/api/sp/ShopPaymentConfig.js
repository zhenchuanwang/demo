/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopPaymentConfig extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopPaymentConfig';
    }

    data({ shopId } = {}) {
        if (shopId) {
            return super.get('/shopPaymentConfigList', {
                shopId,
            });
        } else {
            return super.get('/currShopPaymentConfigList', {});
        }
    }

    save({ shopId, configJson } = {}) {
        if (shopId) {
            return super.post('/save', {
                shopId,
                configJson,
            });
        } else {
            return super.post('/saveCurr', {
                configJson,
            });
        }
    }
}

export default new ShopPaymentConfig();
export { ShopPaymentConfig };
