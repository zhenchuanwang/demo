<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <!--<el-tabs
                class="classify-tabs"
                v-model="activeName"
                type="card"
                @tab-click="handleClick"
            >
                <el-tab-pane label="用户管理" name="first"/>
                <el-tab-pane label="配置管理" name="second"/>
                <el-tab-pane label="角色管理" name="third"/>
                <el-tab-pane label="定时任务补偿" name="fourth"/>
            </el-tabs>-->
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
                <el-form-item
                    prop="variableName"
                    label="变量名称"
                >
                    <el-input
                        v-model="queryFormModel.variableName"
                        placeholder="请输入变量名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="variableCode"
                    label="变量代码"
                >
                    <el-input
                        v-model="queryFormModel.variableCode"
                        placeholder="请输入变量代码"
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
                    <el-button
                        type="success"
                        icon="el-icon-plus"
                        size="small"
                        @click="onAdd"
                    >新增
                    </el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="small"
                        @click="onDelete"
                        :disabled="!currentTableSelect.length"
                    >删除
                    </el-button>
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
                <el-table-column
                    type="selection"
                    width="36"
                />
                <el-table-column
                    prop="variableName"
                    label="变量名称"
                    min-width="100"
                />
                <el-table-column
                    prop="variableCode"
                    label="变量代码"
                    min-width="100"
                />
                <el-table-column
                    label="创建时间"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.insertTime | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="修改时间"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.updateTime | moment('YYYY-MM-DD HH:mm:ss') }}
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
                        <el-button
                            type="text"
                            size="small"
                            @click="onTableDelete(scope.row.id)"
                        >删除
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
            :title="addDialog.formModel.id ? '编辑' : '新增'"
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
                    prop="variableName"
                    label="变量名称"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.variableName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="variableCode"
                    label="变量代码"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.variableCode"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="variableValue"
                    label="变量值"
                    label-width="6em"
                >
                    <el-input
                        type="textarea"
                        v-model="addDialog.formModel.variableValue"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="variableDesc"
                    label="变量描述"
                    label-width="6em"
                >
                    <el-input
                        type="textarea"
                        v-model="addDialog.formModel.variableDesc"
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
    name: 'Variable',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                variableName: '', // 变量名称
                variableCode: '', // 变量代码
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    variableName: '',
                    variableCode: '',
                    variableValue: '',
                    variableDesc: '',
                },
                // 表单校验规则
                formRules: {
                    variableName: {
                        required: true,
                        message: '请输入变量名称',
                        trigger: 'blur',
                    },
                    variableCode: {
                        required: true,
                        message: '请输入变量代码',
                        trigger: 'blur',
                    },
                    variableValue: {
                        required: true,
                        message: '请输入变量值',
                        trigger: 'blur',
                    },
                    variableDesc: {
                        required: true,
                        message: '请输入变量描述',
                        trigger: 'blur',
                    },
                },
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Rs.Variable.data(queryData).then(json => {
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
            const { formModel } = this.addDialog;
            this.$api.Rs.Variable.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
        },
        onTableDelete(ids) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Rs.Variable.delete({ ids }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                });
            });
        },
        onDelete() {
            const ids = this.currentTableSelect.reduce((prev, next) => {
                prev.push(next.id);
                return prev;
            }, []);
            this.onTableDelete(ids.join(','));
        },
        onAddDialogConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Rs.Variable.save({
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
    },
};
</script>

<style lang="scss">
</style>
