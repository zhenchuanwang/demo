/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Gd } from './Gd';

class Supplier extends Gd {
    constructor() {
        super();
        this.baseUrl += '/supplier';
    }

    data({ supplierName, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            supplierName,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id });
    }

    save({
        id,
        supplierName,
        principalName,
        principalPosition,
        principalMobile,
        principalEmail,
        principalQq,
        supplierRegionId,
        supplierAddress,
        remarks,
        isAvailable,
        regionId,
        address,
        consignee,
        mobile,
        comments,
    } = {}) {
        return super.post('/save', {
            id,
            supplierName,
            principalName,
            principalPosition,
            principalMobile,
            principalEmail,
            principalQq,
            supplierRegionId,
            supplierAddress,
            remarks,
            isAvailable,
            regionId,
            address,
            consignee,
            mobile,
            comments,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }

    status({ id, isAvailable }) {
        return super.post('/status', {
            id,
            isAvailable,
        });
    }

    select() {
        return super.get('/select', {});
    }
}

export default new Supplier();
export { Supplier };
