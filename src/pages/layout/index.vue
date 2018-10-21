<!-- Created by henian.xu on 2018/7/18. -->

<template>
    <el-container
        class="layout-main"
    >
        <el-aside
            :class="['aside',{'extend':!isCollapse}]"
            width="null"
        >
            <el-header
                v-if="!isCollapse"
                class="header"
                height="null"
            >管理平台
            </el-header>
            <div
                v-else
                class="collapse-aside el-icon-d-arrow-right"
                @click="(isCollapse = !isCollapse)" />
            <aside-main :collapse="isCollapse"/>
        </el-aside>
        <el-container
            class="container"
        >
            <el-header
                class="header"
                height="null"
            >
                <div
                    v-if="!isCollapse"
                    class="collapse-aside el-icon-d-arrow-left"
                    @click="(isCollapse = !isCollapse)" />
                <header-menu/>
                <user-menu/>
            </el-header>
            <!-- page -->
            <router-view/>
            <el-footer
                class="footer"
                height="null"
            >Footer
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
import headerMenu from './_headerMenu';
import asideMain from './_asideMain';
import userMenu from './_userMenu';
import mixinMenu from './mixinMenu';

export default {
    name: 'LayoutMain',
    mixins: [mixinMenu],
    components: {
        headerMenu,
        asideMain,
        userMenu,
    },
    data() {
        return {
            isCollapse: false,
        };
    },
    watch: {
        '$route.path': {
            handler(val) {
                this.updateRoute(val);
            },
            immediate: true,
        },
    },
    methods: {
        // 根据 url 回选菜单
        updateRoute() {
            const { path, meta } = this.$route;
            if (this.stateData == null) {
                // 等待菜单数据初始化完毕
                const timerId = setTimeout(() => {
                    this.updateRoute();
                    clearTimeout(timerId);
                }, 100);
                return;
            }
            const { parentUrl } = meta;
            const menu = this.menuUrlMap[path] || this.menuUrlMap[parentUrl];
            if (!menu) {
                console.error(`页面不存在, url: ${path}`);
                return;
            }
            if (this.headerIndex !== menu.rootId + '') {
                this.setHeaderIndex(menu.rootId + '');
            }
            if (this.asideIndex !== menu.id + '') {
                this.setAsideIndex(menu.id + '');
            }
        },
    },
    created() {
        // this.getMenuData();
    },
};
</script>

<style lang="scss">
.layout-main {
    > .aside {
        &.extend {
            width: 200px;
        }
        background-color: $gray8;
        > .header {
            height: 50px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background-color: $color-main;
            color: #fff;
            font-size: 26px;
            letter-spacing: 8px;
            font-weight: bold;
        }
    }
    > .container {
        > .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: stretch;
            height: 50px;
            padding: 0;
            background-color: $color-main;
        }
        > .page {
            background-color: $gray2;
        }
        > .footer {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            text-align: center;
            background-color: $gray3;
            color: $gray6;
        }
    }
}

.collapse-aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: $padding;
    font-size: 120%;
    min-height: 50px;
    &.is-collapse {
        background-color: mix(#000, $color-main, 10%);
    }
}
</style>
