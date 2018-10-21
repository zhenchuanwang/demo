/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Rs } from './Rs';

class App extends Rs {
    constructor() {
        super();
        this.baseUrl += '/app';
    }

    selectByUser() {
        return super.get('/selectByUser');
    }

    data({ appName, appUrl, currentPage, pageSize } = {}) {
        return super.get('/data', {
            appName,
            appUrl,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, appName, appUrl } = {}) {
        return super.post('/save', {
            id,
            appName,
            appUrl,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }
}

export default new App();
export { App };
