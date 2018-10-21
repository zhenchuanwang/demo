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
                    prop="activityName"
                    label="活动名称"
                >
                    <el-input
                        v-model="queryFormModel.activityName"
                        placeholder="请输入活动名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="goodsName"
                    label="商品名称"
                >
                    <el-input
                        v-model="queryFormModel.goodsName"
                        placeholder="请输入商品名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="goodsSn"
                    label="商品货号"
                >
                    <el-input
                        v-model="queryFormModel.goodsSn"
                        placeholder="请输入商品货号"
                    />
                </el-form-item>
                <el-form-item
                    prop="orderByKey"
                    label="排序类型"
                >
                    <el-select
                        v-model="queryFormModel.orderByKey"
                        clearable
                        placeholder="请选择">
                        <el-option
                            label="活动已售库存"
                            value="1"/>
                        <el-option
                            label="售罄率"
                            value="2"/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="orderByType"
                    label="排序方式"
                >
                    <el-select
                        v-model="queryFormModel.orderByType"
                        clearable
                        placeholder="请选择">
                        <el-option
                            label="从高到低"
                            value="1"/>
                        <el-option
                            label="从低到高"
                            value="2"/>
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
            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column type="expand">
                    <template slot-scope="goodsScope">
                        <el-table
                            stripe
                            border
                            size="small"
                            :data="goodsScope.row.activitySkuList"
                            style="width: 100%"
                        >
                            <!--<el-table-column-->
                            <!--label="规格图片"-->
                            <!--min-width="100"-->
                            <!--&gt;-->
                            <!--<template slot-scope="scope">-->
                            <!--<ImageList-->
                            <!--:data="scope.row.specImageUrl"-->
                            <!--/>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column
                                prop="skuSn"
                                label="sku编码"
                                min-width="100"
                            />
                            <el-table-column
                                prop="specDesc"
                                label="商品规格"
                                min-width="100"
                            />
                            <el-table-column
                                prop="stock"
                                label="库存"
                                min-width="50"
                            />
                            <el-table-column
                                prop="salableQuantity"
                                label="活动总库存"
                                min-width="100"
                            />
                            <el-table-column
                                prop="activityStock"
                                label="活动已售库存"
                                min-width="100"
                            />
                            <el-table-column
                                label="活动剩余库存"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    {{ scope.row.salableQuantity - scope.row.activityStock }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="售罄率"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    {{ scope.row.soldOutRate }}%
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    label="商品图片"
                    width="120"
                >
                    <template slot-scope="scope">
                        <ImageList
                            :data="scope.row.mainImageUrl"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    min-width="100"
                />
                <el-table-column
                    prop="goodsSn"
                    label="商品货号"
                    min-width="100"
                />
                <el-table-column
                    prop="activityName"
                    label="活动名称"
                    min-width="100"
                />
                <el-table-column
                    prop="stock"
                    label="商品库存"
                    min-width="100"
                />
                <el-table-column
                    prop="salableQuantity"
                    label="活动总库存"
                    min-width="100"
                />
                <el-table-column
                    label="活动已售库存"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        {{ scope.row.lockQuantity + scope.row.sellQuantity }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="活动剩余库存"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        {{ scope.row.salableQuantity - scope.row.lockQuantity - scope.row.sellQuantity }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="售罄率"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        {{ scope.row.soldOutRate }}%
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
    name: 'ActivityGoodsStock',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                activityName: '', // 活动名称
                goodsName: '', // 商品名称
                goodsSn: '', // 商品货号
                orderByKey: '1', // 排序类型
                orderByType: '1', //排序方式
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Pm.Activity.activityGoodsStockList(queryData).then(json => {
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
