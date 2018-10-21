/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Mb } from './Mb';

class BuyerAuthInfo extends Mb {
    constructor() {
        super();
        this.baseUrl += '/buyerAuthInfo';
    }

    data({ mobile, phone, authType, auditStatus, currentPage, pageSize } = {}) {
        return super.get('/data', {
            mobile,
            phone,
            authType,
            auditStatus,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/detail', {
            id,
        });
    }

    buyerAuthInfoAudit({ id, auditStatus, auditRemark }) {
        return super.post('/buyerAuthInfoAudit', {
            id,
            auditStatus,
            auditRemark,
        });
    }
}

export default new BuyerAuthInfo();
export { BuyerAuthInfo };
