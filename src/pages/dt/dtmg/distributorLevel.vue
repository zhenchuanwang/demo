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
                    prop="levelName"
                    label="等级名称"
                >
                    <el-input
                        v-model="queryFormModel.levelName"
                        placeholder="请输入等级名称"
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
                    prop="levelIcon"
                    label="等级图标"
                    width="120"
                >
                    <template slot-scope="scope">
                        <ImageList
                            :data="scope.row.levelIconUrl"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="levelName"
                    label="等级名称"
                    min-width="100"
                />
                <el-table-column
                    prop="levelDesc"
                    label="等级描述"
                    min-width="100"
                />
                <el-table-column
                    prop="orderNum"
                    label="排序号"
                    min-width="100"
                />
                <el-table-column
                    prop="isAvailable"
                    label="是否可用"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.isAvailable"
                            @input="onIsAvailableInput($event,scope)"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.insertTime | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
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
                    prop="levelName"
                    label="等级名称"
                    label-width="7em"
                >
                    <el-input
                        v-model="addDialog.formModel.levelName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="levelIcon"
                    label="等级图标"
                    label-width="7em"
                >
                    <upload
                        action="/rs/attachment/uploadDistributorLevel"
                        :limit="1"
                        v-model="addDialog.formModel.levelIcon"
                    />
                </el-form-item>
                <el-form-item
                    prop="levelDesc"
                    label="等级描述"
                    label-width="7em"
                >
                    <el-input
                        type="textarea"
                        v-model="addDialog.formModel.levelDesc"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="orderNum"
                    label="排序"
                    label-width="7em"
                >
                    <el-input-number
                        controls-position="right"
                        :min="1"
                        :max="255"
                        v-model.number="addDialog.formModel.orderNum"
                    />
                </el-form-item>
                <el-form-item
                    prop="distributionIncomeMode"
                    label="分销收益模式"
                    label-width="7em"
                >
                    <checkbox-group-andOr
                        :data="shopDistributionIncomeMode"
                        v-model="addDialog.formModel.distributionIncomeMode"
                    />
                </el-form-item>
                <el-form-item
                    prop="isAvailable"
                    label="是否可用"
                    label-width="7em"
                >
                    <el-switch
                        v-model="addDialog.formModel.isAvailable"
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
    name: 'DistributorLevel',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                levelName: '', // 等级名称
                isAvailable: '', // 是否可用
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    levelName: '',
                    levelDesc: '',
                    levelIcon: [],
                    fileBasePath: '',
                    orderNum: '',
                    isAvailable: true,
                    distributionIncomeMode: '',
                },
                // 表单校验规则
                formRules: {
                    levelName: {
                        required: true,
                        message: '请输入等级名称',
                        trigger: 'blur',
                    },
                    levelIcon: {
                        type: 'array',
                        required: true,
                        message: '请上传等级图片',
                    },
                },
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            shopDistributionIncomeMode: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Mb.DistributorLevel.data(queryData).then(json => {
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
            this.$api.Mb.DistributorLevel.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
        },
        onTableDelete(ids) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Mb.DistributorLevel.delete({ ids }).then(json => {
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
                this.$api.Mb.DistributorLevel.save({
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
            this.$api.Mb.DistributorLevel.status({
                id: row.id,
                isAvailable: row.isAvailable,
            })
                .then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                })
                .catch(() => {
                    this.$message({
                        message: '操作失败请重试！',
                        type: 'error',
                    });
                    row.isAvailable = !row.isAvailable;
                });
        },
        initShopDistributionIncomeMode() {
            this.$api.Sp.Shop.getShopAvailableDistributionIncomeMode({
                dicCode: 'distributionIncomeMode',
            }).then(json => {
                const res = json.data.data;
                this.shopDistributionIncomeMode = res;
            });
        },
    },
    created() {
        this.initShopDistributionIncomeMode();
    },
};
</script>

<style lang="scss">
</style>
