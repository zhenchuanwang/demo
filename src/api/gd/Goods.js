/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Gd } from './Gd';

class Goods extends Gd {
    constructor() {
        super();
        this.baseUrl += '/goods';
    }

    data({ goodsName, goodsSn, goodsCatId, supplierId, goodsStatusType, currentPage, pageSize } = {}) {
        return super.get('/data', {
            goodsName,
            goodsSn,
            goodsCatId,
            supplierId,
            goodsStatusType,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }
    getGoodsDetailVo({ id }) {
        return super.get('/getGoodsDetailVo', { id });
    }

    save(data) {
        return super.postJson('/save', data);
    }
    saveAndPublish(data) {
        return super.postJson('/saveAndPublish', data);
    }

    onSaleGoods({ goodsId }) {
        return super.post('/onSaleGoods', { goodsId });
    }

    offSaleGoods({ goodsId }) {
        return super.post('/offSaleGoods', { goodsId });
    }

    /**
     * 获取商品(当选择/装修时用)
     * @param ids 有值不分页
     * @param orderByKey
     * @param orderByType
     *
     * @param goodsName
     * @param goodsSn
     * @param goodsStatus
     * @param isShopStoreGoods
     * @param isActivityGoods
     * @param activityId
     * @param currentPage
     * @param pageSize
     * @returns {AxiosPromise<any>}
     */
    selectByPage({
        ids,
        orderByKey,
        orderByType,
        goodsName,
        goodsSn,
        goodsStatus,
        isShopStoreGoods,
        isActivityGoods,
        activityId,
        currentPage,
        pageSize,
    } = {}) {
        return super.get('/selectByPage', {
            ids,
            orderByKey,
            orderByType,
            goodsName,
            goodsSn,
            goodsStatus,
            isShopStoreGoods,
            isActivityGoods,
            activityId,
            currentPage,
            pageSize,
            _isRepeat: true,
        });
    }
}

export default new Goods();
export { Goods };
