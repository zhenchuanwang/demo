<!-- Created by henian.xu on 2017/10/2. -->

<template>
    <div class="cube-toolbar">
        <slot/>
        <div
            class="item"
            v-for="(item) in this.data"
            :key="item.id"
        >
            <i
                v-if="item.fIcon"
                class="f-icon"
                v-html="item.fIcon"
            />
            <div
                v-else
                class="icon"
                :style="`background-image: url(${item.imgModel.length?item.imgModel[0].address:$defaultImg});`"
            />
            <div class="label">{{ item.label }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Toolbar',
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
    },
};
</script>

<style lang="scss">
.cube-toolbar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    background-color: #fff;
    // margin-bottom: $margin-big;

    > .item {
        flex: 1 1 auto;
        display: inline-block;
        text-align: center;
        padding: $padding $padding-small;
        min-width: 20%;
        > .icon {
            background-size: cover;
            background-position: center;
            /*border-radius: 50%;*/
            overflow: hidden;
            width: 50px;
            height: 50px;
            margin: 0 auto $margin auto;
        }
        > .f-icon {
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            overflow: hidden;
            width: 1rem;
            height: 1rem;
            //background-color: $color-main;
            //color: #fff;
            font-size: 180%;
        }
        > .label {
            @include text-line(1);
        }
    }

    &.small {
        > .item {
            > .f-icon {
                position: relative;
                width: 0.6rem;
                height: 0.6rem;
                /*font-size: 200%;*/
                background-color: transparent;
                color: $gray6;
                overflow: visible;
                margin: 0 auto;
                > em {
                    position: absolute;
                    top: -0.15rem;
                    right: -0.2rem;
                    color: #fff;
                    font-size: 0.2rem;
                    font-style: inherit;
                    border-radius: 1em;
                    padding: 0 0.5em;
                    min-width: 2em;
                    height: 2em;
                    line-height: 2em;
                    background-color: $color-red;

                    //color: $color-red;
                    //background-color: #fff;
                    //border: 2px solid $color-red;
                }
            }
        }
    }
}
</style>
