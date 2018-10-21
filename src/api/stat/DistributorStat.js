/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Stat } from './Stat';

class DistributorStat extends Stat {
    constructor() {
        super();
        this.baseUrl += '/distributorStat';
    }

    distributorStatList({ statDate, currentPage, pageSize } = {}) {
        let statBeginDate = null;
        let statEndDate = null;
        if (statDate != null && statDate.length === 2) {
            statBeginDate = statDate[0];
            statEndDate = statDate[1];
        }
        return super.get('/distributorStatList', {
            statBeginDate,
            statEndDate,
            currentPage,
            pageSize,
        });
    }

    distributorReconciliationList({ statDateMonth, currentPage, pageSize } = {}) {
        return super.get('/distributorReconciliationList', {
            statDateMonth,
            currentPage,
            pageSize,
        });
    }
}

export default new DistributorStat();
export { DistributorStat };
