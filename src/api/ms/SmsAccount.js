/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Ms } from './Ms';

class SmsAccount extends Ms {
    constructor() {
        super();
        this.baseUrl += '/smsAccount';
    }

    data({ orgId, serverIp, serverPort, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            orgId,
            serverIp,
            serverPort,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id }).then();
    }

    save({ id, orgId, serverIp, serverPort, spid, smsSign, password, isAvailable } = {}) {
        return super.post('/save', {
            id,
            orgId,
            serverIp,
            serverPort,
            spid,
            smsSign,
            password,
            isAvailable,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }

    status({ id, isAvailable } = {}) {
        return super.post('/status', {
            id,
            isAvailable,
        });
    }

    select() {
        return super.get('/select', {});
    }
}

export default new SmsAccount();
export { SmsAccount };
