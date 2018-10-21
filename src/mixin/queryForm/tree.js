/**
 * Created by henian.xu on 2018/7/30.
 *
 */

import queryFormBase from './base';

export default {
    mixins: [queryFormBase],
    methods: {
        /**
         * 路由变化执行查询
         * @param data
         * @private
         */
        _query(/*data*/) {
            console.log('tree _query');
            const { treeTable } = this.$refs;
            if (!treeTable) return;
            this.querying = true;
            treeTable.loadNode().then(() => {
                this.querying = false;
            });
        },
    },
};
