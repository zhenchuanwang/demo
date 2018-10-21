<!-- Created by henian.xu on 2018/4/28. -->

<template>
    <div
        class="goods-item"
        :class="{'double-row':doubleRow}"
    >
        <div class="inner">
            <div
                class="img-wrap"
                :style="`background-image: url('${data.mainImageUrl||$defaultImg}');`"
            >
                <!--<div class="sold-out"
                     v-if="!data.showStock"
                ></div>-->
            </div>
            <div class="inner">
                <div class="name">{{ data.goodsName }}</div>
                <div class="desc">{{ data.goodsSubtitle }}</div>
                <div 
                    class="share-earn"
                    v-if="shareEarn"
                >每份佣金: <span class="price">{{ data.commisionPrice }}</span></div>
                <div class="ctrl">
                    <div class="price">{{ data.minPrice|price }}<span class="old">{{ data.marketPrice|price }}</span></div>
                    <div 
                        class="btn btn-main small radius all"
                        v-if="shareEarn"
                    >
                        分享赚
                    </div>
                    <div 
                        class="btn tc-main link fs-big"
                        v-else
                    ><i class="f-icon nma-a">&#xf004;</i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodsItem',
    data() {
        return {};
    },
    props: {
        data: {
            type: Object,
            default() {
                return {};
            },
        },
        doubleRow: {
            type: Boolean,
            default: false,
        },
        shareEarn: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
.goods-item {
    flex: 1 1 1%;
    min-width: 100%;
    //border: 1px solid $color-border;
    + .goods-item {
        > .inner {
            border-top: 1px solid $color-border;
        }
    }
    > .inner {
        background-color: #fff;
        padding: $padding;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;

        > .img-wrap {
            position: relative;
            background: no-repeat center;
            background-size: cover;
            flex: 0 0 auto;
            width: (280/750 * 100vw);
            height: (280/750 * 100vw);
            max-width: 140px;
            max-height: 140px;
            margin-right: $margin;
            border-radius: 5px;
            overflow: hidden;
            border: 1px solid $color-border;
        }
        > .inner {
            flex: 1 1 1%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: stretch;
            > .name {
                /*flex: 0 0 auto;*/
                @include text-line(2);
                font-size: 15px;
                line-height: 1.2;
                color: #000;
            }
            > .desc {
                @include text-line(1);
                font-size: 13px;
                color: $gray6;
            }
            > .share-earn {
                font-size: 13px;
                color: $color-main;
            }
            > .extra {
                font-size: 12px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                > span {
                    display: inline-block;
                    + span {
                        margin-left: $margin-small;
                    }
                }
            }

            > .ctrl {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                > .price {
                    font-weight: bold;
                    > .old {
                        font-weight: normal;
                    }
                }
            }
        }
    }

    /* 双排 */
    &.double-row {
        flex: 0 0 auto;
        min-width: initial;
        width: 50%;
        padding: $padding/2;

        + .goods-item {
            > .inner {
                border-top: 0;
            }
        }
        &:nth-child(odd) {
            padding-left: $padding;
        }
        &:nth-child(even) {
            padding-right: $padding;
        }
        > .inner {
            padding: 0;
            height: 100%;
            flex-direction: column;

            > .img-wrap {
                width: 100%;
                height: 0;
                padding-top: 100%;
                margin: 0;
                border: none;
                border-radius: 0;
                max-width: inherit;
                max-height: inherit;
            }

            > .inner {
                padding: $padding-small;
            }
        }
    }
}
</style>
