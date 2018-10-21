<!-- Created by henian.xu on 2018/9/7. -->

<template>
    <div class="goods-list">
        <GoodsItem
            v-for="item in data"
            :key="item.id"
            :data="item"
            :double-row="+type===1"
        />
    </div>
</template>

<script>
import GoodsItem from './_goodsItem';

export default {
    name: 'Goods',
    components: { GoodsItem },
    data() {
        return {};
    },
    props: {
        type: {
            type: [Number, String],
            default: '1',
        },
        ids: {
            type: Array,
            default() {
                return [];
            },
        },
        data: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    watch: {
        ids: {
            handler(val) {
                if (!val || !val.length) return;
                this.$api.Gd.Goods.selectByPage({ ids: val.join(',') }).then(json => {
                    const res = json.data;
                    this.data.splice(0, this.data.length);
                    res.data.forEach(item => {
                        this.data.push(item);
                    });
                });
            },
            immediate: true,
        },
    },
    created() {},
};
</script>

<style lang="scss">
.goods-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
}
</style>
