/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Sp } from './Sp';

class ShopGoodsCat extends Sp {
    constructor() {
        super();
        this.baseUrl += '/shopGoodsCat';
    }

    data({ pId, name, isAvailable } = {}) {
        return super.get('/data', {
            pId,
            name,
            isAvailable,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id }).then(json => {
            const goodsCatImage = json.data.data.goodsCatImage;
            const fileBasePath = json.data.data.fileBasePath;
            if (!goodsCatImage) {
                json.data.data.goodsCatImage = [];
            } else {
                json.data.data.goodsCatImage = goodsCatImage.split(',').reduce((prev, curr) => {
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

    save({ id, parentId, name, goodsCatImage, orderNum, isAvailable } = {}) {
        const goodsCatImageStr = goodsCatImage
            .reduce((prev, curr) => {
                prev.push(curr.name);
                return prev;
            }, [])
            .join(',');
        return super.post('/save', {
            id,
            parentId,
            name,
            goodsCatImage: goodsCatImageStr,
            orderNum,
            isAvailable,
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

    exists({ id, pId, name } = {}) {
        return super.get('/exists', {
            id,
            pId,
            name,
        });
    }

    select() {
        return super.get('/select', {});
    }

    loadSelectNode({ id } = {}) {
        return super.get('/loadSelectNode', {
            id,
            _isRepeat: true,
        });
    }
}

export default new ShopGoodsCat();
export { ShopGoodsCat };
