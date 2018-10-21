<!-- Created by henian.xu on 2018/9/5. -->
<template>
    <div
        v-if="+type===1 && data && data.length"
        class="ad-swiper">
        <div 
            class="item">
            <img 
                :src="data[0].imgModel.length?data[0].imgModel[0].address:$defaultImg"
                :alt="data[0].label">
        </div>
        <div class="pagination">
            <div
                :class="['dot',{'active':index===0}]"
                v-for="(item,index) in data"
                :key="index"/>
        </div>
    </div>
    <div 
        v-else-if="+type===2 && data && data.length"
        class="ad-list">
        <div
            v-for="(item,index) in data"
            :key="index"
            class="item"
            :style="`margin: ${margin / 2}px 0;`">
            <img
                :src="item.imgModel.length?item.imgModel[0].address:$defaultImg"
                :alt="item.label">
        </div>
    </div>
    <div 
        v-else 
        class="ad-list">
        <div class="item">
            <img :src="$defaultImg">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Ad',
    data() {
        return {};
    },
    props: {
        type: {
            type: [Number, String],
            required: true,
        },
        margin: {
            type: [Number, String],
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.ad-swiper {
    position: relative;
    > .pagination {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;

        > .dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 100%;
            background-color: $color-main;
            margin: 0 $margin-small;
            opacity: 0.5;
            &.active {
                opacity: 1;
            }
        }
    }
}
.ad-swiper,
.ad-list {
    margin: $margin 0;
    > .item {
        display: block;
        line-height: 0;
        > img {
            width: 100%;
            max-width: 100%;
            height: auto;
            line-height: 1.2;
        }
    }
}
</style>
