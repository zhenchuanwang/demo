<!-- Created by henian.xu on 2018/7/18. -->

<template>
    <el-menu
        :default-active="activeIndex"
        class="header-menu"
        mode="horizontal"
        :collapse="isCollapse"
        @select="handleSelect"
        router
    >
        <el-menu-item
            v-for="(item) in menuData"
            :key="item.id"
            :index="`${item.id}`"
            :route="{path:item.url}"
        >{{ item.name }}
        </el-menu-item>
    </el-menu>
</template>

<script>
import mixinMenu from './mixinMenu';

export default {
    name: 'HeaderMenu',
    mixins: [mixinMenu],
    data() {
        return {};
    },
    props: {
        isCollapse: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        activeIndex: {
            get() {
                return this.headerIndex;
            },
            set(val) {
                this.setHeaderIndex(val);
            },
        },
    },
    methods: {
        handleSelect(key /*, keyPath*/) {
            this.activeIndex = key;
        },
    },
};
</script>

<style lang="scss">
.header-menu {
    flex: 1 1 1%;
    background-color: $color-main;
    border-bottom: 0;

    > .el-submenu,
    > .el-menu-item {
        background-color: $color-main;
        &,
        > .el-submenu__title {
            height: 50px;
            line-height: 50px;
            color: #fff;
            i {
                color: #fff;
            }
        }
        &:not(.is-disabled) {
            &:focus,
            &:hover {
                &,
                > .el-submenu__title {
                    color: #fff;
                    background-color: mix(#000, $color-main, 10%);
                }
            }
        }
        &.is-active {
            &,
            > .el-submenu__title {
                color: #fff;
                background-color: mix(#000, $color-main, 20%);
                border-bottom: 0;
                i {
                    color: $color-main;
                }
            }
        }
    }
}
</style>
