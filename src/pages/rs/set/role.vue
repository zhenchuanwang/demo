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
                    prop="roleName"
                    label="角色名称"
                >
                    <el-input
                        v-model="queryFormModel.roleName"
                        placeholder="请输入角色名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="roleCode"
                    label="角色代码"
                >
                    <el-input
                        v-model="queryFormModel.roleCode"
                        placeholder="请输入角色代码"
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
                    width="55"/>
                <el-table-column
                    prop="roleName"
                    label="角色名称"
                    width="150"
                />
                <el-table-column
                    prop="roleCode"
                    label="角色代码"
                    width="120"
                />
                <el-table-column
                    prop="operatorName"
                    label="创建人"
                    width="150"
                />
                <el-table-column
                    label="创建时间"
                    width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.insertTime | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lastOperatorName"
                    label="修改人"
                    width="150"
                />
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
                    width="140"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="onTableAuth(scope.row)"
                        >授权
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
        <!-- 角色新增/编辑 -->
        <el-dialog
            :title="addDialog.formModel.id ? '编辑角色' : '新增角色'"
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
                    prop="roleName"
                    label="角色名称"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.roleName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="roleCode"
                    label="角色代码"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.roleCode"
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
        <!-- 授权 -->
        <el-dialog
            title="角色授权"
            center
            :show-close="false"
            width="400px"
            :visible.sync="authDialogVisible"
            @closed="onAuthDialogCancel"
        >
            <el-form
                ref="authForm"
                size="small"
            >
                <el-form-item>
                    <el-tree
                        ref="roleMenuTree"
                        show-checkbox
                        :data="currentRow.authMenuTreeData"
                        :props="{
                            label: 'name',
                            children: 'children',
                        }"
                        node-key="resourceId"
                        :default-checked-keys="currentRow.checkedKeyList"
                    />
                </el-form-item>
            </el-form>
            <div 
                slot="footer" 
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    @click="onAuthDialogConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onAuthDialogCancel"
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
    name: 'Role',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            // 查询表单数据
            queryFormModel: {
                appId: '', // 当前应用 Id
                roleName: '', // 角色名称
                roleCode: '', // 角色代码
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    roleName: '',
                    roleCode: '',
                },
                // 表单校验规则
                formRules: {
                    roleName: {
                        required: true,
                        message: '请输入角色名称',
                        trigger: 'blur',
                    },
                    roleCode: {
                        required: true,
                        message: '请输入角色代码',
                        trigger: 'blur',
                    },
                },
            },
            // 授权 对话框显示
            authDialogVisible: false,
            // 表格数据
            tableData: [],
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
        $$addForm() {
            return this.$refs.addForm;
        },
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Rs.Role.data(queryData).then(json => {
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
            this.$api.Rs.Role.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
            this.currentRow = row;
        },
        onTableDelete(ids) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Rs.Role.delete({ ids }).then(json => {
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
        async onTableAuth(row) {
            if (!row.authMenuTreeData) {
                const json = await this.$api.Rs.Role.getRoleMenu({ roleId: row.id });
                const res = json.data.data;
                const checkedKeyList = [];
                res.forEach(item => {
                    if (item.isAdded) {
                        checkedKeyList.push(item.resourceId);
                    }
                });
                this.$set(row, 'checkedKeyList', checkedKeyList);
                this.$set(row, 'authMenuTreeData', this.$utils.Convert.listToTree(res));
            }
            // this.authMenuTreeData = row.authMenuTreeData;
            this.currentRow = row;
            this.authDialogVisible = true;
        },
        onAddDialogConfirm() {
            this.$$addForm.validate().then(() => {
                this.$api.Rs.Role.save({
                    ...this.addDialog.formModel,
                    appId: this.queryFormModel.appId,
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
        onAuthDialogCancel() {
            const { roleMenuTree } = this.$refs;
            roleMenuTree.setCheckedKeys(this.currentRow.checkedKeyList);
            this.authDialogVisible = false;
        },
        onAuthDialogConfirm() {
            const { roleMenuTree } = this.$refs;
            const checkedNodeList = roleMenuTree.getCheckedNodes();
            const res = [];
            const parentMap = {};
            checkedNodeList.forEach(item => {
                if (!item.isLeaf) return;
                parentMap[item.parentId] = parentMap[item.parentId] || [];
                parentMap[item.parentId].push(item.resourceId);
            });
            for (const key in parentMap) {
                if (parentMap.hasOwnProperty(key)) {
                    res.push({
                        menuId: key,
                        resourceList: parentMap[key].join(','),
                    });
                }
            }

            this.$api.Rs.Role.saveRoleMenu({
                roleId: this.currentRow.id,
                roleMenuStr: JSON.stringify(res),
            }).then(json => {
                const res = json.data;
                this.authDialogVisible = false;
                this.currentRow.checkedKeyList = roleMenuTree.getCheckedKeys();
                this.$message({
                    message: res.msg,
                    type: 'success',
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
