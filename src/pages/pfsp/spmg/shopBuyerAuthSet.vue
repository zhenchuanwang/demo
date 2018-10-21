<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page back>
        <!-- 内容 -->
        <div 
            class="body"
            slot="body"
        >
            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="authTypeName"
                    label="认证名称"
                    min-width="100"
                />
                <el-table-column
                    prop="isNeedAudit"
                    label="是否需要审核"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.isNeedAudit"
                            @input="onIsNeedAuditInput($event,scope)"
                        />
                    </template>
                </el-table-column>
            </el-table>
            <div class="pa-t">
                <el-button
                    size="small"
                    type="primary"
                    @click="$router.back()"
                >返 回
                </el-button>
            </div>
        </div>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'ShopBuyerAuthSet',
    mixins: [pagesMixin],
    data() {
        return {
            queryFormModel: {
                shopId: '', // 店铺ID
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData() {
            return this.$api.Sp.ShopBuyerAuthSet.shopBuyerAuthSetList({
                shopId: this.queryFormModel.shopId,
            }).then(json => {
                const res = json.data;
                this.tableData = res.data;
            });
        },
        onIsNeedAuditInput(val, scope) {
            const { row } = scope;
            if (!row) return;
            this.$api.Sp.ShopBuyerAuthSet.isNeedAudit({
                shopId: this.queryFormModel.shopId,
                authType: row.id,
                isNeedAudit: row.isNeedAudit,
            })
                .then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                })
                .catch(() => {
                    this.$message({
                        message: '操作失败请重试！',
                        type: 'error',
                    });
                    row.isNeedAudit = !row.isNeedAudit;
                });
        },
    },
    created() {
        this.queryFormModel.shopId = this.$route.params.id;
        if (this.queryFormModel.shopId) {
            this.getListData();
        }
    },
};
</script>

<style lang="scss">
</style>
