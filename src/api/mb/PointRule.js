/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Mb } from './Mb';

class PointRule extends Mb {
    constructor() {
        super();
        this.baseUrl += '/pointRule';
    }

    data() {
        return super.get('/data', {});
    }

    getDetail({ pointCaseId } = {}) {
        return super.get('/getDetail', { pointCaseId });
    }

    save({ id, pointCaseId, ruleConfig, isAvailable } = {}) {
        return super.post('/save', {
            id,
            pointCaseId,
            ruleConfig,
            isAvailable,
        });
    }
}

export default new PointRule();
export { PointRule };
