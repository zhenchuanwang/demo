<!-- Created by henian.xu on 2018/7/18. -->

<!--<template>
    <el-menu
        default-active="2"
        class="aside-menu"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
            </template>
            <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
    </el-menu>
</template>-->

<script>
import mixinMenu from './mixinMenu';

export default {
    name: 'HeaderMenu',
    mixins: [mixinMenu],
    data() {
        return {};
    },
    props: {
        collapse: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        activeIndex: {
            get() {
                return this.asideIndex;
            },
            set(val) {
                this.setAsideIndex(val);
            },
        },
    },
    methods: {
        // handleOpen(key, keyPath) {},
        // handleClose(key, keyPath) {},
        handleSelect(key /*, keyPath*/) {
            this.activeIndex = key;
        },
    },
    render() {
        const buildMenu = arr => {
            return arr.map(item => {
                if (Array.isArray(item.children)) {
                    return (
                        <el-submenu index={`${item.id}`} key={item.id}>
                            <template slot="title">
                                <i class="el-icon-menu" />
                                <span>{item.name}</span>
                            </template>
                            {buildMenu(item.children)}
                        </el-submenu>
                    );
                } else {
                    return (
                        <el-menu-item index={`${item.id}`} route={{ path: item.url }} key={item.id}>
                            <i class="el-icon-document" />
                            <span slot="title">{item.name}</span>
                        </el-menu-item>
                    );
                }
            });
        };

        return (
            <el-menu
                default-active={this.activeIndex}
                class="aside-menu"
                on-select={this.handleSelect}
                router
                collapse={this.collapse}
            >
                {buildMenu(this.asideData)}
            </el-menu>
        );
    },
};
</script>

<style lang="scss">
.aside-menu {
    background-color: $gray8;
    border-right: 0;

    .el-menu {
        background-color: $gray8;
    }

    .el-menu-item {
        color: #fff;
        &:focus,
        &:hover {
            background-color: mix(#000, $gray8, 10%);
            border-bottom: 0;
        }
        &.is-active {
            color: $color-main;
            background-color: mix(#000, $gray8, 20%);
            border-bottom: 0;
        }
    }

    .el-submenu {
        &.is-active {
            > .el-submenu__title {
                color: $color-main;
                i {
                    color: $color-main;
                }
            }
        }
    }

    .el-submenu__title {
        &,
        i {
            color: #fff;
        }
        &:not(.is-disabled):hover {
            background-color: mix(#000, $gray8, 10%);
        }
    }
}
</style>
