/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Ex } from './Ex';

class ParameterSet extends Ex {
    constructor() {
        super();
        this.baseUrl += '/parameterSet';
    }

    data() {
        return super.get('/data', {});
    }

    getDetail({ orderType } = {}) {
        return super.get('/getDetail', { orderType });
    }

    save({ id, orderType, payOvertime, remarks } = {}) {
        return super.post('/save', {
            id,
            orderType,
            payOvertime,
            remarks,
        });
    }
}

export default new ParameterSet();
export { ParameterSet };
