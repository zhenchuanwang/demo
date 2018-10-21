/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Mb } from './Mb';

class DistributorBill extends Mb {
    constructor() {
        super();
        this.baseUrl += '/distributorBill';
    }

    data({ billStatus, billName, distributorName, distributorTel, currentPage, pageSize } = {}) {
        return super.get('/data', {
            billStatus,
            billName,
            distributorName,
            distributorTel,
            currentPage,
            pageSize,
        });
    }

    payBill({ id, payDesc } = {}) {
        return super.post('/payBill', {
            id,
            payDesc,
        });
    }
}

export default new DistributorBill();
export { DistributorBill };
