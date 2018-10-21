<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page back>
        <el-row>
            <el-col :span="16">
                <el-form
                    ref="addForm"
                    size="small"
                    :model="formModel"
                    :rules="formRules"
                >
                    <el-form-item
                        prop="orgId"
                        label="组织机构"
                        label-width="8em"
                    >
                        <el-select
                            v-model="formModel.orgId"
                            placeholder="请选择"
                            :disabled="formModel.id != null"
                        >
                            <el-option
                                v-for="item in orgList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="shopName"
                        label="店铺名称"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.shopName"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="shopLogo"
                        label="店铺Logo"
                        label-width="8em"
                    >
                        <upload
                            action="/rs/attachment/uploadShopLogo"
                            :limit="1"
                            v-model="formModel.shopLogo"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="principalName"
                        label="联系人姓名"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.principalName"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="principalPosition"
                        label="联系人职务"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.principalPosition"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="principalMobile"
                        label="联系人电话"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.principalMobile"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="principalEmail"
                        label="联系人邮箱"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.principalEmail"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="principalQq"
                        label="联系人QQ"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.principalQq"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="shopRegionId"
                        label="店铺地址"
                        label-width="8em"
                    >
                        <CascaderPicker
                            :api-class="selectApi"
                            v-model="formModel.shopRegionId"
                            :p-id="2"
                            :min-lv="2"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="shopAddress"
                        label="详细地址"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.shopAddress"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="shopDesc"
                        label="店铺描述"
                        label-width="8em"
                    >
                        <el-input
                            type="textarea"
                            v-model="formModel.shopDesc"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="freightMode"
                        label="运费模式"
                        label-width="8em"
                    >
                        <dictionaries-picker
                            type="freightMode"
                            v-model="formModel.freightMode"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="isAllowMoreLevel"
                        label="二级分类"
                        label-width="8em"
                    >
                        <el-switch
                            v-model="formModel.isAllowMoreLevel"
                        />
                        开启二级分类(备注：商品展示时默认只显示一级分类，如需显示二级分类则勾选此项）
                    </el-form-item>
                    <el-form-item
                        prop="shopDomain"
                        label="店铺域名"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.shopDomain"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="shopLevelId"
                        label="店铺等级"
                        label-width="8em"
                    >
                        <el-select
                            v-model="formModel.shopLevelId"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in shopLevelList"
                                :key="item.id"
                                :label="item.levelName"
                                :value="item.id"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="shopStatus"
                        label="商户状态"
                        label-width="8em"
                    >
                        <dictionaries-picker
                            type="shopStatus"
                            v-model="formModel.shopStatus"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="joinTime"
                        label="入驻时间"
                        label-width="8em"
                    >
                        <el-date-picker
                            v-model="formModel.joinTime"
                            type="datetime"
                            placeholder="选择入驻时间"/>
                    </el-form-item>
                    <el-form-item
                        prop="memberRegisterMode"
                        label="会员注册模式"
                        label-width="8em"
                    >
                        <dictionaries-picker
                            type="memberRegisterMode"
                            v-model="formModel.memberRegisterMode"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="memberAccountSign"
                        label="会员账号标识"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.memberAccountSign"
                            auto-complete="off"
                        />
                        (4个字母以内)
                    </el-form-item>
                    <el-form-item
                        prop="distributionIncomeMode"
                        label="分销收益模式"
                        label-width="8em"
                    >
                        <checkbox-group-andOr
                            type="distributionIncomeMode"
                            v-model="formModel.distributionIncomeMode"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="distributionLevel"
                        label="提成层级"
                        label-width="8em"
                        v-if="eachlevelincome"
                    >
                        <dictionaries-picker
                            type="distributionLevel"
                            v-model="formModel.distributionLevel"
                        />
                    </el-form-item>
                    <el-form-item
                        v-else
                        v-show="eachlevelincome">
                        <!--为了不用给 el-form-item 一个个加 key 的技巧用法-->
                    </el-form-item>
                    <el-form-item
                        prop="sellGoodsType"
                        label="售卖商品类型"
                        label-width="8em"
                    >
                        <checkbox-group-andOr
                            type="goodsType"
                            v-model="formModel.sellGoodsType"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="shipMethod"
                        label="配送方式"
                        label-width="8em"
                    >
                        <checkbox-group-andOr
                            type="shipMethod"
                            v-model="formModel.shipMethod"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="paymentMode"
                        label="付款模式"
                        label-width="8em"
                    >
                        <checkbox-group-andOr
                            type="paymentMode"
                            v-model="formModel.paymentMode"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="onlinePaymentType"
                        label="线上付款模式"
                        label-width="8em"
                        v-if="onlinePayment"
                    >
                        <checkbox-group-andOr
                            :data="[{id: 2,name: '微信支付'},{id: 4,name: '银联支付'},{id:8,name:'通联支付'},{id:16,name:'alphapay'},{id:32,name:'支付宝支付'}]"
                            v-model="formModel.onlinePaymentType"
                        />
                    </el-form-item>
                    <el-form-item
                        v-else
                        v-show="onlinePayment">
                        <!--为了不用给 el-form-item 一个个加 key 的技巧用法-->
                    </el-form-item>
                    <el-form-item
                        prop="orderNoticeMobile"
                        label="下单提醒"
                        label-width="8em"
                    >
                        <checkbox-group-andOr
                            type="orderNoticeMode"
                            v-model="formModel.orderNoticeMode"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="orderNoticeMobile"
                        label="提醒手机号"
                        label-width="8em"
                        v-if="orderNoticeMobile"
                    >
                        <el-input
                            type="textarea"
                            v-model="formModel.orderNoticeMobile"
                            auto-complete="off"
                        />
                        多个手机号用|分隔
                    </el-form-item>
                    <el-form-item
                        v-else
                        v-show="orderNoticeMobile">
                        <!--为了不用给 el-form-item 一个个加 key 的技巧用法-->
                    </el-form-item>
                    <el-form-item
                        prop="appid"
                        label="公众号appid"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.appid"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="secret"
                        label="公众号secret"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.secret"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="token"
                        label="公众号token"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.token"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="aeskey"
                        label="公众号aeskey"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.aeskey"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="mapPlaceKey"
                        label="地图接口key"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.mapPlaceKey"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="remarks"
                        label="备注"
                        label-width="8em"
                    >
                        <el-input
                            type="textarea"
                            v-model="formModel.remarks"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        label-width="8em"
                    >
                        <el-button
                            type="primary"
                            size="small"
                            @click="onConfirm"
                        >保 存
                        </el-button>
                        <el-button
                            size="small"
                            @click="$router.back()"
                        >返 回
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'ShopEdit',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                orgId: '',
                shopName: '',
                shopLogo: [],
                principalName: '',
                principalPosition: '',
                principalMobile: '',
                principalEmail: '',
                principalQq: '',
                shopRegionId: '',
                shopAddress: '',
                shopDesc: '',
                freightMode: '',
                isAllowMoreLevel: false,
                shopDomain: '',
                shopLevelId: '',
                shopStatus: '',
                memberRegisterMode: '',
                memberAccountSign: '',
                appid: '',
                secret: '',
                token: '',
                aeskey: '',
                mapPlaceKey: '',
                publicApikey: '',
                publicSecret: '',
                remarks: '',
                distributionIncomeMode: '',
                distributionLevel: '',
                sellGoodsType: '',
                shipMethod: '',
                paymentMode: '',
                onlinePaymentType: '',
                orderNoticeMode: '',
                orderNoticeMobile: '',
                orderNoticeWebchat: '',
            },
            // 表单校验规则
            formRules: {
                orgId: {
                    required: true,
                    message: '请选择组织机构',
                    trigger: 'blur',
                },
                shopName: {
                    required: true,
                    message: '请输入店铺名称',
                    trigger: 'blur',
                },
                shopLogo: {
                    type: 'array',
                    required: true,
                    message: '请上传等级图片',
                },
                principalName: {
                    required: true,
                    message: '请输入联系人姓名',
                    trigger: 'blur',
                },
                principalMobile: {
                    required: true,
                    message: '请输入联系人电话',
                    trigger: 'blur',
                },
                shopRegionId: {
                    required: true,
                    message: '请选择店铺地址',
                    trigger: 'blur',
                },
                shopAddress: {
                    required: true,
                    message: '请输入店铺详细地址',
                    trigger: 'blur',
                },
                freightMode: {
                    required: true,
                    message: '请选择运费模式',
                    trigger: 'blur',
                },
                isAllowMoreLevel: {
                    required: true,
                    message: '请选择是否开启二级节点',
                    trigger: 'blur',
                },
                sellGoodsType: [
                    {
                        required: true,
                        message: '请选择售卖商品类型',
                    },
                    {
                        type: 'integer',
                        min: 1,
                        message: '请选择售卖商品类型',
                    },
                ],
                shopDomain: {
                    required: true,
                    message: '请输入店铺域名',
                },
                shopLevelId: {
                    required: true,
                    message: '请选择店铺等级',
                },
                shopStatus: {
                    required: true,
                    message: '请选择商户状态',
                },
                memberRegisterMode: {
                    required: true,
                    message: '请选择会员注册模式',
                },
                memberAccountSign: {
                    required: true,
                    message: '请输入会员账号标识',
                },
                distributionLevel: {
                    required: true,
                    message: '请选择提成层级',
                },
                shipMethod: [
                    {
                        required: true,
                        message: '请选择配送方式',
                    },
                    {
                        type: 'integer',
                        min: 1,
                        message: '请选择配送方式',
                    },
                ],
                paymentMode: [
                    {
                        required: true,
                        message: '请选择付款模式',
                    },
                    {
                        type: 'integer',
                        min: 1,
                        message: '请选择付款模式',
                    },
                ],
                onlinePaymentType: [
                    {
                        required: true,
                        message: '请选择线上付款模式',
                    },
                    {
                        type: 'integer',
                        min: 1,
                        message: '请选择线上付款模式',
                    },
                ],
            },
            selectApi: this.$api.Rs.Region,
            shopLevelList: [],
            // 组织机构列表
            orgList: [],
        };
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Sp.Shop.save({
                    ...this.formModel,
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.$router.back();
                });
            });
        },
        getShopLevelList() {
            this.$api.Sp.ShopLevel.select().then(res => {
                this.shopLevelList = res.data.data;
            });
        },
        initOrgList() {
            this.$api.Rs.Org.select().then(json => {
                const res = json.data.data;
                this.orgList = res;
            });
        },
        initShop() {
            this.$api.Sp.Shop.getDetail({ id: this.formModel.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(this.formModel, res);
            });
        },
    },
    computed: {
        eachlevelincome() {
            return (this.formModel.distributionIncomeMode & 4) !== 0;
        },
        onlinePayment() {
            return (this.formModel.paymentMode & 1) !== 0;
        },
        orderNoticeMobile() {
            return (this.formModel.orderNoticeMode & 1) !== 0;
        },
    },
    created() {
        this.getShopLevelList();
        this.initOrgList();
        this.formModel.id = this.$route.params.id;
        if (this.formModel.id) {
            this.initShop();
        }
    },
};
</script>

<style lang="scss">
</style>
