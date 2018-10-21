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
                    prop="goodsTypeName"
                    label="商品类型"
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
            width="1000px"
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
                    prop="goodsTypeName"
                    label="订单类型"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.goodsTypeName"
                        auto-complete="off"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="authType"
                    label="认证类型"
                    label-width="8em"
                >
                    <checkbox-group-andOr
                        type="buyerAuthType"
                        v-model="addDialog.formModel.authType"
                    />
                </el-form-item>
                <el-form-item
                    prop="paymentMode"
                    label="付款模式"
                    label-width="8em"
                >
                    <checkbox-group-andOr
                        :data="paymentModeList"
                        v-model="addDialog.formModel.paymentMode"
                    />
                </el-form-item>
                <el-form-item
                    label="扩展信息"
                    label-width="8em"
                >
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
                        :data="addDialog.extendFieldInfoList"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="label"
                            label="字段名称"
                            min-width="100"
                        >
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.label"
                                    auto-complete="off"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="校验规则"
                            min-width="220"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="onAddRuleItem(scope.row)"
                                >添加规则
                                </el-button>
                                <el-table
                                    stripe
                                    border
                                    size="small"
                                    :data="scope.row.rules"
                                    style="width: 100%"
                                >
                                    <el-table-column
                                        label="规则名称"
                                        min-width="60"
                                    >
                                        <template slot-scope="rule">
                                            <el-select
                                                v-model="rule.row.valid"
                                                placeholder="请选择"
                                                filterable
                                            >
                                                <el-option
                                                    key="required"
                                                    label="必填"
                                                    value="required"/>
                                                <el-option
                                                    key="mobile"
                                                    label="手机号码"
                                                    value="mobile"/>
                                                <el-option
                                                    key="email"
                                                    label="邮箱地址"
                                                    value="email"/>
                                                <el-option
                                                    key="idCard"
                                                    label="身份证号"
                                                    value="idCard"/>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="校验提示"
                                        min-width="100"
                                    >
                                        <template slot-scope="rule">
                                            <el-input
                                                v-model="rule.row.msg"
                                                auto-complete="off"
                                            />
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="80"
                                    >
                                        <template slot-scope="rule">
                                            <el-button
                                                type="text"
                                                size="small"
                                                @click="onDeleteRuleItem(scope.row, rule.row)"
                                            >删除规则
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
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
    name: 'GoodsTypeSet',
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
                    goodsType: '',
                    goodsTypeName: '',
                    authType: '',
                    paymentMode: '',
                    extendFieldInfo: '',
                    remarks: '',
                },
                // 表单校验规则
                formRules: {
                    paymentMode: [
                        {
                            required: true,
                            message: '请选择付款方式',
                        },
                        {
                            type: 'integer',
                            min: 1,
                            message: '请选择付款方式',
                        },
                    ],
                },
                extendFieldInfoList: [],
            },
            // 表格数据
            tableData: [],
            paymentModeList: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Gd.GoodsTypeSet.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onTableEdit(row) {
            const { formModel } = this.addDialog;
            this.$api.Gd.GoodsTypeSet.getDetail({ goodsType: row.goodsType }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
                this.addDialog.extendFieldInfoList = JSON.parse(this.addDialog.formModel.extendFieldInfo) || [];
            });
            this.addDialog.isVisible = true;
        },
        onAddDialogConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Gd.GoodsTypeSet.save({
                    ...this.addDialog.formModel,
                    extendFieldInfo: JSON.stringify(this.addDialog.extendFieldInfoList),
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
        initPaymentModeList() {
            this.$api.Sp.Shop.getShopAvailablePaymentMode().then(json => {
                this.paymentModeList = json.data.data;
            });
        },
        onAddItem() {
            this.addDialog.extendFieldInfoList.push({ label: '', rules: [] });
        },
        onDeleteItem(row) {
            this.addDialog.extendFieldInfoList.splice(this.addDialog.extendFieldInfoList.indexOf(row), 1);
        },
        onAddRuleItem(list) {
            list.rules.push({});
        },
        onDeleteRuleItem(list, row) {
            list.rules.splice(list.rules.indexOf(row), 1);
        },
    },
    created() {
        this.initPaymentModeList();
    },
};
</script>

<style lang="scss">
</style>
