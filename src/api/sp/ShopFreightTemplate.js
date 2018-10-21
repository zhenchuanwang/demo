/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopFreightTemplate extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopFreightTemplate';
    }

    data({ templateName, billingMethod, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            templateName,
            billingMethod,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, templateName, billingMethod, templateDesc, isAvailable, shopFreightTemplateRgStr } = {}) {
        return super.post('/save', {
            id,
            templateName,
            billingMethod,
            templateDesc,
            isAvailable,
            shopFreightTemplateRgStr,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }

    status({ id, isAvailable }) {
        return super.post('/status', {
            id,
            isAvailable,
        });
    }

    select() {
        return super.get('/select', {});
    }
}

export default new ShopFreightTemplate();
export { ShopFreightTemplate };
