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
                :model="formModel"
                :rules="formRules"
            >
                <div
                    class="ma-b"
                    v-if="!formModel.id"
                >
                    <el-button-group>
                        <el-button
                            type="success"
                            icon="el-icon-plus"
                            size="small"
                            @click="onAddSelect"
                        >选择商品
                        </el-button>
                    </el-button-group>
                </div>
                <div v-if="formModel.goodsId">
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
                            <span>规格信息</span>
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
                                        label="库存"
                                        min-width="80"
                                    >
                                        <template slot-scope="scope">
                                            <el-input-number
                                                controls-position="right"
                                                :min="0"
                                                :max="255"
                                                v-model.number="scope.row.stock"
                                            />
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="警告库存"
                                        min-width="80"
                                    >
                                        <template slot-scope="scope">
                                            <el-input-number
                                                controls-position="right"
                                                :min="0"
                                                :max="255"
                                                v-model.number="scope.row.alarmStock"
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
                                            size="small"
                                            @click="onBatchSetPrice(goods, 1)"
                                        >库存
                                        </el-button>
                                        <el-button
                                            size="small"
                                            @click="onBatchSetPrice(goods, 2)"
                                        >警告库存
                                        </el-button>
                                    </span>
                                    <span v-show="goods.isSetBatchPrice">
                                        <el-input-number
                                            controls-position="right"
                                            :min="0"
                                            v-model.number="goods.batchPrice"/>
                                        <el-button
                                            size="small"
                                            @click="onConfirmBatchSetPrice(goods)"
                                            type="primary"
                                            class=" ma-l"
                                        >保存
                                        </el-button>
                                        <el-button
                                            size="small"
                                            @click="onCancelBatchSetPrice(goods)"
                                        >取消
                                        </el-button>
                                    </span>
                                </span>
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
                            <span>商品设置</span>
                        </div>
                        <div class="item">
                            <el-form-item
                                prop="orderNum"
                                label="排序号"
                                label-width="8em"
                            >
                                <el-input-number
                                    controls-position="right"
                                    :min="1"
                                    :max="255"
                                    v-model.number="formModel.orderNum"
                                />
                            </el-form-item>
                            <el-form-item
                                prop="minOrderQuantity"
                                label="最小购买数量"
                                label-width="8em"
                            >
                                <el-input-number
                                    controls-position="right"
                                    :min="0"
                                    :max="255"
                                    v-model.number="formModel.minOrderQuantity"
                                />
                                （为0不限制）
                            </el-form-item>
                            <el-form-item
                                prop="maxOrderQuantity"
                                label="最大购买数量"
                                label-width="8em"
                            >
                                <el-input-number
                                    controls-position="right"
                                    :min="0"
                                    :max="255"
                                    v-model.number="formModel.maxOrderQuantity"
                                />
                                （为0不限制）
                            </el-form-item>
                            <el-form-item
                                prop="storeGoodsCatId"
                                label="所属类目"
                                label-width="8em"
                            >
                                <el-select
                                    v-model="formModel.storeGoodsCatId"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in shopStoreGoodsCatList"
                                        :key="item.id"
                                        :label="item.goodsCatName"
                                        :value="item.id"/>
                                </el-select>
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
                </div>
            </el-form>
            <!-- 弹框 -->
            <el-dialog
                title="选择商品"
                center
                width="1200px"
                :visible.sync="selectDialog.isVisible"
                @closed="onSelectCancel"
            >
                <!-- 表单区 -->
                <el-form
                    ref="selectDialogQueryForm"
                    class="second-header npa-b"
                    size="small"
                    :inline="true"
                    :model="selectDialog.queryFormModel"
                >
                    <el-form-item
                        prop="goodsName"
                        label="商品名称"
                    >
                        <el-input
                            v-model="selectDialog.queryFormModel.goodsName"
                            placeholder="请输入商品名称"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="goodsSn"
                        label="商品编号"
                    >
                        <el-input
                            v-model="selectDialog.queryFormModel.goodsSn"
                            placeholder="请输入商品编号"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="onSelectDialogQuery()"
                        >查询
                        </el-button>
                        <el-button
                            type="success"
                            @click="onResetSelectDialog"
                        >重置
                        </el-button>
                    </el-form-item>
                </el-form>

                <!-- 内容 -->
                <div class="body">
                    <!-- 表格 -->
                    <el-table
                        stripe
                        border
                        size="small"
                        :data="selectDialog.tableData"
                        style="width: 100%"
                        height="400"
                        ref="selectDialogTable"
                    >
                        <el-table-column
                            prop="mainImageUrl"
                            label="商品图片"
                            width="135"
                        >
                            <template slot-scope="scope">
                                <image-list :data="scope.row.mainImageUrl"/>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="goodsName"
                            label="商品名称"
                            min-width="100"
                        />
                        <el-table-column
                            prop="goodsSn"
                            label="商品编号"
                            min-width="100"
                        />
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="90"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="small"
                                    @click="selectRow(scope.row)"
                                >选择
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 分页 -->
                    <div class="ma-t ta-r">
                        <pagination
                            v-model="selectDialog.pagination"
                            @input="onSelectDialogQuery"
                        />
                    </div>
                </div>
                <div
                    slot="footer"
                    class="dialog-footer">
                    <!--<el-button-->
                    <!--type="primary"-->
                    <!--size="small"-->
                    <!--@click="onSelectConfirm"-->
                    <!--&gt;确 定-->
                    <!--</el-button>-->
                    <el-button
                        size="small"
                        @click="onSelectCancel"
                    >取 消
                    </el-button>
                </div>
            </el-dialog>
        </template>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'ShopStoreGoodsEdit',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                goodsId: '',
                storeGoodsCatId: '',
                minOrderQuantity: 0,
                maxOrderQuantity: 0,
                orderNum: 1,
            },
            // 表单校验规则
            formRules: {
                orderNum: {
                    required: true,
                    message: '请输入排序号',
                    trigger: 'blur',
                },
            },
            // 新增/编辑
            selectDialog: {
                // 对话框显示
                isVisible: false,
                // 查询数据
                queryFormModel: {
                    goodsName: '', // 商品名称
                    goodsSn: '', // 商品编号
                },
                // 表单数据
                tableData: [],
                // 分页
                pagination: {},
            },
            // 表格数据
            goods: {},
        };
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Sp.ShopStoreGoods.save({
                    ...this.formModel,
                    shopStoreSkuJson: JSON.stringify(this.goods.skuList),
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.$router.back();
                });
            });
        },
        init() {
            this.$api.Sp.ShopStoreGoods.getDetail({ id: this.formModel.id }).then(json => {
                const res = json.data.data.shopStoreGoods;
                this.$utils.Comm.formModelMerge(this.formModel, res);
                this.goods = json.data.data.goods || {};
            });
        },
        /* -- 事件 -- */
        onAddSelect() {
            this.selectDialog.isVisible = true;
            this.$nextTick(() => {
                this.onSelectDialogQuery();
            });
        },
        onSelectDialogQuery(pagination) {
            return this.$api.Gd.Goods.selectByPage({
                ...this.selectDialog.queryFormModel,
                ...pagination,
                isShopStoreGoods: 0,
            }).then(json => {
                const res = json.data;
                this.selectDialog.tableData = res.data;
                this.selectDialog.pagination = res.pagination;
            });
        },
        onResetSelectDialog() {
            this.$refs.selectDialogQueryForm.resetFields();
        },
        onSelectCancel() {
            this.selectDialog.isVisible = false;
        },
        selectRow(row) {
            row.skuList.forEach(item => {
                item.stock = 0;
                item.alarmStock = 0;
            });
            this.goods = row;
            this.formModel.goodsId = row.goodsId;
            this.selectDialog.isVisible = false;
        },
        initShopStoreGoodsCatList() {
            this.$api.Sp.ShopStoreGoodsCat.select().then(json => {
                this.shopStoreGoodsCatList = json.data.data;
            });
        },
        // 批量设置价格
        onBatchSetPrice(item, type) {
            item.setBatchType = type;
            this.$set(item, 'isSetBatchPrice', true);
            this.$set(item, 'batchPrice', undefined);
        },
        onConfirmBatchSetPrice(item) {
            item.skuList.forEach(sku => {
                if (item.setBatchType === 1) {
                    this.$set(sku, 'stock', item.batchPrice);
                } else if (item.setBatchType === 2) {
                    this.$set(sku, 'alarmStock', item.batchPrice);
                }
            });
            this.$set(item, 'isSetBatchPrice', false);
        },
        onCancelBatchSetPrice(item) {
            this.$set(item, 'isSetBatchPrice', false);
        },
    },
    created() {
        this.initShopStoreGoodsCatList();
        this.formModel.id = this.$route.params.id;
        if (this.formModel.id) {
            this.init();
        }
    },
};
</script>

<style lang="scss">
</style>
