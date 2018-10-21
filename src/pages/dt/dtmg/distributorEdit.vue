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
                <div
                    class="ma-b"
                    v-if="!id"
                >
                    <el-button-group>
                        <el-button
                            type="success"
                            icon="el-icon-plus"
                            size="small"
                            @click="onAddSelect"
                        >选择会员
                        </el-button>
                    </el-button-group>
                </div>
                <div v-if="formModel.id">
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
                                label="用户昵称:"
                                label-width="7em"
                            >
                                {{ formModel.nickName }}
                            </el-form-item>
                            <el-form-item
                                label="电话:"
                                label-width="7em"
                            >
                                {{ formModel.mobile }}
                            </el-form-item>
                            <el-form-item
                                label="注册时间:"
                                label-width="7em"
                            >
                                {{ formModel.registerTime | moment('YYYY-MM-DD HH:mm:ss') }}
                            </el-form-item>
                            <el-form-item
                                label="用户状态:"
                                label-width="7em"
                            >
                                {{ formModel.buyerStatusName }}
                            </el-form-item>
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
                            <span>分销商信息</span>
                        </div>
                        <div class="item">
                            <el-form-item
                                prop="distributorLevelId"
                                label="分销商等级"
                                label-width="9em"
                            >
                                <el-select
                                    v-model="formModel.distributorLevelId"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in distributorLevelList"
                                        :key="item.id"
                                        :label="item.levelName"
                                        :value="item.id"/>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                prop="distributorName"
                                label="姓名"
                                label-width="9em"
                            >
                                <el-input
                                    v-model="formModel.distributorName"
                                    auto-complete="off"
                                />
                            </el-form-item>
                            <el-form-item
                                prop="distributorSex"
                                label="性别"
                                label-width="9em"
                            >
                                <dictionaries-picker
                                    type="gender"
                                    v-model="formModel.distributorSex"
                                />
                            </el-form-item>
                            <el-form-item
                                prop="distributorTel"
                                label="手机"
                                label-width="9em"
                            >
                                <el-input
                                    v-model="formModel.distributorTel"
                                    auto-complete="off"
                                />
                            </el-form-item>
                            <el-form-item
                                prop="wechatId"
                                label="微信号"
                                label-width="9em"
                            >
                                <el-input
                                    v-model="formModel.wechatId"
                                    auto-complete="off"
                                />
                            </el-form-item>
                            <el-form-item
                                prop="distributorEmail"
                                label="邮箱地址"
                                label-width="9em"
                            >
                                <el-input
                                    v-model="formModel.distributorEmail"
                                    auto-complete="off"
                                />
                            </el-form-item>
                            <el-form-item
                                prop="distributorRegionId"
                                label="分销商地址"
                                label-width="9em"
                            >
                                <CascaderPicker
                                    :api-class="selectApi"
                                    v-model="formModel.distributorRegionId"
                                    :p-id="2"
                                    :min-lv="2"
                                />
                            </el-form-item>
                            <el-form-item
                                prop="distributorAddress"
                                label="分销商详细地址"
                                label-width="9em"
                            >
                                <el-input
                                    v-model="formModel.distributorAddress"
                                    auto-complete="off"
                                />
                            </el-form-item>
                            <el-form-item
                                prop="distributorPostcode"
                                label="邮编"
                                label-width="9em"
                            >
                                <el-input
                                    v-model="formModel.distributorPostcode"
                                    auto-complete="off"
                                />
                            </el-form-item>
                        </div>
                    </el-card>
                    <el-col :span="12">
                        <el-form-item
                            label-width="9em"
                            class="ma-t"
                        >
                            <el-button
                                type="primary"
                                size="small"
                                @click="onConfirm"
                                v-if="formModel.approvalStatus !== 2"
                            >保 存
                            </el-button>
                            <el-button
                                type="primary"
                                size="small"
                                @click="onApprovalSuccess"
                                v-if="formModel.approvalStatus === 2"
                            >审核通过
                            </el-button>
                            <el-button
                                type="primary"
                                size="small"
                                @click="onApprovalError"
                                v-if="formModel.approvalStatus === 2"
                            >审核不通过
                            </el-button>
                            <el-button
                                size="small"
                                @click="$router.back()"
                            >返 回
                            </el-button>
                        </el-form-item>
                    </el-col>
                </div>
            </el-form>
            <!-- 弹框 -->
            <!--选择会员-->
            <el-dialog
                title="选择会员"
                center
                width="1200px"
                :visible.sync="selectDialog.isVisible"
                @closed="onSelectCancel"
            >
                <!-- 表单区 -->
                <el-form
                    ref="selectDialogQueryForm"
                    class="second-header npa-b"
                    size="small"
                    :inline="true"
                    :model="selectDialog.queryFormModel"
                >
                    <el-form-item
                        prop="nickName"
                        label="昵称"
                    >
                        <el-input
                            v-model="selectDialog.queryFormModel.nickName"
                            placeholder="请输入昵称"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="mobile"
                        label="电话"
                    >
                        <el-input
                            v-model="selectDialog.queryFormModel.mobile"
                            placeholder="请输入电话"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="onSelectDialogQuery()"
                        >查询
                        </el-button>
                        <el-button
                            type="success"
                            @click="onResetSelectDialog"
                        >重置
                        </el-button>
                    </el-form-item>
                </el-form>

                <!-- 内容 -->
                <div class="body">
                    <!-- 表格 -->
                    <el-table
                        stripe
                        border
                        size="small"
                        :data="selectDialog.tableData"
                        style="width: 100%"
                        height="400"
                        ref="selectDialogTable"
                    >
                        <el-table-column
                            prop="buyerLevelName"
                            label="会员等级"
                            min-width="100"
                        />
                        <el-table-column
                            prop="nickName"
                            label="昵称"
                            min-width="100"
                        />
                        <el-table-column
                            prop="mobile"
                            label="电话"
                            min-width="100"
                        />
                        <el-table-column
                            label="注册时间"
                            min-width="150"
                        >
                            <template slot-scope="scope">
                                {{ scope.row.registerTime | moment('YYYY-MM-DD HH:mm:ss') }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="buyerStatusName"
                            label="买家状态"
                            min-width="100"
                        />
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="90"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="small"
                                    @click="selectRow(scope.row)"
                                >选择
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 分页 -->
                    <div class="ma-t ta-r">
                        <pagination
                            v-model="selectDialog.pagination"
                            @input="onSelectDialogQuery"
                        />
                    </div>
                </div>
                <div
                    slot="footer"
                    class="dialog-footer">
                    <!--<el-button-->
                    <!--type="primary"-->
                    <!--size="small"-->
                    <!--@click="onSelectConfirm"-->
                    <!--&gt;确 定-->
                    <!--</el-button>-->
                    <el-button
                        size="small"
                        @click="onSelectCancel"
                    >取 消
                    </el-button>
                </div>
            </el-dialog>

            <!--审核不通过-->
            <el-dialog
                title="审核不通过"
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
                        prop="approvalRemark"
                        label="审核不通过原因"
                        label-width="9em"
                    >
                        <el-input
                            type="textarea"
                            v-model="cancelDialog.formModel.approvalRemark"
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
        </template>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'DistributorEdit',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                nickName: '',
                mobile: '',
                registerTime: '',
                buyerStatusName: '',
                distributorLevelId: '',
                distributorName: '',
                distributorSex: '',
                distributorTel: '',
                wechatId: '',
                distributorEmail: '',
                distributorRegionId: '',
                distributorAddress: '',
                distributorPostcode: '',
                approvalStatus: '',
            },
            // 表单校验规则
            formRules: {
                distributorLevelId: {
                    required: true,
                    message: '请选择分销等级',
                },
                distributorName: {
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur',
                },
                distributorSex: {
                    required: true,
                    message: '请选择性别',
                },
                distributorTel: {
                    required: true,
                    message: '请输入电话',
                    trigger: 'blur',
                },
                wechatId: {
                    required: true,
                    message: '请输入微信号',
                    trigger: 'blur',
                },
                distributorRegionId: {
                    required: true,
                    message: '请选择分销商地区',
                    trigger: 'blur',
                },
                distributorAddress: {
                    required: true,
                    message: '请输入分销商详细地址',
                    trigger: 'blur',
                },
            },
            // 新增/编辑
            selectDialog: {
                // 对话框显示
                isVisible: false,
                // 查询数据
                queryFormModel: {
                    nickName: '', // 昵称
                    mobile: '', // 电话
                },
                // 表单数据
                tableData: [],
                // 分页
                pagination: {},
            },
            // 编辑ID
            id: '',
            //分销等级列表
            distributorLevelList: [],
            selectApi: this.$api.Rs.Region,
            // 审核不通过
            cancelDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    approvalRemark: '',
                },
                // 表单校验规则
                formRules: {
                    approvalRemark: {
                        required: true,
                        message: '请输入审核不通过原因',
                        trigger: 'blur',
                    },
                },
            },
        };
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Mb.Distributor.saveDistributor({
                    ...this.formModel,
                    approvalStatus: 1,
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
        onApprovalSuccess() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$confirm('是否确定审核通过该分销商！', '温馨提示', {
                    type: 'warning',
                }).then(() => {
                    this.$api.Mb.Distributor.approvalDistributor({
                        ...this.formModel,
                        approvalStatus: 1,
                    }).then(json => {
                        const res = json.data;
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                        this.$router.back();
                    });
                });
            });
        },
        onApprovalError() {
            this.cancelDialog.formModel.id = this.formModel.id;
            this.cancelDialog.isVisible = true;
        },
        onCancelDialogConfirm() {
            const { cancelForm } = this.$refs;
            cancelForm.validate().then(() => {
                this.$api.Mb.Distributor.approvalDistributor({
                    ...this.cancelDialog.formModel,
                    approvalStatus: 3,
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.cancelDialog.isVisible = false;
                    this.$router.back();
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
        init() {
            this.$api.Mb.Distributor.getDistributorDetail({ id: this.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(this.formModel, res);
            });
        },
        /* -- 事件 -- */
        onAddSelect() {
            this.selectDialog.isVisible = true;
            this.$nextTick(() => {
                this.onSelectDialogQuery();
            });
        },
        onSelectDialogQuery(pagination) {
            return this.$api.Mb.Buyer.selectByPage({
                ...this.selectDialog.queryFormModel,
                ...pagination,
                isDistributor: 0,
            }).then(json => {
                const res = json.data;
                this.selectDialog.tableData = res.data;
                this.selectDialog.pagination = res.pagination;
            });
        },
        onResetSelectDialog() {
            this.$refs.selectDialogQueryForm.resetFields();
        },
        onSelectCancel() {
            this.selectDialog.isVisible = false;
        },
        selectRow(row) {
            this.$utils.Comm.formModelMerge(this.formModel, row);
            this.selectDialog.isVisible = false;
        },
        initDistributorLevelList() {
            this.$api.Mb.DistributorLevel.select().then(json => {
                this.distributorLevelList = json.data.data;
            });
        },
    },
    created() {
        this.initDistributorLevelList();
        this.id = this.$route.params.id;
        if (this.id) {
            this.init();
        }
    },
};
</script>

<style lang="scss">
</style>
