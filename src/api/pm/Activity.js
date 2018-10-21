/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Pm } from './Pm';

class Activity extends Pm {
    constructor() {
        super();
        this.baseUrl += '/activity';
    }

    data({ activityName, activityStatus, currentPage, pageSize } = {}) {
        return super.get('/data', {
            activityName,
            activityStatus,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, activityName, activityDesc, activityGoodsJson } = {}) {
        return super.post('/save', {
            id,
            activityName,
            activityDesc,
            activityGoodsJson,
        });
    }

    onReleaseActivity({ activityId }) {
        return super.post('/onReleaseActivity', { activityId });
    }

    onCloseActivity({ activityId }) {
        return super.post('/onCloseActivity', { activityId });
    }

    onDelActivity({ activityId }) {
        return super.post('/onDelActivity', { activityId });
    }

    activityGoodsStockList({ activityName, goodsName, goodsSn, orderByKey, orderByType, currentPage, pageSize } = {}) {
        return super.get('/activityGoodsStockList', {
            activityName,
            goodsName,
            goodsSn,
            orderByKey,
            orderByType,
            currentPage,
            pageSize,
        });
    }
}

export default new Activity();
export { Activity };
