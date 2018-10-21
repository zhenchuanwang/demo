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
                :model="formModel"
                :rules="formRules"
            >
                <el-card
                    class="ma-t"
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
                                label="付款方式:"
                                label-width="8em"
                            >
                                {{ order.paymentModeName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="订单金额:"
                                label-width="8em"
                            >
                                {{ order.payableAmount }}
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
                        <el-col :span="12">
                            <el-form-item
                                label="收货人地址:"
                                label-width="8em"
                            >
                                {{ order.deliveryRegionName }} {{ order.deliveryAddress }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="买家昵称:"
                                label-width="8em"
                            >
                                {{ order.nickName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
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
                    class="ma-t"
                    size="small"
                    shadow="never"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>商品信息</span>
                    </div>
                    <div class="item">
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
                    </div>
                </el-card>
                <el-card
                    class="ma-t"
                    size="small"
                    shadow="never"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>售后信息</span>
                    </div>
                    <div class="item">
                        <el-col :span="12">
                            <el-form-item
                                label="售后编号:"
                                label-width="8em"
                            >
                                {{ orderRefund.refundSn }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="售后类型:"
                                label-width="8em"
                            >
                                {{ orderRefund.orderDetailId ? '商品售后' : '订单取消' }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="退款类型:"
                                label-width="8em"
                            >
                                {{ orderRefund.orderRefundTypeName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="售后原因:"
                                label-width="8em"
                            >
                                {{ orderRefund.refundReasonName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="售后商品数量:"
                                label-width="8em"
                            >
                                {{ orderRefund.refundQuantity }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="退款金额:"
                                label-width="8em"
                            >
                                {{ orderRefund.refundAmount }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="售后状态:"
                                label-width="8em"
                            >
                                {{ orderRefund.refundStatusName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="售后说明:"
                                label-width="8em"
                            >
                                {{ orderRefund.refundDesc }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="售后凭证:"
                                label-width="8em"
                            >
                                <ImageList
                                    :data="orderRefund.refundAttachmentUrlList || ''"
                                />
                            </el-form-item>
                        </el-col>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="orderRefund.refundStatus !== 1 && orderRefund.refundStatus !== 5"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>审核信息</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            label="审核操作人:"
                            label-width="8em"
                        >
                            {{ orderRefund.auditFullName }}({{ orderRefund.auditUserName }})
                        </el-form-item>
                        <el-form-item
                            label="审核时间:"
                            label-width="8em"
                        >
                            {{ orderRefund.auditTime | moment('YYYY-MM-DD HH:mm:ss') }}
                        </el-form-item>
                        <el-form-item
                            label="审核说明:"
                            label-width="8em"
                        >
                            {{ orderRefund.auditDesc }}
                        </el-form-item>
                        <el-form-item
                            label="审核凭证:"
                            label-width="8em"
                        >
                            <ImageList
                                :data="orderRefund.auditAttachmentUrlList || ''"
                            />
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    class="ma-t"
                    size="small"
                    shadow="never"
                    v-if="orderRefund.orderRefundType == 2 && (orderRefund.refundStatus == 2 || orderRefund.refundStatus == 3 || orderRefund.refundStatus == 7)"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>退货信息</span>
                    </div>
                    <div class="item">
                        <el-col :span="12">
                            <el-form-item
                                label="退货地址:"
                                label-width="8em"
                            >
                                {{ orderRefund.refundRegionName }} {{ orderRefund.refundAddress }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="退货收件人:"
                                label-width="8em"
                            >
                                {{ orderRefund.refundConsignee }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="退货电话:"
                                label-width="8em"
                            >
                                {{ orderRefund.refundMobile }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="物流公司:"
                                label-width="8em"
                            >
                                {{ orderRefund.expressName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="快递单号:"
                                label-width="8em"
                            >
                                {{ orderRefund.trackingNumber }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="退货时间:"
                                label-width="8em"
                            >
                                {{ orderRefund.refundTime | moment('YYYY-MM-DD HH:mm:ss') }}
                            </el-form-item>
                        </el-col>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="orderRefund.orderRefundType == 2 && (orderRefund.refundStatus == 2 || orderRefund.refundStatus == 3)"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>收货信息</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            label="收货操作人:"
                            label-width="8em"
                        >
                            {{ orderRefund.recFullName }}({{ orderRefund.recUserName }})
                        </el-form-item>
                        <el-form-item
                            label="收货时间:"
                            label-width="8em"
                        >
                            {{ orderRefund.receiveTime | moment('YYYY-MM-DD HH:mm:ss') }}
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="orderRefund.refundStatus == 3 && order.paymentMode == 2"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>付款信息</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            label="付款操作人:"
                            label-width="8em"
                        >
                            {{ orderRefund.payFullName }}({{ orderRefund.payUserName }})
                        </el-form-item>
                        <el-form-item
                            label="付款时间:"
                            label-width="8em"
                        >
                            {{ orderRefund.paymentTime | moment('YYYY-MM-DD HH:mm:ss') }}
                        </el-form-item>
                        <el-form-item
                            label="付款凭证:"
                            label-width="8em"
                        >
                            <ImageList
                                :data="orderRefund.paymentAttachmentUrlList || ''"
                            />
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-show="orderRefund.refundStatus == 1"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>审核信息</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            prop="auditAttachment"
                            label="审核凭证"
                            label-width="8em"
                        >
                            <upload
                                action="/rs/attachment/uploadOrderRefundImage"
                                :limit="1"
                                v-model="formModel.auditAttachment"
                            />
                        </el-form-item>
                        <el-form-item
                            prop="auditDesc"
                            label="审核备注"
                            label-width="8em"
                            v-if="orderRefund.refundStatus == 1"
                        >
                            <el-input
                                type="textarea"
                                v-model="formModel.auditDesc"
                                auto-complete="off"
                            />
                        </el-form-item>
                        <el-form-item
                            label-width="8em"
                        >
                            <el-button
                                type="primary"
                                size="small"
                                @click="onConfirmPass()"
                            >审核通过
                            </el-button>
                            <el-button
                                type="primary"
                                size="small"
                                @click="onConfirmErr()"
                            >审核不通过
                            </el-button>
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-show="orderRefund.refundStatus == 2 && order.paymentMode == 2"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>付款信息</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            prop="paymentAttachment"
                            label="付款凭证"
                            label-width="8em"
                        >
                            <upload
                                action="/rs/attachment/uploadOrderRefundImage"
                                :limit="1"
                                v-model="formModel.paymentAttachment"
                            />
                        </el-form-item>
                        <el-form-item
                            prop="paymentDesc"
                            label="付款备注"
                            label-width="8em"
                            v-if="orderRefund.refundStatus == 2 && order.paymentMode == 2"
                        >
                            <el-input
                                type="textarea"
                                v-model="formModel.paymentDesc"
                                auto-complete="off"
                            />
                        </el-form-item>
                        <el-form-item
                            label-width="8em"
                        >
                            <el-button
                                type="primary"
                                size="small"
                                @click="onPayConfirm()"
                            >提交付款信息
                            </el-button>
                        </el-form-item>
                    </div>
                </el-card>
                <el-col :span="12">
                    <el-form-item
                        label-width="8em"
                        class="ma-t"
                    >
                        <el-button
                            type="primary"
                            size="small"
                            @click="onRecConfirm()"
                            v-if="orderRefund.refundStatus == 7"
                        >确认收货
                        </el-button>
                        <el-button
                            size="small"
                            @click="$router.back()"
                        >返 回
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </template>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'OrderRefundDetail',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                auditStatus: '',
                auditAttachment: [],
                auditDesc: '',
                paymentAttachment: [],
                paymentDesc: '',
            },
            // 表单校验规则
            formRules: {
                auditDesc: {
                    required: true,
                    message: '请输入审核备注',
                    trigger: 'blur',
                },
                paymentDesc: {
                    required: true,
                    message: '请输入付款备注',
                    trigger: 'blur',
                },
            },
            orderRefund: {},
            order: {},
        };
    },
    methods: {
        init() {
            this.$api.Ex.OrderRefund.getDetail({ id: this.formModel.id }).then(json => {
                const res = json.data.data;
                this.orderRefund = res.orderRefund || {};
                this.order = res.order || {};
            });
        },
        onConfirmPass() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$confirm('是否确定审核通过！', '温馨提示', {
                    type: 'warning',
                }).then(() => {
                    this.formModel.auditStatus = 1;
                    this.$api.Ex.OrderRefund.orderRefundAudit({
                        ...this.formModel,
                    }).then(json => {
                        const res = json.data;
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                        this.init();
                    });
                });
            });
        },
        onConfirmErr() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$confirm('是否确定审核不通过！', '温馨提示', {
                    type: 'warning',
                }).then(() => {
                    this.formModel.auditStatus = 2;
                    this.$api.Ex.OrderRefund.orderRefundAudit({
                        ...this.formModel,
                    }).then(json => {
                        const res = json.data;
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                        this.init();
                    });
                });
            });
        },
        onPayConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$confirm('是否确定提交付款信息！', '温馨提示', {
                    type: 'warning',
                }).then(() => {
                    this.$api.Ex.OrderRefund.orderRefundPay({
                        ...this.formModel,
                    }).then(json => {
                        const res = json.data;
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                        this.init();
                    });
                });
            });
        },
        onRecConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$confirm('是否确定收货！', '温馨提示', {
                    type: 'warning',
                }).then(() => {
                    this.$api.Ex.OrderRefund.orderRefundRec({
                        ...this.formModel,
                    }).then(json => {
                        const res = json.data;
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                        this.init();
                    });
                });
            });
        },
    },
    created() {
        this.formModel.id = this.$route.params.id;
        if (this.formModel.id) {
            this.init();
        }
    },
};
</script>

<style lang="scss">
</style>
