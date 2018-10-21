/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Rs } from './Rs';

class DicEntry extends Rs {
    constructor() {
        super();
        this.baseUrl += '/dicEntry';
    }

    data({ currentPage, pageSize } = {}) {
        return super.get('/data', {
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, dicId, entryName, entryCode, entryKey, entryDesc, isAvailable, orderNum } = {}) {
        return super.post('/save', {
            id,
            dicId,
            entryName,
            entryCode,
            entryKey,
            entryDesc,
            isAvailable,
            orderNum,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }

    exists({ id, dicId, entryKey, entryCode } = {}) {
        return super.get('/exists', {
            id,
            dicId,
            entryKey,
            entryCode,
            _isRepeat: true,
        });
    }

    status({ id, isAvailable } = {}) {
        return super.post('/status', {
            id,
            isAvailable,
        });
    }
}

export default new DicEntry();
export { DicEntry };
