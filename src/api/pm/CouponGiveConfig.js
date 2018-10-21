/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Pm } from './Pm';

class CouponGiveConfig extends Pm {
    constructor() {
        super();
        this.baseUrl += '/couponGiveConfig';
    }

    data({ currentPage, pageSize } = {}) {
        return super.get('/data', {
            currentPage,
            pageSize,
        });
    }

    getDetail({ couponGiveCase }) {
        return super.get('/get', { couponGiveCase }).then();
    }

    save({ id, couponConfig, isAvailable } = {}) {
        return super.post('/save', {
            id,
            couponConfig,
            isAvailable,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }

    status({ id, isAvailable } = {}) {
        return super.post('/status', {
            id,
            isAvailable,
        });
    }
}

export default new CouponGiveConfig();
export { CouponGiveConfig };
