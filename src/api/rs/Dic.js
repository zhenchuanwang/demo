/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Rs } from './Rs';

class Dic extends Rs {
    constructor() {
        super();
        this.baseUrl += '/dic';
    }

    entry({ dicCode }) {
        return super.get(`/entry/${dicCode}`, {
            _isRepeat: true,
        });
    }

    entrys({ dicCode }) {
        return super.get(`/entry/${dicCode}`);
    }

    data({ dicName, dicCode, currentPage, pageSize } = {}) {
        return super.get('/data', {
            dicName,
            dicCode,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, dicName, dicCode, dicDesc, isAvailable } = {}) {
        return super.post('/save', {
            id,
            dicName,
            dicCode,
            dicDesc,
            isAvailable,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }

    entryList({ dicId }) {
        return super.get('/entryList', { dicId });
    }

    exists({ id, dicName, dicCode } = {}) {
        return super.get('/exists', {
            id,
            dicName,
            dicCode,
            _isRepeat: true,
        });
    }
}

export default new Dic();
export { Dic };
