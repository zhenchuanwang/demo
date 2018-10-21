<!-- Created by henian.xu on 2018/9/3. -->

<template>
    <el-form
        v-if="skuTable&&skuTable.length"
        ref="form"
        class="goods-spec el-table el-table--small"
        size="small"
        :model="formModel"
        :rules="formRules">
        <table>
            <thead>
                <tr>
                    <th 
                        v-for="(item,index) in skuList"
                        :key="index">
                        <div class="cell">{{ item.pn }}</div>
                    </th>
                    <!--固定的-->
                    <th 
                        v-for="(item,index) in formField" 
                        :key="index+'formField'"
                        :width="item.key==='skuSn'?'300':'140'"
                        v-if="!item.hide">
                        <div class="cell" ><span 
                            v-if="item.required" 
                            class="tc-red">*</span>{{ item.name }}</div>
                    </th>
                    <!--<th><div class="cell"><span class="tc-red">*</span>SKU编码</div></th>
                    <th><div class="cell"><span class="tc-red">*</span>价格</div></th>
                    <th><div class="cell"><span class="tc-red">*</span>库存</div></th>
                    <th><div class="cell">成本价</div></th>-->
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item,index) in skuTable"
                    :key="index">
                    <td
                        v-for="(item2,index2) in item"
                        :key="index2"
                        :rowspan="item2.rowspan">
                        <div class="cell">{{ item2.vn }}</div>
                    </td>
                    <!--固定的-->
                    <td
                        v-for="(item2,index2) in formField"
                        :key="index2+'formFieldBody'" 
                        v-if="!item2.hide">
                        <div class="cell">
                            <!--{{ item2.key }}_{{ item.specValKey }}-->
                            <el-form-item 
                                :prop="`${item2.key}_${item.specValKey}`"
                                :key="index2">
                                <el-input v-model="formModel[`${item2.key}_${item.specValKey}`]"/>
                            </el-form-item>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="100">
                        <div class="cell">
                            <span class="batch">批量设置: </span>
                            <el-button
                                v-for="(item,index) in formField"
                                :key="index"
                                v-if="!item.hide"
                                @click="onBatch(item)">{{ item.name }}</el-button>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
        <!--<pre>{{ skuTable }}</pre>-->
    </el-form>
    <div 
        v-else 
        class="tc-g6">请选择商品规格</div>
</template>

<script>
export default {
    name: 'GoodsSpec',
    data() {
        return {
            formField: [
                { key: 'skuSn', name: 'SKU编码', required: true },
                { key: 'price', name: '价格', required: true },
                { key: 'stock', name: '库存', required: true },
                { key: 'costPrice', name: '成本价' },
                { key: 'id', name: 'id', hide: true },
            ],
            formModel: {},
            formRules: {},
            skuValMap: {},
        };
    },
    props: {
        value: {
            type: Array,
            required: true,
        },
        spuData: {
            type: Array,
            required: true,
        },
        goodsSn: {
            type: String,
            default: '',
        },
    },
    computed: {
        skuList() {
            const res = [];
            this.spuData.forEach(spec => {
                const skuList = [];
                spec.v.forEach(sku => {
                    if (sku.vn) {
                        delete sku.rowspan;
                        skuList.push(sku);
                    }
                });
                skuList.length && res.push(skuList);
            });
            return res;
        },
        skuTable() {
            return this.doExchange(this.skuList);
        },
        form() {
            return this.skuTable && this.skuTable.length ? this.$refs.form : undefined;
        },
    },
    watch: {
        skuTable: {
            handler() {
                //$nextTick 只为了 等待 第一次 skuValMap 赋值
                this.$nextTick(() => {
                    this.buildFormModel();
                });
            },
            immediate: true,
        },
        formModel: {
            handler() {
                this.$nextTick(() => {
                    this.updateValue();
                });
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        doExchange(skuList) {
            const len = skuList.length;
            if (len >= 2 && skuList[0].length && skuList[1].length) {
                const [sku1, sku2] = skuList;
                const len1 = sku1.length;
                const len2 = sku2.length;
                const newLen = len1 * len2;
                const temp = new Array(newLen);
                let index = 0;
                sku1.forEach(item1 => {
                    sku2.forEach((item2, j) => {
                        if (j === 0) {
                            if (Array.isArray(item1)) {
                                const l = item1.length;
                                item1.forEach((item3, n) => {
                                    if (n + 1 !== l) {
                                        item3.rowspan = (item3.rowspan || 1) * sku2.length;
                                    } else {
                                        item3.rowspan = sku2.length;
                                    }
                                });
                                temp[index] = item1.concat(item2);
                            } else {
                                item1.rowspan = sku2.length;
                                temp[index] = [item1, item2];
                            }
                        } else {
                            temp[index] = [item2];
                        }
                        temp[index].specValues = `${item1.spec || item1.specValues}` + `_${item2.spec}`;
                        temp[index].specValKey = temp[index].specValues.replace(/:/g, '-');
                        temp[index].specDesc = `${item1.desc || item1.specDesc}` + `_${item2.desc}`;
                        delete sku2.rowspan;
                        index++;
                    });
                });
                const newArray = new Array(len - 1);
                newArray[0] = temp;
                if (len > 2) {
                    let _count = 1;
                    for (let i = 2; i < len; i++) {
                        newArray[_count] = skuList[i];
                        _count++;
                    }
                }
                return this.doExchange(newArray);
            } else {
                if (!skuList || !skuList.length) return [];
                const temp = [];
                skuList[0].forEach(sku => {
                    let res = [];
                    if (Array.isArray(sku)) {
                        res = sku;
                    } else {
                        res = [sku];
                        res.specValues = sku.spec;
                        res.specValKey = res.specValues.replace(/:/g, '-');
                        res.specDesc = sku.desc;
                    }
                    temp.push(res);
                    this.spliceSkuSn(res);
                });
                return temp;
            }
        },
        spliceSkuSn(data) {
            let specDescArr = data.specDesc.match(/:([^_]*)/g);
            specDescArr = specDescArr.map(item => item.replace(/^:/, ''));
            if (this.skuValMap[`skuSn_${data.specValKey}`] || !this.goodsSn) return;
            this.skuValMap[`skuSn_${data.specValKey}`] = this.goodsSn + '-' + specDescArr.join('-');
        },
        buildFormModel() {
            const model = {};
            const rules = {};
            // 缓存值
            for (const key in this.formModel) {
                if (this.formModel.hasOwnProperty(key) && !!this.formModel[key]) {
                    this.skuValMap[key] = this.formModel[key];
                }
            }
            this.skuTable.forEach(item => {
                this.formField.forEach(field => {
                    model[`${field.key}_${item.specValKey}`] = this.skuValMap[`${field.key}_${item.specValKey}`] || '';
                    if (field.required) {
                        rules[`${field.key}_${item.specValKey}`] = {
                            required: true,
                            message: '不能为空',
                        };
                    }
                });
            });
            this.formModel = model;
            this.formRules = rules;
        },
        onBatch(field) {
            this.$prompt(`请输入${field.name}`, '温馨提示', {
                inputValidator(val) {
                    if (!val && field.required) {
                        return `${field.name}不能为空`;
                    } else if (/price|stock|costPrice/.test(field.key) && isNaN(val)) {
                        return `请填写金额`;
                    }
                    return true;
                },
            }).then(({ value }) => {
                if (/price|stock/.test(field.key)) {
                    value = +value;
                }
                const reg = new RegExp(`^${field.key}_.*`);
                for (const key in this.formModel) {
                    if (this.formModel.hasOwnProperty(key)) {
                        if (reg.test(key)) {
                            this.formModel[key] = value;
                        }
                    }
                }
            });
        },
        updateValue() {
            const { form: $$form } = this.$refs;
            if (!$$form) return;
            $$form
                .validate()
                .then(() => {
                    const res = [];
                    this.skuTable.forEach(item => {
                        const obj = {
                            specValues: item.specValues,
                            specDesc: item.specDesc,
                        };
                        this.formField.forEach(field => {
                            obj[field.key] = this.formModel[`${field.key}_${item.specValKey}`];
                        });
                        res.push(obj);
                    });
                    this.$emit('input', res);
                })
                .catch(() => {
                    this.$emit('input', []);
                });
        },
    },
    created() {
        if (this.value && this.value.length) {
            this.value.forEach(sku => {
                this.formField.forEach(field => {
                    const key = `${field.key}_${sku.specValues.replace(/:/g, '-')}`;
                    if (sku[field.key]) {
                        this.skuValMap[key] = sku[field.key];
                    }
                });
            });
        }
    },
};
</script>

<style lang="scss">
.goods-spec {
    > table {
        width: 100%;
        border-collapse: collapse;
        tr {
            > th,
            > td {
                border: 1px solid $color-border;
            }
        }
    }
}
</style>
