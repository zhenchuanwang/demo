<!-- Created by henian.xu on 2018/9/7. -->

<template>
    <el-dialog
        title="选择组件"
        center
        width="400px"
        :visible.sync="dialog.visible"
    >
        <!--primary-->
        <el-button-group>
            <el-button 
                class="w-100per" 
                @click="onAddComponent('Divider')">分割线</el-button>
            <el-button 
                class="w-100per ma-t" 
                @click="onAddComponent('Toolbar')">工具栏</el-button>
            <el-button 
                class="w-100per ma-t" 
                @click="onAddComponent('Goods')">商品</el-button>
            <el-button 
                class="w-100per ma-t" 
                @click="onAddComponent('GoodsList')">商品列表</el-button>
            <el-button 
                class="w-100per ma-t" 
                @click="onAddComponent('Ad')">广告位</el-button>
            <el-button 
                class="w-100per ma-t" 
                @click="onAddComponent('AdCube')">广告(厨窗)</el-button>
            <el-button 
                class="w-100per ma-t" 
                @click="onAddComponent('MagicCube')">广告(魔方)</el-button>
        </el-button-group>
    </el-dialog>
</template>

<script>
import storeMixin from '../storeMixin';
export default {
    name: 'AddComponent',
    mixins: [storeMixin],
    data() {
        return {
            dialog: {
                visible: false,
            },
            position: 'bottom',
        };
    },
    methods: {
        onAddComponent(componentType) {
            console.log(componentType, this.position);
            let index = (this.currentComponent || {}).__index;
            if (this.position === 'bottom') {
                index++;
            }
            this.addComponent({
                componentType,
                position: this.position,
                index,
            });
            this.close();
        },
        open(position) {
            this.position = position;
            this.dialog.visible = true;
        },
        close() {
            this.dialog.visible = false;
        },
    },
};
</script>

<style lang="scss">
</style>
