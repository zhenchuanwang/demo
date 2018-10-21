/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { HttpBase } from '@/api/base/HttpBase';

class Rs extends HttpBase {
    constructor() {
        super();
        this.baseUrl += '/rs';
    }
}

export default new Rs();
export { Rs };
