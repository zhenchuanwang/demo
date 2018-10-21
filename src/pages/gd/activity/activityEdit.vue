<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page
        back
    >
        <el-row>
            <el-form
                ref="addForm"
                size="small"
                :model="formModel"
                :rules="formRules"
                :disabled="formModel.activityStatus == 2"
            >
                <el-col :span="12">
                    <el-form-item
                        prop="activityName"
                        label="活动名称"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.activityName"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="activityDesc"
                        label="活动描述"
                        label-width="8em"
                    >
                        <el-input
                            type="textarea"
                            v-model="formModel.activityDesc"
                            auto-complete="off"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item
                        label="活动商品"
                        label-width="8em">
                        <div
                            class="ma-b"
                            v-if="!formModel.activityStatus || formModel.activityStatus == 50"
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

                        <!-- 表格 -->
                        <el-table
                            stripe
                            border
                            size="small"
                            :data="selectDataList"
                            style="width: 100%"
                            default-expand-all
                        >
                            <!-- 商品规格 -->
                            <el-table-column type="expand">
                                <template slot-scope="goods">
                                    <el-table
                                        stripe
                                        border
                                        size="small"
                                        :data="goods.row.skuList"
                                        style="width: 100%"
                                    >
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
                                            prop="stock"
                                            label="库存"
                                            min-width="50"
                                        />
                                        <el-table-column
                                            prop="salableQuantity"
                                            label="活动库存"
                                            min-width="150"
                                        >
                                            <template slot-scope="scope">
                                                <el-input-number
                                                    controls-position="right"
                                                    :min="0"
                                                    v-model.number="scope.row.salableQuantity"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            v-for="(item,index) in levelList"
                                            :key="goods.row.goodsId + '-' + index"
                                            :label="item.levelName"
                                            min-width="150"
                                        >
                                            <template slot-scope="sku">
                                                <el-input-number
                                                    controls-position="right"
                                                    :min="0"
                                                    :precision="2"
                                                    v-model.number="sku.row.activitySkuPriceList[index].price"/>
                                            </template>
                                        </el-table-column>
                                    </el-table>

                                    <span
                                        class="m-t">
                                        批量设置:
                                        <span v-show="!goods.row.isSetBatchPrice">
                                            <el-button
                                                v-for="(item, index) in levelList"
                                                :key="index"
                                                type="text"
                                                size="small"
                                                @click="onBatchSetPrice(goods.row, item)"
                                            >{{ item.levelName }}
                                            </el-button>
                                        </span>
                                        <span v-show="goods.row.isSetBatchPrice">
                                            <el-input-number
                                                controls-position="right"
                                                :min="0"
                                                :precision="2"
                                                v-model.number="goods.row.batchPrice"/>
                                            <el-button
                                                type="text"
                                                size="small"
                                                @click="onConfirmBatchSetPrice(goods.row)"
                                            >保存
                                            </el-button>
                                            <el-button
                                                type="text"
                                                size="small"
                                                @click="onCancelBatchSetPrice(goods.row)"
                                            >取消
                                            </el-button>
                                        </span>
                                    </span>
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
                                prop="orderNum"
                                label="排序号"
                                min-width="60"
                            >
                                <template slot-scope="scope">
                                    <el-input-number
                                        controls-position="right"
                                        :min="1"
                                        :max="255"
                                        v-model.number="scope.row.orderNum"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="activityTime"
                                label="活动时间"
                                min-width="180"
                            >
                                <template slot-scope="scope">
                                    <el-date-picker
                                        size="small"
                                        v-model="scope.row.activityTime"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"/>
                                </template>
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="45"
                                v-if="!formModel.activityStatus || formModel.activityStatus == 50"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="onDeleteSelect(scope.row)"
                                    >删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label-width="8em"
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
        </el-row>
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
                    row-key="goodsId"
                    ref="selectDialogTable"
                    @selection-change="onSelectDialogSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="36"
                    />
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
                <el-button
                    type="primary"
                    size="small"
                    @click="onSelectConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onSelectCancel"
                >取 消
                </el-button>
            </div>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'ActivityEdit',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                activityName: '',
                activityDesc: '',
                activityStatus: '',
            },
            // 表单校验规则
            formRules: {
                activityName: {
                    required: true,
                    message: '请输入活动名称',
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
                // 当前选择行
                currentTableSelect: [],
            },
            // 表格数据
            selectDataList: [],
            // 表格当前选中行
            currentTableSelect: [],
            //等级列表
            levelList: [],
        };
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.selectDataList.forEach(item => {
                    if (!item.activityTime || item.activityTime.length != 2) {
                        this.$message({
                            message: '请选择活动时间',
                            type: 'error',
                        });
                    }
                    item.activityBeginTime = item.activityTime[0];
                    item.activityEndTime = item.activityTime[1];
                });

                this.$api.Pm.Activity.save({
                    ...this.formModel,
                    activityGoodsJson: JSON.stringify(this.selectDataList),
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
            this.$api.Pm.Activity.getDetail({ id: this.formModel.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(this.formModel, res.activity);
                res.activityGoodsList.forEach(item => {
                    item.activityTime = [new Date(item.activityBeginTime), new Date(item.activityEndTime)];
                });
                this.selectDataList = res.activityGoodsList || [];
            });
        },
        /* -- 事件 -- */
        onAddSelect() {
            this.selectDialog.isVisible = true;
            this.$nextTick(() => {
                this.onSelectDialogQuery();
                // 初始化已选择数据
                if (this.$refs.selectDialogTable) {
                    this.$refs.selectDialogTable.clearSelection();
                }
                this.selectDataList.forEach(item => {
                    this.$refs.selectDialogTable.toggleRowSelection(item, true);
                });
            });
        },
        onSelectDialogQuery(pagination) {
            return this.$api.Gd.Goods.selectByPage({
                ...this.selectDialog.queryFormModel,
                ...pagination,
                isActivityGoods: 0,
                activityId: this.formModel.id,
            }).then(json => {
                const res = json.data;
                this.selectDialog.tableData = res.data;
                this.selectDialog.pagination = res.pagination;
            });
        },
        onSelectDialogSelectionChange(val) {
            this.selectDialog.currentTableSelect = val;
        },
        onResetSelectDialog() {
            this.$refs.selectDialogQueryForm.resetFields();
        },
        onSelectConfirm() {
            // 插入新数据
            const list = [];
            this.selectDialog.currentTableSelect.forEach(item => {
                let isHave = false;
                this.selectDataList.forEach(oldItem => {
                    if (item.goodsId === oldItem.goodsId) {
                        list.push({ ...oldItem });
                        isHave = true;
                    }
                });
                if (!isHave) {
                    //添加新数据
                    item.id = null;
                    item.skuList.forEach(sku => {
                        sku.id = null;
                        this.$set(sku, 'activitySkuPriceList', JSON.parse(JSON.stringify(this.levelList)));
                        this.$set(sku, 'salableQuantity', sku.stock);
                    });
                    list.push({ ...item });
                }
            });
            this.selectDataList = [...list];
            this.selectDialog.isVisible = false;
        },
        onSelectCancel() {
            this.selectDialog.isVisible = false;
        },
        onDeleteSelect(row) {
            this.selectDataList.splice(this.selectDataList.indexOf(row), 1);
        },
        initLevelList() {
            this.$api.Mb.BuyerLevel.select().then(json => {
                const res = json.data.data;
                res.forEach(item => {
                    this.levelList.push({
                        priceSetType: 1,
                        buyerLevelId: item.id,
                        levelName: item.levelName,
                    });
                });
                this.$api.Mb.DistributorLevel.select().then(json => {
                    const res = json.data.data;
                    res.forEach(item => {
                        this.levelList.push({
                            priceSetType: 2,
                            distributorLevelId: item.id,
                            levelName: item.levelName,
                        });
                    });
                });
            });
        },
        // 批量设置价格
        onBatchSetPrice(item, level) {
            item.setBatchLevel = { ...level };
            this.$set(item, 'isSetBatchPrice', true);
            this.$set(item, 'batchPrice', 0);
        },
        onConfirmBatchSetPrice(item) {
            this.$nextTick(() => {
                if (item.batchPrice !== 0) {
                    item.skuList.forEach(sku => {
                        sku.activitySkuPriceList.forEach(price => {
                            if (
                                item.setBatchLevel.priceSetType === 1 &&
                                price.buyerLevelId === item.setBatchLevel.buyerLevelId
                            ) {
                                this.$set(price, 'price', item.batchPrice);
                            }
                            if (
                                item.setBatchLevel.priceSetType === 2 &&
                                price.distributorLevelId === item.setBatchLevel.distributorLevelId
                            ) {
                                this.$set(price, 'price', item.batchPrice);
                            }
                        });
                    });
                }
                this.$set(item, 'isSetBatchPrice', false);
            });
        },
        onCancelBatchSetPrice(item) {
            this.$set(item, 'isSetBatchPrice', false);
        },
    },
    created() {
        this.initLevelList();
        this.formModel.id = this.$route.params.id;
        if (this.formModel.id) {
            this.init(1);
        }
    },
};
</script>

<style lang="scss">
</style>
