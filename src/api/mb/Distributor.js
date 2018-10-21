/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Mb } from './Mb';

class Distributor extends Mb {
    constructor() {
        super();
        this.baseUrl += '/distributor';
    }

    data({ distributorName, distributorTel, distributorLevelId, isJoinDistributor, currentPage, pageSize } = {}) {
        return super.get('/data', {
            distributorName,
            distributorTel,
            distributorLevelId,
            isJoinDistributor,
            currentPage,
            pageSize,
        });
    }

    getDistributorDetail({ id }) {
        return super.get('/getDistributorDetail', {
            id,
        });
    }

    cancelDistributor({ id }) {
        return super.post('/cancelDistributor', {
            id,
        });
    }

    saveDistributor({
        id,
        distributorLevelId,
        distributorName,
        distributorSex,
        distributorTel,
        wechatId,
        distributorRegionId,
        distributorAddress,
        distributorEmail,
        distributorPostcode,
    }) {
        return super.post('/saveDistributor', {
            id,
            distributorLevelId,
            distributorName,
            distributorSex,
            distributorTel,
            wechatId,
            distributorRegionId,
            distributorAddress,
            distributorEmail,
            distributorPostcode,
        });
    }

    approvalDistributor({
        id,
        distributorLevelId,
        distributorName,
        distributorSex,
        distributorTel,
        wechatId,
        distributorRegionId,
        distributorAddress,
        distributorEmail,
        distributorPostcode,
        approvalStatus,
        approvalRemark,
    }) {
        return super.post('/approvalDistributor', {
            id,
            distributorLevelId,
            distributorName,
            distributorSex,
            distributorTel,
            wechatId,
            distributorRegionId,
            distributorAddress,
            distributorEmail,
            distributorPostcode,
            approvalStatus,
            approvalRemark,
        });
    }
}

export default new Distributor();
export { Distributor };
