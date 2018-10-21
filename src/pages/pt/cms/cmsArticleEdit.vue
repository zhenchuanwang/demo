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
                        prop="title"
                        label="标题"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.title"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="subtitle"
                        label="副标题"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.subtitle"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="cmsCatalogId"
                        label="分类"
                        label-width="8em"
                    >
                        <CascaderPicker
                            :api-class="selectApi"
                            v-model="formModel.cmsCatalogId"
                            :min-lv="1"
                            :p-id="0"
                            filterable
                            change-on-select
                        />
                    </el-form-item>
                    <el-form-item
                        prop="titleImage"
                        label="标题图片"
                        label-width="8em"
                    >
                        <upload
                            action="/rs/attachment/uploadCmsArticleTitleImage"
                            :limit="1"
                            v-model="formModel.titleImage"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="digest"
                        label="摘要"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.digest"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="author"
                        label="作者"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.author"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="source"
                        label="来源"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.source"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="isShowReleaseTime"
                        label="显示发布时间"
                        label-width="8em"
                    >
                        <el-switch
                            v-model="formModel.isShowReleaseTime"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="content"
                        label="内容"
                        label-width="8em"
                        style="width: 800px;"
                    >
                        <Tinymce
                            :height="500"
                            image-action="/rs/attachment/uploadCmsArticleImage"
                            v-model="formModel.content"/>
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
    name: 'CmsArticleEdit',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                title: '',
                subtitle: '',
                cmsCatalogId: '',
                titleImage: [],
                digest: '',
                author: '',
                source: '',
                isShowReleaseTime: false,
                content: '',
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
                content: {
                    required: true,
                    message: '请输入内容',
                    trigger: 'blur',
                },
            },
            selectApi: this.$api.Pt.CmsCatalog,
        };
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Pt.CmsArticle.save({
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
            this.$api.Pt.CmsArticle.getDetail({ id: this.formModel.id }).then(json => {
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
        this.formModel.id = this.$route.params.id;
        if (this.formModel.id) {
            this.initShop();
        }
        setTimeout(() => {
            //TODO　级联选择器 异步数据初始化问题
            this.formModel.cmsCatalogId = this.formModel.cmsCatalogId;
        }, 10);
    },
};
</script>

<style lang="scss">
</style>
