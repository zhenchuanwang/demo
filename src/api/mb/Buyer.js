/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Mb } from './Mb';

class Buyer extends Mb {
    constructor() {
        super();
        this.baseUrl += '/buyer';
    }

    data({ nickName, mobile, buyerStatus, buyerLevelId, currentPage, pageSize } = {}) {
        return super.get('/data', {
            nickName,
            mobile,
            buyerStatus,
            buyerLevelId,
            currentPage,
            pageSize,
        });
    }

    selectByPage({ nickName, mobile, buyerStatus, buyerLevelId, isDistributor, currentPage, pageSize } = {}) {
        return super.get('/selectByPage', {
            nickName,
            mobile,
            buyerStatus,
            buyerLevelId,
            isDistributor,
            currentPage,
            pageSize,
        });
    }

    changeBuyerLevel({ ids, buyerLevelId }) {
        return super.post('/changeBuyerLevel', {
            ids,
            buyerLevelId,
        });
    }
}

export default new Buyer();
export { Buyer };
