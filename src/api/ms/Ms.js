/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { HttpBase } from '@/api/base/HttpBase';

class Ms extends HttpBase {
    constructor() {
        super();
        this.baseUrl += '/ms';
    }
}

export default new Ms();
export { Ms };
