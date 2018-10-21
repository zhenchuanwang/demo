<!-- Created by henian.xu on 2018/8/24. -->

<template>
    <div
        class="divider"
        :class="classes"
    >
        <span
            v-if="hasSlot"
            class="inner"
        >
            <slot>{{ label }}</slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'Divider',
    props: {
        label: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'horizontal',
            validator(value) {
                return value === 'horizontal' || value === 'vertical';
            },
        },
        orientation: {
            type: String,
            default: 'center',
            validator(value) {
                return (
                    value === 'left' ||
                    value === 'right' ||
                    value === 'center' ||
                    value === 'top' ||
                    value === 'bottom' ||
                    value === 'middle'
                );
            },
        },
        dashed: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String,
            default: '',
        },
        link: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        hasSlot() {
            return !!this.$slots.default || !!this.label;
        },
        classes() {
            return [this.type, { 'with-text': this.hasSlot }, this.orientation, this.theme];
        },
    },
};
</script>

<style lang="scss">
.divider {
    flex: 0 0 auto;
    background-color: $color-border;

    &.horizontal {
        margin: $margin 0;
        height: 1px;
        &.with-text {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: auto;
            background-color: transparent;
            > .inner {
                flex: 0 0 auto;
                padding: 0 $padding;
            }

            &:before,
            &:after {
                flex: 1 1 1%;
                content: '';
                display: block;
                height: 1px;
                background-color: $color-border;
            }

            &.left {
                &:before {
                    flex: 0 0 auto;
                    width: $margin-big;
                }
            }
            &.right {
                &:after {
                    flex: 0 0 auto;
                    width: $margin-big;
                }
            }
        }
    }
    &.vertical {
        display: inline-block;
        margin: 0 $margin;
        width: 1px;
        min-height: 100%;
        // min-height: $margin-big; // 20vh;
        vertical-align: top;
        &.with-text {
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: auto;
            background-color: transparent;

            > .inner {
                flex: 0 1 auto;
                padding: $padding-small 0;
                writing-mode: vertical-lr; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
                writing-mode: tb-lr; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
            }

            &:before,
            &:after {
                flex: 1 1 $margin-big;
                content: '';
                display: block;
                width: 1px;
                background-color: $color-border;
            }

            &.top {
                &:before {
                    flex: 0 0 auto;
                    height: $margin-big;
                }
            }
            &.bottom {
                &:after {
                    flex: 0 0 auto;
                    height: $margin-big;
                }
            }
        }
    }

    /* 主题颜色 */
    @each $key, $value in $colors {
        &.#{$key} {
            background-color: $value;
            &.with-text {
                > .inner {
                    color: $value;
                }
                &:before,
                &:after {
                    background-color: $value;
                }
            }
        }
    }
}
</style>
