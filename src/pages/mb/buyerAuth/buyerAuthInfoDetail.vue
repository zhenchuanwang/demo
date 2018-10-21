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
                            label-width="7em"
                        >
                            {{ buyer.mobile }}
                        </el-form-item>
                        <el-form-item
                            label="注册时间:"
                            label-width="7em"
                        >
                            {{ buyer.registerTime | moment('YYYY-MM-DD HH:mm:ss') }}
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    class="ma-t"
                    size="small"
                    shadow="never"
                    v-if="buyerAuthInfo.authType === 1"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>个人实名认证</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            label="姓名:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.realName }}
                        </el-form-item>
                        <el-form-item
                            label="地址:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.regionName }} {{ buyerAuthInfo.address }}
                        </el-form-item>
                        <el-form-item
                            label="电话:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.phone }}
                        </el-form-item>
                        <el-form-item
                            label="邮箱:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.email }}
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="buyerAuthInfo.authType === 2"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>企业资料认证</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            label="企业名称:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.companyName }}
                        </el-form-item>
                        <el-form-item
                            label="社会信用证代码:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.cuscCode }}
                        </el-form-item>
                        <el-form-item
                            label="社会信用证照片:"
                            label-width="7em"
                        >
                            <ImageList
                                :data="buyerAuthInfo.cuscImageUrl"
                            />
                        </el-form-item>
                        <el-form-item
                            label="地址:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.regionName }} {{ buyerAuthInfo.address }}
                        </el-form-item>
                        <el-form-item
                            label="电话:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.phone }}
                        </el-form-item>
                        <el-form-item
                            label="邮箱:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.email }}
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="buyerAuthInfo.auditStatus !== 10"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>审核信息</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            label="审核操作人:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.auditFullName }}({{ buyerAuthInfo.auditUserName }})
                        </el-form-item>
                        <el-form-item
                            label="审核时间:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.auditTime | moment('YYYY-MM-DD HH:mm:ss') }}
                        </el-form-item>
                        <el-form-item
                            label="审核说明:"
                            label-width="7em"
                        >
                            {{ buyerAuthInfo.auditRemark }}
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                    v-if="buyerAuthInfo.auditStatus === 10"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>认证审核</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            prop="auditRemark"
                            label="审核备注"
                            label-width="7em"
                        >
                            <el-input
                                type="textarea"
                                v-model="formModel.auditRemark"
                                auto-complete="off"
                            />
                        </el-form-item>
                        <el-form-item
                            label-width="7em"
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
    name: 'BuyerAuthInfoDetail',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                auditStatus: '',
                auditRemark: '',
            },
            // 表单校验规则
            formRules: {
                auditRemark: {
                    required: true,
                    message: '请输入审核备注',
                    trigger: 'blur',
                },
            },
            buyerAuthInfo: {},
            buyer: {},
        };
    },
    methods: {
        init() {
            this.$api.Mb.BuyerAuthInfo.getDetail({ id: this.formModel.id }).then(json => {
                const res = json.data.data;
                this.buyerAuthInfo = res.buyerAuthInfo || {};
                this.buyer = res.buyer || {};
            });
        },
        onConfirmPass() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$confirm('是否确定审核通过！', '温馨提示', {
                    type: 'warning',
                }).then(() => {
                    this.formModel.auditStatus = 100;
                    this.$api.Mb.BuyerAuthInfo.buyerAuthInfoAudit({
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
                    this.$api.Mb.BuyerAuthInfo.buyerAuthInfoAudit({
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
