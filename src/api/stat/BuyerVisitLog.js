/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Stat } from './Stat';

class BuyerVisitLog extends Stat {
    constructor() {
        super();
        this.baseUrl += '/buyerVisitLog';
    }

    goodsBuyerVisitLogList({
        goodsSn,
        goodsName,
        type,
        statDate,
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
        return super.get('/goodsBuyerVisitLogList', {
            goodsSn,
            goodsName,
            type,
            statDate,
            statBeginDate,
            statEndDate,
            statBeginDateMonth,
            statEndDateMonth,
        });
    }

    goodsBuyerVisitLogDetail({ goodsId, type, statDate, statDateDay, statBeginDateMonth, statEndDateMonth } = {}) {
        let statBeginDate = null;
        let statEndDate = null;
        if (statDateDay != null && statDateDay.length === 2) {
            statBeginDate = statDateDay[0];
            statEndDate = statDateDay[1];
        }
        return super.get('/goodsBuyerVisitLogDetail', {
            goodsId,
            type,
            statDate,
            statBeginDate,
            statEndDate,
            statBeginDateMonth,
            statEndDateMonth,
        });
    }

    distributionVisitLogStatList({
        type,
        statDate,
        statDateDay,
        statBeginDateMonth,
        statEndDateMonth,
        currentPage,
        pageSize,
    } = {}) {
        let statBeginDate = null;
        let statEndDate = null;
        if (statDateDay != null && statDateDay.length === 2) {
            statBeginDate = statDateDay[0];
            statEndDate = statDateDay[1];
        }
        return super.get('/distributionVisitLogStatList', {
            type,
            statDate,
            statBeginDate,
            statEndDate,
            statBeginDateMonth,
            statEndDateMonth,
            currentPage,
            pageSize,
        });
    }

    distributionUrllinkTypeStatList({
        type,
        buyerId,
        urllinkType,
        statDate,
        statDateDay,
        statBeginDateMonth,
        statEndDateMonth,
        currentPage,
        pageSize,
    } = {}) {
        let statBeginDate = null;
        let statEndDate = null;
        if (statDateDay != null && statDateDay.length === 2) {
            statBeginDate = statDateDay[0];
            statEndDate = statDateDay[1];
        }
        return super.get('/distributionUrllinkTypeStatList', {
            type,
            buyerId,
            urllinkType,
            statDate,
            statBeginDate,
            statEndDate,
            statBeginDateMonth,
            statEndDateMonth,
            currentPage,
            pageSize,
        });
    }
}

export default new BuyerVisitLog();
export { BuyerVisitLog };
