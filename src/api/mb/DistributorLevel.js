/**
 * Created by henian.xu on 2018/7/18.
 *
 */

import { Mb } from './Mb';

class DistributorLevel extends Mb {
    constructor() {
        super();
        this.baseUrl += '/distributorLevel';
    }

    data({ levelName, isAvailable, currentPage, pageSize } = {}) {
        return super.get('/data', {
            levelName,
            isAvailable,
            currentPage,
            pageSize,
        });
    }

    getDetail({ id }) {
        return super.get('/get', { id }).then(json => {
            const levelIcon = json.data.data.levelIcon;
            const fileBasePath = json.data.data.fileBasePath;
            if (!levelIcon) {
                json.data.data.levelIcon = [];
            } else {
                json.data.data.levelIcon = levelIcon.split(',').reduce((prev, curr) => {
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

    save({ id, levelName, levelDesc, levelIcon, orderNum, isAvailable, distributionIncomeMode } = {}) {
        const levelIconStr = levelIcon
            .reduce((prev, curr) => {
                prev.push(curr.name);
                return prev;
            }, [])
            .join(',');
        return super.post('/save', {
            id,
            levelName,
            levelDesc,
            levelIcon: levelIconStr,
            orderNum,
            isAvailable,
            distributionIncomeMode,
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

export default new DistributorLevel();
export { DistributorLevel };
