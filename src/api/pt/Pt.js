/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { HttpBase } from '@/api/base/HttpBase';

class Pt extends HttpBase {
    constructor() {
        super();
        this.baseUrl += '/pt';
    }
}

export default new Pt();
export { Pt };
