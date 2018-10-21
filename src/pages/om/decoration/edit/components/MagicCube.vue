<!-- Created by henian.xu on 2018/1/3. -->

<template>
    <div class="magic-cube">
        <div
            class="item"
            v-for="(item, index) in this.data"
            :style="getStyle()"
            :key="index"
        >
            <img 
                :src="item.imgModel.length?item.imgModel[0].address:$defaultImg"
                alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'MagicCube',
    data() {
        return {};
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        column: {
            type: [Number, String],
            default: 3,
        },
    },
    methods: {
        getStyle() {
            const column = +this.column || 1;
            return {
                width: `${(1 / column) * 100}%`,
            };
        },
    },
};
</script>

<style lang="scss">
.magic-cube {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    line-height: 0;

    > .item {
        display: inline-block;
        flex: 1 1 auto;
        > img {
            width: 100%;
            height: auto;
        }
    }
}
</style>
