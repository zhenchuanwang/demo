/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { HttpBase } from '@/api/base/HttpBase';

class Mb extends HttpBase {
    constructor() {
        super();
        this.baseUrl += '/mb';
    }
}

export default new Mb();
export { Mb };
