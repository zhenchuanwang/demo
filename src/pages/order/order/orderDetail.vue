<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page
        back
    >
        <template
            slot="body"
        >
            <el-form
                ref="addForm"
                size="small"
            >
                <el-card
                    size="small"
                    shadow="never"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>订单信息</span>
                    </div>
                    <div class="item">
                        <el-col :span="12">
                            <el-form-item
                                label="订单编号:"
                                label-width="8em"
                            >
                                {{ order.orderSn }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="下单时间:"
                                label-width="8em"
                            >
                                {{ order.orderTime | moment('YYYY-MM-DD HH:mm:ss') }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="订单来源:"
                                label-width="8em"
                            >
                                {{ order.orderSourceName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="商品类型:"
                                label-width="8em"
                            >
                                {{ order.goodsTypeName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="付款模式:"
                                label-width="8em"
                            >
                                {{ order.paymentModeName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="付款时间:"
                                label-width="8em"
                            >
                                {{ order.paymentTime | moment('YYYY-MM-DD HH:mm:ss') }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="订单状态:"
                                label-width="8em"
                            >
                                {{ order.orderStatusName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="买家留言:"
                                label-width="8em"
                            >
                                {{ order.buyerMsg }}
                            </el-form-item>
                        </el-col>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>商品信息</span>
                    </div>
                    <div class="item">
                        <el-form-item>
                            <!-- 表格 -->
                            <el-table
                                stripe
                                border
                                size="small"
                                :data="order.orderDetailList"
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
                        </el-form-item>
                        <el-form-item
                            label="商品总金额:"
                            label-width="8em"
                        >
                            {{ order.goodsAmount }}
                        </el-form-item>
                        <el-form-item
                            label="总运费:"
                            label-width="8em"
                        >
                            {{ order.freight }}
                        </el-form-item>
                        <el-form-item
                            label="优惠券金额:"
                            label-width="8em"
                        >
                            {{ order.couponAmount }}
                        </el-form-item>
                        <el-form-item
                            label="积分抵扣金额:"
                            label-width="8em"
                        >
                            {{ order.pointAmount }}
                        </el-form-item>
                        <el-form-item
                            label="总优惠金额:"
                            label-width="8em"
                        >
                            {{ order.totalDiscountAmount }}
                        </el-form-item>
                        <el-form-item
                            label="订单金额:"
                            label-width="8em"
                        >
                            {{ order.payableAmount }}
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="order.extendFieldInfoList && order.extendFieldInfoList.length != 0"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>扩展信息</span>
                    </div>
                    <div class="item">
                        <el-form-item>
                            <!-- 表格 -->
                            <el-table
                                stripe
                                border
                                size="small"
                                :data="order.extendFieldInfoList"
                                style="width: 100%"
                            >
                                <el-table-column
                                    prop="label"
                                    label="字段名称"
                                    min-width="100"
                                />
                                <el-table-column
                                    prop="value"
                                    label="字段值"
                                    min-width="100"
                                />
                            </el-table>
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="order.shipMethod === 1 && order.goodsType === 1"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <div class="dp-fx fx-row fx-jc-sb fx-ai-c">
                            <span>送货上门</span>
                            <el-button
                                size="mini"
                                type="success"
                                icon="el-icon-edit"
                                @click="editDeliveryInfo"
                                v-if="order.orderStatus === 20"
                            >
                                修改收货信息
                            </el-button>
                        </div>
                    </div>
                    <div class="item">
                        <el-col :span="12">
                            <el-form-item
                                label="收货人姓名:"
                                label-width="8em"
                            >
                                {{ order.deliveryConsignee }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="收货人电话:"
                                label-width="8em"
                            >
                                {{ order.deliveryPhone }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="收货人地址:"
                                label-width="8em"
                            >
                                {{ order.deliveryRegionName }} {{ order.deliveryAddress }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="配送时间:"
                                label-width="8em"
                            >
                                {{ order.shippingTime | moment('YYYY-MM-DD HH:mm:ss') }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="收货时间:"
                                label-width="8em"
                            >
                                {{ order.receiveTime | moment('YYYY-MM-DD HH:mm:ss') }}
                            </el-form-item>
                        </el-col>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="order.shipMethod === 2"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>门店自取</span>
                    </div>
                    <div class="item">
                        <el-col :span="24">
                            <el-form-item
                                label="门店名称:"
                                label-width="8em"
                            >
                                {{ order.pickupStoreName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="门店地址:"
                                label-width="8em"
                            >
                                {{ order.pickupStoreRegionName }} {{ order.pickupStoreName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="自取日期:"
                                label-width="8em"
                            >
                                {{ order.pickupDate | moment('YYYY-MM-DD') }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="自取时间:"
                                label-width="8em"
                            >
                                {{ order.pickupTime }}
                            </el-form-item>
                        </el-col>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="(order.shipMethod === 1) && (order.orderStatus === 30 || order.orderStatus === 100)"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>物流信息</span>
                    </div>
                    <div class="item">
                        <el-col :span="12">
                            <el-form-item
                                label="快递公司名称:"
                                label-width="8em"
                            >
                                {{ order.expressName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="快递公司代码:"
                                label-width="8em"
                            >
                                {{ order.expressCode }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="快递单号:"
                                label-width="8em"
                            >
                                {{ order.trackingNumber }}
                            </el-form-item>
                        </el-col>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>订单日志</span>
                    </div>
                    <div class="item">
                        <el-form-item>
                            <!-- 表格 -->
                            <el-table
                                stripe
                                border
                                size="small"
                                :data="orderLogList"
                                style="width: 100%"
                            >
                                <el-table-column
                                    prop="operateTime"
                                    label="操作时间"
                                    min-width="100"
                                >
                                    <template slot-scope="scope">
                                        {{ scope.row.operateTime | moment('YYYY-MM-DD HH:mm:ss') }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="operatorName"
                                    label="操作人"
                                    min-width="100"
                                />
                                <el-table-column
                                    prop="operateDesc"
                                    label="操作描述"
                                    min-width="100"
                                />
                            </el-table>
                        </el-form-item>
                    </div>
                </el-card>
            </el-form>
            <div class="pa-t">
                <el-button
                    size="small"
                    type="primary"
                    @click="$router.back()"
                >返 回
                </el-button>
            </div>
        </template>

        <!-- 弹框 -->
        <el-dialog
            title="修改收货信息"
            center
            width="600px"
            :visible.sync="deliveryDialog.isVisible"
            @closed="onDeliveryDialogCancel"
        >
            <el-form
                ref="deliveryForm"
                size="small"
                :model="deliveryDialog.formModel"
                :rules="deliveryDialog.formRules"
            >
                <el-form-item
                    prop="deliveryConsignee"
                    label="收货人"
                    label-width="8em"
                >
                    <el-input
                        v-model="deliveryDialog.formModel.deliveryConsignee"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="deliveryPhone"
                    label="收货人电话"
                    label-width="8em"
                >
                    <el-input
                        v-model="deliveryDialog.formModel.deliveryPhone"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="deliveryRegionId"
                    label="收货地址"
                    label-width="8em"
                >
                    <tree-picker
                        :api-class="selectApi"
                        v-model="deliveryDialog.formModel.deliveryRegionId"
                        :p-id="2"
                        :min-lv="2"
                    />
                </el-form-item>
                <el-form-item
                    prop="deliveryAddress"
                    label="详细地址"
                    label-width="8em"
                >
                    <el-input
                        v-model="deliveryDialog.formModel.deliveryAddress"
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
                    @click="onDeliveryDialogConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onDeliveryDialogCancel"
                >取 消
                </el-button>
            </div>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'OrderDetail',
    mixins: [pagesMixin],
    data() {
        return {
            id: '',
            order: {},
            orderLogList: [],
            // 订单发货
            deliveryDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    deliveryConsignee: '',
                    deliveryPhone: '',
                    deliveryRegionId: '',
                    deliveryAddress: '',
                },
                // 表单校验规则
                formRules: {
                    deliveryRegionId: {
                        required: true,
                        message: '请选择收货地址',
                        trigger: 'blur',
                    },
                    deliveryConsignee: {
                        required: true,
                        message: '请输入收货人',
                        trigger: 'blur',
                    },
                    deliveryPhone: {
                        required: true,
                        message: '请输入收货人电话',
                        trigger: 'blur',
                    },
                    deliveryAddress: {
                        required: true,
                        message: '请输入详细地址',
                        trigger: 'blur',
                    },
                },
            },
            selectApi: this.$api.Rs.Region,
        };
    },
    methods: {
        init() {
            this.$api.Ex.Order.getDetail({ id: this.id }).then(json => {
                const res = json.data.data;
                this.order = res.order || {};
                this.orderLogList = res.orderLogList || [];
            });
        },
        //订单发货
        editDeliveryInfo() {
            this.$utils.Comm.formModelMerge(this.deliveryDialog.formModel, this.order);
            this.deliveryDialog.isVisible = true;
        },
        onDeliveryDialogConfirm() {
            const { deliveryForm } = this.$refs;
            deliveryForm.validate().then(() => {
                this.$api.Ex.Order.editOrderDeliveryInfo({
                    ...this.deliveryDialog.formModel,
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.init();
                    this.deliveryDialog.isVisible = false;
                });
            });
        },
        onDeliveryDialogCancel() {
            const { deliveryForm } = this.$refs;
            deliveryForm.resetFields();
            const { formModel } = this.deliveryDialog;
            formModel.id = '';
            this.deliveryDialog.isVisible = false;
        },
    },
    created() {
        this.id = this.$route.params.id;
        if (this.id) {
            this.init();
        }
    },
};
</script>

<style lang="scss">
</style>
