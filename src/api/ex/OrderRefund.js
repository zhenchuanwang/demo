/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Ex } from './Ex';

class OrderRefund extends Ex {
    constructor() {
        super();
        this.baseUrl += '/orderRefund';
    }

    data({ refundSn, orderSn, orderRefundType, refundStatus, refundType, currentPage, pageSize } = {}) {
        return super.get('/data', {
            refundSn,
            orderSn,
            orderRefundType,
            refundStatus,
            refundType,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id } = {}) {
        return super.get('/detail', { id });
    }

    orderRefundAudit({ id, auditStatus, auditAttachment, auditDesc } = {}) {
        const auditAttachmentStr = auditAttachment
            .reduce((prev, curr) => {
                prev.push(curr.name);
                return prev;
            }, [])
            .join(',');
        return super.post('/orderRefundAudit', {
            id,
            auditStatus,
            auditAttachment: auditAttachmentStr,
            auditDesc,
        });
    }

    orderRefundPay({ id, paymentAttachment, paymentDesc } = {}) {
        const paymentAttachmentStr = paymentAttachment
            .reduce((prev, curr) => {
                prev.push(curr.name);
                return prev;
            }, [])
            .join(',');
        return super.post('/orderRefundPay', {
            id,
            paymentAttachment: paymentAttachmentStr,
            paymentDesc,
        });
    }

    orderRefundRec({ id } = {}) {
        return super.post('/orderRefundRec', {
            id,
        });
    }
}

export default new OrderRefund();
export { OrderRefund };
