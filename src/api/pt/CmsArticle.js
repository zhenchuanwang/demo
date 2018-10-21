/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Pt } from './Pt';

class CmsArticle extends Pt {
    constructor() {
        super();
        this.baseUrl += '/cmsArticle';
    }

    data({ title, cmsCatalogId, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            title,
            cmsCatalogId,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id }).then(json => {
            const titleImage = json.data.data.titleImage;
            const fileBasePath = json.data.data.fileBasePath;
            if (!titleImage) {
                json.data.data.titleImage = [];
            } else {
                json.data.data.titleImage = titleImage.split(',').reduce((prev, curr) => {
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

    save({ id, title, subtitle, cmsCatalogId, titleImage, digest, author, source, isShowReleaseTime, content } = {}) {
        const titleImageStr = titleImage
            .reduce((prev, curr) => {
                prev.push(curr.name);
                return prev;
            }, [])
            .join(',');
        return super.post('/save', {
            id,
            title,
            subtitle,
            cmsCatalogId,
            titleImage: titleImageStr,
            digest,
            author,
            source,
            isShowReleaseTime,
            content,
        });
    }

    delete({ ids } = {}) {
        return super.post('/delete', {
            ids,
        });
    }
}

export default new CmsArticle();
export { CmsArticle };
