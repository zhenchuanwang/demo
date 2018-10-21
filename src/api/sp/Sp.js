/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { HttpBase } from '@/api/base/HttpBase';

class Sp extends HttpBase {
    constructor() {
        super();
        this.baseUrl += '/sp';
    }
}

export default new Sp();
export { Sp };
