/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { HttpBase } from '@/api/base/HttpBase';

class Ex extends HttpBase {
    constructor() {
        super();
        this.baseUrl += '/ex';
    }
}

export default new Ex();
export { Ex };
