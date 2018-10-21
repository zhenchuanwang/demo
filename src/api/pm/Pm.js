/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { HttpBase } from '@/api/base/HttpBase';

class Pm extends HttpBase {
    constructor() {
        super();
        this.baseUrl += '/pm';
    }
}

export default new Pm();
export { Pm };
