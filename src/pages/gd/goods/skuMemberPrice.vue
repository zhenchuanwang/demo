<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page
        back
    >
        <template
            slot="body"
        >
            <el-form
                ref="addForm"
                size="small"
            >
                <el-card
                    size="small"
                    shadow="never"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>商品信息</span>
                    </div>
                    <div class="item">
                        <el-form-item
                            label="商品类型:"
                            label-width="7em"
                        >
                            {{ goods.goodsTypeName }}
                        </el-form-item>
                        <el-form-item
                            label="商品编号:"
                            label-width="7em"
                        >
                            {{ goods.goodsSn }}
                        </el-form-item>
                        <el-form-item
                            label="商品名称:"
                            label-width="7em"
                        >
                            {{ goods.goodsName }}
                        </el-form-item>
                        <el-form-item
                            label="商品简称:"
                            label-width="7em"
                        >
                            {{ goods.goodsShortName }}
                        </el-form-item>
                        <el-form-item
                            label="商品副标题:"
                            label-width="7em"
                        >
                            {{ goods.goodsSubtitle }}
                        </el-form-item>
                        <el-form-item
                            label="商品图片:"
                            label-width="7em"
                        >
                            <image-list :data="goods.goodsImageList"/>
                        </el-form-item>
                        <el-form-item
                            label="商品详情:"
                            label-width="7em"
                        >
                            <image-list :data="goods.goodsDetailImageList"/>
                        </el-form-item>
                    </div>
                </el-card>
                <el-card
                    size="small"
                    shadow="never"
                    class="ma-t"
                >
                    <div
                        slot="header"
                        class="clearfix">
                        <span>会员价</span>
                    </div>
                    <div class="item">
                        <el-form-item>
                            <!-- 表格 -->
                            <el-table
                                stripe
                                border
                                size="small"
                                :data="goods.skuList"
                                style="width: 100%"
                            >
                                <el-table-column
                                    label="规格图片"
                                    width="135"
                                >
                                    <template slot-scope="scope">
                                        <image-list :data="scope.row.specImageUrl"/>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="specDesc"
                                    label="商品规格"
                                    min-width="100"
                                />
                                <el-table-column
                                    prop="price"
                                    label="价格"
                                    min-width="50"
                                />
                                <el-table-column
                                    v-for="(item,index) in buyerLevelList"
                                    :key="index"
                                    :label="item.levelName"
                                >
                                    <template slot-scope="scope">
                                        <el-input-number
                                            controls-position="right"
                                            :min="0"
                                            :precision="2"
                                            v-model.number="scope.row.buyerLevelPriceList[index].price"
                                        />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                        <el-form-item>
                            <span
                                class="m-t">
                                批量设置:
                                <span v-show="!goods.isSetBatchPrice">
                                    <el-button
                                        v-for="(item, index) in buyerLevelList"
                                        :key="index"
                                        type="text"
                                        size="small"
                                        @click="onBatchSetPrice(goods, item)"
                                    >{{ item.levelName }}
                                    </el-button>
                                </span>
                                <span v-show="goods.isSetBatchPrice">
                                    <el-input-number
                                        controls-position="right"
                                        :min="0"
                                        :precision="2"
                                        v-model.number="goods.batchPrice"/>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="onConfirmBatchSetPrice(goods)"
                                    >保存
                                    </el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="onCancelBatchSetPrice(goods)"
                                    >取消
                                    </el-button>
                                </span>
                            </span>
                        </el-form-item>
                    </div>
                </el-card>
                <el-col :span="12">
                    <el-form-item
                        label-width="8em"
                        class="ma-t"
                    >
                        <el-button
                            type="primary"
                            size="small"
                            @click="onConfirm"
                        >保 存
                        </el-button>
                        <el-button
                            size="small"
                            @click="$router.back()"
                        >返 回
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </template>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'SkuMemberPrice',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            goodsId: '',
            // 表单校验规则
            formRules: {
                orderNum: {
                    required: true,
                    message: '请输入排序号',
                    trigger: 'blur',
                },
            },
            // 表格数据
            goods: {
                goodsImageList: [],
                goodsDetailImageList: [],
            },
            buyerLevelList: [],
        };
    },
    methods: {
        onConfirm() {
            this.$api.Gd.SkuMemberPrice.saveSkuMemberPrice({
                jsonStr: JSON.stringify(this.goods.skuList),
            }).then(json => {
                const res = json.data;
                this.$message({
                    message: res.msg,
                    type: 'success',
                });
                this.$router.back();
            });
        },
        init() {
            this.$api.Gd.SkuMemberPrice.getSkuMemberPriceList({
                goodsId: this.goodsId,
            }).then(json => {
                const res = json.data.data;
                this.goods = res.goods;
                this.buyerLevelList = res.buyerLevelList;
            });
        },
        /* -- 事件 -- */
        // 批量设置价格
        onBatchSetPrice(item, level) {
            item.setBatchLevel = { ...level };
            this.$set(item, 'isSetBatchPrice', true);
            this.$set(item, 'batchPrice', 0);
        },
        onConfirmBatchSetPrice(item) {
            if (item.batchPrice !== 0) {
                item.skuList.forEach(sku => {
                    sku.buyerLevelPriceList.forEach(price => {
                        if (price.buyerLevelId === item.setBatchLevel.id) {
                            this.$set(price, 'price', item.batchPrice);
                        }
                    });
                });
            }
            this.$set(item, 'isSetBatchPrice', false);
        },
        onCancelBatchSetPrice(item) {
            this.$set(item, 'isSetBatchPrice', false);
        },
    },
    created() {
        this.goodsId = this.$route.params.id;
        this.init();
    },
};
</script>

<style lang="scss">
</style>
