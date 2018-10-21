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
                    prop="shopName"
                    label="店铺名称"
                >
                    <el-input
                        v-model="queryFormModel.shopName"
                        placeholder="请输入店铺名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="shopStatus"
                    label="店铺状态"
                >
                    <dictionaries-picker
                        type="shopStatus"
                        v-model="queryFormModel.shopStatus"
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
                        @click="$router.push('/pfsp/spmg/shop/edit')"
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
                    prop="shopName"
                    label="店铺名称"
                    min-width="100"
                />
                <el-table-column
                    prop="shopLevelName"
                    label="店铺等级"
                    min-width="100"
                />
                <el-table-column
                    prop="shopStatusName"
                    label="店铺状态"
                    min-width="100"
                />
                <el-table-column
                    prop="principalName"
                    label="联系人姓名"
                    min-width="100"
                />
                <el-table-column
                    prop="principalMobile"
                    label="联系人电话"
                    min-width="100"
                />
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
                            @click="$router.push('/pfsp/spmg/shop/edit/' + scope.row.id)"
                        >编辑
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/pfsp/spmg/shop/shopBuyerAuthSet/' + scope.row.id)"
                        >买家认证设置
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/pfsp/spmg/shop/shopPaymentConfig/' + scope.row.id)"
                        >支付设置
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
    name: 'Shop',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                shopName: '', // 店铺名称
                shopStatus: '', // 店铺状态
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
            return this.$api.Sp.Shop.data(queryData).then(json => {
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
