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
                    prop="templateName"
                    label="模板名称"
                >
                    <el-input
                        v-model="queryFormModel.templateName"
                        placeholder="请输入模板名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="billingMethod"
                    label="计费方式"
                >
                    <dictionaries-picker
                        type="freightBillingMethod"
                        v-model="queryFormModel.billingMethod"
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
                        @click="$router.push('/sp/spmg/shopFreightTemplate/edit')"
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
                    prop="templateName"
                    label="模板名称"
                    min-width="100"
                />
                <el-table-column
                    prop="billingMethodName"
                    label="计费方式"
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
                            @click="$router.push('/sp/spmg/shopFreightTemplate/edit/' + scope.row.id)"
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
    name: 'ShopLevel',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                templateName: '', // 模板名称
                billingMethod: '', // 计费方式
                isAvailable: '', // 是否可用
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
        getListData(queryData) {
            return this.$api.Sp.ShopFreightTemplate.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onTableDelete(ids) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Sp.ShopFreightTemplate.delete({ ids }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                });
            });
        },
        onIsAvailableInput(val, scope) {
            const { row } = scope;
            if (!row) return;
            this.$api.Sp.ShopFreightTemplate.status({
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
