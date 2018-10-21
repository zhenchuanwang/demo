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
                    size="small"
                    shadow="never"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>买家信息</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            label="买家手机:"
                            label-width="8em"
                        >
                            {{ buyer.mobile }}
                        </el-form-item>
                        <el-form-item
                            label="注册时间:"
                            label-width="8em"
                        >
                            {{ buyer.registerTime | moment('YYYY-MM-DD HH:mm:ss') }}
                        </el-form-item>
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
                        <span>付款单信息</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            label="系统付款单号:"
                            label-width="8em"
                        >
                            {{ payment.paymentSn }}
                        </el-form-item>
                        <el-form-item
                            label="付款金额:"
                            label-width="8em"
                        >
                            {{ payment.paymentAmount }}
                        </el-form-item>
                        <el-form-item
                            label="付款时间:"
                            label-width="8em"
                        >
                            {{ payment.paymentTime | moment('YYYY-MM-DD HH:mm:ss') }}
                        </el-form-item>
                        <el-form-item
                            label="付款状态:"
                            label-width="8em"
                        >
                            {{ payment.paymentStatusName }}
                        </el-form-item>
                        <el-form-item
                            label="付款人:"
                            label-width="8em"
                        >
                            {{ payment.payer }}
                        </el-form-item>
                        <el-form-item
                            label="付款备注:"
                            label-width="8em"
                        >
                            {{ payment.paymentComments }}
                        </el-form-item>
                        <el-form-item
                            label="付款凭证:"
                            label-width="8em"
                        >
                            <ImageList
                                :data="payment.payVoucherUrlList"
                            />
                        </el-form-item>
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
                        <span>订单信息</span>
                    </div>
                    <div class="item">
                        <el-table
                            stripe
                            border
                            size="small"
                            :data="orderList"
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
                        </el-table>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="payment.paymentStatus !== 2"
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
                            {{ payment.payAuditor }}
                        </el-form-item>
                        <el-form-item
                            label="审核时间:"
                            label-width="8em"
                        >
                            {{ payment.payAuditTime | moment('YYYY-MM-DD HH:mm:ss') }}
                        </el-form-item>
                        <el-form-item
                            label="审核说明:"
                            label-width="8em"
                        >
                            {{ payment.payAuditComments }}
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="payment.paymentStatus === 2"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>认证审核</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            prop="payAuditComments"
                            label="审核备注"
                            label-width="8em"
                        >
                            <el-input
                                type="textarea"
                                v-model="formModel.payAuditComments"
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
                <el-col :span="12">
                    <el-form-item
                        label-width="8em"
                        class="ma-t"
                    >
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
    name: 'PaymentOfflineAuditDetail',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                auditStatus: '',
                payAuditComments: '',
            },
            // 表单校验规则
            formRules: {
                payAuditComments: {
                    required: true,
                    message: '请输入审核备注',
                    trigger: 'blur',
                },
            },
            payment: {
                payVoucherUrlList: [],
            },
            buyer: {},
            orderList: [],
        };
    },
    methods: {
        init() {
            this.$api.Ex.Payment.getDetail({ id: this.formModel.id }).then(json => {
                const res = json.data.data;
                this.payment = res.payment || {};
                this.buyer = res.buyer || {};
                this.orderList = res.orderList || [];
                this.orderList.forEach(item => {
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
            });
        },
        onConfirmPass() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$confirm('是否确定审核通过！', '温馨提示', {
                    type: 'warning',
                }).then(() => {
                    this.formModel.auditStatus = 100;
                    this.$api.Ex.Payment.offlinePaymentAudit({
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
                    this.formModel.auditStatus = 20;
                    this.$api.Ex.Payment.offlinePaymentAudit({
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
