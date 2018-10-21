<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <!--<template slot="secondHeader">
            <div class="second-header">second-header</div>
        </template>-->

        <!-- 内容 -->
        <el-form
            ref="form"
            slot="body"
            label-width="10em"
            size="small"
            :model="formModel"
            :rules="formRules"
        >
            <el-card
                size="small"
                shadow="never"
                header="基本信息">
                <el-form-item
                    prop="goodsType"
                    label="商品类型">
                    <RemoteSelect
                        class="w-100per"
                        remote="/sp/shop/getShopAvailableGoodsType"
                        placeholder="请输入"
                        v-model="formModel.goodsType"/>
                </el-form-item>
                <el-form-item
                    prop="goodsName"
                    label="商品名称">
                    <el-input
                        placeholder="请输入"
                        v-model="formModel.goodsName"/>
                </el-form-item>
                <el-form-item
                    prop="goodsShortName"
                    label="商品简称">
                    <el-input
                        placeholder="请输入"
                        v-model="formModel.goodsShortName"/>
                </el-form-item>
                <el-form-item
                    prop="goodsSubtitle"
                    label="商品副标题">
                    <el-input
                        placeholder="请输入"
                        v-model="formModel.goodsSubtitle"/>
                </el-form-item>
                <el-form-item
                    prop="goodsImage"
                    label="商品列表图">
                    <upload
                        action="/rs/attachment/uploadGoodsImage"
                        :limit="6"
                        tips="建议尺寸：800*800像素,最多上传6张图片"
                        v-model="formModel.goodsImage"/>
                </el-form-item>
                <el-form-item
                    prop="goodsDetailImage"
                    label="商品详情图">
                    <upload
                        action="/rs/attachment/uploadGoodsImage"
                        :limit="12"
                        tips="建议尺寸：800*(不限)像素,最多上传12张图片"
                        v-model="formModel.goodsDetailImage"/>
                </el-form-item>
                <el-form-item
                    prop="shopGoodsCatIds"
                    label="店铺类目">
                    <TreePicker
                        remote="/sp/shopGoodsCat/selectAll"
                        v-model="formModel.shopGoodsCatIds"/>
                </el-form-item>
                <el-form-item
                    label="商品后台类目">
                    <CascaderPicker
                        :api-class="GoodsCatApi"
                        v-model="formModel.goodsCatId"
                    />
                </el-form-item>
                <el-form-item
                    prop="supplierId"
                    label="供应商">
                    <RemoteSelect
                        class="w-100per"
                        remote="/gd/supplier/select"
                        placeholder="请输入"
                        :props="{id:'id',name:'supplierName'}"
                        v-model="formModel.supplierId"/>
                </el-form-item>
                <el-form-item
                    prop="freightTemplateId"
                    label="运费模板"
                    v-if="userData.shop.freightMode == 3"
                >
                    <RemoteSelect
                        class="w-100per"
                        remote="/sp/shopFreightTemplate/select"
                        placeholder="请输入"
                        :props="{id:'id',name:'templateName'}"
                        v-model="formModel.freightTemplateId"/>
                </el-form-item>
            </el-card>
            <el-card
                class="ma-t"
                size="small"
                shadow="never"
                header="价格库存"
            >
                <el-form-item
                    prop="goodsSn"
                    label="商品货号">
                    <el-input
                        placeholder="请输入"
                        v-model="formModel.goodsSn"/>
                </el-form-item>
                <el-form-item
                    prop="goodsSpecList"
                    label="商品规格">
                    <GoodsSpu
                        ref="GoodsSpu"
                        v-model="formModel.goodsSpecList"
                        :goods-image-base-url="formModel.goodsImageBaseUrl"
                    />
                </el-form-item>
                <el-form-item
                    v-if="hasGoodsSpecList"
                    prop="goodsSpecList"
                    label="规格明细">
                    <GoodsSpec
                        ref="GoodsSpec"
                        :spu-data="formModel.goodsSpecList"
                        :goods-sn="formModel.goodsSn"
                        v-model="formModel.skuSpecList"/>
                </el-form-item>
                <template v-if="!hasGoodsSpecList">
                    <el-form-item
                        prop="stock"
                        label="库存">
                        <el-input
                            placeholder="请输入"
                            v-model="formModel.stock"/>
                    </el-form-item>
                    <el-form-item
                        prop="costPrice"
                        label="成本价">
                        <el-input
                            placeholder="请输入"
                            v-model="formModel.costPrice"/>
                    </el-form-item>
                    <el-form-item
                        prop="price"
                        label="价格">
                        <el-input
                            placeholder="请输入"
                            v-model="formModel.price"/>
                    </el-form-item>
                </template>
                <el-form-item
                    prop="marketPrice"
                    label="划线价">
                    <el-input
                        placeholder="请输入"
                        v-model="formModel.marketPrice"/>
                </el-form-item>
                <el-form-item
                    prop="isShowMarketPrice"
                    label="是否显示划线价">
                    <el-switch v-model="formModel.isShowMarketPrice"/>
                </el-form-item>
            </el-card>
            <el-card
                class="ma-t"
                size="small"
                shadow="never"
                header="购买限制"
            >
                <el-form-item
                    label="订单最小购买数量">
                    <el-input
                        placeholder="请输入"
                        v-model="formModel.minPerOrderQuantity"/>
                </el-form-item>
                <el-form-item
                    label="订单最大购买数量">
                    <el-input
                        placeholder="请输入"
                        v-model="formModel.maxPerOrderQuantity"/>
                </el-form-item>
                <el-form-item
                    label="会员限购数量">
                    <el-input
                        placeholder="请输入"
                        v-model="formModel.maxMbOrderQuantity"/>
                </el-form-item>
            </el-card>
            <el-card
                class="ma-t"
                size="small"
                shadow="never"
                header="分销设置"
            >
                <el-form-item
                    prop="shareIncomeRate"
                    label="分销分享赚比例(%)"
                    label-width="11em"
                    v-if="(1 & userData.shop.distributionIncomeMode) !== 0"
                >
                    <el-input-number
                        controls-position="right"
                        :min="0"
                        :precision="2"
                        v-model.number="formModel.shareIncomeRate"
                    />
                </el-form-item>
                <el-form-item
                    prop="topIncomeRate"
                    label="分销顶级提成比例(%)"
                    label-width="11em"
                    v-if="(2 & userData.shop.distributionIncomeMode) !== 0"
                >
                    <el-input-number
                        controls-position="right"
                        :min="0"
                        :precision="2"
                        v-model.number="formModel.topIncomeRate"
                    />
                </el-form-item>
                <el-form-item
                    prop="levelIncomeRate"
                    label="分销层级提成比例"
                    label-width="11em"
                    v-if="(4 & userData.shop.distributionIncomeMode) !== 0"
                >
                    <el-table
                        stripe
                        border
                        size="small"
                        :data="levelIncomeRateList"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="name"
                            label="分销层级"
                            width="120"
                        />
                        <el-table-column
                            prop="levelIncomeRate"
                            label="提成比例(%)"
                            min-width="220"
                        >
                            <template slot-scope="scope">
                                <el-input-number
                                    controls-position="right"
                                    :min="0"
                                    :precision="2"
                                    v-model.number="scope.row.levelIncomeRate"
                                />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-card>
        </el-form>

        <div class="ta-c pa-a">
            <el-button
                type="primary"
                @click="onSave">保存
            </el-button>
            <el-button
                type="success"
                @click="onSave(true)">保存并上架
            </el-button>
        </div>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import GoodsSpu from './_goodsSpu';
import GoodsSpec from './_goodsSpec';

export default {
    name: 'AddGoods',
    mixins: [pagesMixin],
    components: { GoodsSpu, GoodsSpec },
    data() {
        return {
            GoodsCatApi: this.$api.Gd.GoodsCat,
            formModel: {
                id: '',
                goodsType: '',
                goodsCatName: '',
                goodsName: '',
                goodsShortName: '',
                goodsSubtitle: '',
                goodsImage: [],
                goodsDetailImage: [],
                shopGoodsCatIds: [], // 店铺类目
                goodsCatId: '', // 商品后台类目
                supplierId: '',
                supplierName: '',
                freightTemplateId: '',

                /*价格库存*/
                goodsSn: '',
                goodsSpecList: [], // 商品规格
                skuSpecList: [],
                stock: '',
                costPrice: '',
                price: '',
                marketPrice: '',
                isShowMarketPrice: true,

                /*购买限制*/
                minPerOrderQuantity: '',
                maxPerOrderQuantity: '',
                maxMbOrderQuantity: '',

                goodsImageBaseUrl: 'http://imgp.zteup.com/upload/sys/goodsimage',
            },
            formRules: {
                goodsType: {
                    required: true,
                    message: '不能为空',
                },
                goodsCatName: {
                    required: true,
                    message: '不能为空',
                },
                goodsName: {
                    required: true,
                    message: '不能为空',
                },
                goodsShortName: {
                    required: true,
                    message: '不能为空',
                },
                goodsImage: {
                    type: 'array',
                    required: true,
                    message: '不能为空',
                },
                goodsDetailImage: {
                    type: 'array',
                    required: true,
                    message: '不能为空',
                },
                // 店铺类目
                goodsCatId: '', // 商品后台类目
                supplierId: {
                    required: true,
                    message: '不能为空',
                },
                freightTemplateId: {
                    required: true,
                    message: '不能为空',
                },
                /*价格库存*/
                goodsSn: {
                    required: true,
                    message: '不能为空',
                },
                stock: {
                    required: true,
                    message: '不能为空',
                },
                costPrice: {
                    required: true,
                    message: '不能为空',
                },
                price: {
                    required: true,
                    message: '不能为空',
                },
                marketPrice: {
                    required: true,
                    message: '不能为空',
                },
            },
            //分销层级设置
            levelIncomeRateList: [],
        };
    },
    computed: {
        goodsId() {
            return this.$route.params.goodsId;
        },
        hasGoodsSpecList() {
            return this.formModel.goodsSpecList && this.formModel.goodsSpecList.length;
        },
    },
    methods: {
        recoverFormModel(data) {
            Object.keys(this.formModel).forEach(key => {
                // if (key === 'goodsSpecList') return;
                // if (key === 'goodsImage') return;
                // if (key === 'goodsDetailImage') return;
                // if (key === 'skuSpecList') return;
                const val = data[key];
                this.formModel[key] = val === undefined || val === null ? this.formModel[key] : val;
            });
        },
        getSaveData() {
            const data = {
                ...this.formModel,
            };

            // 店铺类目
            data.shopGoodsCatIds = data.shopGoodsCatIds
                .reduce((prev, curr) => {
                    prev.push(curr);
                    return prev;
                }, [])
                .join(',');
            data.goodsImage = data.goodsImage
                .reduce((prev, curr) => {
                    prev.push(curr.name);
                    return prev;
                }, [])
                .join(',');
            data.goodsDetailImage = data.goodsDetailImage
                .reduce((prev, curr) => {
                    prev.push(curr.name);
                    return prev;
                }, [])
                .join(',');

            data.goodsSpecList = data.goodsSpecList.map(spec => {
                const _spec = {
                    pid: spec.pid,
                    pn: spec.pn,
                    v: spec.v || [],
                };
                _spec.v = _spec.v.map(sku => {
                    const vimgArr = sku.vimgModel || [];
                    const vimgModel = vimgArr[0] || {};
                    return {
                        vid: sku.vid,
                        vn: sku.vn,
                        vimg: vimgModel.name || '',
                    };
                });
                return _spec;
            });

            data.levelIncomeRate = JSON.stringify(this.levelIncomeRateList);
            // data.skuSpecList;

            return data;
        },
        onSave(publish) {
            const { form, GoodsSpu, GoodsSpec } = this.$refs;
            const validateList = [form];
            GoodsSpu && validateList.push(GoodsSpu);
            GoodsSpec && GoodsSpec.form && validateList.push(GoodsSpec.form);
            this.$utils.Comm.validateForm(validateList, true)
                .then((/*valid*/) => {
                    const data = this.getSaveData();
                    let fn = 'save';
                    if (publish === true) {
                        fn = 'saveAndPublish';
                    }
                    this.$api.Gd.Goods[fn](data).then(json => {
                        const res = json.data;
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                        this.$router.back();
                    });
                })
                .catch(({ errorField }) => {
                    console.log(errorField);
                });
        },
        initLevelIncomeRateList() {
            const newlevelIncomeRateList = [];
            for (let num = 1; num <= this.userData.shop.distributionLevel; num++) {
                let isExit = false;
                this.levelIncomeRateList.forEach(item => {
                    if (item.id === num) {
                        isExit = true;
                        newlevelIncomeRateList.push(item);
                    }
                });
                if (!isExit) {
                    const levelIncomeRate = {};
                    levelIncomeRate.id = num;
                    levelIncomeRate.name = num + '级分销商';
                    newlevelIncomeRateList.push(levelIncomeRate);
                }
            }
            newlevelIncomeRateList.sort(function(a, b) {
                return a.id - b.id;
            });
            this.levelIncomeRateList = [...newlevelIncomeRateList];
        },
    },
    created() {
        if (this.goodsId) {
            this.$api.Gd.Goods.getGoodsDetailVo({ id: this.goodsId }).then(json => {
                const res = json.data;
                const data = res.data;
                data.goodsImageBaseUrl = data.goodsImageBaseUrl.replace(/\/$/, '');
                data.goodsImage = data.goodsImage
                    .split(',')
                    .map(item => ({ name: item, address: `${data.goodsImageBaseUrl}/${item}` }));
                data.goodsDetailImage = data.goodsDetailImage
                    .split(',')
                    .map(item => ({ name: item, address: `${data.goodsImageBaseUrl}/${item}` }));

                // 店铺类目
                data.shopGoodsCatIds = (data.shopGoodsCatIds || '').split(',').map(item => +item);

                // 商品规格
                const arr = [];
                for (let i = 0, item; (item = data.goodsSpecList[i++]); ) {
                    for (let n = 0, item2; (item2 = item.v[n++]); ) {
                        item2.spec = item.pid + ':' + item2.vid;
                        item2.desc = item.pn + ':' + item2.vn;
                    }
                    arr.push(item);
                }
                data.goodsSpecList = arr;
                this.recoverFormModel(data);

                this.levelIncomeRateList = JSON.parse(data.levelIncomeRate) || [];
                this.initLevelIncomeRateList();
            });
        } else {
            this.initLevelIncomeRateList();
        }
    },
};
</script>

<style lang="scss">
</style>
