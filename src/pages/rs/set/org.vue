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
                    prop="name"
                    label="部门名称"
                >
                    <el-input
                        v-model="queryFormModel.name"
                        placeholder="请输入部门名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="code"
                    label="部门代码"
                >
                    <el-input
                        v-model="queryFormModel.code"
                        placeholder="请输入部门代码"
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
                    label:'部门名称',
                    minWidth:200,
                }"
                ref="treeTable"
                stripe
                border
                size="small"
                style="width: 100%"
            >
                <el-table-column
                    prop="code"
                    label="部门代码"
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
                    width="170"
                >
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.lv === 1"
                            type="text"
                            size="small"
                            @click="onTableAuth(scope.row)"
                        >授权
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
                    label="上级部门"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.parentName"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="name"
                    label="部门名称"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.name"
                    />
                </el-form-item>
                <el-form-item
                    prop="code"
                    label="部门代码"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.code"
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
            title="组织机构授权"
            center
            :show-close="false"
            width="600px"
            :visible.sync="authDialog.isVisible"
            @closed="onAuthDialogCancel"
        >
            <el-form
                ref="authForm"
                size="small"
                label-position="right"
                label-width="80px"
            >
                <el-collapse>
                    <el-collapse-item
                        v-for="item in authDialog.orgMenuList"
                        :key="item.appId"
                        :title="item.appName"
                        :name="item.appId"
                    >
                        <el-form-item
                            label="应用地址"
                        >
                            <el-input
                                v-model="item.appUrl"
                            />
                        </el-form-item>
                        <el-form-item
                            label="应用名称"
                        >
                            <el-input
                                v-model="item.siteName"
                            />
                        </el-form-item>
                        <el-form-item
                            label="登录背景"
                        >
                            <upload
                                action="/rs/attachment/uploadOrgAppImage"
                                :limit="1"
                                v-model="item.loginImage"
                            />
                        </el-form-item>
                        <el-tree
                            ref="orgMenuTree"
                            show-checkbox
                            :data="item.authMenuTreeData"
                            :props="{
                                label: 'name',
                                children: 'children',
                            }"
                            node-key="resourceId"
                            :default-checked-keys="item.checkedKeyList"
                        />
                    </el-collapse-item>
                </el-collapse>
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
import { queryFormTree } from '@/mixin/queryForm';

export default {
    name: 'Org',
    mixins: [pagesMixin, queryFormTree],
    data() {
        return {
            queryFormModel: {
                name: '', // 部门名称
                code: '', // 部门代码
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
                    regionCode: '',
                    regionAlias: '',
                    regionType: '',
                    orderNum: 1,
                    isAvailable: '',
                },
                // 表单校验规则
                formRules: {
                    name: [
                        {
                            required: true,
                            message: '请输入组织机构名称',
                            trigger: 'blur',
                        },
                        {
                            validator: this.validatorName,
                            message: '组织机构名称不能重复',
                            trigger: 'blur',
                        },
                    ],
                    regionCode: {
                        required: true,
                        message: '请输入组织机构代码',
                        trigger: 'blur',
                    },
                    regionType: {
                        required: true,
                        message: '请输选择类型',
                        // trigger: 'blur',
                    },
                },
            },
            // 表格数据
            // tableData: [],
            // 表格当前行
            currentRow: {},
            // 表格当前选中行
            currentTableSelect: [],
            // 授权对话框
            authDialog: {
                // 对话框显示
                isVisible: false,
                // 菜单列表
                orgMenuList: [],
            },
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData({ row = {} } = {}) {
            this.querying = true;
            return this.$api.Rs.Org.data({
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
            this.$api.Rs.Org.getDetail({ id: row.id }).then(json => {
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
                this.$api.Rs.Org.delete({ ids }).then(json => {
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
                this.$api.Rs.Org.save({
                    ...formModel,
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
            this.$api.Rs.Org.status({
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
        async onTableAuth(row) {
            const { authForm } = this.$refs;
            if (authForm) {
                authForm.resetFields();
            }

            const json = await this.$api.Rs.Org.getOrgMenu({ orgId: row.id });
            const res = json.data.data;

            res.forEach(item => {
                const checkedKeyList = [];
                item.orgMenuList.forEach(orgMenu => {
                    if (orgMenu.isAdded) {
                        checkedKeyList.push(orgMenu.resourceId);
                    }
                });
                this.$set(item, 'checkedKeyList', checkedKeyList);
                this.$set(item, 'authMenuTreeData', this.$utils.Convert.listToTree(item.orgMenuList));
            });
            this.authDialog.orgMenuList = res;
            this.currentRow = row;
            this.authDialog.isVisible = true;
        },
        onAuthDialogCancel() {
            const { authForm } = this.$refs;
            authForm.resetFields();
            this.authDialog.isVisible = false;
        },
        onAuthDialogConfirm() {
            const orgMenuList = [];
            const orgAppList = [];
            this.authDialog.orgMenuList.forEach((item, index) => {
                const orgMenuTree = this.$refs['orgMenuTree'];
                const checkedNodeList = orgMenuTree[index].getCheckedNodes();
                const parentMap = {};
                checkedNodeList.forEach(item => {
                    if (!item.isLeaf) return;
                    parentMap[item.parentId] = parentMap[item.parentId] || [];
                    parentMap[item.parentId].push(item.resourceId);
                });
                for (const key in parentMap) {
                    if (parentMap.hasOwnProperty(key)) {
                        orgMenuList.push({
                            menuId: key,
                            appId: item.appId,
                            resourceList: parentMap[key].join(','),
                        });
                    }
                }
                orgAppList.push({
                    appId: item.appId,
                    appUrl: item.appUrl,
                    loginImage: item.loginImage,
                    siteName: item.siteName,
                });
            });
            this.$api.Rs.Org.saveOrgMenu({
                orgId: this.currentRow.id,
                orgMenuStr: JSON.stringify(orgMenuList),
                orgAppList: orgAppList,
            }).then(json => {
                const res = json.data;
                this.authDialog.isVisible = false;
                this.$message({
                    message: res.msg,
                    type: 'success',
                });
            });
        },
        /* -- 自定义校验 -- */
        validatorName(rule, value, callback) {
            this.$api.Rs.Org.exists({
                pId: this.addDialog.formModel.parentId,
                id: this.addDialog.formModel.id,
                name: this.addDialog.formModel.name,
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
