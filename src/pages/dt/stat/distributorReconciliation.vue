<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
                <el-form-item
                    prop="statDateMonth"
                    label="统计时间"
                >
                    <el-date-picker
                        v-model="queryFormModel.statDateMonth"
                        type="month"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        placeholder="选择月份"/>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onQuery()"
                    >查询
                    </el-button>
                    <el-button
                        type="success"
                        @click="onReset"
                    >重置
                    </el-button>
                </el-form-item>
            </el-form>
        </template>

        <!-- 内容 -->
        <div
            class="body"
            slot="body"
            v-loading="querying"
        >
            <div
                class="ma-b"
            >
                <el-button-group>
                    <el-button
                        type="success"
                        icon="el-icon-download"
                        size="small"
                        @click="exportReconciliationExcel"
                    >导出账单
                    </el-button>
                </el-button-group>
            </div>

            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    type="index"
                    width="50"/>
                <el-table-column
                    prop="distributorName"
                    label="分销商"
                    min-width="100"
                />
                <el-table-column
                    prop="totalOrderNum"
                    label="订单数"
                    min-width="100"
                />
                <el-table-column
                    prop="totalOrderAmount"
                    label="订单金额"
                    min-width="100"
                />
                <el-table-column
                    prop="totalDistributionAmount"
                    label="分销商佣金"
                    min-width="100"
                />
                <el-table-column
                    prop="distributorLevelName"
                    label="分销商等级"
                    min-width="100"
                />
                <el-table-column
                    prop="distributorTel"
                    label="分销商电话"
                    min-width="100"
                />
            </el-table>

            <!-- 分页 -->
            <div class="ma-t ta-r">
                <pagination
                    v-model="pagination"
                    @input="onQuery"
                />
            </div>
        </div>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormList } from '@/mixin/queryForm';

export default {
    name: 'DistributorReconciliation',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                statDateMonth: '', // 统计日期
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Stat.DistributorStat.distributorReconciliationList(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        exportReconciliationExcel() {
            this.$utils.Comm.exportExcel('/stat/distributorStat/exportReconciliationExcel', {
                ...this.queryFormModel,
            });
        },
    },
    created() {
        this.queryFormModel.statDateMonth = this.$utils.Comm.getSysMonthDate();
    },
};
</script>

<style lang="scss">
</style>
