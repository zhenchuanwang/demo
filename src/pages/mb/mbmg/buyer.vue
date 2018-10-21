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
                    prop="nickName"
                    label="昵称"
                >
                    <el-input
                        v-model="queryFormModel.nickName"
                        placeholder="请输入昵称"
                    />
                </el-form-item>
                <el-form-item
                    prop="mobile"
                    label="电话"
                >
                    <el-input
                        v-model="queryFormModel.mobile"
                        placeholder="请输入电话"
                    />
                </el-form-item>
                <el-form-item
                    prop="buyerStatus"
                    label="买家状态"
                >
                    <dictionaries-picker
                        type="buyerStatus"
                        v-model="queryFormModel.buyerStatus"
                    />
                </el-form-item>
                <el-form-item
                    prop="buyerLevelId"
                    label="会员等级"
                >
                    <el-select
                        v-model="queryFormModel.buyerLevelId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in buyerLevelList"
                            :key="item.id"
                            :label="item.levelName"
                            :value="item.id + ''"/>
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
                        @click="onBatchChangeBuyerLevel"
                    >批量设置会员等级
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
                    prop="buyerLevelName"
                    label="会员等级"
                    min-width="100"
                />
                <el-table-column
                    prop="nickName"
                    label="昵称"
                    min-width="100"
                />
                <el-table-column
                    label="头像"
                    width="120"
                >
                    <template slot-scope="scope">
                        <ImageList
                            :data="scope.row.avatar"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="电话"
                    min-width="100"
                />
                <el-table-column
                    label="注册时间"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.registerTime | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="buyerStatusName"
                    label="买家状态"
                    min-width="100"
                />
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="160"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="onChangeBuyerLevel(scope.row)"
                        >设置会员等级
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="onOrderImport(scope.row)"
                        >订单导入
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
        <!-- 设置会员等级 -->
        <el-dialog
            title="设置会员等级"
            center
            width="400px"
            :visible.sync="setLevelDialog.isVisible"
            @closed="onSetLevelDialogCancel"
        >
            <el-form
                ref="addForm"
                size="small"
                :model="setLevelDialog.formModel"
                :rules="setLevelDialog.formRules"
            >
                <el-form-item
                    prop="buyerLevelId"
                    label="会员等级"
                    label-width="6em"
                >
                    <el-select
                        v-model="setLevelDialog.formModel.buyerLevelId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in buyerLevelList"
                            :key="item.id"
                            :label="item.levelName"
                            :value="item.id + ''"/>
                    </el-select>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    @click="onSetLevelDialogConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onSetLevelDialogCancel"
                >取 消
                </el-button>
            </div>
        </el-dialog>

        <!--订单导入-->
        <el-dialog
            title="订单导入"
            center
            width="600px"
            :visible.sync="orderImportDialog.isVisible"
            @closed="onOrderImportDialogCancel"
        >
            <el-form
                ref="addForm"
                size="small"
            >
                <el-form-item
                    label="会员等级:"
                    label-width="6em"
                >
                    {{ orderImportDialog.buyer.buyerLevelName }}
                </el-form-item>
                <el-form-item
                    label="电话:"
                    label-width="6em"
                >
                    {{ orderImportDialog.buyer.mobile }}
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    disabled
                >模板下载
                </el-button>
                <el-upload
                    class="upload-demo dp-ib ma-l"
                    action="/ex/order/batchCreateOrderByExcel"
                    :data="{buyerId: this.orderImportDialog.buyer.id}"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    :on-success="onOrderImportSuccess"
                    :on-error="onOrderImportError"
                    :headers="{token:$config.AXIOS_DEFAULT_CONFIG.headers.token}"
                >
                    <el-button
                        size="small"
                        type="primary"
                    >
                        点击上传
                    </el-button>
                </el-upload>
            </div>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormList } from '@/mixin/queryForm';

export default {
    name: 'Buyer',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                nickName: '', // 昵称
                mobile: '', // 电话
                buyerStatus: '', // 会员状态
                buyerLevelId: '', //会员等级
            },
            // 新增/编辑
            setLevelDialog: {
                // 对话框显示
                isVisible: false,
                formModel: {
                    ids: '',
                    buyerLevelId: '',
                },
                // 表单校验规则
                formRules: {
                    buyerLevelId: {
                        required: true,
                        message: '请选择会员等级',
                    },
                },
            },
            orderImportDialog: {
                // 对话框显示
                isVisible: false,
                buyer: {},
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            //等级列表
            buyerLevelList: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Mb.Buyer.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onTableSelectionChange(val) {
            this.currentTableSelect = val;
        },
        onSetLevelDialogConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Mb.Buyer.changeBuyerLevel({
                    ...this.setLevelDialog.formModel,
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                    this.setLevelDialog.isVisible = false;
                });
            });
        },
        onSetLevelDialogCancel() {
            const { addForm } = this.$refs;
            addForm.resetFields();
            this.setLevelDialog.isVisible = false;
        },
        onBatchChangeBuyerLevel() {
            if (this.currentTableSelect.length === 0) {
                this.$message({
                    message: '请选择会员',
                    type: 'error',
                });
                return;
            }
            const changeBuyerIdList = [];
            this.currentTableSelect.forEach(item => {
                changeBuyerIdList.push(item.id);
            });
            this.setLevelDialog.formModel.ids = changeBuyerIdList.join(',');
            this.setLevelDialog.isVisible = true;
        },
        onChangeBuyerLevel(row) {
            this.setLevelDialog.formModel.ids = row.id;
            this.setLevelDialog.isVisible = true;
        },
        initLevelList() {
            this.$api.Mb.BuyerLevel.select().then(json => {
                const res = json.data.data;
                this.buyerLevelList = res;
            });
        },
        onOrderImport(row) {
            this.orderImportDialog.buyer = row;
            this.orderImportDialog.isVisible = true;
        },
        onOrderImportDialogCancel() {
            this.orderImportDialog.isVisible = false;
        },
        onOrderImportSuccess(response) {
            if (response.success) {
                this.$message({
                    message: response.msg,
                    type: 'success',
                });
            } else {
                this.$alert(response.msg, '错误提示', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定',
                });
            }
        },
        onOrderImportError(err) {
            this.$message({
                message: err,
                type: 'error',
            });
        },
    },
    created() {
        this.initLevelList();
    },
};
</script>

<style lang="scss">
</style>
