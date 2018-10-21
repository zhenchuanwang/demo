/**
 * Created by henian.xu on 2018/7/30.
 *
 */

import queryFormBase from './base';

export default {
    mixins: [queryFormBase],
    data() {
        return {
            pagination: {}, // 只在分页是有用
        };
    },
    methods: {
        /**
         * 查询方法
         */
        onQuery(arg = {}) {
            // console.log('list onQuery');
            this._updatePagination(arg);
            this._routerReplace();
        },
        /**
         * 更新分页数据
         * @param data
         * @private
         */
        _updatePagination({ currentPage = 1, pageSize = this.pagination.pageSize } = {}) {
            this.pagination = {
                ...this.pagination,
                currentPage,
                pageSize,
            };
        },
        /**
         * 路由变化执行查询，子类必需实现 <promise> getListData 方法
         * @param data
         * @private
         */
        _query(data) {
            // console.log('query');
            this.querying = true;
            this.getListData(data).then(() => {
                this.querying = false;
            });
        },
    },
};
