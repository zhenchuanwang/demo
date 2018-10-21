/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Rs } from './Rs';

class Variable extends Rs {
    constructor() {
        super();
        this.baseUrl += '/variable';
    }

    data({ variableName, variableCode, currentPage, pageSize } = {}) {
        return super.get('/data', {
            variableName,
            variableCode,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({ id, variableName, variableCode, variableValue, variableDesc } = {}) {
        return super.post('/save', {
            id,
            variableName,
            variableCode,
            variableValue,
            variableDesc,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }
}

export default new Variable();
export { Variable };
