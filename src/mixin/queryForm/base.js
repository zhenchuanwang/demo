/**
 * Created by henian.xu on 2018/7/23.
 * 查询类混合器
 */

export default {
    data() {
        return {
            initQueryed: false, // 是否已初始查询过了，以此保证仅执行一次初始查询
            recoverFormModeled: false, // 是否已恢复过查询表单的数据
            queryFormModel: {}, // 必需在子类重写(这里只是规范定义)
            queryFormRules: {}, // 必需在子类重写(这里只是规范定义)
            querying: false, // 是否查询中
        };
    },
    computed: {
        /**
         * 当此值第一次为 true 执行第一次查询，子类可覆盖之方法 (参考 rs/role.vue 的 appPicker 组件的 appId)
         * @returns {boolean}
         * @override
         */
        isFormInitialized() {
            return true;
        },
        /**
         * 是否开始初始查询
         * @returns {default.computed.isFormInitialized|(function(): boolean)|boolean}
         * @private
         */
        startInitQuery() {
            return this.isFormInitialized && this.recoverFormModeled;
        },
        $$queryForm() {
            return this.$refs.queryForm;
        },
        queryData() {
            const res = {};
            const { currentPage, pageSize } = this.pagination || {};
            const data = {
                ...this.queryFormModel,
                currentPage,
                pageSize,
            };
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    let item = data[key];
                    if (typeof item === 'string') {
                        item = item.trim();
                    }
                    const isBooleanAnNumber = typeof item === 'boolean' || typeof item === 'number';
                    if (
                        !isBooleanAnNumber &&
                        (!item || (Array.isArray(item) && !item.length) || JSON.stringify(item) === '{}')
                    ) {
                        continue;
                    }
                    res[key] = item;
                }
            }
            return res;
        },
    },
    watch: {
        startInitQuery: {
            handler(val /*, oldVal*/) {
                if (val && !this.initQueryed) {
                    this._query(this.queryData);
                    this.initQueryed = true;
                }
            },
            immediate: true,
        },
    },
    methods: {
        /**
         * 查询方法
         */
        onQuery(/*arg = {}*/) {
            // console.log('base onQuery');
            this._routerReplace();
        },
        /**
         * 重置查询表单
         */
        onReset() {
            this.$$queryForm.resetFields();
        },
        /**
         * 路由变化执行查询 (子类必需实现此方法)
         * @param data
         * @private
         * @override
         */
        _query(/*data*/) {},
        /**
         * 查询路由变更
         * @private
         */
        _routerReplace() {
            // console.log('_routerReplace');
            this._startReplace().then((/*router*/) => {
                this._query(this.queryData);
            });
        },
        _startReplace() {
            const currentPath = this.$route.path;
            return new Promise((resolve, reject) => {
                this.$router.replace(
                    {
                        query: this.queryData,
                    },
                    to => {
                        // onComplete 导航成功完成 (在所有的异步钩子被解析之后)
                        // console.log(to, form, next);
                        resolve(to);
                    },
                    () => {
                        // onAbort 导航成功终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由)
                        // console.log('onAbort', to, form, next);
                        if (currentPath === this.$route.path) {
                            resolve(this.$route);
                        } else {
                            reject(new Error('路由跳转过程中被变更'));
                        }
                    },
                );
            });
        },
        /**
         * 根据路由查询恢复查询表单选项
         * @private
         */
        _recoverFormModel() {
            const { queryFormModel, pagination, $nextTick } = this;
            const routeQuery = this.$route.query || {};
            // 因为无法重置表单到最初状态所以间隔一个渲染
            $nextTick(() => {
                // 恢复查询表单
                this.$utils.Comm.formModelMerge(queryFormModel, routeQuery);
                // 恢复分页
                if (pagination) {
                    const { currentPage, pageSize } = routeQuery;
                    pagination.currentPage = +currentPage || pagination.currentPage;
                    pagination.pageSize = +pageSize || pagination.pageSize;
                }
                this.recoverFormModeled = true;
            });
        },
    },
    beforeRouteEnter(to, form, next) {
        next(vm => {
            vm._recoverFormModel();
        });
    },
};
