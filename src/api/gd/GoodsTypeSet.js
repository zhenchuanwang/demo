/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Gd } from './Gd';

class GoodsTypeSet extends Gd {
    constructor() {
        super();
        this.baseUrl += '/goodsTypeSet';
    }

    data() {
        return super.get('/data', {});
    }

    getDetail({ goodsType } = {}) {
        return super.get('/getDetail', { goodsType });
    }

    save({ id, goodsType, authType, paymentMode, extendFieldInfo, remarks } = {}) {
        return super.post('/save', {
            id,
            goodsType,
            authType,
            paymentMode,
            extendFieldInfo,
            remarks,
        });
    }
}

export default new GoodsTypeSet();
export { GoodsTypeSet };
