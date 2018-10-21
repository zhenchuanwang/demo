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
                    prop="name"
                    label="类目名称"
                >
                    <el-input
                        v-model="queryFormModel.name"
                        placeholder="请输入类目名称"
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
                        @click="onQuery"
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
            <tree-table
                :lazy-load="getListData"
                init-not-load
                :expand-props="{
                    prop:'name',
                    label:'类目名称',
                    minWidth:200,
                }"
                ref="treeTable"
                stripe
                border
                size="small"
                style="width: 100%"
            >
                <el-table-column
                    label="是否启用"
                    width="80"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.isAvailable"
                            @input="onIsAvailableInput($event,scope)"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderNum"
                    label="排序"
                    min-width="100"
                />
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="135"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="onTableAdd(scope.row)"
                        >新增
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
                            @click="onTableDelete(scope.row.id,scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </tree-table>
        </div>

        <!-- 弹框 -->
        <!-- 变量新增/编辑 -->
        <el-dialog
            :title="addDialog.formModel.id ? '编辑' : '新增'"
            center
            width="800px"
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
                    v-if="addDialog.formModel.parentId"
                    prop="parentName"
                    label="上级分类"
                    label-width="11em"
                >
                    <el-input
                        v-model="addDialog.formModel.parentName"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="name"
                    label="类目名称"
                    label-width="11em"
                >
                    <el-input
                        v-model="addDialog.formModel.name"
                    />
                </el-form-item>
                <el-form-item
                    prop="shareIncomeRate"
                    label="分销分享赚比例(%)"
                    label-width="11em"
                    v-if="(1 & userData.shop.distributionIncomeMode) !== 0"
                >
                    <el-input-number
                        controls-position="right"
                        :min="0"
                        :precision="2"
                        v-model.number="addDialog.formModel.shareIncomeRate"
                    />
                </el-form-item>
                <el-form-item
                    prop="topIncomeRate"
                    label="分销顶级提成比例(%)"
                    label-width="11em"
                    v-if="(2 & userData.shop.distributionIncomeMode) !== 0"
                >
                    <el-input-number
                        controls-position="right"
                        :min="0"
                        :precision="2"
                        v-model.number="addDialog.formModel.topIncomeRate"
                    />
                </el-form-item>
                <el-form-item
                    prop="levelIncomeRate"
                    label="分销层级提成比例"
                    label-width="11em"
                    v-if="(4 & userData.shop.distributionIncomeMode) !== 0"
                >
                    <el-table
                        stripe
                        border
                        size="small"
                        :data="addDialog.levelIncomeRateList"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="name"
                            label="分销层级"
                            width="120"
                        />
                        <el-table-column
                            prop="levelIncomeRate"
                            label="提成比例(%)"
                            min-width="220"
                        >
                            <template slot-scope="scope">
                                <el-input-number
                                    controls-position="right"
                                    :min="0"
                                    :precision="2"
                                    v-model.number="scope.row.levelIncomeRate"
                                />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item
                    prop="orderNum"
                    label="排序"
                    label-width="11em"
                >
                    <el-input-number
                        controls-position="right"
                        :min="1"
                        :max="255"
                        v-model.number="addDialog.formModel.orderNum"
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
import { queryFormTree } from '@/mixin/queryForm';

export default {
    name: 'GoodsCat',
    mixins: [pagesMixin, queryFormTree],
    data() {
        return {
            queryFormModel: {
                name: '', // 类目名称
                isAvailable: '', // 状态
            },
            // 新增/编辑
            addDialog: {
                // 对话框显示
                isVisible: false,
                // 表单数据
                formModel: {
                    id: '',
                    parentId: '',
                    parentName: '',
                    name: '',
                    shareIncomeRate: undefined,
                    levelIncomeRate: '',
                    topIncomeRate: undefined,
                    orderNum: 1,
                    isAvailable: true,
                },
                // 表单校验规则
                formRules: {
                    name: [
                        {
                            required: true,
                            message: '请输入类目名称',
                            trigger: 'blur',
                        },
                        {
                            validator: this.validatorName,
                            message: '类目名称不能重复',
                            trigger: 'blur',
                        },
                    ],
                },
                levelIncomeRateList: [],
            },
            // 表格数据
            // tableData: [],
            // 表格当前行
            currentRow: {},
            // 表格当前选中行
            currentTableSelect: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData({ row = {} } = {}) {
            this.querying = true;
            return this.$api.Gd.GoodsCat.data({
                pId: row ? row.id : null,
                ...this.queryFormModel,
            }).then(json => {
                this.querying = false;
                const res = json.data.data.sort((prev, next) => {
                    return prev.orderNum - next.orderNum;
                });
                return Promise.resolve(res);
            });
        },
        /* -- 事件 -- */
        onAdd() {
            this.addDialog.isVisible = true;
            this.addDialog.levelIncomeRateList = [];
            this.$nextTick(() => {
                const { formModel } = this.addDialog;
                const { addForm } = this.$refs;
                addForm.resetFields();
                // id/parentId 不在表单之内所以要手机重置
                formModel.id = '';
                formModel.parentId = '';
            });
            this.initLevelIncomeRateList();
        },
        onTableSelectionChange(val) {
            this.currentTableSelect = val;
        },
        onTableAdd(row) {
            this.addDialog.isVisible = true;
            this.$nextTick(() => {
                const { formModel } = this.addDialog;
                const { addForm } = this.$refs;
                addForm.resetFields();
                formModel.id = '';
                formModel.parentId = row.id;
                formModel.parentName = row.name;
            });
            this.currentRow = row;
            this.initLevelIncomeRateList();
        },
        onTableEdit(row) {
            const { formModel } = this.addDialog;
            this.$api.Gd.GoodsCat.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
                this.addDialog.levelIncomeRateList = JSON.parse(res.levelIncomeRate) || [];
                this.initLevelIncomeRateList();
            });
            this.addDialog.isVisible = true;
            this.currentRow = row;
        },
        onTableDelete(ids, row) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Gd.GoodsCat.delete({ ids }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    // this.onQuery();
                    const { treeTable } = this.$refs;
                    treeTable.removeNode(row);
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
            const { formModel } = this.addDialog;
            addForm.validate().then(() => {
                this.$api.Gd.GoodsCat.save({
                    ...formModel,
                    levelIncomeRate: JSON.stringify(this.addDialog.levelIncomeRateList),
                }).then(json => {
                    const { msg, data } = json.data;
                    this.$message({
                        message: msg,
                        type: 'success',
                    });
                    const { treeTable } = this.$refs;
                    const { currentRow } = this;
                    if (!formModel.parentId && !formModel.id) {
                        // 新增根节点
                        treeTable.loadNode();
                    } else if (formModel.id) {
                        // 更新节点
                        for (const key in currentRow) {
                            if (currentRow.hasOwnProperty(key) && data[key] !== undefined) {
                                currentRow[key] = data[key];
                            }
                        }
                        // 重新排序
                        currentRow._parent.children = currentRow._parent.children.sort((prev, next) => {
                            return prev.orderNum - next.orderNum;
                        });
                    } else if (formModel.parentId) {
                        // 新增子节点
                        treeTable.loadNode(currentRow);
                    }
                    this.addDialog.isVisible = false;
                });
            });
        },
        onAddDialogCancel() {
            const { addForm } = this.$refs;
            addForm.resetFields();
            this.addDialog.isVisible = false;
        },
        onIsAvailableInput(val, scope) {
            const { row } = scope;
            if (!row) return;
            this.$api.Gd.GoodsCat.status({
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
        initLevelIncomeRateList() {
            const newlevelIncomeRateList = [];
            for (let num = 1; num <= this.userData.shop.distributionLevel; num++) {
                let isExit = false;
                this.addDialog.levelIncomeRateList.forEach(item => {
                    if (item.id === num) {
                        isExit = true;
                        newlevelIncomeRateList.push(item);
                    }
                });
                if (!isExit) {
                    const levelIncomeRate = {};
                    levelIncomeRate.id = num;
                    levelIncomeRate.name = num + '级分销商';
                    newlevelIncomeRateList.push(levelIncomeRate);
                }
            }
            newlevelIncomeRateList.sort(function(a, b) {
                return a.id - b.id;
            });
            this.addDialog.levelIncomeRateList = [...newlevelIncomeRateList];
        },
        /* -- 自定义校验 -- */
        validatorName(rule, value, callback) {
            this.$api.Gd.GoodsCat.exists({
                pId: this.addDialog.formModel.parentId,
                id: this.addDialog.formModel.id,
                name: this.addDialog.formModel.name,
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
