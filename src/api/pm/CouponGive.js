/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Pm } from './Pm';

class CouponGive extends Pm {
    constructor() {
        super();
        this.baseUrl += '/couponGive';
    }

    data({ giveScope, remarks, couponGiveMode, insertTime, currentPage, pageSize } = {}) {
        let insertBeginTime = null;
        let insertEndTime = null;
        if (insertTime != null && insertTime.length === 2) {
            insertBeginTime = insertTime[0];
            insertEndTime = insertTime[1];
        }
        return super.get('/data', {
            giveScope,
            remarks,
            couponGiveMode,
            insertBeginTime,
            insertEndTime,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id }).then();
    }

    save({
        id,
        couponDesc,
        couponTempletId,
        couponAmount,
        couponUseAmount,
        couponExpireMode,
        couponPeriod,
        couponExpireTime,
        giveScope,
        buyerLevelId,
        remarks,
        buyerIds,
        couponGiveMode,
        couponTempletType,
        drawBeginTime,
        drawEndTime,
    } = {}) {
        return super.post('/save', {
            id,
            couponDesc,
            couponTempletId,
            couponAmount,
            couponUseAmount,
            couponExpireMode,
            couponPeriod,
            couponExpireTime,
            giveScope,
            buyerLevelId,
            remarks,
            buyerIds,
            couponGiveMode,
            couponTempletType,
            drawBeginTime,
            drawEndTime,
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

export default new CouponGive();
export { CouponGive };
