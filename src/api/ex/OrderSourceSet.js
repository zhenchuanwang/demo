/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Ex } from './Ex';

class OrderSourceSet extends Ex {
    constructor() {
        super();
        this.baseUrl += '/orderSourceSet';
    }

    data() {
        return super.get('/data', {});
    }

    getDetail({ orderSource } = {}) {
        return super.get('/getDetail', { orderSource });
    }

    save({ id, orderSource, isCheckStock, isDistributionAmount, isNeedPayment, remarks } = {}) {
        return super.post('/save', {
            id,
            orderSource,
            isCheckStock,
            isDistributionAmount,
            isNeedPayment,
            remarks,
        });
    }
}

export default new OrderSourceSet();
export { OrderSourceSet };
