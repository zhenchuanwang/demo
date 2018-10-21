/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class Shop extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shop';
    }

    data({ shopName, shopStatus, currentPage, pageSize } = {}) {
        return super.get('/data', {
            shopName,
            shopStatus,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id }).then(json => {
            const shopLogo = json.data.data.shopLogo;
            const fileBasePath = json.data.data.fileBasePath;
            if (!shopLogo) {
                json.data.data.shopLogo = [];
            } else {
                json.data.data.shopLogo = shopLogo.split(',').reduce((prev, curr) => {
                    prev.push({
                        name: curr,
                        address: fileBasePath + curr,
                    });
                    return prev;
                }, []);
            }
            return json;
        });
    }

    save({
        id,
        orgId,
        shopName,
        shopLogo,
        principalName,
        principalPosition,
        principalMobile,
        principalEmail,
        principalQq,
        shopRegionId,
        shopAddress,
        shopDesc,
        freightMode,
        isAllowMoreLevel,
        shopDomain,
        shopLevelId,
        shopStatus,
        joinTime,
        memberRegisterMode,
        memberAccountSign,
        appid,
        secret,
        token,
        aeskey,
        mapPlaceKey,
        publicApikey,
        publicSecret,
        remarks,
        distributionIncomeMode,
        distributionLevel,
        sellGoodsType,
        shipMethod,
        paymentMode,
        onlinePaymentType,
        orderNoticeMode,
        orderNoticeMobile,
        orderNoticeWebchat,
    } = {}) {
        const shopLogoStr = shopLogo
            .reduce((prev, curr) => {
                prev.push(curr.name);
                return prev;
            }, [])
            .join(',');
        return super.post('/save', {
            id,
            orgId,
            shopName,
            shopLogo: shopLogoStr,
            principalName,
            principalPosition,
            principalMobile,
            principalEmail,
            principalQq,
            shopRegionId,
            shopAddress,
            shopDesc,
            freightMode,
            isAllowMoreLevel,
            shopDomain,
            shopLevelId,
            shopStatus,
            joinTime,
            memberRegisterMode,
            memberAccountSign,
            appid,
            secret,
            token,
            aeskey,
            mapPlaceKey,
            publicApikey,
            publicSecret,
            remarks,
            distributionIncomeMode,
            distributionLevel,
            sellGoodsType,
            shipMethod,
            paymentMode,
            onlinePaymentType,
            orderNoticeMode,
            orderNoticeMobile,
            orderNoticeWebchat,
        });
    }

    getShopInfo() {
        return super.get('/getShopInfo', {}).then(json => {
            const shopLogo = json.data.data.shopLogo;
            const fileBasePath = json.data.data.fileBasePath;
            if (!shopLogo) {
                json.data.data.shopLogo = [];
            } else {
                json.data.data.shopLogo = shopLogo.split(',').reduce((prev, curr) => {
                    prev.push({
                        name: curr,
                        address: fileBasePath + curr,
                    });
                    return prev;
                }, []);
            }
            return json;
        });
    }

    saveShopInfo({
        shopName,
        shopLogo,
        principalName,
        principalPosition,
        principalMobile,
        principalEmail,
        principalQq,
        shopRegionId,
        shopAddress,
        shopDesc,
        freightMode,
        isAllowMoreLevel,
    } = {}) {
        const shopLogoStr = shopLogo
            .reduce((prev, curr) => {
                prev.push(curr.name);
                return prev;
            }, [])
            .join(',');
        return super.post('/saveShopInfo', {
            shopName,
            shopLogo: shopLogoStr,
            principalName,
            principalPosition,
            principalMobile,
            principalEmail,
            principalQq,
            shopRegionId,
            shopAddress,
            shopDesc,
            freightMode,
            isAllowMoreLevel,
        });
    }

    getShopAvailableGoodsType() {
        return super.get('/getShopAvailableGoodsType', {});
    }

    getShopAvailableDistributionIncomeMode() {
        return super.get('/getShopAvailableDistributionIncomeMode', {});
    }

    getShopAvailablePaymentMode() {
        return super.get('/getShopAvailablePaymentMode', {});
    }
}

export default new Shop();
export { Shop };
