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
                    prop="statDate"
                    label="统计时间"
                >
                    <el-date-picker
                        v-model="queryFormModel.statDate"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"/>
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
    name: 'DistributorStat',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                statDate: '', // 统计日期
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Stat.DistributorStat.distributorStatList(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
    },
};
</script>

<style lang="scss">
</style>
