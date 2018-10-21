<!-- Created by henian.xu on 2018/9/5. -->

<template>
    <div 
        class="control-panel"
        v-if="isShow"
        :style="`margin-top: ${controlOffsetTop}px;`"
    >
        <div class="header">
            <div class="inner">
                <div class="label">组件属性编辑器</div>
            </div>
        </div>
        <div class="body">
            <el-form
                size="mini"
                label-position="right"
                label-width="6em"
            >
                <el-form-item
                    v-if="hasComponentMargin"
                    label="组件间距: ">
                    <el-input-number
                        controls-position="right"
                        v-model.number="formModel.componentMargin"/>
                </el-form-item>
                <!-- page form -->
                <template v-if="componentType === 'Page'">
                    <el-form-item
                        label="页面标题: ">
                        <el-input
                            v-model="formModel.props.title"/>
                    </el-form-item>
                    <el-form-item
                        label="背景颜色: ">
                        <el-color-picker
                            v-model="formModel.props.backgroundColor"/>
                    </el-form-item>
                </template>
                <template v-if="componentType === 'Divider'">
                    <el-form-item
                        label="标题名称: ">
                        <el-input
                            v-model="formModel.props.label"/>
                    </el-form-item>
                </template>

                <!-- Ad form -->
                <template v-if="componentType === 'Ad'">
                    <el-form-item
                        label="类型: ">
                        <el-radio-group v-model="formModel.props.type">
                            <el-radio label="1">轮播</el-radio>
                            <el-radio label="2">列表</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        v-if="+formModel.props.type === 2"
                        label="间距: ">
                        <el-input-number
                            controls-position="right"
                            v-model.number="formModel.props.margin"/>
                    </el-form-item>
                    <el-form-item
                        v-if="+formModel.props.type === 1"
                        label="延迟: ">
                        <el-input-number
                            controls-position="right"
                            :min="3000"
                            :step="1000"
                            v-model.number="formModel.props.delay"/> 毫秒
                    </el-form-item>
                </template>
                <template v-if="componentType === 'AdCube'">
                    <el-form-item
                        label="是否镜像: ">
                        <el-switch v-model="formModel.props.reverse"/>
                    </el-form-item>
                    <el-form-item
                        label="是否边框: ">
                        <el-switch v-model="formModel.props.border"/>
                    </el-form-item>
                </template>
                <template v-if="componentType === 'MagicCube' || componentType === 'Toolbar'">
                    <el-form-item
                        v-if="hasComponentMargin"
                        label="列数: ">
                        <el-input-number
                            controls-position="right"
                            v-model.number="formModel.props.column"/>
                    </el-form-item>
                </template>
                <template v-if="componentType === 'Toolbar'">
                    <el-form-item
                        label="网络线: ">
                        <el-switch v-model="formModel.props.gridLine"/>
                    </el-form-item>
                </template>
                <template v-if="isFormImgList">
                    <div class="form-img-list">
                        <div
                            v-for="(item,index) in formModel.props.data"
                            :key="item.id"
                            class="item">
                            <div class="body">
                                <upload
                                    action="/rs/attachment/uploadShopDecoration"
                                    :limit="1"
                                    tips=""
                                    v-model="item.imgModel"
                                />
                                <div class="inner">
                                    <el-form-item
                                        label-width="3em"
                                        label="名称">
                                        <el-input v-model="item.label"/>
                                    </el-form-item>
                                    <el-form-item
                                        label-width="3em"
                                        label="链接">
                                        <el-input v-model="item.href"/>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="footer">
                                <el-button
                                    v-if="index>0"
                                    size="mini"
                                    type="warning"
                                    icon="el-icon-arrow-up"
                                    @click="onImgMoveUp(formModel.props.data,index)"
                                >上移</el-button>
                                <el-button
                                    v-if="index<formModel.props.data.length-1"
                                    size="mini"
                                    type="success"
                                    icon="el-icon-arrow-down"
                                    @click="onImgMoveDown(formModel.props.data,index)"
                                >下移</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="onImgDelete(formModel.props.data,index)"
                                >删除</el-button>
                            </div>
                        </div>
                        <el-button
                            v-if="hasFormImgListAddBtn"
                            class="ma-t w-100per"
                            icon="el-icon-plus"
                            @click="onImgAdd(formModel.props.data)"
                        >添加图片</el-button>
                    </div>
                </template>
                <template v-if="componentType==='Goods'">
                    <el-form-item
                        label="类型: ">
                        <el-radio-group v-model="formModel.props.type">
                            <el-radio label="2">列表</el-radio>
                            <el-radio label="1">小图(两列)</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="form-goods-list">
                        <div 
                            class="item"
                            v-for="(item,index) in formModel.props.data"
                            :key="item.id">
                            <div
                                class="inner" 
                                :style="`background-image: url('${item.mainImageUrl}');`"/>

                            <div class="footer">
                                <el-button
                                    v-if="index>0"
                                    size="mini"
                                    type="warning"
                                    icon="el-icon-arrow-left"
                                    @click="onImgMoveUp(formModel.props.data,index)"
                                ><!--上移--></el-button>
                                <el-button
                                    v-if="index<formModel.props.data.length-1"
                                    size="mini"
                                    type="success"
                                    icon="el-icon-arrow-right"
                                    @click="onImgMoveDown(formModel.props.data,index)"
                                ><!--下移--></el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="onImgDelete(formModel.props.data,index)"
                                ><!--删除--></el-button>
                            </div>
                        </div>
                        <div 
                            class="add-item" 
                            @click="onGoodsAdd"><i class="el-icon-plus"/></div>
                    </div>
                    <GoodsPicker
                        ref="GoodsPicker"
                        v-model="formModel.props.ids"
                    />
                </template>
                <template v-if="componentType === 'GoodsList'">
                    <el-form-item
                        label="类型: ">
                        <el-radio-group v-model="formModel.props.type">
                            <el-radio label="2">列表</el-radio>
                            <el-radio label="1">小图(两列)</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="筛选类型: ">
                        <el-select v-model="formModel.props.orderBy">
                            <el-option 
                                value="onSaleTime,asc" 
                                label="上架时间-升序"/>
                            <el-option 
                                value="onSaleTime,desc" 
                                label="上架时间-降序"/>
                            <el-option 
                                value="price,asc" 
                                label="价格-升序"/>
                            <el-option 
                                value="price,desc" 
                                label="价格-降序"/>
                        </el-select>
                    </el-form-item>
                </template>
            </el-form>
            <!--<slot/>-->
            <!--<pre class="json-preview">{{ currentComponent }}</pre>-->
        </div>
    </div>
</template>

<script>
import storeMixin from '../storeMixin';
import GoodsPicker from './_goodsPicker';

export default {
    name: 'ControlPanel',
    mixins: [storeMixin],
    components: { GoodsPicker },
    computed: {
        formModel() {
            return this.currentComponent || { props: {} };
        },
        componentType() {
            return (this.currentComponent || {}).componentType;
        },
        hasComponentMargin() {
            return !isNaN(this.formModel.componentMargin);
        },
        isShow() {
            if (!this.currentComponent) return false;
            return this.controlOffsetTop !== null;
        },
        // 判断组件
        isFormImgList() {
            const { componentType } = this;
            return (
                componentType === 'Ad' ||
                componentType === 'Toolbar' ||
                componentType === 'AdCube' ||
                componentType === 'MagicCube'
            );
        },
        hasFormImgListAddBtn() {
            const { componentType, isFormImgList, formModel } = this;
            if (!isFormImgList) return false;
            if (componentType === 'AdCube' && formModel.props.data.length > 2) {
                return false;
            }
            return true;
        },
    },
    methods: {
        // 图片组件的事件
        onImgMoveUp(list, index) {
            const item = list.splice(index, 1);
            list.splice(index - 1, 0, ...item);
        },
        onImgMoveDown(list, index) {
            const item = list.splice(index, 1);
            list.splice(index + 1, 0, ...item);
        },
        onImgDelete(list, index) {
            list.splice(index, 1);
        },
        onImgAdd(list) {
            list.push({
                id: this.$utils.Comm.getKey(),
                imgModel: [],
                src: '',
                href: '',
                alt: '',
            });
        },
        onGoodsAdd() {
            const { GoodsPicker } = this.$refs;
            GoodsPicker.open();
        },
    },
};
</script>

<style lang="scss">
.control-panel {
    position: relative;
    border-radius: $padding;
    border-left: 1px solid $color-border;
    margin-left: $margin;
    box-shadow: 0 0 16px -8px #000;
    background-color: #fff;
    &:before {
        content: '';
        position: absolute;
        right: 100%;
        top: 10px;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-right: 10px solid #fff;
        border-bottom: 10px solid transparent;
    }

    > .header {
        padding: 0 $padding;
        font-weight: bold;
        cursor: pointer;
        > .inner {
            border-bottom: 1px solid $color-border;
            padding: $padding 0;
        }
    }
    > .body {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
        padding: $padding;
        > form {
            width: 500px;
        }
        > .json-preview {
            width: 500px;
            overflow: auto;
            max-height: 600px;
            background-color: #343a40;
            color: #adb5bd;
            margin-left: 10px;
        }
    }
}

.form-img-list {
    background-color: $gray4;
    padding: $padding;
    border-radius: $padding-small;
    > .item {
        border-radius: $padding-small;
        padding: $padding;
        background-color: #fff;
        + .item {
            margin-top: $margin;
        }
        > .body {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            > .upload-wrap {
                flex: 0 0 auto;
            }
            > .inner {
                flex: 1 1 1%;
            }
        }
        > .footer {
            margin-top: $margin-small;
        }
    }
}

.form-goods-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    > .item {
        width: 120px;
        margin: $margin-small;
        > .inner {
            width: 100%;
            height: 0;
            padding-top: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            border: 1px solid $color-border;
        }

        > .footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: $margin-small;
            > .el-button {
                flex: 0 0 30%;
                padding: 2px 2px;
                + .el-button {
                    margin-left: 0;
                }
            }
        }
    }
    > .add-item {
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        margin: $margin-small;
        border: 1px solid $color-border;
        font-size: 40px;
        color: $gray5;
        cursor: pointer;
    }
}
</style>
