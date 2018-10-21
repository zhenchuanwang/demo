/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { HttpBase } from '@/api/base/HttpBase';

class Gd extends HttpBase {
    constructor() {
        super();
        this.baseUrl += '/gd';
    }
}

export default new Gd();
export { Gd };
