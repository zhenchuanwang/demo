<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
                <el-form-item
                    prop="smsUseCaseName"
                    label="短信使用场景"
                >
                    <el-input
                        v-model="queryFormModel.smsUseCaseName"
                        placeholder="请输入短信使用场景"
                    />
                </el-form-item>
                <el-form-item
                    prop="smsTemplateName"
                    label="短信模板名称"
                >
                    <el-input
                        v-model="queryFormModel.smsTemplateName"
                        placeholder="请输入短信模板名称"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onQuery()"
                    >查询
                    </el-button>
                    <el-button
                        type="success"
                        @click="onReset"
                    >重置
                    </el-button>
                </el-form-item>
            </el-form>
        </template>

        <!-- 内容 -->
        <div
            class="body"
            slot="body"
            v-loading="querying"
        >
            <!-- 操作 -->
            <div
                class="ma-b"
            >
                <el-button-group>
                    <!--<el-button
                        type="success"
                        icon="el-icon-plus"
                        size="small"
                        @click="onAdd"
                    >新增
                    </el-button>-->
                    <!--<el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="small"
                        @click="onDelete"
                        :disabled="!currentTableSelect.length"
                    >删除
                    </el-button>-->
                </el-button-group>
            </div>

            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
                @selection-change="onTableSelectionChange"
            >
                <!--<el-table-column
                    type="selection"
                    width="36"
                />-->
                <el-table-column
                    prop="smsUseCaseName"
                    label="短信使用场景"
                    min-width="100"
                />
                <el-table-column
                    prop="smsTemplateName"
                    label="短信模板名称"
                    min-width="100"
                />
                <el-table-column
                    prop="smsTemplateContent"
                    label="短信内容"
                    min-width="100"
                />
                <el-table-column
                    prop="serverIp"
                    label="服务IP"
                    min-width="100"
                />
                <el-table-column
                    prop="timeout"
                    label="有效期"
                    min-width="100"
                />
                <el-table-column
                    label="是否启用"
                    width="80"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.isAvailable"
                            @input="onIsAvailableInput($event,scope)"
                            disabled
                            v-if="!scope.row.id"
                        />
                        <el-switch
                            v-model="scope.row.isAvailable"
                            @input="onIsAvailableInput($event,scope)"
                            v-if="scope.row.id"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="90"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="onTableEdit(scope.row)"
                        >编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="ma-t ta-r">
                <pagination
                    v-model="pagination"
                    @input="onQuery"
                />
            </div>
        </div>

        <!-- 弹框 -->
        <!-- 新增/编辑 -->
        <el-dialog
            :title="'编辑'"
            center
            width="600px"
            :visible.sync="addDialog.isVisible"
            @closed="onAddDialogCancel"
        >
            <el-form
                ref="addForm"
                size="small"
                :model="addDialog.formModel"
                :rules="addDialog.formRules"
            >
                <el-form-item
                    prop="smsAccountId"
                    label="服务IP"
                    label-width="8em"
                >
                    <el-select
                        v-model="addDialog.formModel.smsAccountId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in smsAccountList"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id + ''"/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="smsUseCaseName"
                    label="短信使用场景"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.smsUseCaseName"
                        auto-complete="off"
                        disabled=""
                    />
                </el-form-item>
                <el-form-item
                    prop="smsTemplateName"
                    label="短信模板名称"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.smsTemplateName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="smsTemplateContent"
                    label="短信内容"
                    label-width="8em"
                >
                    <el-input
                        type="textarea"
                        v-model="addDialog.formModel.smsTemplateContent"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    label="有效期"
                    label-width="8em"
                >
                    <el-radio
                        v-model="addDialog.formModel.effectiveType"
                        label="1">长期有效
                    </el-radio>
                    <el-radio
                        v-model="addDialog.formModel.effectiveType"
                        label="2">限时有效
                    </el-radio>
                </el-form-item>
                <el-form-item
                    prop="timeouts"
                    label=""
                    label-width="8em"
                    v-if="addDialog.formModel.effectiveType == 2"
                >
                    <el-input
                        v-model="addDialog.formModel.timeouts"
                        auto-complete="off"
                        placeholder="请输入有效期"
                    />
                </el-form-item>
                <el-form-item
                    prop="unit"
                    label=""
                    label-width="8em"
                    v-if="addDialog.formModel.effectiveType == 2"
                >
                    <el-select
                        v-model="addDialog.formModel.unit"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in unitList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value + ''"/>
                    </el-select>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    @click="onAddDialogConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onAddDialogCancel"
                >取 消
                </el-button>
            </div>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormList } from '@/mixin/queryForm';

export default {
    name: 'SmsTemplate',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                smsUseCaseName: '', // 短信使用场景
                smsTemplateName: '', // 短信模板名称
                isAvailable: '', // 状态
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    smsAccountId: '',
                    smsUseCase: '',
                    smsUseCaseName: '',
                    smsTemplateName: '',
                    smsTemplateContent: '',
                    timeout: '',
                    isAvailable: '',
                    timeouts: '',
                    unit: '',
                    effectiveType: '',
                },
                // 表单校验规则
                formRules: {
                    smsAccountId: {
                        required: true,
                        message: '请选择服务ID',
                    },
                    smsTemplateName: {
                        required: true,
                        message: '请输入短信模板名称',
                        trigger: 'blur',
                    },
                    smsTemplateContent: {
                        required: true,
                        message: '请输入短信内容',
                        trigger: 'blur',
                    },
                    timeouts: {
                        required: true,
                        message: '请输入有效期',
                        trigger: 'blur',
                    },
                    unit: {
                        required: true,
                        message: '请选择单位',
                    },
                },
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            // 服务IP列表
            smsAccountList: [],
            // 时间单位列表
            unitList: [
                {
                    value: 'y',
                    label: '年',
                },
                {
                    value: 'm',
                    label: '月',
                },
                {
                    value: 'd',
                    label: '日',
                },
                {
                    value: 'h',
                    label: '时',
                },
                {
                    value: 'i',
                    label: '分',
                },
                {
                    value: 's',
                    label: '秒',
                },
            ],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Ms.SmsTemplate.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onAdd() {
            this.addDialog.isVisible = true;
            this.$nextTick(() => {
                const { addForm } = this.$refs;
                addForm.resetFields();
                const { formModel } = this.addDialog;
                formModel.id = '';
            });
        },
        onTableSelectionChange(val) {
            this.currentTableSelect = val;
        },
        onTableEdit(row) {
            this.addDialog.isVisible = true;
            if (row.id == null) {
                this.$nextTick(() => {
                    const { addForm } = this.$refs;
                    addForm.resetFields();
                    const { formModel } = this.addDialog;
                    formModel.id = '';
                    formModel.smsUseCase = row.entryKey;
                    formModel.smsUseCaseName = row.smsUseCaseName;
                    formModel.isAvailable = true;
                    formModel.effectiveType = '1';
                });
            } else {
                const { formModel } = this.addDialog;
                this.$api.Ms.SmsTemplate.getDetail({ id: row.id }).then(json => {
                    const res = json.data.data;
                    res.smsAccountId = res.smsAccountId + '';
                    if (res.timeout === '长期有效') {
                        res.effectiveType = '1';
                    } else {
                        res.effectiveType = '2';
                        res.timeouts = Number(res.timeout.replace(/[^0-9]/gi, ''));
                        res.unit = res.timeout.replace(/[^a-z]/gi, '') + '';
                    }
                    this.$utils.Comm.formModelMerge(formModel, res);
                });
            }
        },
        onAddDialogConfirm() {
            const { addForm } = this.$refs;
            const effectiveType = this.addDialog.formModel.effectiveType;
            if (effectiveType == 1) {
                this.addDialog.formModel.timeout = '长期有效';
            } else {
                this.addDialog.formModel.timeout = this.addDialog.formModel.timeouts + this.addDialog.formModel.unit;
            }
            addForm.validate().then(() => {
                this.$api.Ms.SmsTemplate.save({
                    ...this.addDialog.formModel,
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                    this.addDialog.isVisible = false;
                });
            });
        },
        onAddDialogCancel() {
            const { addForm } = this.$refs;
            addForm.resetFields();
            const { formModel } = this.addDialog;
            formModel.id = '';
            this.addDialog.isVisible = false;
        },
        onIsAvailableInput(val, scope) {
            const { row } = scope;
            if (!row) return;
            this.$api.Ms.SmsTemplate.status({
                id: row.id,
                isAvailable: row.isAvailable,
            })
                .then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                })
                .catch(() => {
                    this.$message({
                        message: '操作失败请重试！',
                        type: 'error',
                    });
                    row.isAvailable = !row.isAvailable;
                });
        },
        initSmsAccountList() {
            this.$api.Ms.SmsAccount.select().then(json => {
                const res = json.data.data;
                this.smsAccountList = res;
            });
        },
    },
    created() {
        this.initSmsAccountList();
    },
};
</script>

<style lang="scss">
</style>
