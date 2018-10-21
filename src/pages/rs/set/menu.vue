<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <appPicker
            slot="headerExtra"
            v-model="queryFormModel.appId"
        />
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
                    prop="name"
                    label="菜单名称"
                >
                    <el-input
                        v-model="queryFormModel.name"
                        placeholder="请输入菜单名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="isAvailable"
                    label="状态"
                >
                    <el-select
                        v-model="queryFormModel.isAvailable"
                        placeholder="请选择"
                    >
                        <el-option
                            label="全部"
                            value=""/>
                        <el-option
                            label="启用"
                            value="1"/>
                        <el-option
                            label="禁用"
                            value="0"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onQuery"
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
                </el-button-group>
            </div>

            <!-- 表格 -->
            <tree-table
                :lazy-load="getListData"
                init-not-load
                :expand-props="{
                    prop:'name',
                    label:'菜单名称',
                    minWidth:200,
                }"
                ref="treeTable"
                stripe
                border
                size="small"
                style="width: 100%"
            >
                <el-table-column
                    prop="href"
                    label="链接"
                    min-width="100"
                />
                <el-table-column
                    prop="parameter"
                    label="参数"
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
                    prop="orderNum"
                    label="排序"
                    min-width="100"
                />
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="195"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="onResourceEdit(scope.row)"
                        >权限管理
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="onTableAdd(scope.row)"
                        >新增
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="onTableEdit(scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="onTableDelete(scope.row.id,scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </tree-table>
        </div>

        <!-- 弹框 -->
        <!-- 变量新增/编辑 -->
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
                    v-if="addDialog.formModel.parentId"
                    prop="parentName"
                    label="上级菜单"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.parentName"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="name"
                    label="菜单名称"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.name"
                    />
                </el-form-item>
                <el-form-item
                    prop="href"
                    label="链接"
                    label-width="6em"
                >
                    <router-picker
                        v-model="addDialog.formModel.href"
                        filterable
                    />
                </el-form-item>
                <el-form-item
                    prop="parameter"
                    label="参数"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.parameter"
                    />
                </el-form-item>
                <el-form-item
                    prop="orderNum"
                    label="排序"
                    label-width="6em"
                >
                    <el-input-number
                        controls-position="right"
                        :min="1"
                        :max="255"
                        v-model.number="addDialog.formModel.orderNum"
                    />
                </el-form-item>
                <el-form-item
                    prop="identifier"
                    label="权限标识"
                    label-width="6em"
                    v-show="!addDialog.formModel.id"
                >
                    <el-input
                        v-model="addDialog.formModel.identifier"
                    />
                </el-form-item>
                <el-form-item
                    prop="resource"
                    label="权限"
                    label-width="6em"
                    v-show="!addDialog.formModel.id"
                >
                    <el-checkbox-group
                        v-model="addDialog.formModel.resource"
                    >
                        <el-checkbox
                            label="read_查询"
                            disabled>查询
                        </el-checkbox>
                        <el-checkbox label="add_新增">新增</el-checkbox>
                        <el-checkbox label="edit_编辑">编辑</el-checkbox>
                        <el-checkbox label="del_删除">删除</el-checkbox>
                    </el-checkbox-group>
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

        <!--权限管理界面-->
        <el-dialog
            title="权限管理"
            center
            width="800px"
            :visible.sync="resourceFormDialog.isVisible"
            @closed="onCancelResourceClick"
        >
            <el-form
                ref="resourceForm"
                size="small"
                :model="resourceFormDialog.formModel"
                :rules="resourceFormDialog.formRules"
            >
                <el-form-item
                    prop="identifier"
                    label="权限标识"
                    label-width="6em"
                >
                    <el-input
                        v-model="resourceFormDialog.formModel.identifier"
                        placeholder="请输入权限标识"
                        :maxlength="100"
                    />
                </el-form-item>
                <el-form-item
                    prop="menuResource"
                    label="权限列表"
                    label-width="6em"
                >
                    <div class="ma-b">
                        <el-button @click="onAddResourceClick">新增</el-button>
                    </div>
                    <el-table
                        stripe
                        border
                        size="small"
                        ref="resourceFormTable"
                        :data="resourceFormDialog.formModel.menuResource"
                    >
                        <el-table-column label="权限名称">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.resourceName"
                                    :maxlength="20"
                                    :disabled="scope.row.isSystem"/>
                            </template>
                        </el-table-column>
                        <el-table-column label="权限代码">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.resourceCode"
                                    :maxlength="20"
                                    :disabled="scope.row.isSystem"/>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="60">
                            <template slot-scope="scope">
                                <el-button
                                    size="small"
                                    type="text"
                                    @click="onDeleteResourceClick(scope.$index, resourceFormDialog.formModel.menuResource)"
                                    :disabled="scope.row.isSystem">
                                    <span>删除</span>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    @click="onSaveResourceClick"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onCancelResourceClick"
                >取 消
                </el-button>
            </div>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormTree } from '@/mixin/queryForm';

export default {
    name: 'MenuPage',
    mixins: [pagesMixin, queryFormTree],
    data() {
        return {
            queryFormModel: {
                appId: '', // 当前应用 Id,
                name: '', // 菜单名称
                isAvailable: '', // 状态
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    parentId: '',
                    parentName: '',
                    name: '',
                    href: '',
                    parameter: '',
                    orderNum: 1,
                    isAvailable: true,
                    identifier: undefined,
                    resource: ['read_查询'],
                    appId: undefined,
                },
                // 表单校验规则
                formRules: {
                    name: [
                        {
                            required: true,
                            message: '请输入菜单名称',
                            trigger: 'blur',
                        },
                        {
                            validator: this.validatorName,
                            message: '菜单名称不能重复',
                            trigger: 'blur',
                        },
                    ],
                },
            },
            resourceFormDialog: {
                // 对话框显示
                isVisible: false,
                formModel: {
                    menuId: undefined,
                    identifier: undefined,
                    menuResource: [],
                },
                formRules: {
                    identifier: [
                        {
                            required: true,
                            message: '请输入权限标识',
                            trigger: 'blur,change',
                        },
                    ],
                    menuResource: [],
                },
            },
            // 表格数据
            // tableData: [],
            // 表格当前行
            currentRow: {},
            // 表格当前选中行
            currentTableSelect: [],
        };
    },
    computed: {
        isFormInitialized() {
            return !!+this.queryFormModel.appId;
        },
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData({ row = {} } = {}) {
            this.querying = true;
            return this.$api.Rs.Menu.data({
                pId: row ? row.id : null,
                ...this.queryFormModel,
            }).then(json => {
                this.querying = false;
                const res = json.data.data.sort((prev, next) => {
                    return prev.orderNum - next.orderNum;
                });
                return Promise.resolve(res);
            });
        },
        /* -- 事件 -- */
        onAdd() {
            this.addDialog.isVisible = true;
            this.$nextTick(() => {
                const { formModel } = this.addDialog;
                const { addForm } = this.$refs;
                addForm.resetFields();
                // id/parentId 不在表单之内所以要手机重置
                formModel.id = '';
                formModel.parentId = '';
            });
        },
        onTableSelectionChange(val) {
            this.currentTableSelect = val;
        },
        onTableAdd(row) {
            this.addDialog.isVisible = true;
            this.$nextTick(() => {
                const { formModel } = this.addDialog;
                const { addForm } = this.$refs;
                addForm.resetFields();
                formModel.id = '';
                formModel.parentId = row.id;
                formModel.parentName = row.name;
            });
            this.currentRow = row;
        },
        onTableEdit(row) {
            const { formModel } = this.addDialog;
            this.$api.Rs.Menu.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.currentRow = row;
            this.addDialog.isVisible = true;
        },
        onTableDelete(ids, row) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Rs.Menu.delete({ ids }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    // this.onQuery();
                    const { treeTable } = this.$refs;
                    treeTable.removeNode(row);
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
            const { formModel } = this.addDialog;
            addForm.validate().then(() => {
                this.$api.Rs.Menu.save({
                    ...formModel,
                    appId: this.queryFormModel.appId,
                }).then(json => {
                    const { msg, data } = json.data;
                    this.$message({
                        message: msg,
                        type: 'success',
                    });
                    const { treeTable } = this.$refs;
                    const { currentRow } = this;
                    if (!formModel.parentId && !formModel.id) {
                        // 新增根节点
                        treeTable.loadNode();
                    } else if (formModel.id) {
                        // 更新节点
                        console.log(currentRow);
                        for (const key in currentRow) {
                            if (currentRow.hasOwnProperty(key) && data[key] !== undefined) {
                                currentRow[key] = data[key];
                            }
                        }
                        // 重新排序
                        currentRow._parent.children = currentRow._parent.children.sort((prev, next) => {
                            return prev.orderNum - next.orderNum;
                        });
                    } else if (formModel.parentId) {
                        // 新增子节点
                        treeTable.loadNode(currentRow);
                    }
                    this.addDialog.isVisible = false;
                });
            });
        },
        onAddDialogCancel() {
            const { addForm } = this.$refs;
            addForm.resetFields();
            this.addDialog.isVisible = false;
        },
        onIsAvailableInput(val, scope) {
            const { row } = scope;
            if (!row) return;
            this.$api.Rs.Menu.status({
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
        /* 权限管理 */
        onResourceEdit(row) {
            const { formModel } = this.resourceFormDialog;
            this.$api.Rs.Menu.menuResourceList({ menuId: row.id }).then(json => {
                const res = json.data.data;
                for (const key in formModel) {
                    if (formModel.hasOwnProperty(key)) {
                        formModel[key] = res[key] || '';
                    }
                }
            });
            this.currentRow = row;
            this.resourceFormDialog.isVisible = true;
        },
        onCancelResourceClick() {
            const { resourceForm } = this.$refs;
            resourceForm.resetFields();
            this.resourceFormDialog.isVisible = false;
        },
        onAddResourceClick() {
            this.resourceFormDialog.formModel.menuResource.push({
                id: undefined,
                resourceName: '',
                resourceCode: '',
                isSystem: false,
            });
        },
        onDeleteResourceClick(index, row) {
            row.splice(index, 1);
        },
        onSaveResourceClick() {
            this.$refs.resourceForm.validate().then(() => {
                let flag = false;
                this.resourceFormDialog.formModel.menuResource.forEach(item => {
                    const resourceName = item.resourceName.trim();
                    const resourceCode = item.resourceCode.trim();
                    if (resourceName === '') {
                        this.$alert('权限名称不能为空', '错误提示', {
                            confirmButtonText: '确定',
                        });
                        flag = true;
                    } else if (resourceCode === '') {
                        this.$alert('权限标识不能为空', '错误提示', {
                            confirmButtonText: '确定',
                        });
                        flag = true;
                    }
                });
                if (flag) return;

                this.$api.Rs.Menu.saveMenuResource(this.resourceFormDialog.formModel)
                    .then(json => {
                        const res = json.data;
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                        this.resourceFormDialog.isVisible = false;
                    })
                    .catch();
            });
        },
        /* -- 自定义校验 -- */
        validatorName(rule, value, callback) {
            this.$api.Rs.Menu.exists({
                pId: this.addDialog.formModel.parentId,
                id: this.addDialog.formModel.id,
                name: this.addDialog.formModel.name,
                appId: this.queryFormModel.appId,
            }).then(res => {
                if (res.data.data) {
                    callback(rule.message);
                } else {
                    callback();
                }
            });
        },
    },
};
</script>

<style lang="scss">
</style>
