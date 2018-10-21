<!-- Created by henian.xu on 2018/7/31. -->

<template>
    <page>
        <RemoteSelect
            remote="/gd/prop/selectByPage"
            placeholder="请输入"
            :props="{id:'id',name:'propName'}"
            :exclude="[111,110,109,71,36]"
            allow-create
            :allow-create-method="onAllowCreateMethod"
            v-model="formModel.goodsType"/>
    </page>
</template>

<script>
export default {
    name: 'FormDemo',
    data() {
        return {
            formModel: { goodsType: '' },
        };
    },
    methods: {
        onAllowCreateMethod(name) {
            return this.$api.Gd.Prop.saveProp({ propName: name });
        },
    },
};
</script>

<style lang="scss">
</style>
