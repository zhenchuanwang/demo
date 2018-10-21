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
                    prop="orgId"
                    label="组织机构"
                >
                    <el-select
                        v-model="queryFormModel.orgId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in orgList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id + ''"/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="serverIp"
                    label="服务IP"
                >
                    <el-input
                        v-model="queryFormModel.serverIp"
                        placeholder="请输入服务IP"
                    />
                </el-form-item>
                <el-form-item
                    prop="serverPort"
                    label="服务端口"
                >
                    <el-input
                        v-model="queryFormModel.serverPort"
                        placeholder="请输入服务端口"
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
                    prop="orgName"
                    label="组织机构"
                    min-width="100"
                />
                <el-table-column
                    prop="serverIp"
                    label="服务IP"
                    min-width="100"
                />
                <el-table-column
                    prop="serverPort"
                    label="服务端口"
                    min-width="100"
                />
                <el-table-column
                    prop="spid"
                    label="spid"
                    min-width="100"
                />
                <el-table-column
                    prop="smsSign"
                    label="短信签名"
                    min-width="100"
                />
                <el-table-column
                    prop="password"
                    label="密码"
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
                    prop="orgId"
                    label="组织机构"
                    label-width="6em"
                >
                    <el-select
                        v-model="addDialog.formModel.orgId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in orgList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id + ''"/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="serverIp"
                    label="服务IP"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.serverIp"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="serverPort"
                    label="服务端口"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.serverPort"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="spid"
                    label="spid"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.spid"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="smsSign"
                    label="短信签名"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.smsSign"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="password"
                    label="密码"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.password"
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
    name: 'SmsAccount',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                orgId: '', // 组织机构ID
                serverIp: '', // 服务IP
                serverPort: '', // 服务端口
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    orgId: '',
                    serverIp: '',
                    serverPort: '',
                    spid: '',
                    smsSign: '',
                    password: '',
                    isAvailable: true,
                },
                // 表单校验规则
                formRules: {
                    orgId: {
                        required: true,
                        message: '请选择组织机构',
                    },
                    serverIp: {
                        required: true,
                        message: '请输入服务IP',
                        trigger: 'blur',
                    },
                    serverPort: {
                        required: true,
                        message: '请输入服务端口',
                        trigger: 'blur',
                    },
                    spid: {
                        required: true,
                        message: '请输入spid',
                        trigger: 'blur',
                    },
                    smsSign: {
                        required: true,
                        message: '请输入短信签名',
                        trigger: 'blur',
                    },
                    password: {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur',
                    },
                },
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            // 组织机构列表
            orgList: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Ms.SmsAccount.data(queryData).then(json => {
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
            this.$api.Ms.SmsAccount.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                res.orgId = res.orgId + '';
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
        },
        onTableDelete(ids) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Ms.SmsAccount.delete({ ids }).then(json => {
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
                this.$api.Ms.SmsAccount.save({
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
            this.$api.Ms.SmsAccount.status({
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
        initOrgList() {
            this.$api.Rs.Org.select().then(json => {
                const res = json.data.data;
                this.orgList = res;
            });
        },
    },
    created() {
        this.initOrgList();
    },
};
</script>

<style lang="scss">
</style>
