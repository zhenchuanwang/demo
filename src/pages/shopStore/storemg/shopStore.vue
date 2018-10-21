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
                    prop="storeName"
                    label="门店名称"
                >
                    <el-input
                        v-model="queryFormModel.storeName"
                        placeholder="请输入门店名称"
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
                        @click="$router.push('/shopStore/storemg/shopStore/edit')"
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
                    prop="storeName"
                    label="门店名称"
                    min-width="100"
                />
                <el-table-column
                    prop="contactFullname"
                    label="联系人姓名"
                    min-width="100"
                />
                <el-table-column
                    prop="contactTel"
                    label="联系人电话"
                    min-width="100"
                />
                <el-table-column
                    label="是否启用"
                    width="80"
                >
                    <template slot-scope="scope">
                        {{ scope.row.isAvailable ? "是" : "否" }}
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
                    width="200"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/shopStore/storemg/shopStore/edit/' + scope.row.id)"
                        >编辑
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/shopStore/storemg/shopStore/shopStoreServiceTime/' + scope.row.id)"
                        >服务时间设置
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/shopStore/storemg/shopStore/shopStoreFreight/' + scope.row.id)"
                        >运费设置
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
    name: 'ShopStore',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                storeName: '', // 门店名称
                isAvailable: '', // 门店状态
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
            return this.$api.Sp.ShopStore.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
    },
};
</script>

<style lang="scss">
</style>
