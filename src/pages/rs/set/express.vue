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
                    prop="expressName"
                    label="快递公司名称"
                >
                    <el-input
                        v-model="queryFormModel.expressName"
                        placeholder="请输入快递公司名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="expressCode"
                    label="快递公司代码"
                >
                    <el-input
                        v-model="queryFormModel.expressCode"
                        placeholder="请输入快递公司代码"
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
                    prop="expressName"
                    label="快递公司名称"
                    min-width="100"
                />
                <el-table-column
                    prop="expressCode"
                    label="快递公司代码"
                    min-width="100"
                />
                <el-table-column
                    prop="expressWebsite"
                    label="快递公司网址"
                    min-width="100"
                />
                <el-table-column
                    prop="expressDesc"
                    label="快递公司描述"
                    min-width="100"
                />
                <el-table-column
                    prop="orderNum"
                    label="排序"
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
                    prop="expressName"
                    label="快递公司名称"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.expressName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="expressCode"
                    label="快递公司代码"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.expressCode"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="expressWebsite"
                    label="快递公司网址"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.expressWebsite"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="expressDesc"
                    label="快递公司描述"
                    label-width="8em"
                >
                    <el-input
                        type="textarea"
                        v-model="addDialog.formModel.expressDesc"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="orderNum"
                    label="排序"
                    label-width="8em"
                >
                    <el-input-number
                        controls-position="right"
                        :min="1"
                        :max="255"
                        v-model.number="addDialog.formModel.orderNum"
                    />
                </el-form-item>
                <el-form-item
                    prop="isAvailable"
                    label="是否可用"
                    label-width="8em"
                >
                    <el-switch
                        v-model="addDialog.formModel.isAvailable"
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
    name: 'Express',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                expressName: '', // 快递公司名称
                expressCode: '', // 快递公司代码
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    expressName: '',
                    expressCode: '',
                    expressDesc: '',
                    expressWebsite: '',
                    orderNum: '',
                    isAvailable: true,
                },
                // 表单校验规则
                formRules: {
                    expressName: {
                        required: true,
                        message: '请输入快递公司名称',
                        trigger: 'blur',
                    },
                    expressCode: {
                        required: true,
                        message: '请输入快递公司代码',
                        trigger: 'blur',
                    },
                    orderNum: {
                        required: true,
                        message: '请输入排序号',
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
            return this.$api.Rs.Express.data(queryData).then(json => {
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
            this.$api.Rs.Express.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
        },
        onTableDelete(ids) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Rs.Express.delete({ ids }).then(json => {
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
                this.$api.Rs.Express.save({
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
            this.$api.Rs.Express.status({
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
    },
};
</script>

<style lang="scss">
</style>
