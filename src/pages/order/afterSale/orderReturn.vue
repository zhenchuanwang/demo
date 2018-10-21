<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-tabs
                class="classify-tabs"
                v-model="queryFormModel.refundStatus"
                type="card"
                @tab-click="onQuery()"
            >
                <el-tab-pane
                    label="待审核"
                    name="1"/>
                <el-tab-pane
                    label="待退货"
                    name="6"/>
                <el-tab-pane
                    label="待收货"
                    name="7"/>
                <el-tab-pane
                    label="待打款"
                    name="2"/>
                <el-tab-pane
                    label="已退款"
                    name="3"/>
                <el-tab-pane
                    label="已关闭"
                    name="4"/>
            </el-tabs>
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
                <el-form-item
                    prop="refundSn"
                    label="退款单号"
                >
                    <el-input
                        v-model="queryFormModel.refundSn"
                        placeholder="请输入退款单号"
                    />
                </el-form-item>
                <el-form-item
                    prop="orderSn"
                    label="订单编号"
                >
                    <el-input
                        v-model="queryFormModel.orderSn"
                        placeholder="请输入订单编号"
                    />
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
                <el-table-column type="expand">
                    <template slot-scope="order">
                        <el-table
                            stripe
                            border
                            size="small"
                            :data="order.row.orderDetailList"
                            style="width: 100%"
                        >
                            <el-table-column
                                label="商品图片"
                                width="120"
                            >
                                <template slot-scope="scope">
                                    <ImageList
                                        :data="scope.row.specImageUrl"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="goodsName"
                                label="商品名称"
                                min-width="100"
                            />
                            <el-table-column
                                prop="specDesc"
                                label="商品规格"
                                min-width="100"
                            />
                            <el-table-column
                                prop="finalPrice"
                                label="商品价格"
                                min-width="50"
                            />
                            <el-table-column
                                prop="quantity"
                                label="数量"
                                min-width="50"
                            />
                            <el-table-column
                                prop="subtotalAmount"
                                label="小计"
                                min-width="50"
                            />
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="refundSn"
                    label="退款单号"
                    min-width="100"
                />
                <el-table-column
                    prop="orderSn"
                    label="订单编号"
                    min-width="100"
                />
                <el-table-column
                    prop="orderStatusName"
                    label="订单状态"
                    min-width="100"
                />
                <el-table-column
                    prop="refundReasonName"
                    label="退款原因"
                    min-width="100"
                />
                <el-table-column
                    prop="refundQuantity"
                    label="退款商品数量"
                    min-width="100"
                />
                <el-table-column
                    prop="refundAmount"
                    label="退款金额"
                    min-width="100"
                />
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="70"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/order/afterSale/orderReturn/detail/' + scope.row.id)"
                        >{{ scope.row.refundStatus === 1 ? '审核' : scope.row.refundStatus === 7 ? '收货' : scope.row.refundStatus === 2 && scope.row.paymentMode === 2 ? '线下付款' : '查看' }}
                        </el-button>
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
    name: 'OrderReturn',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                refundSn: '', // 退款单号
                orderSn: '', // 订单编号
                orderRefundType: '2',
                refundStatus: '1',
                refundType: '',
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Ex.OrderRefund.data(queryData).then(json => {
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
