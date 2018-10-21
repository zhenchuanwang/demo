/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Stat } from './Stat';

class GoodsStat extends Stat {
    constructor() {
        super();
        this.baseUrl += '/goodsStat';
    }

    goodsSaleStatList({
        type,
        orderByKey,
        orderByType,
        activityId,
        supplierId,
        goodsCatId,
        goodsName,
        goodsSn,
        statDateDay,
        statBeginDateMonth,
        statEndDateMonth,
    } = {}) {
        let statBeginDate = null;
        let statEndDate = null;
        if (statDateDay != null && statDateDay.length === 2) {
            statBeginDate = statDateDay[0];
            statEndDate = statDateDay[1];
        }
        return super.get('/goodsSaleStatList', {
            type,
            orderByKey,
            orderByType,
            activityId,
            supplierId,
            goodsCatId,
            goodsName,
            goodsSn,
            statBeginDate,
            statEndDate,
            statBeginDateMonth,
            statEndDateMonth,
        });
    }

    goodsSaleStatDetail({
        type,
        activityId,
        supplierId,
        skuId,
        goodsId,
        statDateDay,
        statBeginDateMonth,
        statEndDateMonth,
    } = {}) {
        let statBeginDate = null;
        let statEndDate = null;
        if (statDateDay != null && statDateDay.length === 2) {
            statBeginDate = statDateDay[0];
            statEndDate = statDateDay[1];
        }
        return super.get('/goodsSaleStatDetail', {
            type,
            activityId,
            supplierId,
            skuId,
            goodsId,
            statBeginDate,
            statEndDate,
            statBeginDateMonth,
            statEndDateMonth,
        });
    }
}

export default new GoodsStat();
export { GoodsStat };
