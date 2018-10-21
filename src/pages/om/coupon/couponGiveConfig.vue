<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 内容 -->
        <div
            class="body"
            slot="body"
            v-loading="querying"
        >
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
                    prop="couponGiveCaseName"
                    label="场景名称"
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
            :title="addDialog.formModel.id ? '编辑' : '新增'"
            center
            width="900px"
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
                    prop="couponGiveCaseName"
                    label="优惠券场景"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.couponGiveCaseName"
                        auto-complete="off"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="couponGiveCase"
                    label="优惠券代码"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.couponGiveCase"
                        auto-complete="off"
                        disabled
                    />
                </el-form-item>
                <el-col :span="24">
                    <el-form-item
                        label="优惠券列表"
                        label-width="8em">
                        <div
                            class="ma-b"
                        >
                            <el-button-group>
                                <el-button
                                    type="success"
                                    icon="el-icon-plus"
                                    size="small"
                                    @click="onAddItem"
                                >新增
                                </el-button>
                            </el-button-group>
                        </div>
                        <!-- 表格 -->
                        <el-table
                            stripe
                            border
                            size="small"
                            :data="couponConfigList"
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="couponDesc"
                                label="优惠券名称"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.couponDesc"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="couponAmount"
                                label="优惠券金额"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.couponAmount"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="couponUseAmount"
                                label="优惠券满减金额限制"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.couponUseAmount"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="couponPeriod"
                                label="优惠券有效期(天)"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.couponPeriod"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="45"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="onDeleteItem(scope.row)"
                                    >删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
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
    name: 'CouponGiveConfig',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    couponGiveCaseName: '',
                    couponGiveCase: '',
                    couponConfig: '',
                    isAvailable: true,
                },
                // 表单校验规则
                formRules: {},
            },
            // 表格数据
            tableData: [],
            // 表格数据
            couponConfigList: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Pm.CouponGiveConfig.data(queryData).then(json => {
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
            this.$api.Pm.CouponGiveConfig.getDetail({ couponGiveCase: row.couponGiveCase }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
                this.couponConfigList = JSON.parse(json.data.data.couponConfig) || [];
            });
            this.addDialog.isVisible = true;
            this.addDialog.formModel.couponGiveCaseName = row.couponGiveCaseName;
        },
        onAddDialogConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.addDialog.formModel.couponConfig = JSON.stringify(this.couponConfigList);
                this.$api.Pm.CouponGiveConfig.save({
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
            this.$api.Pm.CouponGiveConfig.status({
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
        /* -- 事件 -- */
        onAddItem() {
            this.couponConfigList.push({});
        },
        onDeleteItem(row) {
            this.couponConfigList.splice(this.couponConfigList.indexOf(row), 1);
        },
    },
};
</script>

<style lang="scss">
</style>
