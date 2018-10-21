/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Ms } from './Ms';

class WxmsgTemplate extends Ms {
    constructor() {
        super();
        this.baseUrl += '/wxmsgTemplate';
    }

    data({ wxmsgUseCaseName, wxmsgTemplateName, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            wxmsgUseCaseName,
            wxmsgTemplateName,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id }).then();
    }

    save({ id, wxmsgUseCase, wxmsgTemplateName, wxmsgContent, isAvailable } = {}) {
        return super.post('/save', {
            id,
            wxmsgUseCase,
            wxmsgTemplateName,
            wxmsgContent,
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
}

export default new WxmsgTemplate();
export { WxmsgTemplate };
