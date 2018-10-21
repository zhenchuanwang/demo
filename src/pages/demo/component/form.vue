<!-- Created by henian.xu on 2018/7/31. -->

<template>
    <page>
        <el-form
            ref="form"
            size="small"
            label-width="7em"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item
                        prop="input"
                        label="输入框"
                    >
                        <el-input
                            v-model="formModel.input"
                            placeholder="请输入..."
                        />
                    </el-form-item>
                    <el-form-item
                        prop="input"
                        label="文本框"
                    >
                        <el-input
                            type="textarea"
                            v-model="formModel.textarea"
                            placeholder="请输入..."
                        />
                    </el-form-item>
                    <el-form-item
                        prop="inputNumber"
                        label="数值框"
                    >
                        <el-input-number
                            controls-position="right"
                            v-model="formModel.inputNumber"
                            :precision="2"
                            placeholder="请输入..."
                        />
                    </el-form-item>
                    <el-form-item
                        prop="radioGroup"
                        label="数值框"
                    >
                        <el-radio-group v-model="formModel.radioGroup">
                            <el-radio :label="3">备选项</el-radio>
                            <el-radio :label="6">备选项</el-radio>
                            <el-radio :label="9">备选项</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        prop="checkGroup"
                        label="数值框"
                    >
                        <el-checkbox-group v-model="formModel.checkGroup">
                            <el-checkbox label="复选框 A"/>
                            <el-checkbox label="复选框 B"/>
                            <el-checkbox label="复选框 C"/>
                            <el-checkbox 
                                label="禁用" 
                                disabled/>
                            <el-checkbox 
                                label="选中且禁用" 
                                disabled/>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item
                        prop="checkGroup"
                        label="级联选择器"
                    >
                        <CascaderPicker
                            :api-class="selectApi"
                            v-model="cascaderPicker"
                            :min-lv="1"
                            :p-id="2"
                            filterable
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        prop="checkGroup"
                        label="路由选择器"
                    >
                        <router-picker
                            class="w-100per"
                            v-model="routerPicker"
                            filterable
                        />
                    </el-form-item>
                    <el-form-item
                        prop="checkGroup"
                        label="1248 type"
                    >
                        <checkbox-group-andOr
                            type="goodsType"
                            v-model="andOr"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="checkGroup"
                        label="1248 data"
                    >
                        <checkbox-group-andOr
                            :data="[{id:1,name:'1'},{id:2,name:'2'},{id:4,name:'4'},{id:8,name:'8'},]"
                            v-model="andOr2"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="checkGroup"
                        label="上传组件"
                    >
                        <upload
                            action="/rs/attachment/uploadShopLevel"
                            :limit="2"
                            v-model="upload"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="checkGroup"
                        label="树形选择器"
                    >
                        <TreePicker
                            remote="/sp/shopGoodsCat/selectAll"
                            v-model="TreePicker"/>
                    </el-form-item>
                    <el-form-item
                        prop="LatLng"
                        label="坐标选择器"
                    >
                        <LatLngPicker v-model="LatLng"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <ImageList
            data=",,,,,,,,"
            :item-width="50"
        />
    </page>
</template>

<script>
import ElSelectDropdown from 'element-ui/packages/select/src/select-dropdown';

export default {
    name: 'FormDemo',
    components: { ElSelectDropdown },
    data() {
        return {
            selectApi: this.$api.Rs.Region,
            formModel: {
                checkGroup: [],
            },
            formRules: {},
            routerPicker: '',
            cascaderPicker: '',
            andOr: 3,
            andOr2: 15,
            upload: [{ address: '', name: 'eb8e621d01f74430a6f67fccec99a7cf.jpg' }],
            select: '',
            TreePicker: [4, 6],
            LatLng: '118.5966961177465,24.899687712576643',
        };
    },
    mounted() {
        setTimeout(() => {
            //TODO　级联选择器 异步数据初始化问题
            this.cascaderPicker = '275';
        }, 10);
    },
};
</script>

<style lang="scss">
</style>
