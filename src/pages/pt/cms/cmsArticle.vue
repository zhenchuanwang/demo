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
                    prop="title"
                    label="标题"
                >
                    <el-input
                        v-model="queryFormModel.title"
                        placeholder="请输入标题"
                    />
                </el-form-item>
                <el-form-item
                    prop="cmsCatalogId"
                    label="分类"
                >
                    <CascaderPicker
                        :api-class="selectApi"
                        v-model="queryFormModel.cmsCatalogId"
                        :min-lv="1"
                        :p-id="0"
                        filterable
                        change-on-select
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
                        @click="$router.push('/pt/cms/cmsArticle/edit')"
                    >新增
                    </el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="small"
                        @click="onDelete"
                        :disabled="!currentTableSelect.length"
                    >删除
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
                    prop="title"
                    label="标题"
                    min-width="100"
                />
                <el-table-column
                    prop="cmsCatalogName"
                    label="分类"
                    min-width="100"
                />
                <el-table-column
                    label="发布时间"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.insertTime | moment('YYYY-MM-DD HH:mm:ss') }}
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
                            @click="$router.push('/pt/cms/cmsArticle/edit/' + scope.row.id)"
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
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormList } from '@/mixin/queryForm';

export default {
    name: 'CmsArticle',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                title: '', // 标题
                isAvailable: '', // 是否显示
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
            selectApi: this.$api.Pt.CmsCatalog,
            cascaderPicker: '',
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Pt.CmsArticle.data(queryData).then(json => {
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
            this.$api.Pt.CmsArticle.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
        },
        onTableDelete(ids) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Pt.CmsArticle.delete({ ids }).then(json => {
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
                this.$api.Pt.CmsArticle.save({
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
    mounted() {
        setTimeout(() => {
            //TODO　级联选择器 异步数据初始化问题
            this.cascaderPicker = '';
        }, 10);
    },
};
</script>

<style lang="scss">
</style>
