/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Ex } from './Ex';

class Order extends Ex {
    constructor() {
        super();
        this.baseUrl += '/order';
    }

    orderList({
        orderSn,
        deliveryConsignee,
        deliveryPhone,
        orderStatus,
        goodsName,
        orderType,
        paymentMode,
        shipMethod,
        buyerLevelId,
        pickupDate,
        extendFieldInfo,
        orderTime,
        goodsTypeNE,
        goodsType,
        orderSource,
        currentPage,
        pageSize,
    } = {}) {
        let orderBeginTime = null;
        let orderEndTime = null;
        if (orderTime != null && orderTime.length === 2) {
            orderBeginTime = orderTime[0];
            orderEndTime = orderTime[1];
        }
        return super.get('/orderList', {
            orderSn,
            deliveryConsignee,
            deliveryPhone,
            orderStatus,
            goodsName,
            orderType,
            paymentMode,
            shipMethod,
            buyerLevelId,
            pickupDate,
            extendFieldInfo,
            orderBeginTime,
            orderEndTime,
            goodsTypeNE,
            goodsType,
            orderSource,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/getDetail', { id });
    }

    cancelOrder({ id, cancelDesc }) {
        return super.post('/cancelOrder', { id, cancelDesc });
    }

    completeOrder({ orderId }) {
        return super.post('/completeOrder', { orderId });
    }

    shippingOrder({ id, expressId, expressName, expressCode, trackingNumber }) {
        return super.post('/shippingOrder', {
            id,
            expressId,
            expressName,
            expressCode,
            trackingNumber,
        });
    }

    editOrderDeliveryInfo({ id, deliveryConsignee, deliveryPhone, deliveryRegionId, deliveryAddress }) {
        return super.post('/editOrderDeliveryInfo', {
            id,
            deliveryConsignee,
            deliveryPhone,
            deliveryRegionId,
            deliveryAddress,
        });
    }
}

export default new Order();
export { Order };
