/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopStore extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopStore';
    }

    data({ storeName, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            storeName,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id, type }) {
        const url = type === 1 ? '/get' : '/getCurr';
        return super.get(url, { id }).then(json => {
            const { shopStore } = json.data.data;
            if (!shopStore.storeLogo) {
                shopStore.storeLogo = [];
            } else {
                shopStore.storeLogo = shopStore.storeLogo.split(',').reduce((prev, curr) => {
                    prev.push({
                        name: curr,
                        address: shopStore.fileBasePath + curr,
                    });
                    return prev;
                }, []);
            }
            if (!shopStore.storeAdImage) {
                shopStore.storeAdImage = [];
            } else {
                shopStore.storeAdImage = shopStore.storeAdImage.split(',').reduce((prev, curr) => {
                    prev.push({
                        name: curr,
                        address: shopStore.fileBasePath + curr,
                    });
                    return prev;
                }, []);
            }
            if (shopStore.addressLatitude && shopStore.addressLongitude) {
                shopStore.latLng = shopStore.addressLongitude + ',' + shopStore.addressLatitude;
            }
            return json;
        });
    }

    save({
        id,
        storeName,
        storeLogo,
        storeAdImage,
        openTime,
        storeNotice,
        storeType,
        storeDesc,
        storeRegionId,
        storeDetailAddress,
        latLng,
        contactFullname,
        contactTel,
        isAvailable,
        userIds,
    } = {}) {
        const storeLogoStr = storeLogo
            .reduce((prev, curr) => {
                prev.push(curr.name);
                return prev;
            }, [])
            .join(',');

        const storeAdImageStr = storeAdImage
            .reduce((prev, curr) => {
                prev.push(curr.name);
                return prev;
            }, [])
            .join(',');

        let addressLongitude = null;
        let addressLatitude = null;
        if (latLng) {
            addressLongitude = latLng.split(',')[0];
            addressLatitude = latLng.split(',')[1];
        }
        return super.post('/save', {
            id,
            storeName,
            storeLogo: storeLogoStr,
            storeAdImage: storeAdImageStr,
            openTime,
            storeNotice,
            storeType,
            storeDesc,
            storeRegionId,
            storeDetailAddress,
            addressLongitude: addressLongitude,
            addressLatitude: addressLatitude,
            contactFullname,
            contactTel,
            isAvailable,
            userIds,
        });
    }
}

export default new ShopStore();
export { ShopStore };
