<!-- Created by henian.xu on 2018/8/31. -->

<template>
    <el-form
        ref="form"
        class="goods-spu"
        :inline="true"
        size="small"
        :model="formModel"
        :rules="formRules">
        <div 
            class="spec" 
            v-for="(spec,index) in goodsSpecList"
            :key="spec.id">
            <div class="header">
                <el-form-item
                    :prop="`spec_${spec.formId}`"
                    label="规格名">
                    <!--{{ `spec_${spec.initData}` }}-->
                    <RemoteSelect
                        ref="specRemoteSelect"
                        class="w-100per"
                        remote="/gd/prop/selectByPage"
                        extend-reload
                        allow-create
                        placeholder="请输入"
                        :init-data="spec.initData"
                        :props="{id:'id',name:'propName'}"
                        :allow-create-method="onSpecCreateMethod"
                        :exclude="specExcludeList"
                        @input="onSpecInput($event,spec,index)"
                        v-model="formModel[`spec_${spec.formId}`]"/>
                </el-form-item>
                <div 
                    class="spec-delete dp-ib"
                    @click="onSpecDelete(index)"
                ><i class="el-icon-error"/></div>
                <span 
                    v-if="index===0"
                    class="pa-l">
                    <el-switch 
                        active-text="添加规格图片" 
                        v-model="isSpecImg"/>
                </span>
            </div>
            <div class="body">
                <div 
                    class="sku-item"
                    v-for="(sku,index2) in spec.v"
                    :key="sku.id">
                    <div>
                        <el-form-item
                            :prop="`sku_${sku.formId}`"
                            label="规格值">
                            <RemoteSelect
                                :ref="`skuRemoteSelect_${spec.pid}`"
                                class="w-100per"
                                remote="/gd/value/selectByPage"
                                extend-reload
                                allow-create
                                placeholder="请输入"
                                :init-data="sku.initData"
                                :props="{id:'id',name:'valueName'}"
                                :remote-params="{propId:spec.pid}"
                                :allow-create-method="(name)=>{return onSkuCreateMethod(name,spec.pid)}"
                                :exclude="skuExcludeListMap[spec.pid]"
                                @input="onSkuInput($event,sku,index2,spec)"
                                v-model="formModel[`sku_${sku.formId}`]"/>
                        </el-form-item>
                        <div
                            class="spec-delete dp-ib"
                            @click="onSkuDelete(spec.v,index2)"
                        ><i class="el-icon-error"/></div>
                    </div>
                    <el-form-item 
                        v-if="isSpecImg && index===0" 
                        label="　　　　">
                        <upload
                            action="/rs/attachment/uploadGoodsImage"
                            :limit="1"
                            tips="建议尺寸：200*200像素,最多上传1张图片"
                            v-model="sku.vimgModel"/>
                    </el-form-item>
                </div>
                <el-button 
                    v-if="spec.pid" 
                    @click="onAddSku(spec.v)">添加规格</el-button>
                <div 
                    v-else 
                    class="tc-g6">请选择规格名</div>
            </div>
        </div>
        <el-button
            v-if="goodsSpecList.length< 3"
            @click="onAddSpec" >添加规格</el-button>
    </el-form>
</template>

<script>
export default {
    name: 'GoodsSpu',
    data() {
        return {
            // goodsSpecList: [],
            formModel: {},
            formRules: {},
            isSpecImg: false,
        };
    },
    props: {
        value: {
            type: Array,
            required: true,
        },
        goodsImageBaseUrl: {
            type: String,
            default: '',
        },
    },
    computed: {
        goodsSpecList: {
            get() {
                this.value.forEach((spec, i) => {
                    if (!spec.formId) {
                        this.$set(spec, 'formId', this.addFormModel('spec', spec.pid));
                        this.$set(spec, 'initData', [{ id: spec.pid, propName: spec.pn }]);
                    }
                    if (Array.isArray(spec.v) && spec.v.length) {
                        spec.v.forEach(sku => {
                            if (!sku.formId) {
                                const formId = this.addFormModel('sku', sku.vid);
                                this.$set(sku, 'formId', formId);
                                this.$set(sku, 'initData', [{ id: sku.vid, valueName: sku.vn }]);
                            }
                            if (i === 0 && !sku.vimgModel) {
                                let vimgModel = [];
                                if (sku.vimg) {
                                    this.$set(this, 'isSpecImg', true);
                                    vimgModel.push({
                                        name: sku.vimg,
                                        address: this.goodsImageBaseUrl + '/' + sku.vimg,
                                    });
                                }
                                this.$set(sku, 'vimgModel', vimgModel);
                            }
                        });
                    }
                });
                return this.value;
            },
            set(val) {
                // val === goodsSpecList
                this.$emit('input', val);
            },
        },
        specExcludeList() {
            const res = [];
            this.goodsSpecList.forEach(item => {
                res.push(item.pid);
            });
            return res;
        },
        goodsSpecMap() {
            return this.goodsSpecList.reduce((prev, curr) => {
                prev[curr.pid] = curr;
                return prev;
            }, {});
        },
        skuExcludeListMap() {
            const res = {};
            const { goodsSpecMap } = this;
            Object.keys(this.goodsSpecMap).forEach(key => {
                res[key] = [];
                goodsSpecMap[key].v.forEach(item => {
                    res[key].push(item.vid);
                });
            });
            return res;
        },
        fields() {
            return this.$refs.form.fields;
        },
    },
    methods: {
        addFormModel(prefix, value = '', formId) {
            formId = formId || this.$utils.Comm.getKey();
            this.$set(this.formModel, `${prefix}_${formId}`, value);
            this.$set(this.formRules, `${prefix}_${formId}`, {
                required: true,
                message: '不能为空',
            });
            return formId;
        },
        removeFormModel(prefix, formId) {
            delete this.formModel[`${prefix}_${formId}`];
            delete this.formRules[`${prefix}_${formId}`];
        },
        onAddSpec() {
            this.goodsSpecList.push({
                formId: this.addFormModel('spec'),
                pid: '',
                pn: '',
                v: [],
            });
        },
        onSpecDelete(index) {
            const spec = this.goodsSpecList.splice(index, 1)[0] || {};
            this.removeFormModel('spec', spec.formId);
        },
        onAddSku(skuList) {
            skuList.push({
                formId: this.addFormModel('sku'),
                vid: '',
                vn: '',
                vimg: '',
            });
        },
        onSkuDelete(skuList, index) {
            const sku = skuList.splice(index, 1)[0] || {};
            this.removeFormModel('sku', sku.formId);
        },
        onSpecCreateMethod(name) {
            return this.$api.Gd.Prop.saveProp({ propName: name });
        },
        onSpecInput(val, spec, index) {
            this.$nextTick(() => {
                const { specRemoteSelect } = this.$refs;
                const $$remoteSelect = specRemoteSelect[index];
                spec.v = [];
                spec.pid = val;
                spec.pn = $$remoteSelect.getData(val).propName;
            });
        },
        onSkuCreateMethod(name, propId) {
            return this.$api.Gd.Value.savePropValue({ valueName: name, propId });
        },
        onSkuInput(val, sku, index, spec) {
            this.$nextTick(() => {
                const skuRemoteSelect = this.$refs[`skuRemoteSelect_${spec.pid}`];
                const $$remoteSelect = skuRemoteSelect[index];
                sku.vid = val;
                sku.vn = $$remoteSelect.getData(val).valueName;
                sku.spec = `${spec.pid}:${val}`;
                sku.desc = `${spec.pn}:${sku.vn}`;
            });
        },
        validate(callback) {
            return this.$refs.form.validate(callback);
        },
    },
    created() {
        // this.goodsSpecList = JSON.parse(JSON.stringify(this.value.goodsSpecList || []));
    },
};
</script>

<style lang="scss">
.goods-spu {
    > .spec {
        border: 1px solid $color-border;
        margin-bottom: $margin;

        > .header {
            padding-left: $padding;
            padding-right: $padding;
            padding-top: 18px;
            background-color: $gray1;
        }
        > .body {
            padding: $padding;
            > .sku-item {
                /*display: inline-block;*/
                vertical-align: top;
                display: inline-flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin-right: $margin;
            }
        }
    }
}
</style>
