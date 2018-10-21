<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-tabs
                class="classify-tabs"
                v-model="queryFormModel.goodsStatusType"
                type="card"
                @tab-click="onQuery()"
            >
                <el-tab-pane
                    label="出售中"
                    name="1"/>
                <el-tab-pane
                    label="已售罄"
                    name="2"/>
                <el-tab-pane
                    label="仓库中"
                    name="3"/>
            </el-tabs>
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
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
                    prop="goodsCatId"
                    label="商品类目"
                >
                    <CascaderPicker
                        :api-class="selectApi"
                        v-model="queryFormModel.goodsCatId"
                    />
                </el-form-item>
                <el-form-item
                    prop="supplierId"
                    label="供应商"
                >
                    <el-select
                        v-model="queryFormModel.supplierId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in supplierList"
                            :key="item.id"
                            :label="item.supplierName"
                            :value="item.id + ''"/>
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
                        @click="$router.push('/gd/goods/addGoods')"
                    >新增</el-button>
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
                    min-width="50"
                />
                <el-table-column
                    prop="goodsCatName"
                    label="商品类目"
                    min-width="50"
                />
                <el-table-column
                    prop="supplierName"
                    label="供应商名称"
                    min-width="50"
                />
                <el-table-column
                    prop="price"
                    label="销售价"
                    min-width="50"
                />
                <el-table-column
                    prop="marketPrice"
                    label="市场价"
                    min-width="50"
                />
                <el-table-column
                    prop="stock"
                    label="库存"
                    min-width="50"
                />
                <el-table-column
                    prop="goodsStatusName"
                    label="商品状态"
                    min-width="50"
                />
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="140"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push(`/gd/goods/addGoods/${scope.row.id}`)"
                        >编辑
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/gd/goods/goods/skuMemberPrice/' + scope.row.id)"
                        >会员价
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            v-if="scope.row.goodsStatus == 1 || scope.row.goodsStatus == 4"
                            @click="onSaleGoods(scope.row)"
                        >上架
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            v-if="scope.row.goodsStatus == 3"
                            @click="offSaleGoods(scope.row)"
                        >下架
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
    name: 'Goods',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                goodsName: '', // 商品名称
                goodsSn: '', // 商品货号
                goodsCatId: '', // 商品类目
                supplierId: '', // 供应商
                goodsStatusType: '1', // 商品状态类型
            },
            // 表格数据
            tableData: [],
            selectApi: this.$api.Gd.GoodsCat,
            supplierList: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Gd.Goods.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        initSupplierList() {
            this.$api.Gd.Supplier.select().then(json => {
                this.supplierList = json.data.data;
            });
        },
        onSaleGoods(row) {
            this.$confirm('是否上架该商品！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Gd.Goods.onSaleGoods({ goodsId: row.id }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                });
            });
        },
        offSaleGoods(row) {
            this.$confirm('是否下架该商品！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Gd.Goods.offSaleGoods({ goodsId: row.id }).then(json => {
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
    created() {
        this.initSupplierList();
    },
};
</script>

<style lang="scss">
</style>
