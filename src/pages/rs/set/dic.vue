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
                    prop="dicName"
                    label="字典名称"
                >
                    <el-input
                        v-model="queryFormModel.dicName"
                        placeholder="请输入字典名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="dicCode"
                    label="字典代码"
                >
                    <el-input
                        v-model="queryFormModel.dicCode"
                        placeholder="请输入字典代码"
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
                @expand-change="expandDic"
            >
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <div class="ma-b">
                            <el-button
                                type="success"
                                icon="el-icon-plus"
                                size="small"
                                @click="onAddDicEntryClick(scope.row)"
                            >新增字典值
                            </el-button>
                        </div>
                        <el-table
                            stripe
                            border
                            size="small"
                            :ref="'table' + scope.row.id"
                            :data="scope.row.dicEntryList"
                            style="width: 90%"
                        >
                            <el-table-column 
                                prop="entryName" 
                                label="字典值名称"/>
                            <el-table-column 
                                prop="entryCode" 
                                label="字典值代码"/>
                            <el-table-column 
                                prop="entryKey" 
                                label="字典值标识"/>
                            <el-table-column 
                                prop="orderNum" 
                                label="排序号"/>
                            <el-table-column label="是否可用">
                                <template slot-scope="statusScope">
                                    <el-switch
                                        v-model="statusScope.row.isAvailable"
                                        @change="(isSelect) => changeStatus(statusScope.row, isSelect)"
                                        :active-value="true"
                                        :inactive-value="false"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column 
                                label="操作" 
                                width="90">
                                <template slot-scope="entityScope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="onEditDicEntryClick(scope.row, entityScope.row)"
                                    >
                                        <span>编辑</span>
                                    </el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="onDeleteDicEntryClick(scope.row, entityScope.row)"
                                    >
                                        <span>删除</span>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dicName"
                    label="字典名称"
                    min-width="100"
                />
                <el-table-column
                    prop="dicCode"
                    label="字典代码"
                    min-width="100"
                />
                <el-table-column
                    prop="isAvailable"
                    label="是否可用"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        {{ scope.row.isAvailable ? '是' : '否' }}
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
                    prop="dicName"
                    label="字典名称"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.dicName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="dicCode"
                    label="字典代码"
                    label-width="6em"
                >
                    <el-input
                        v-model="addDialog.formModel.dicCode"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="dicDesc"
                    label="字典描述"
                    label-width="6em"
                >
                    <el-input
                        type="textarea"
                        v-model="addDialog.formModel.dicDesc"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="isAvailable"
                    label="是否可用"
                    label-width="6em"
                >
                    <el-switch
                        v-model="addDialog.formModel.isAvailable"
                        :active-value=true
                        :inactive-value=false
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

        <!-- 新增/编辑字典值 -->
        <el-dialog
            :title="addEntryDialog.formModel.id ? '编辑' : '新增'"
            center
            width="600px"
            :visible.sync="addEntryDialog.isVisible"
            @closed="onAddDicEntryDialogCancel"
        >
            <el-form
                ref="addEntryForm"
                size="small"
                :model="addEntryDialog.formModel"
                :rules="addEntryDialog.formRules"
            >
                <el-form-item
                    prop="entryName"
                    label="字典值名称"
                    label-width="7em"
                >
                    <el-input
                        v-model="addEntryDialog.formModel.entryName"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="entryCode"
                    label="字典值代码"
                    label-width="7em"
                >
                    <el-input
                        v-model="addEntryDialog.formModel.entryCode"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="entryKey"
                    label="字典值标识"
                    label-width="7em"
                >
                    <el-input
                        v-model.number="addEntryDialog.formModel.entryKey"
                        auto-complete="off"
                    />
                </el-form-item>
                <el-form-item
                    prop="entryDesc"
                    label="字典值描述"
                    label-width="7em"
                >
                    <el-input
                        type="textarea"
                        v-model="addEntryDialog.formModel.entryDesc"
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
                        v-model.number="addEntryDialog.formModel.orderNum"
                    />
                </el-form-item>
                <el-form-item
                    prop="isAvailable"
                    label="是否可用"
                    label-width="7em"
                >
                    <el-switch
                        v-model="addEntryDialog.formModel.isAvailable"
                        :active-value=true
                        :inactive-value=false
                    />
                </el-form-item>
            </el-form>
            <div 
                slot="footer" 
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    @click="onAddDicEntryDialogConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onAddDicEntryDialogCancel"
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
    name: 'Dic',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                dicName: '', // 字典名称
                dicCode: '', // 字典代码
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    dicName: '',
                    dicCode: '',
                    dicDesc: '',
                    isAvailable: '',
                },
                // 表单校验规则
                formRules: {
                    dicName: [
                        {
                            required: true,
                            message: '请输入字典名称',
                            trigger: 'blur',
                        },
                        {
                            validator: this.validatorDicName,
                            message: '字典名称不能重复',
                            trigger: 'blur',
                        },
                    ],
                    dicCode: [
                        {
                            required: true,
                            message: '请输入字典代码',
                            trigger: 'blur',
                        },
                        {
                            validator: this.validatorDicCode,
                            message: '字典代码不能重复',
                            trigger: 'blur',
                        },
                    ],
                    dicDesc: {},
                },
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            // 新增/编辑
            addEntryDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: undefined,
                    dicId: '',
                    entryName: '',
                    entryCode: '',
                    entryKey: '',
                    entryDesc: '',
                    isAvailable: '',
                    orderNum: '',
                },
                // 表单校验规则
                formRules: {
                    entryName: [
                        {
                            required: true,
                            message: '请输入字典值名称',
                            trigger: 'blur',
                        },
                        {
                            max: 100,
                            message: '字典值名称最多100个字符',
                            trigger: 'blur',
                        },
                    ],
                    entryCode: [
                        {
                            required: true,
                            message: '请输入字典值代码',
                            trigger: 'blur',
                        },
                        {
                            max: 100,
                            message: '字典值代码最多100个字符',
                            trigger: 'blur',
                        },
                        {
                            validator: this.validatorDicEntryCode,
                            message: '字典值代码不能重复',
                            trigger: 'blur',
                        },
                    ],
                    entryKey: [
                        {
                            type: 'integer',
                            required: true,
                            message: '请输入字典值标识',
                            trigger: 'blur',
                        },
                        {
                            validator: this.validatorDicEntryKey,
                            message: '字典值标识不能重复',
                            trigger: 'blur',
                        },
                    ],
                    isAvailable: [{ required: true, message: '请选择是否可用' }],
                },
                // 编辑行
                currentRow: {},
            },
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Rs.Dic.data(queryData).then(json => {
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
                formModel.isAvailable = true;
            });
        },
        onTableSelectionChange(val) {
            this.currentTableSelect = val;
        },
        onTableEdit(row) {
            const { formModel } = this.addDialog;
            this.$api.Rs.Dic.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
        },
        onTableDelete(ids) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Rs.Dic.delete({ ids }).then(json => {
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
                this.$api.Rs.Dic.save({
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
        /* 编辑字典值 */
        expandDic(row, expanded) {
            if (expanded) {
                row.dicEntryList = [];
                this.$api.Rs.Dic.entryList({ dicId: row.id }).then(json => {
                    json.data.data.forEach(item => {
                        row.dicEntryList.push(item);
                    });
                });
            }
        },
        onAddDicEntryClick(row) {
            this.addEntryDialog.isVisible = true;
            this.$nextTick(() => {
                const { addEntryForm } = this.$refs;
                addEntryForm.resetFields();
                const { formModel } = this.addEntryDialog;
                formModel.id = '';
                formModel.isAvailable = true;
                formModel.dicId = row.id;
            });
            this.addEntryDialog.currentRow = row;
        },
        onEditDicEntryClick(dic, entry) {
            const { formModel } = this.addEntryDialog;
            this.$api.Rs.DicEntry.getDetail({ id: entry.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addEntryDialog.isVisible = true;
            this.addEntryDialog.currentRow = dic;
        },
        onDeleteDicEntryClick(dic, entry) {
            this.$confirm('是否确定要删除该字典值！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Rs.DicEntry.delete({ ids: entry.id }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    // 更新字典值列表
                    dic.dicEntryList.splice(0, dic.dicEntryList.length);
                    this.$api.Rs.Dic.entryList({ dicId: dic.id }).then(json => {
                        json.data.data.forEach(item => {
                            dic.dicEntryList.push(item);
                        });
                    });
                });
            });
        },
        onAddDicEntryDialogCancel() {
            const { addEntryForm } = this.$refs;
            addEntryForm.resetFields();
            const { formModel } = this.addEntryDialog;
            formModel.id = '';
            formModel.dicId = '';
            this.addEntryDialog.isVisible = false;
        },
        onAddDicEntryDialogConfirm() {
            const { addEntryForm } = this.$refs;
            addEntryForm.validate().then(() => {
                this.$api.Rs.DicEntry.save({
                    ...this.addEntryDialog.formModel,
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    // 更新字典值列表
                    this.addEntryDialog.currentRow.dicEntryList.splice(
                        0,
                        this.addEntryDialog.currentRow.dicEntryList.length,
                    );
                    this.$api.Rs.Dic.entryList({
                        dicId: this.addEntryDialog.currentRow.id,
                    }).then(json => {
                        json.data.data.forEach(item => {
                            this.addEntryDialog.currentRow.dicEntryList.push(item);
                        });
                    });
                    this.addEntryDialog.isVisible = false;
                });
            });
        },
        changeStatus(row, isSelect) {
            this.$api.Rs.DicEntry.status({ id: row.id, isAvailable: isSelect }).then(json => {
                const res = json.data;
                this.$message({
                    message: res.msg,
                    type: 'success',
                });
            });
        },
        /* -- 自定义校验 -- */
        validatorDicName(rule, value, callback) {
            this.$api.Rs.Dic.exists({
                id: this.addDialog.formModel.id,
                dicName: this.addDialog.formModel.dicName,
            }).then(res => {
                if (res.data.data) {
                    callback(rule.message);
                } else {
                    callback();
                }
            });
        },
        validatorDicCode(rule, value, callback) {
            this.$api.Rs.Dic.exists({
                id: this.addDialog.formModel.id,
                dicCode: this.addDialog.formModel.dicCode,
            }).then(res => {
                if (res.data.data) {
                    callback(rule.message);
                } else {
                    callback();
                }
            });
        },
        validatorDicEntryKey(rule, value, callback) {
            this.$api.Rs.DicEntry.exists({
                dicId: this.addEntryDialog.currentRow.id,
                id: this.addEntryDialog.formModel.id,
                entryKey: this.addEntryDialog.formModel.entryKey,
            }).then(res => {
                if (res.data.data) {
                    callback(rule.message);
                } else {
                    callback();
                }
            });
        },
        validatorDicEntryCode(rule, value, callback) {
            this.$api.Rs.DicEntry.exists({
                dicId: this.addEntryDialog.currentRow.id,
                id: this.addEntryDialog.formModel.id,
                entryCode: this.addEntryDialog.formModel.entryCode,
            }).then(res => {
                if (res.data.data) {
                    callback(rule.message);
                } else {
                    callback();
                }
            });
        },
    },
};
</script>

<style lang="scss">
</style>
