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
                        v-model="queryFormModel.statDateDay"
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
                <el-table-column type="expand">
                    <template slot-scope="item">
                        <el-table
                            stripe
                            border
                            size="small"
                            :data="item.row.detailList"
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="urllinkTypeName"
                                label="类型"
                                min-width="100"
                            />
                            <el-table-column
                                prop="urllinkShareNum"
                                label="分享数"
                                min-width="100"
                            />
                            <el-table-column
                                prop="pv"
                                label="PV"
                                min-width="50"
                            />
                            <el-table-column
                                prop="uv"
                                label="UV"
                                min-width="50"
                            />
                            <el-table-column
                                prop="ip"
                                label="IP数"
                                min-width="50"
                            />
                            <el-table-column
                                prop="orderNum"
                                label="订单总数"
                                min-width="50"
                            />
                            <el-table-column
                                prop="orderNum"
                                label="订单数"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    {{ scope.row.orderAmount ? scope.row.orderAmount : '0.00' }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="90"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="$router.push('/dt/stat/distributionUrllinkTypeStat?buyerId=' + scope.row.buyerId + '&urllinkType=' + scope.row.urllinkType + '&statBeginDate=' + (queryFormModel.statDateDay ? queryFormModel.statDateDay[0] : '') + '&statEndDate=' + (queryFormModel.statDateDay ? queryFormModel.statDateDay[1] : ''))"
                                    >查看详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="distributorName"
                    label="分销商"
                    min-width="100"
                />
                <el-table-column
                    prop="urllinkShareNum"
                    label="分享数"
                    min-width="100"
                />
                <el-table-column
                    prop="pv"
                    label="PV"
                    min-width="50"
                />
                <el-table-column
                    prop="uv"
                    label="UV"
                    min-width="50"
                />
                <el-table-column
                    prop="ip"
                    label="IP数"
                    min-width="50"
                />
                <el-table-column
                    prop="orderNum"
                    label="订单数"
                    min-width="50"
                />
                <el-table-column
                    prop="orderNum"
                    label="订单金额"
                    min-width="50"
                >
                    <template slot-scope="scope">
                        {{ scope.row.orderAmount ? scope.row.orderAmount : '0.00' }}
                    </template>
                </el-table-column>
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
    name: 'DistributionVisitLogStat',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                statDateDay: '', // 统计日期
                type: '1',
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Stat.BuyerVisitLog.distributionVisitLogStatList(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
    },
    created() {
        this.queryFormModel.statDateDay = [
            this.$utils.Comm.getSysMonthFirstDayDate(),
            this.$utils.Comm.getSysDayDate(),
        ];
    },
};
</script>

<style lang="scss">
</style>
