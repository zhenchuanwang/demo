<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 内容 -->
        <div 
            class="body"
            slot="body"
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
                        @click="onAddExpress"
                    >新增快递公司
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
                    prop="expressName"
                    label="快递公司名称"
                    min-width="100"
                />
                <el-table-column
                    prop="expressCode"
                    label="快递公司代码"
                    min-width="100"
                />
                <el-table-column
                    prop="expressWebsite"
                    label="快递公司网址"
                    min-width="100"
                />
                <el-table-column
                    prop="expressDesc"
                    label="快递公司描述"
                    min-width="100"
                />
                <!--<el-table-column-->
                <!--prop="orderNum"-->
                <!--label="排序"-->
                <!--min-width="100"-->
                <!--/>-->
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="45"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="onDeleteExpress(scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 弹框 -->
        <!-- 新增/编辑 -->
        <el-dialog
            title="新增快递公司"
            center
            width="1200px"
            :visible.sync="addDialog.isVisible"
            @closed="onAddExpressCancel"
        >
            <!-- 表单区 -->
            <el-form
                ref="addDialogQueryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="addDialog.queryFormModel"
            >
                <el-form-item
                    prop="expressName"
                    label="快递公司名称"
                >
                    <el-input
                        v-model="addDialog.queryFormModel.expressName"
                        placeholder="请输入快递公司名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="expressCode"
                    label="快递公司代码"
                >
                    <el-input
                        v-model="addDialog.queryFormModel.expressCode"
                        placeholder="请输入快递公司代码"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onAddDialogQuery()"
                    >查询
                    </el-button>
                    <el-button
                        type="success"
                        @click="onResetAddDialog"
                    >重置
                    </el-button>
                </el-form-item>
            </el-form>

            <!-- 内容 -->
            <div class="body">
                <!-- 表格 -->
                <el-table
                    stripe
                    border
                    size="small"
                    :data="addDialog.tableData"
                    style="width: 100%"
                    height="400"
                    row-key="expressId"
                    ref="addDialogTable"
                    @selection-change="onAddDialogSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="36"
                    />
                    <el-table-column
                        prop="expressName"
                        label="快递公司名称"
                        min-width="100"
                    />
                    <el-table-column
                        prop="expressCode"
                        label="快递公司代码"
                        min-width="100"
                    />
                    <el-table-column
                        prop="expressWebsite"
                        label="快递公司网址"
                        min-width="100"
                    />
                    <el-table-column
                        prop="expressDesc"
                        label="快递公司描述"
                        min-width="100"
                    />
                </el-table>

                <!-- 分页 -->
                <div class="ma-t ta-r">
                    <pagination
                        v-model="addDialog.pagination"
                        @input="onAddDialogQuery"
                    />
                </div>
            </div>
            <div 
                slot="footer" 
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    @click="onAddExpressConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onAddExpressCancel"
                >取 消
                </el-button>
            </div>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'ShopExpress',
    mixins: [pagesMixin],
    data() {
        return {
            queryFormModel: {},
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 查询数据
                queryFormModel: {
                    expressName: '', // 快递公司名称
                    expressCode: '', // 快递公司代码
                },
                // 表单数据
                tableData: [],
                // 分页
                pagination: {},
                // 当前选择行
                currentTableSelect: [],
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData() {
            return this.$api.Sp.ShopExpress.data().then(json => {
                const res = json.data;
                this.tableData = res.data;
            });
        },
        /* -- 事件 -- */
        onAddExpress() {
            this.addDialog.isVisible = true;
            this.$nextTick(() => {
                this.onAddDialogQuery();
                const { addDialogTable } = this.$refs;
                // 初始化已选择数据
                if (addDialogTable) {
                    addDialogTable.clearSelection();
                }
                // this.tableData = [this.addDialog.tableData[0]];
                this.tableData.forEach(item => {
                    addDialogTable.toggleRowSelection(item, true);
                });
            });
        },
        onAddDialogQuery(pagination) {
            return this.$api.Rs.Express.data({
                ...this.addDialog.queryFormModel,
                ...pagination,
                isAvailable: 1,
            }).then(json => {
                const res = json.data;
                res.data.forEach(item => {
                    item.expressId = item.id;
                    item.id = null;
                });
                this.addDialog.tableData = res.data;
                this.addDialog.pagination = res.pagination;
            });
        },
        onAddDialogSelectionChange(val) {
            this.addDialog.currentTableSelect = val;
        },
        onResetAddDialog() {
            this.$refs.addDialogQueryForm.resetFields();
        },
        onAddExpressConfirm() {
            this.$api.Sp.ShopExpress.save({
                jsonStr: JSON.stringify(this.addDialog.currentTableSelect),
            }).then(json => {
                const res = json.data;
                this.$message({
                    message: res.msg,
                    type: 'success',
                });
                this.getListData();
                this.addDialog.isVisible = false;
            });
        },
        onAddExpressCancel() {
            this.addDialog.isVisible = false;
        },
        onDeleteExpress(row) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Sp.ShopExpress.delete({ ids: row.id }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.getListData();
                });
            });
        },
    },
    created() {
        this.getListData();
    },
};
</script>

<style lang="scss">
</style>
