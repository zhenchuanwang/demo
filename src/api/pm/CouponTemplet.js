/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Pm } from './Pm';

class CouponTemplet extends Pm {
    constructor() {
        super();
        this.baseUrl += '/couponTemplet';
    }

    data({ templetName, isAvailable, couponGiveMode, currentPage, pageSize } = {}) {
        return super.get('/data', {
            templetName,
            isAvailable,
            couponGiveMode,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id }).then();
    }

    save({
        id,
        templetName,
        templetType,
        couponAmount,
        couponUseAmount,
        couponPeriod,
        couponGiveMode,
        remarks,
        isAvailable,
    } = {}) {
        return super.post('/save', {
            id,
            templetName,
            templetType,
            couponAmount,
            couponUseAmount,
            couponPeriod,
            couponGiveMode,
            remarks,
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

export default new CouponTemplet();
export { CouponTemplet };
