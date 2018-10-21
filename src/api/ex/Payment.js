/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Ex } from './Ex';

class Payment extends Ex {
    constructor() {
        super();
        this.baseUrl += '/payment';
    }

    data({
        paymentSn,
        externalPaymentSn,
        payer,
        payerAccount,
        paymentStatus,
        paymentTime,
        currentPage,
        pageSize,
    } = {}) {
        let beginTime = null;
        let endTime = null;
        if (paymentTime != null && paymentTime.length === 2) {
            beginTime = paymentTime[0];
            endTime = paymentTime[1];
        }
        return super.get('/data', {
            paymentSn,
            externalPaymentSn,
            payer,
            payerAccount,
            paymentStatus,
            beginTime,
            endTime,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id } = {}) {
        return super.get('/getDetail', { id });
    }

    offlinePaymentAudit({ id, auditStatus, payAuditComments } = {}) {
        return super.post('/offlinePaymentAudit', {
            id,
            auditStatus,
            payAuditComments,
        });
    }
}

export default new Payment();
export { Payment };
