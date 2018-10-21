<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-tabs
                class="classify-tabs"
                v-model="queryFormModel.orderStatus"
                type="card"
                @tab-click="onQuery()"
            >
                <el-tab-pane
                    label="全部"
                    name="0"/>
                <el-tab-pane
                    label="待自取"
                    name="40"/>
                <el-tab-pane
                    label="已完成"
                    name="100"/>
                <el-tab-pane
                    label="已取消"
                    name="99"/>
            </el-tabs>
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
                <el-form-item
                    prop="orderSn"
                    label="订单编号"
                >
                    <el-input
                        v-model="queryFormModel.orderSn"
                        placeholder="请输入订单编号"
                    />
                </el-form-item>
                <el-form-item
                    prop="goodsName"
                    label="商品名称"
                >
                    <el-input
                        v-model="queryFormModel.goodsName"
                        placeholder="请输入商品名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="orderType"
                    label="订单类型"
                >
                    <dictionaries-picker
                        type="orderType"
                        v-model="queryFormModel.orderType"
                    />
                </el-form-item>
                <el-form-item
                    prop="paymentMode"
                    label="付款类型"
                >
                    <dictionaries-picker
                        type="paymentMode"
                        v-model="queryFormModel.paymentMode"
                    />
                </el-form-item>
                <el-form-item
                    prop="buyerLevelId"
                    label="会员等级"
                >
                    <el-select
                        v-model="queryFormModel.buyerLevelId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in buyerLevelList"
                            :key="item.id"
                            :label="item.levelName"
                            :value="item.id + ''"/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="orderSource"
                    label="订单来源"
                >
                    <dictionaries-picker
                        type="orderSource"
                        v-model="queryFormModel.orderSource"
                    />
                </el-form-item>
                <el-form-item
                    prop="extendFieldInfo"
                    label="扩展信息"
                >
                    <el-input
                        v-model="queryFormModel.extendFieldInfo"
                        placeholder="请输入扩展信息"
                    />
                </el-form-item>
                <el-form-item
                    prop="pickupDate"
                    label="自取日期"
                >
                    <el-date-picker
                        v-model="queryFormModel.pickupDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择自取日期"/>
                </el-form-item>
                <el-form-item
                    prop="orderTime"
                    label="下单时间"
                >
                    <el-date-picker
                        v-model="queryFormModel.orderTime"
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
            <!-- 操作 -->
            <div
                class="ma-b"
            >
                <el-button-group>
                    <el-button
                        type="success"
                        icon="el-icon-download"
                        size="small"
                        @click="exportOrderExcel"
                    >订单导出
                    </el-button>
                    <el-button
                        type="success"
                        icon="el-icon-download"
                        size="small"
                        @click="exportGoodsStatExcel"
                    >商品统计
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
                @selection-change="onTableSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="36"
                />
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
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderSn"
                    label="订单编号"
                    width="150"
                >
                    <template slot-scope="scope">
                        <ImageList
                            class="dp-ib"
                            :data="scope.row.buyerLevelIconUrl"
                            item-width="20px"
                        />
                        {{ scope.row.orderSn }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="下单时间"
                    width="135"
                >
                    <template slot-scope="scope">
                        {{ scope.row.orderTime | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="payableAmount"
                    label="订单金额"
                    width="70"
                >
                    <template
                        slot-scope="scope"
                    >
                        <el-popover
                            trigger="hover">
                            <el-table :data="scope.row.amountInfoList">
                                <el-table-column
                                    width="150px"
                                    property="label"
                                />
                                <el-table-column
                                    width="100px"
                                    property="value"
                                />
                            </el-table>
                            <span
                                slot="reference"
                                class="tc-blue"
                            >{{ scope.row.payableAmount }}</span>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderSourceName"
                    label="订单来源"
                    width="70"
                />
                <el-table-column
                    prop="orderTypeName"
                    label="订单类型"
                    width="70"
                />
                <el-table-column
                    prop="paymentModeName"
                    label="付款类型"
                    width="70"
                />
                <el-table-column
                    label="自取日期"
                    width="135"
                >
                    <template slot-scope="scope">
                        {{ scope.row.pickupDate | moment('YYYY-MM-DD') }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="pickupTime"
                    label="自取时间"
                    min-width="70"
                />
                <el-table-column
                    prop="orderStatusName"
                    label="订单状态"
                    width="70"
                />
                <el-table-column
                    prop="buyerMsg"
                    label="买家留言"
                    min-width="100"
                />
                <el-table-column
                    label="扩展信息"
                    min-width="100"
                >
                    <template
                        slot-scope="scope"
                        v-if="scope.row.extendFieldInfoList && scope.row.extendFieldInfoList.length != 0">
                        <el-popover
                            trigger="hover">
                            <el-table :data="scope.row.extendFieldInfoList">
                                <el-table-column
                                    width="150px"
                                    property="label"
                                    label="字段名称"
                                />
                                <el-table-column
                                    width="200px"
                                    property="value"
                                    label="字段值"
                                />
                            </el-table>
                            <span
                                slot="reference"
                                class="tc-blue"
                            >{{ scope.row.extendFieldInfoList[0].label }}:{{ scope.row.extendFieldInfoList[0].value }}</span>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/storeOrder/order/storeOrderDetail/' + scope.row.id)"
                        >查看
                        </el-button>
                        <template v-if="userData.user.appId === 3">
                            <el-button
                                type="text"
                                size="small"
                                @click="completeOrder(scope.row)"
                                v-if="scope.row.orderStatus === 40"
                            >完成订单
                            </el-button>
                            <el-button
                                type="text"
                                size="small"
                                @click="cancelOrder(scope.row)"
                                v-if="scope.row.orderStatus !== 99 && scope.row.isSettlement !== 1"
                            >取消订单
                            </el-button>
                        </template>
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

        <el-dialog
            title="取消订单"
            center
            width="600px"
            :visible.sync="cancelDialog.isVisible"
            @closed="onCancelDialogCancel"
        >
            <el-form
                ref="cancelForm"
                size="small"
                :model="cancelDialog.formModel"
                :rules="cancelDialog.formRules"
            >
                <el-form-item
                    prop="cancelDesc"
                    label="取消原因"
                    label-width="6em"
                >
                    <el-input
                        type="textarea"
                        v-model="cancelDialog.formModel.cancelDesc"
                        auto-complete="off"
                    />
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    @click="onCancelDialogConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onCancelDialogCancel"
                >取 消
                </el-button>
            </div>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormList } from '@/mixin/queryForm/index';

export default {
    name: 'StoreOrder',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                orderSn: '',
                deliveryConsignee: '',
                deliveryPhone: '',
                orderStatus: '40',
                goodsName: '',
                orderType: '',
                paymentMode: '',
                shipMethod: '2',
                buyerLevelId: '',
                pickupDate: '',
                extendFieldInfo: '',
                orderTime: '',
                goodsTypeNE: '',
                goodsType: '1',
                orderSource: '',
            },
            // 取消订单
            cancelDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    cancelDesc: '',
                },
                // 表单校验规则
                formRules: {
                    cancelDesc: {
                        required: true,
                        message: '请输入取消原因',
                        trigger: 'blur',
                    },
                },
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            //等级列表
            buyerLevelList: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Ex.Order.orderList(queryData).then(json => {
                const res = json.data;
                res.data.forEach(item => {
                    const amountInfoList = [];
                    amountInfoList.push({
                        label: '商品总金额',
                        value: item.goodsAmount,
                    });
                    amountInfoList.push({
                        label: '运费',
                        value: item.freight,
                    });
                    amountInfoList.push({
                        label: '优惠券金额',
                        value: item.couponAmount,
                    });
                    amountInfoList.push({
                        label: '积分抵扣金额',
                        value: item.pointAmount,
                    });
                    amountInfoList.push({
                        label: '总优惠金额',
                        value: item.totalDiscountAmount,
                    });
                    amountInfoList.push({
                        label: '订单金额',
                        value: item.payableAmount,
                    });
                    item.amountInfoList = amountInfoList;
                });
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onTableSelectionChange(val) {
            this.currentTableSelect = val;
        },
        //完成订单
        completeOrder(row) {
            this.$confirm('是否确定要完成该订单！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Ex.Order.completeOrder({ orderId: row.id }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                });
            });
        },
        //取消订单
        cancelOrder(row) {
            this.cancelDialog.formModel.id = row.id;
            this.cancelDialog.isVisible = true;
        },
        onCancelDialogConfirm() {
            const { cancelForm } = this.$refs;
            cancelForm.validate().then(() => {
                this.$api.Ex.Order.cancelOrder({
                    ...this.cancelDialog.formModel,
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                    this.cancelDialog.isVisible = false;
                });
            });
        },
        onCancelDialogCancel() {
            const { cancelForm } = this.$refs;
            cancelForm.resetFields();
            const { formModel } = this.cancelDialog;
            formModel.id = '';
            this.cancelDialog.isVisible = false;
        },
        initLevelList() {
            this.$api.Mb.BuyerLevel.select().then(json => {
                const res = json.data.data;
                this.buyerLevelList = res;
            });
        },
        //excel导出
        exportOrderExcel() {
            let ids = '';
            if (this.currentTableSelect.length !== 0) {
                const idList = [];
                this.currentTableSelect.forEach(item => {
                    idList.push(item.id);
                });
                ids = idList.join(',');
            }
            let orderBeginTime = null;
            let orderEndTime = null;
            if (this.queryFormModel.orderTime != null && this.queryFormModel.orderTime.length === 2) {
                orderBeginTime = this.queryFormModel.orderTime[0];
                orderEndTime = this.queryFormModel.orderTime[1];
            }
            this.$utils.Comm.exportExcel('/ex/order/exportOrderExcel', {
                ...this.queryFormModel,
                orderBeginTime: orderBeginTime,
                orderEndTime: orderEndTime,
                ids: ids,
            });
        },
        exportGoodsStatExcel() {
            let ids = '';
            if (this.currentTableSelect.length !== 0) {
                const idList = [];
                this.currentTableSelect.forEach(item => {
                    idList.push(item.id);
                });
                ids = idList.join(',');
            }
            let orderBeginTime = null;
            let orderEndTime = null;
            if (this.queryFormModel.orderTime != null && this.queryFormModel.orderTime.length === 2) {
                orderBeginTime = this.queryFormModel.orderTime[0];
                orderEndTime = this.queryFormModel.orderTime[1];
            }
            this.$utils.Comm.exportExcel('/ex/order/exportGoodsStatExcel', {
                ...this.queryFormModel,
                orderBeginTime: orderBeginTime,
                orderEndTime: orderEndTime,
                ids: ids,
            });
        },
    },
    created() {
        this.initLevelList();
    },
};
</script>

<style lang="scss">
</style>
