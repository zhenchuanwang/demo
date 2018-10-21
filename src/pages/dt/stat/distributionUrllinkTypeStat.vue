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
                <el-table-column
                    label="分享时间"
                    width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.shareTime | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="商品图片"
                    width="120"
                    v-if="queryFormModel.urllinkType == 1"
                >
                    <template slot-scope="scope">
                        <ImageList
                            :data="scope.row.mainImageUrl"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    min-width="100"
                    v-if="queryFormModel.urllinkType == 1"
                />
                <el-table-column
                    prop="shopGoodsCatName"
                    label="类目名称"
                    min-width="100"
                    v-if="queryFormModel.urllinkType == 2"
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
                statDateDay: [], // 统计日期
                type: '1',
                buyerId: '',
                urllinkType: '',
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Stat.BuyerVisitLog.distributionUrllinkTypeStatList(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
    },
    created() {
        if (this.$route.query.statBeginDate && this.$route.query.statEndDate) {
            this.queryFormModel.statDateDay = [this.$route.query.statBeginDate, this.$route.query.statEndDate];
        }
        this.queryFormModel.buyerId = this.$route.query.buyerId;
        this.queryFormModel.urllinkType = this.$route.query.urllinkType;
    },
};
</script>

<style lang="scss">
</style>
