<!-- Created by henian.xu on 2018/9/5. -->

<template>
    <page ref="page">
        <div
            class="second-header"
            slot="secondHeader">
            <el-form
                ref="saveForm"
                class="npa-b"
                size="small"
                :inline="true"
                :model="saveFormModel"
                :rules="saveFormRules"
            >
                <el-form-item
                    prop="pageName"
                    label="页面名称"
                    v-if="pageType != 2"
                >
                    <el-input v-model="saveFormModel.pageName"/>
                </el-form-item>
                <el-form-item
                    label="是否启用"
                    v-if="pageType != 1"
                >
                    <el-switch v-model="saveFormModel.isAvailable"/>
                </el-form-item>
            </el-form>
            <el-button
                size="small"
                type="primary"
                @click="onSave(false)">保存
            </el-button>
            <el-button
                size="small"
                type="success"
                @click="onSave(true)">保存并预览
            </el-button>
            <el-button
                size="small"
                @click="onRestore">还原初始状态
            </el-button>
        </div>

        <div
            class="decoration-wrap"
            slot="body">
            <MobileShell>
                <WidgetShell
                    v-for="(item,index) in componentList"
                    :key="item.id"
                    :index="index"
                    :data="item"
                    @add="onAdd"
                />
                <div
                    v-if="!componentList.length"
                    class="ta-c pa-a">
                    <el-button
                        type="primary"
                        @click="onAdd"
                    >添加组件
                    </el-button>
                </div>

                <AddComponent ref="AddComponent"/>
            </MobileShell>
            <ControlPanel class="ctrl"/>
        </div>

        <el-dialog
            title="扫一扫"
            width="300px"
            :visible.sync="QRCodeDialog.visible">
            <img
                :src="qrcodeUrl"
                width="100%">
        </el-dialog>
    </page>
</template>

<script>
import store from './store';
import MobileShell from './widget/_mobileShell';
import WidgetShell from './widget/_widgetShell';
import ControlPanel from './widget/_controlPanel';
import storeMixin from './storeMixin';
import AddComponent from './widget/_AddComponent';
import QRCode from 'qrcode';

export default {
    name: 'DecorationEdit',
    components: { MobileShell, WidgetShell, ControlPanel, AddComponent },
    mixins: [storeMixin],
    data() {
        return {
            isMounted: false,
            qrcodeUrl: '',
            saveFormModel: {
                pageName: '',
                isAvailable: false,
            },
            saveFormRules: {
                pageName: {
                    required: true,
                    message: '不可为空',
                },
            },
            QRCodeDialog: {
                visible: false,
            },
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        pageType() {
            return this.$route.query.pageType;
        },
        adPageType() {
            return this.$route.query.adPageType;
        },
    },
    methods: {
        onAdd(position) {
            this.$refs.AddComponent.open(position);
        },
        onSave(preview) {
            this.$refs.saveForm.validate().then(() => {
                this.savePageData({
                    ...this.saveFormModel,
                    // 在这里传剩余的参数如下
                    adPageType: this.adPageType,
                }).then(json => {
                    const res = json.data;
                    if (preview) {
                        console.log(res);
                        QRCode.toDataURL(
                            res.data.buyerUrl,
                            {
                                margin: 2,
                                scale: 30,
                                errorCorrectionLevel: 'H',
                            },
                            (error, url) => {
                                if (error) {
                                    throw new Error(error);
                                }
                                this.qrcodeUrl = url;
                                this.QRCodeDialog.visible = true;
                            },
                        );
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                    }
                });
            });
        },
        onRestore() {
            console.log(this.decorationJson());
            this.restoreDecorationData();
        },
    },
    created() {
        this.$store.registerModule('decoration', store);
        if (this.id) {
            this.getPageData(this.id).then(json => {
                const res = json.data.data || {};
                const decoration = res.decoration || {};
                for (let key in this.saveFormModel) {
                    if (this.saveFormModel.hasOwnProperty(key) && decoration[key] !== undefined) {
                        this.saveFormModel[key] = decoration[key];
                    }
                }
            });
        } else {
            this.setDecoration({
                id: '',
                buyerUrl: '',
                pageType: this.pageType,
                // pageContent: '[]',
                pageContent: '[{"componentType":"Page","props":{"backgroundColor":"#f8f9fa","title":"页面标题"}}]',
            });
            /*this.addComponent({
                componentType: 'Page',
                index: 0,
            });*/
        }
    },
    mounted() {
        this.isMounted = true;
    },
    beforeDestroy() {
        this.$store.unregisterModule('decoration');
    },
};
</script>

<style lang="scss">
.decoration-wrap {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    > .ctrl {
        /*position: fixed;*/
        /*right: 18px;*/
        /*width: 400px;*/
    }
}
</style>
