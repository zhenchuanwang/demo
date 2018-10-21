<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <el-row>
            <el-col :span="24">
                <el-form
                    ref="addForm"
                    size="small"
                >
                    <el-tabs
                        tab-position="left"
                        v-model="tabName"
                    >
                        <el-tab-pane
                            v-for="item in shopPaymentConfigList"
                            :key="item.id"
                            :label="item.paymentTypeName"
                            :name="item.paymentTypeName"
                        >
                            <el-col
                                :span="12"
                                v-if="item.id === 1">
                                <el-form-item
                                    prop="bankAccountName"
                                    label="银行开户名"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.bankAccountName"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="bankAccountNo"
                                    label="银行账号"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.bankAccountNo"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="depositBank"
                                    label="开户银行"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.depositBank"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="branchBankName"
                                    label="支行名称"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.branchBankName"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col
                                :span="12"
                                v-if="item.id === 2">
                                <el-form-item
                                    prop="wxaccountAppid"
                                    label="公众号appid"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.wxaccountAppid"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="wxaccountMchid"
                                    label="支付商户ID"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.wxaccountMchid"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="wxaccountMchkey"
                                    label="支付商户key"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.wxaccountMchkey"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col
                                :span="12"
                                v-if="item.id === 4">
                                <el-form-item
                                    prop="unionpayMid"
                                    label="银联支付商户号"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.unionpayMid"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="unionpayTid"
                                    label="银联支付终端号"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.unionpayTid"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="unionpayInstmid"
                                    label="银联支付机构商户号"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.unionpayInstmid"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="unionpayMsgsrc"
                                    label="银联支付消息来源"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.unionpayMsgsrc"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="unionpayMsgsrcid"
                                    label="银联支付来源编号"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.unionpayMsgsrcid"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="unionpayKey"
                                    label="银联支付密钥"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.unionpayKey"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col
                                :span="12"
                                v-if="item.id === 8">
                                <el-form-item
                                    prop="allinpayCusid"
                                    label="通联支付商户号"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.allinpayCusid"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="allinpayAppid"
                                    label="通联支付APPID"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.allinpayAppid"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="allinpayKey"
                                    label="通联支付密钥"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.allinpayKey"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col
                                :span="12"
                                v-if="item.id === 16">
                                <el-form-item
                                    prop="alphapayPartnercode"
                                    label="alphapay Partnercode"
                                    label-width="12em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.alphapayPartnercode"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="alphapayCredentialcode"
                                    label="alphapay Credentialcode"
                                    label-width="12em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.alphapayCredentialcode"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col
                                :span="12"
                                v-if="item.id === 32">
                                <el-form-item
                                    prop="alipayAppid"
                                    label="支付宝商户appid"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.alipayAppid"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="alipayPublickey"
                                    label="支付宝公钥"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.alipayPublickey"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                                <el-form-item
                                    prop="alipayPrivatekey"
                                    label="支付宝私钥"
                                    label-width="10em"
                                >
                                    <el-input
                                        v-model="item.paymentConfig.alipayPrivatekey"
                                        auto-complete="off"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-tab-pane>
                    </el-tabs>
                </el-form>
            </el-col>
            <div class="pa-t">
                <el-button
                    size="small"
                    type="primary"
                    @click="onConfirm()"
                >保 存
                </el-button>
                <el-button
                    size="small"
                    @click="$router.back()"
                    v-show="shopId != null"
                >返 回
                </el-button>
            </div>
        </el-row>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'ShopPaymentConfig',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            shopPaymentConfigList: [],
            shopId: '',
            tabName: '',
        };
    },
    methods: {
        onConfirm() {
            this.$api.Sp.ShopPaymentConfig.save({
                shopId: this.shopId,
                configJson: JSON.stringify(this.shopPaymentConfigList),
            }).then(json => {
                const res = json.data;
                this.$message({
                    message: res.msg,
                    type: 'success',
                });
            });
        },
        initShopPaymentConfig() {
            this.$api.Sp.ShopPaymentConfig.data({ shopId: this.shopId }).then(json => {
                const res = json.data.data;
                res.forEach(item => {
                    if (!item.paymentConfig) {
                        item.paymentConfig = {};
                    } else {
                        item.paymentConfig = JSON.parse(item.paymentConfig);
                    }
                });
                this.tabName = res[0].paymentTypeName;
                this.shopPaymentConfigList = res;
            });
        },
    },
    created() {
        this.shopId = this.$route.params.id;
        this.initShopPaymentConfig();
    },
};
</script>

<style lang="scss">
</style>
