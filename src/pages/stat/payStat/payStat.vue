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
                    prop="statDateDay"
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

            <el-row
                class="second-header bc-t npa-a"
                :gutter="12">
                <el-col :span="8">
                    <el-card
                        shadow="hover"
                        :body-style="{ padding: '0px' }">
                        <div
                            class="card-inner"
                            @click="onPaymentMode(0)">
                            <div :class="['img-obj',+queryFormModel.paymentMode === 0?'bc-main':'bc-g6']"><img src="~@/assets/images/icons/icon01.png"></div>
                            <div class="item">
                                <div class="fs-more fw-bold">{{ orderNumAmountStatMap0.orderNum }}</div>
                                <div class="">订单数量</div>
                            </div>
                            <div class="item">
                                <div class="fs-more fw-bold">{{ orderNumAmountStatMap0.payableAmount || 0 }}</div>
                                <div class="">订单金额</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card
                        shadow="hover"
                        :body-style="{ padding: '0px' }">
                        <div
                            class="card-inner"
                            @click="onPaymentMode(1)">
                            <div :class="['img-obj',+queryFormModel.paymentMode === 1?'bc-second':'bc-g6']"><img src="~@/assets/images/icons/icon03.png"></div>
                            <div class="item">
                                <div class="fs-more fw-bold">{{ orderNumAmountStatMap1.orderNum }}</div>
                                <div class="">订单数量</div>
                            </div>
                            <div class="item">
                                <div class="fs-more fw-bold">{{ orderNumAmountStatMap1.payableAmount || 0 }}</div>
                                <div class="">订单金额</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card
                        shadow="hover"
                        :body-style="{ padding: '0px' }">
                        <div
                            class="card-inner"
                            @click="onPaymentMode(2)">
                            <div :class="['img-obj',+queryFormModel.paymentMode === 2?'bc-green':'bc-g6']"><img src="~@/assets/images/icons/icon02.png"></div>
                            <div class="item">
                                <div class="fs-more fw-bold">{{ orderNumAmountStatMap2.orderNum }}</div>
                                <div class="">订单数量</div>
                            </div>
                            <div class="item">
                                <div class="fs-more fw-bold">{{ orderNumAmountStatMap2.payableAmount || 0 }}</div>
                                <div class="">订单金额</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
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
                    label="付款日期"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.paymentTime | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderSn"
                    label="订单号"
                    min-width="100"
                />
                <el-table-column
                    prop="externalPaymentSn"
                    label="付款单号"
                    min-width="100"
                />
                <el-table-column
                    prop="payableAmount"
                    label="订单金额"
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
    name: 'PayStat',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                paymentMode: '0',
                statDateDay: '',
            },
            // 表格数据
            tableData: [],
            orderNumAmountStatMap0: {},
            orderNumAmountStatMap1: {},
            orderNumAmountStatMap2: {},
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Stat.PayStat.payStatList(queryData).then(json => {
                const res = json.data.data.orderList;
                this.tableData = res.data;
                this.pagination = res.pagination;

                this.orderNumAmountStatMap0 = json.data.data.orderNumAmountStatMap0;
                this.orderNumAmountStatMap1 = json.data.data.orderNumAmountStatMap1;
                this.orderNumAmountStatMap2 = json.data.data.orderNumAmountStatMap2;

                return Promise.resolve({ data: res });
            });
        },
        /* -- 事件 --*/
        onPaymentMode(mode) {
            if (this.queryFormModel.paymentMode === mode) return;
            this.queryFormModel.paymentMode = mode;
            this.onQuery();
        },
    },
    created() {
        this.queryFormModel.statDateDay = [this.$utils.Comm.getSysDayDate(), this.$utils.Comm.getSysDayDate()];
    },
};
</script>

<style lang="scss" scoped>
.card-inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > .img-obj {
        flex: 0 0 auto;
    }
    > .item {
        flex: 1 1 1%;
        text-align: center;
    }
}
</style>
