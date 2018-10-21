/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopDecoration extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopDecoration';
    }

    data({ pageType, pageName, currentPage, pageSize }) {
        return super.get('/data', { pageType, pageName, currentPage, pageSize });
    }

    saveJsonData({ id, pageType, adPageType, JsonData, pageName, isAvailable } = {}) {
        return super.post('/saveJsonData', {
            id,
            pageType,
            adPageType,
            JsonData,
            pageName,
            isAvailable,
        });
    }

    getJsonData({ id } = {}) {
        return super.get('/getJsonData', {
            id,
        });
    }

    updateIsAvailable({ id } = {}) {
        return super.post('/updateIsAvailable', {
            id,
        });
    }

    delete({ id } = {}) {
        return super.post('/delete', {
            id,
        });
    }

    status({ id, isAvailable } = {}) {
        return super.post('/status', {
            id,
            isAvailable,
        });
    }
}

export default new ShopDecoration();
export { ShopDecoration };
