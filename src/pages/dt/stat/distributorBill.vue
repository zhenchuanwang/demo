<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-tabs
                class="classify-tabs"
                v-model="queryFormModel.billStatus"
                type="card"
                @tab-click="onQuery()"
            >
                <el-tab-pane
                    label="未付款"
                    name="1"/>
                <el-tab-pane
                    label="已付款"
                    name="2"/>
            </el-tabs>
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
                <el-form-item
                    prop="billName"
                    label="账单名称"
                >
                    <el-input
                        v-model="queryFormModel.billName"
                        placeholder="请输入账单名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="distributorName"
                    label="分销商姓名"
                >
                    <el-input
                        v-model="queryFormModel.distributorName"
                        placeholder="请输入分销商姓名"
                    />
                </el-form-item>
                <el-form-item
                    prop="distributorTel"
                    label="分销商手机号"
                >
                    <el-input
                        v-model="queryFormModel.distributorTel"
                        placeholder="请输入分销商手机号"
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
            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="billName"
                    label="账单名称"
                    min-width="100"
                />
                <el-table-column
                    prop="distributorName"
                    label="分销商姓名"
                    min-width="100"
                />
                <el-table-column
                    prop="distributorTel"
                    label="分销商电话"
                    min-width="100"
                />
                <el-table-column
                    prop="billAmount"
                    label="账单金额"
                    min-width="100"
                />
                <el-table-column
                    prop="billStatusName"
                    label="账单状态"
                    min-width="100"
                />
                <el-table-column
                    prop="paymentDesc"
                    label="账单说明"
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
                            v-if="scope.row.billStatus === 1"
                        >付款
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
            title="账单付款"
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
                    prop="billAmount"
                    label="账单金额"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.billAmount"
                        auto-complete="off"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="payDesc"
                    label="付款说明"
                    label-width="6em"
                >
                    <el-input
                        type="textarea"
                        v-model="addDialog.formModel.payDesc"
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
    name: 'DistributorBill',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                billStatus: '1',
                billName: '',
                distributorName: '',
                distributorTel: '',
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    billAmount: '',
                    payDesc: '',
                },
                // 表单校验规则
                formRules: {
                    payDesc: {
                        required: true,
                        message: '请输入付款说明',
                        trigger: 'blur',
                    },
                },
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Mb.DistributorBill.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onTableEdit(row) {
            const { formModel } = this.addDialog;
            this.$utils.Comm.formModelMerge(formModel, row);
            this.addDialog.isVisible = true;
        },
        onAddDialogConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Mb.DistributorBill.payBill({
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
