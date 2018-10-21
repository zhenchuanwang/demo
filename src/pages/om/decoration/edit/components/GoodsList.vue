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
    name: 'GoodsList',
    components: { GoodsItem },
    data() {
        return {};
    },
    props: {
        type: {
            type: [Number, String],
            default: '1',
        },
        orderBy: {
            type: String,
            default: 'onSaleTime,asc',
        },
        data: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    watch: {
        orderBy: {
            handler(val) {
                if (!val) return;
                const orderByArr = val.split(',');
                if (!orderByArr || !orderByArr.length) return;
                this.$api.Gd.Goods.selectByPage({
                    orderByKey: orderByArr[0],
                    orderByType: orderByArr[1],
                    pageSize: 6,
                }).then(json => {
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
};
</script>

<style lang="scss">
</style>
