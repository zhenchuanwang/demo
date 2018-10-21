/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopFixedFreight extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopFixedFreight';
    }

    data({ pId } = {}) {
        return super.get('/data', {
            pId,
        });
    }

    save({ regionId, freeFreightOrderAmount, freightAmount } = {}) {
        return super.post('/save', {
            regionId,
            freeFreightOrderAmount,
            freightAmount,
        });
    }
}

export default new ShopFixedFreight();
export { ShopFixedFreight };
