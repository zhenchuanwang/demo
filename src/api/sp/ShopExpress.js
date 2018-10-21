/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopExpress extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopExpress';
    }

    data() {
        return super.get('/data', {});
    }

    save({ jsonStr } = {}) {
        return super.post('/save', {
            jsonStr,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }
}

export default new ShopExpress();
export { ShopExpress };
