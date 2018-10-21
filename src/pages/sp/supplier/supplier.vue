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
                    prop="supplierName"
                    label="供应商名称"
                >
                    <el-input
                        v-model="queryFormModel.supplierName"
                        placeholder="请输入供应商名称"
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
                    prop="supplierName"
                    label="供应商名称"
                    min-width="100"
                />
                <el-table-column
                    prop="principalName"
                    label="联系人姓名"
                    min-width="100"
                />
                <el-table-column
                    prop="principalMobile"
                    label="联系人手机"
                    min-width="100"
                />
                <el-table-column
                    prop="remarks"
                    label="备注"
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
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/sp/supplier/supplier/goodsSaleStat?supplierId=' + scope.row.id)"
                        >销量统计
                        </el-button>
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
                    prop="supplierName"
                    label="供应商名称"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.supplierName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="principalName"
                    label="联系人姓名"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.principalName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="principalPosition"
                    label="联系人职务"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.principalPosition"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="principalMobile"
                    label="联系人手机"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.principalMobile"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="principalEmail"
                    label="联系人邮箱"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.principalEmail"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="principalQq"
                    label="联系人QQ"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.principalQq"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="supplierRegionId"
                    label="所在地区"
                    label-width="8em"
                >
                    <CascaderPicker
                        :api-class="selectApi"
                        v-model="addDialog.formModel.supplierRegionId"
                        :p-id="2"
                        :min-lv="2"
                    />
                </el-form-item>
                <el-form-item
                    prop="supplierAddress"
                    label="详细地址"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.supplierAddress"
                        auto-complete="off"
                    />
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
                <el-form-item
                    prop="isAvailable"
                    label="是否可用"
                    label-width="8em"
                >
                    <el-switch
                        v-model="addDialog.formModel.isAvailable"
                    />
                </el-form-item>
                <el-form-item
                    prop="regionId"
                    label="退货地址"
                    label-width="8em"
                >
                    <CascaderPicker
                        :api-class="selectApi"
                        v-model="addDialog.formModel.regionId"
                        :p-id="2"
                        :min-lv="2"
                    />
                </el-form-item>
                <el-form-item
                    prop="address"
                    label="退货详细地址"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.address"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="consignee"
                    label="收件人姓名"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.consignee"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="mobile"
                    label="收件人电话"
                    label-width="8em"
                >
                    <el-input
                        v-model="addDialog.formModel.mobile"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="comments"
                    label="退货备注"
                    label-width="8em"
                >
                    <el-input
                        type="textarea"
                        v-model="addDialog.formModel.comments"
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
    name: 'Supplier',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                supplierName: '', // 供应商名称
                isAvailable: '', // 是否可用
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    supplierName: '',
                    principalName: '',
                    principalPosition: '',
                    principalMobile: '',
                    principalEmail: '',
                    principalQq: '',
                    supplierRegionId: '',
                    supplierAddress: '',
                    remarks: '',
                    isAvailable: false,
                    regionId: '',
                    address: '',
                    consignee: '',
                    mobile: '',
                    comments: '',
                },
                // 表单校验规则
                formRules: {
                    supplierName: {
                        required: true,
                        message: '请输入供应商名称',
                        trigger: 'blur',
                    },
                    principalName: {
                        required: true,
                        message: '请输入联系人姓名',
                        trigger: 'blur',
                    },
                    principalMobile: {
                        required: true,
                        message: '请输入联系人电话',
                        trigger: 'blur',
                    },
                    supplierRegionId: {
                        required: true,
                        message: '请选择供应商地址',
                        trigger: 'blur',
                    },
                    supplierAddress: {
                        required: true,
                        message: '请输入供应商详细地址',
                        trigger: 'blur',
                    },
                    regionId: {
                        required: true,
                        message: '请选择退货地址',
                        trigger: 'blur',
                    },
                    address: {
                        required: true,
                        message: '请输入退货详细地址',
                        trigger: 'blur',
                    },
                    consignee: {
                        required: true,
                        message: '请输入收件人姓名',
                        trigger: 'blur',
                    },
                    mobile: {
                        required: true,
                        message: '请输入收件人电话',
                        trigger: 'blur',
                    },
                },
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            selectApi: this.$api.Rs.Region,
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Gd.Supplier.data(queryData).then(json => {
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
            this.$api.Gd.Supplier.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
        },
        onTableDelete(ids) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Gd.Supplier.delete({ ids }).then(json => {
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
                this.$api.Gd.Supplier.save({
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
            this.$api.Gd.Supplier.status({
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
    },
};
</script>

<style lang="scss">
</style>
