/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Rs } from './Rs';

class Express extends Rs {
    constructor() {
        super();
        this.baseUrl += '/express';
    }

    data({ expressName, expressCode, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            expressName,
            expressCode,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, expressName, expressCode, expressDesc, expressWebsite, orderNum, isAvailable } = {}) {
        return super.post('/save', {
            id,
            expressName,
            expressCode,
            expressDesc,
            expressWebsite,
            orderNum,
            isAvailable,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }

    status({ id, isAvailable } = {}) {
        return super.post('/status', {
            id,
            isAvailable,
        });
    }
}

export default new Express();
export { Express };
