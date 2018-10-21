<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <el-row>
            <el-col :span="12">
                <el-form
                    ref="addForm"
                    size="small"
                    :model="formModel"
                    :rules="formRules"
                >
                    <el-form-item
                        prop="shopName"
                        label="店铺名称"
                        label-width="7em"
                    >
                        <el-input
                            v-model="formModel.shopName"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="shopLogo"
                        label="店铺Logo"
                        label-width="7em"
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
                        label-width="7em"
                    >
                        <el-input
                            v-model="formModel.principalName"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="principalPosition"
                        label="联系人职务"
                        label-width="7em"
                    >
                        <el-input
                            v-model="formModel.principalPosition"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="principalMobile"
                        label="联系人电话"
                        label-width="7em"
                    >
                        <el-input
                            v-model="formModel.principalMobile"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="principalEmail"
                        label="联系人邮箱"
                        label-width="7em"
                    >
                        <el-input
                            v-model="formModel.principalEmail"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="principalQq"
                        label="联系人QQ"
                        label-width="7em"
                    >
                        <el-input
                            v-model="formModel.principalQq"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="shopRegionId"
                        label="店铺地址"
                        label-width="7em"
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
                        label-width="7em"
                    >
                        <el-input
                            v-model="formModel.shopAddress"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="shopDesc"
                        label="店铺描述"
                        label-width="7em"
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
                        label-width="7em"
                    >
                        <dictionaries-picker
                            type="freightMode"
                            v-model="formModel.freightMode"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="isAllowMoreLevel"
                        label="二级分类"
                        label-width="7em"
                    >
                        <el-switch
                            v-model="formModel.isAllowMoreLevel"
                        />
                        开启二级分类(备注：商品展示时默认只显示一级分类，如需显示二级分类则勾选此项）
                    </el-form-item>
                    <el-form-item
                        label-width="7em"
                    >
                        <el-button
                            type="primary"
                            size="small"
                            @click="onConfirm"
                        >保 存
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
            },
            // 表单校验规则
            formRules: {
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
            },
            selectApi: this.$api.Rs.Region,
        };
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Sp.Shop.saveShopInfo({
                    ...this.formModel,
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                });
            });
        },
        onCancel() {
            this.$router.go(-1);
        },
        getShopInfo() {
            const { formModel } = this;
            this.$api.Sp.Shop.getShopInfo().then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
        },
    },
    created() {
        this.getShopInfo();
    },
};
</script>

<style lang="scss">
</style>
