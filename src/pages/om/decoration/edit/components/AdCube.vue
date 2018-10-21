<!-- Created by henian.xu on 2017/10/2. -->

<template>
    <div :class="['ad-cube',{'border':border},{reverse}]">
        <div
            :class="['item',
                     {'big': data.length!==1 && data.length%2 && !(index%3)},
                     {'one': data.length === 1}]"
            v-for="(item,index) in this.data"
            :key="item.id"
        >
            <div 
                class="inner"
                :style="`background-image: url(${item.imgModel.length?item.imgModel[0].address:$defaultImg});`"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdCube',
    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        reverse: {
            type: Boolean,
            default: false,
        },
        border: {
            type: Boolean,
            default: false,
        },
        noZoom: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
.ad-cube {
    @include clearfix;
    //border-bottom: $margin-big solid $gray2;
    background-color: #fff;
    margin-bottom: $margin-big;

    > .item {
        float: left;
        display: inline-block;
        width: 50%;
        /*height: 25vw;*/

        > .inner {
            width: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 0;
            padding-top: 50%;
        }

        &.big {
            /*height: 50vw;*/
            > .inner {
                padding-top: 100%;
            }
        }
        &.one {
            width: 100%;
            > .inner {
                padding-top: 100%;
            }
        }
    }
    &.border {
        margin-left: -1px;
        margin-right: -1px;
        > .item {
            /*margin: .5px;*/
            border: 1px solid $color-border;
        }
    }
    &.reverse {
        > .item {
            float: right;
        }
    }
}
</style>
