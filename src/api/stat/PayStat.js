/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Stat } from './Stat';

class PayStat extends Stat {
    constructor() {
        super();
        this.baseUrl += '/payStat';
    }

    payStatList({ paymentMode, statDateDay, currentPage, pageSize } = {}) {
        let statBeginDate = null;
        let statEndDate = null;
        if (statDateDay != null && statDateDay.length === 2) {
            statBeginDate = statDateDay[0];
            statEndDate = statDateDay[1];
        }
        return super.get('/payStatList', {
            paymentMode,
            statBeginDate,
            statEndDate,
            currentPage,
            pageSize,
        });
    }
}

export default new PayStat();
export { PayStat };
