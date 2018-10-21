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
                    label="商品编号"
                >
                    <el-input
                        v-model="queryFormModel.goodsSn"
                        placeholder="请输入商品编号"
                    />
                </el-form-item>
                <el-form-item
                    prop="storeGoodsCatId"
                    label="类目"
                >
                    <el-select
                        v-model="queryFormModel.storeGoodsCatId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in shopStoreGoodsCatList"
                            :key="item.id"
                            :label="item.goodsCatName"
                            :value="item.id"/>
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
                        @click="$router.push('/store/storeGoods/shopStoreGoods/edit')"
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
                    prop="mainImageUrl"
                    label="商品图片"
                    min-width="100"
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
                    prop="goodsCatName"
                    label="类目"
                    min-width="100"
                />
                <el-table-column
                    prop="orderNum"
                    label="排序号"
                    min-width="100"
                />
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="90"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/store/storeGoods/shopStoreGoods/edit/' + scope.row.id)"
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
    name: 'ShopStoreGoods',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                goodsName: '', // 商品名称
                goodsSn: '', // 商品货号
                storeGoodsCatId: '', // 类目ID
            },
            // 表格数据
            tableData: [],
            // 类目列表
            shopStoreGoodsCatList: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Sp.ShopStoreGoods.data(queryData).then(json => {
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
                this.$api.Sp.ShopStoreGoods.delete({ ids }).then(json => {
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
        initShopStoreGoodsCatList() {
            this.$api.Sp.ShopStoreGoodsCat.select().then(json => {
                this.shopStoreGoodsCatList = json.data.data;
            });
        },
    },
    created() {
        this.initShopStoreGoodsCatList();
    },
};
</script>

<style lang="scss">
</style>
