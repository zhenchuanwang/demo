/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { HttpBase } from '@/api/base/HttpBase';

class Stat extends HttpBase {
    constructor() {
        super();
        this.baseUrl += '/stat';
    }
}

export default new Stat();
export { Stat };
