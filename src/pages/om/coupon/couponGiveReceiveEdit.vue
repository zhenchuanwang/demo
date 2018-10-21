<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page
        back
    >
        <el-row>
            <el-col :span="12">
                <el-form
                    ref="addForm"
                    size="small"
                    :model="formModel"
                    :rules="formRules"
                >
                    <el-form-item
                        prop="couponDesc"
                        label="优惠券名称"
                        label-width="11em"
                    >
                        <el-input
                            v-model="formModel.couponDesc"
                            auto-complete="off"
                            :disabled="isEdit"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="couponTempletId"
                        label="模板名称"
                        label-width="11em"
                    >
                        <el-select
                            v-model="couponTemplet"
                            value-key="id"
                            placeholder="请选择"
                            @change="someItemChange(couponTemplet)"
                            :disabled="isEdit"
                        >
                            <el-option
                                v-for="item in couponTempletList"
                                :key="item.id"
                                :label="item.templetName"
                                :value="item"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="drawBeginTime"
                        label="领取开始时间"
                        label-width="11em"
                    >
                        <el-date-picker
                            v-model="formModel.drawBeginTime"
                            type="datetime"
                            placeholder="选择领取开始时间"/>
                    </el-form-item>
                    <el-form-item
                        prop="drawEndTime"
                        label="领取截止时间"
                        label-width="11em"
                    >
                        <el-date-picker
                            v-model="formModel.drawEndTime"
                            type="datetime"
                            placeholder="选择领取截止时间"/>
                    </el-form-item>
                    <el-form-item
                        prop="couponAmount"
                        label="优惠券金额"
                        label-width="11em"
                    >
                        <el-input
                            v-model="formModel.couponAmount"
                            auto-complete="off"
                            :disabled="isEdit"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="couponUseAmount"
                        label="优惠券满减金额限制"
                        label-width="11em"
                    >
                        <el-input
                            v-model="formModel.couponUseAmount"
                            auto-complete="off"
                            :disabled="isEdit"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="couponExpireMode"
                        label="优惠券到期模式"
                        label-width="11em"
                    >
                        <dictionaries-picker
                            type="couponExpireMode"
                            v-model="formModel.couponExpireMode"
                            :disabled="isEdit"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="couponPeriod"
                        label="优惠券有效期(天)"
                        label-width="11em"
                        v-if="formModel.couponExpireMode == 1"
                    >
                        <el-input
                            v-model="formModel.couponPeriod"
                            auto-complete="off"
                            :disabled="isEdit"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="couponExpireTime"
                        label="优惠券有效期至"
                        label-width="11em"
                        v-if="formModel.couponExpireMode == 2"
                    >
                        <el-date-picker
                            v-model="formModel.couponExpireTime"
                            type="datetime"
                            placeholder="选择优惠券有效期"
                            :disabled="isEdit"/>
                    </el-form-item>
                    <el-form-item
                        prop="remarks"
                        label="发放备注"
                        label-width="11em"
                    >
                        <el-input
                            type="textarea"
                            v-model="formModel.remarks"
                            auto-complete="off"
                            :disabled="isEdit"
                        />
                    </el-form-item>
                    <el-form-item
                        label="已发放人数"
                        label-width="11em"
                        v-if="isEdit"
                    >
                        {{ buyerCount }}
                    </el-form-item>
                    <el-form-item
                        label-width="11em"
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
    name: 'CouponGiveProvideEdit',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                // 优惠券名称
                couponDesc: '',
                // 模板名称ID
                couponTempletId: '',
                // 领取开始时间
                drawBeginTime: '',
                // 领取截止时间
                drawEndTime: '',
                // 优惠券金额
                couponAmount: '',
                // 优惠券满减金额限制
                couponUseAmount: '',
                // 优惠券到期模式
                couponExpireMode: '',
                // 优惠券有效期(天)
                couponPeriod: '',
                // 优惠券到期时间
                couponExpireTime: '',
                // 发放备注
                remarks: '',
            },
            // 表单校验规则
            formRules: {
                title: {
                    required: true,
                    message: '请输入标题',
                    trigger: 'blur',
                },
                titleImage: {
                    type: 'array',
                    required: true,
                    message: '请上传标题图片',
                },
                isAllowMoreLevel: {
                    required: true,
                    message: '请选择是否显示发布时间',
                    trigger: 'blur',
                },
            },
            // 优惠券模板列表
            couponTempletList: [],
            // 优惠券到期模式列表
            couponExpireModeList: [],
            // 模板对象
            couponTemplet: {},
            // 是否编辑
            isEdit: false,
            // 已发放人数
            buyerCount: 0,
        };
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Pm.CouponGive.save({
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
        initShop() {
            this.$api.Pm.CouponGive.getDetail({ id: this.formModel.id }).then(json => {
                const res = json.data.data.couponGive;
                this.$utils.Comm.formModelMerge(this.formModel, res);
                this.couponTemplet = json.data.data.couponTempletName;
                this.buyerCount = json.data.data.buyerCount;
            });
        },
        initCouponTempletList() {
            this.$api.Pm.CouponTemplet.data({ isAvailable: 1, couponGiveMode: 2 }).then(json => {
                const res = json.data.data;
                this.couponTempletList = res;
            });
        },
        someItemChange(value) {
            this.formModel.couponTempletId = value.id + '';
            this.formModel.couponTempletType = value.templetType;
            this.formModel.couponAmount = value.couponAmount;
            this.formModel.couponUseAmount = value.couponUseAmount;
            this.formModel.couponPeriod = value.couponPeriod;
            this.formModel.couponGiveMode = value.couponGiveMode + '';
        },
    },
    created() {
        this.formModel.id = this.$route.params.id;
        if (this.formModel.id) {
            this.initShop();
            this.isEdit = true;
        } else {
            this.formModel.couponExpireMode = 1;
        }
        this.initCouponTempletList();
    },
};
</script>

<style lang="scss">
</style>
