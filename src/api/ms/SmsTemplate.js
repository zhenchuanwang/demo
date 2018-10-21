/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Ms } from './Ms';

class SmsTemplate extends Ms {
    constructor() {
        super();
        this.baseUrl += '/smsTemplate';
    }

    data({ smsUseCaseName, smsTemplateName, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            smsUseCaseName,
            smsTemplateName,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id }).then();
    }

    save({ id, smsAccountId, smsUseCase, smsTemplateName, smsTemplateContent, timeout, isAvailable } = {}) {
        return super.post('/save', {
            id,
            smsAccountId,
            smsUseCase,
            smsTemplateName,
            smsTemplateContent,
            timeout,
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

export default new SmsTemplate();
export { SmsTemplate };
