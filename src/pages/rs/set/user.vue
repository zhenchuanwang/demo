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
                    prop="userName"
                    label="用户名"
                >
                    <el-input
                        v-model="queryFormModel.userName"
                        placeholder="请输入用户名"
                    />
                </el-form-item>
                <el-form-item
                    prop="fullName"
                    label="姓名"
                >
                    <el-input
                        v-model="queryFormModel.fullName"
                        placeholder="请输入姓名"
                    />
                </el-form-item>
                <el-form-item
                    prop="userStatus"
                    label="状态"
                >
                    <dictionaries-picker
                        type="userStatus"
                        v-model="queryFormModel.userStatus"
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
                </el-button-group>
            </div>

            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="userName"
                    label="用户名"
                    min-width="100"
                />
                <el-table-column
                    prop="fullName"
                    label="姓名"
                    min-width="100"
                />
                <el-table-column
                    prop="orgName"
                    label="部门"
                    min-width="100"
                />
                <el-table-column
                    prop="userStatusName"
                    label="用户状态"
                    min-width="100"
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
                    width="150"
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
                            @click="onGrantClick(scope.row)"
                        >授权
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="onResetPwdClick(scope.row)"
                        >重置密码
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
                    prop="userName"
                    label="用户名"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.userName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="fullName"
                    label="姓名"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.fullName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="departmentId"
                    label="组织机构"
                    label-width="6em"
                >
                    <CascaderPicker
                        :api-class="selectApi"
                        v-model="addDialog.formModel.departmentId"
                    />
                </el-form-item>
                <el-form-item
                    prop="userStatus"
                    label="用户状态"
                    label-width="6em"
                >
                    <dictionaries-picker
                        type="userStatus"
                        v-model="addDialog.formModel.userStatus"
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

        <!--授权界面-->
        <el-dialog
            title="授权"
            center
            width="600px"
            :visible.sync="grantFormDialog.isVisible"
            @closed="onGrantFormDialogCancel"
        >
            <el-form
                ref="grantForm"
                size="small"
                :model="grantFormDialog.formModel"
                :rules="grantFormDialog.formRules"
            >
                <el-form-item
                    prop="userRoleIdList"
                >
                    <el-collapse v-model="grantFormDialog.selectAppTab">
                        <el-collapse-item
                            v-for="(item,index) in grantFormDialog.userRoleList"
                            :key="index"
                            :title="item.appName"
                            :name="item.appName">
                            <!--<template slot="title">-->
                            <!--{{item.appName}}-->
                            <!--<el-checkbox v-model="item.isAdminPrivileges">是否管理员权限</el-checkbox>-->
                            <!--</template>-->
                            <el-form-item
                                label="是否管理员权限"
                            >
                                <el-checkbox v-model="item.isAdminPrivileges"/>
                            </el-form-item>
                            <el-form-item
                            >
                                <el-checkbox-group v-model="item.selectIds">
                                    <el-checkbox
                                        v-for="role in item.roleList"
                                        :label="role.id"
                                        :key="role.id"
                                        v-model="role.isSelect">{{ role.roleName }}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-collapse-item>
                    </el-collapse>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="success"
                        @click="onSaveGrantClick">保存
                    </el-button>
                    <el-button @click="onGrantFormDialogCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormList } from '@/mixin/queryForm';

export default {
    name: 'User',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                userName: '', // 用户名
                fullName: '', // 姓名
                userStatus: '', // 状态
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    departmentId: '',
                    userName: '',
                    fullName: '',
                    userStatus: '',
                },
                // 表单校验规则
                formRules: {
                    userName: [
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur',
                        },
                        {
                            validator: this.validatorName,
                            message: '用户名不能重复',
                            trigger: 'blur',
                        },
                    ],
                    fullName: {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur',
                    },
                    userStatus: {
                        required: true,
                        message: '请选择用户状态',
                    },
                    departmentId: {
                        required: true,
                        message: '请选择组织机构',
                    },
                },
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            // 授权弹窗
            grantFormDialog: {
                // 对话框显示
                isVisible: false,
                formModel: {
                    id: undefined,
                    appIds: '',
                    roleIds: '',
                    userRoleIdList: [],
                },
                formRules: {},
                userRoleList: [],
                selectAppTab: [],
            },
            selectApi: this.$api.Rs.Org,
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Rs.User.data(queryData).then(json => {
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
            this.$api.Rs.User.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
        },
        onTableDelete(ids) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Rs.User.delete({ ids }).then(json => {
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
                this.$api.Rs.User.save({
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
            this.addDialog.isVisible = false;
        },
        onResetPwdClick(row) {
            this.$confirm('是否重置该用户密码！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Rs.User.resetPwd({
                    id: row.id,
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                });
            });
        },
        onGrantClick(row) {
            this.grantFormDialog.formModel.userId = row.id;
            this.$api.Rs.User.getUserRole({ userId: row.id }).then(json => {
                const res = json.data.data;
                this.grantFormDialog.userRoleList = res;
                this.grantFormDialog.userRoleList.forEach(item => {
                    this.grantFormDialog.selectAppTab.push(item.appName);
                });
            });
            this.grantFormDialog.isVisible = true;
        },
        onSaveGrantClick() {
            const userAppList = [];
            let roleIdList = [];
            this.grantFormDialog.userRoleList.forEach(item => {
                if (item.selectIds.length !== 0) {
                    roleIdList = roleIdList.concat(item.selectIds);
                }
                userAppList.push({
                    appId: item.appId,
                    isAdminPrivileges: item.isAdminPrivileges,
                });
            });
            const { grantForm } = this.$refs;
            grantForm.validate().then(() => {
                this.$api.Rs.User.saveUserRole({
                    ...this.grantFormDialog.formModel,
                    roleIds: roleIdList.join(','),
                    userAppStr: JSON.stringify(userAppList),
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.grantFormDialog.isVisible = false;
                });
            });
        },
        onGrantFormDialogCancel() {
            const { grantForm } = this.$refs;
            grantForm.resetFields();
            this.grantFormDialog.isVisible = false;
        },

        /* -- 自定义校验 -- */
        validatorName(rule, value, callback) {
            this.$api.Rs.User.exists({
                id: this.addDialog.formModel.id,
                userName: this.addDialog.formModel.userName,
                departmentId: this.addDialog.formModel.departmentId,
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
