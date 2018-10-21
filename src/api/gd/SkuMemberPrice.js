/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Gd } from './Gd';

class SkuMemberPrice extends Gd {
    constructor() {
        super();
        this.baseUrl += '/skuMemberPrice';
    }

    getSkuMemberPriceList({ goodsId }) {
        return super.get('/getSkuMemberPriceList', { goodsId });
    }

    saveSkuMemberPrice({ jsonStr }) {
        return super.post('/saveSkuMemberPrice', { jsonStr });
    }
}

export default new SkuMemberPrice();
export { SkuMemberPrice };
