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
                    prop="pageName"
                    label="页面名称"
                >
                    <el-input
                        v-model="queryFormModel.pageName"
                        placeholder="请输入页面名称"
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
                        @click="$router.push('/om/decoration/home/edit?pageType=0')"
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
                    prop="pageName"
                    label="页面名称"
                    min-width="100"
                />
                <el-table-column
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
                    width="120"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push(`/om/decoration/home/edit/${scope.row.id}?pageType=0`)"
                        >编辑
                        </el-button>
                        <template v-if="!scope.row.isAvailable">
                            <el-button
                                type="text"
                                size="small"
                                @click="updateIsAvailable(scope.row.id)"
                            >启用
                            </el-button>
                            <el-button
                                type="text"
                                size="small"
                                @click="onTableDelete(scope.row.id)"
                            >删除
                            </el-button>
                        </template>
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
    name: 'HomeDecoration',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                pageName: '', // 页面名称
                pageType: '0',
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Sp.ShopDecoration.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onTableDelete(id) {
            this.$confirm('是否确定要删除！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Sp.ShopDecoration.delete({ id }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                });
            });
        },
        updateIsAvailable(id) {
            this.$confirm('是否确定要启用该装修！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Sp.ShopDecoration.updateIsAvailable({ id }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                });
            });
        },
    },
};
</script>

<style lang="scss">
</style>
