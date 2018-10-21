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
                    prop="caseName"
                    label="场景名称"
                    min-width="100"
                />
                <el-table-column
                    prop="caseDesc"
                    label="场景描述"
                    min-width="100"
                />
                <el-table-column
                    prop="isAvailable"
                    label="是否可用"
                    min-width="100"
                >
                    <template
                        slot-scope="scope"
                    >
                        {{ scope.row.isAvailable == null ? '未设置' : scope.row.isAvailable == 1 ? '是' : '否' }}
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
                    prop="caseName"
                    label="积分场景"
                    label-width="7em"
                >
                    <el-input
                        v-model="addDialog.formModel.caseName"
                        auto-complete="off"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="caseCode"
                    label="积分代码"
                    label-width="7em"
                >
                    <el-input
                        v-model="addDialog.formModel.caseCode"
                        auto-complete="off"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="caseDesc"
                    label="积分描述"
                    label-width="7em"
                >
                    <el-input
                        v-model="addDialog.formModel.caseDesc"
                        auto-complete="off"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="fixedPoint"
                    label="固定积分"
                    label-width="7em"
                    key="fixedPoint"
                    v-if="addDialog.formModel.caseCode === 'buyerRegister'"
                >
                    <el-input-number
                        controls-position="right"
                        :min="1"
                        :max="99999"
                        v-model.number="addDialog.ruleConfig.fixedPoint"
                    />
                </el-form-item>
                <el-form-item
                    prop="exchangeRatio"
                    label="兑换比例"
                    label-width="7em"
                    key="exchangeRatio"
                    v-if="addDialog.formModel.caseCode === 'buyerOrder'"
                >
                    <el-input-number
                        controls-position="right"
                        :min="1"
                        :max="100"
                        v-model.number="addDialog.ruleConfig.exchangeRatio"
                    />
                    1元=？积分
                </el-form-item>
                <template
                    v-if="addDialog.formModel.caseCode === 'buyerBuy'">
                    <el-form-item
                        prop="deductibleAmount"
                        label="抵扣金额"
                        label-width="7em"
                        key="deductibleAmount"
                    >
                        <el-input-number
                            controls-position="right"
                            :min="1"
                            :max="99999"
                            v-model.number="addDialog.ruleConfig.deductibleAmount"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="consumptionPoints"
                        label="消耗积分"
                        label-width="7em"
                        key="consumptionPoints"
                    >
                        <el-input-number
                            controls-position="right"
                            :min="1"
                            :max="99999"
                            v-model.number="addDialog.ruleConfig.consumptionPoints"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="maxProportion"
                        label="最大抵扣比例"
                        label-width="7em"
                        key="maxProportion"
                    >
                        <el-input-number
                            controls-position="right"
                            :min="0"
                            :max="100"
                            :precision="2"
                            v-model.number="addDialog.ruleConfig.maxProportion"
                        />
                    </el-form-item>
                </template>
                <el-form-item
                    prop="isAvailable"
                    label="是否可用"
                    label-width="7em"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="addDialog.formModel.isAvailable"
                        />
                    </template>
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
    name: 'PointRule',
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
                    pointCaseId: '',
                    ruleConfig: '',
                    isAvailable: '',
                    caseName: '',
                    caseCode: '',
                    caseDesc: '',
                },
                // 表单校验规则
                formRules: {},
                ruleConfig: {},
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Mb.PointRule.data(queryData).then(json => {
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
            this.$api.Mb.PointRule.getDetail({ pointCaseId: row.pointCaseId }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
                this.addDialog.ruleConfig = JSON.parse(formModel.ruleConfig) || {};
            });
            this.addDialog.isVisible = true;
        },
        onAddDialogConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Mb.PointRule.save({
                    ...this.addDialog.formModel,
                    ruleConfig: JSON.stringify(this.addDialog.ruleConfig),
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
