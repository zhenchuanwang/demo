<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 内容 -->
        <div
            class="body"
            slot="body"
        >
            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="orderTypeName"
                    label="订单类型"
                    min-width="100"
                />
                <el-table-column
                    prop="payOvertime"
                    label="支付超时(分钟)"
                    min-width="100"
                />
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
                    prop="orderTypeName"
                    label="订单类型"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.orderTypeName"
                        auto-complete="off"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="payOvertime"
                    label="支付超时(分钟)"
                    label-width="8em"
                >
                    <el-input-number
                        controls-position="right"
                        :min="0"
                        :max="1000"
                        v-model.number="addDialog.formModel.payOvertime"
                    />
                    为0不做限制
                </el-form-item>
                <el-form-item
                    prop="remarks"
                    label="备注"
                    label-width="8em"
                >
                    <el-input
                        type="textarea"
                        v-model="addDialog.formModel.remarks"
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
    name: 'ParameterSet',
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
                    orderType: '',
                    orderTypeName: '',
                    payOvertime: '',
                    remarks: '',
                },
                // 表单校验规则
                formRules: {},
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Ex.ParameterSet.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onTableSelectionChange(val) {
            this.currentTableSelect = val;
        },
        onTableEdit(row) {
            const { formModel } = this.addDialog;
            this.$api.Ex.ParameterSet.getDetail({ orderType: row.orderType }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
        },
        onAddDialogConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Ex.ParameterSet.save({
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
