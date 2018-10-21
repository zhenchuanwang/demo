import Vue from 'vue';
import Router from 'vue-router';
// import BuildRouter from './build';
import { ROUTER_DEFAULT_CONFIG } from '@/config';
import { routerBeforeEach, routerAfterEach } from '@/interceptors/router';
import LayoutTpl from '@/pages/layout';

Vue.use(Router);

// BuildRouter.addDir(require.context(
//     // 找到 pages 文件夹下 .vue|.js 的文件
//     '@/pages', true, /\.(vue|js)$/));

// 复用页面
const rsSetUser = () => import(/* webpackChunkName: "rs-set" */ '@/pages/rs/set/user.vue');
const rsSetRole = () => import(/* webpackChunkName: "rs-set" */ '@/pages/rs/set/role.vue');
const rsSetOrg = () => import(/* webpackChunkName: "rs-set" */ '@/pages/rs/set/org.vue');

const pfspSpmgShopPaymentConfig = () =>
    import(/* webpackChunkName: "pfsp-spmg" */ '@/pages/pfsp/spmg/shopPaymentConfig.vue');

const shopStoreStoremgShopStoreEdit = () =>
    import(/* webpackChunkName: "shopStore-storemg" */ '@/pages/shopStore/storemg/shopStoreEdit.vue');
const shopStoreStoremgShopStoreServiceTime = () =>
    import(/* webpackChunkName: "shopStore-storemg" */ '@/pages/shopStore/storemg/shopStoreServiceTime.vue');
const shopStoreStoremgShopStoreFreight = () =>
    import(/* webpackChunkName: "shopStore-storemg" */ '@/pages/shopStore/storemg/shopStoreFreight.vue');
const orderOrderOrderDetail = () => import(/* webpackChunkName: "order-order" */ '@/pages/order/order/orderDetail.vue');

const routerInstance = new Router({
    ...ROUTER_DEFAULT_CONFIG,
    routes: [
        {
            path: '/',
            // redirect: '/index',
            component: LayoutTpl,
            children: [
                {
                    path: '/',
                    name: 'index',
                    component: () => import('@/pages/index.vue'),
                    meta: {
                        title: '首页',
                    },
                },
                // Demo
                ...[
                    // 组件示例
                    ...[
                        {
                            path: '/demo/component/form',
                            name: 'demo-component-form',
                            component: () =>
                                import(/* webpackChunkName: "demo-component" */ '@/pages/demo/component/form.vue'),
                            meta: {
                                title: '表单示例',
                            },
                        },
                        {
                            path: '/demo/component/treeTransfer',
                            name: 'demo-component-treeTransfer',
                            component: () =>
                                import(/* webpackChunkName: "demo-component" */ '@/pages/demo/component/treeTransfer.vue'),
                            meta: {
                                title: '树形穿梭框',
                            },
                        },
                        {
                            path: '/demo/component/ECharts',
                            name: 'demo-component-ECharts',
                            component: () =>
                                import(/* webpackChunkName: "demo-component" */ '@/pages/demo/component/ECharts.vue'),
                            meta: {
                                title: '数据可视化ECharts',
                            },
                        },
                        {
                            path: '/demo/component/remoteSelect',
                            name: 'demo-component-remoteSelect',
                            component: () =>
                                import(/* webpackChunkName: "demo-component" */ '@/pages/demo/component/remoteSelect.vue'),
                            meta: {
                                title: '远程选择器组件开发',
                                parentUrl: '/demo/component/form',
                            },
                        },
                        {
                            path: '/demo/component/richText',
                            name: 'demo-component-richText',
                            component: () =>
                                import(/* webpackChunkName: "demo-component" */ '@/pages/demo/component/richText.vue'),
                            meta: {
                                title: '富文本组件Tinymce',
                            },
                        },
                        {
                            path: '/demo/component/baiduMap',
                            name: 'demo-component-baiduMap',
                            component: () =>
                                import(/* webpackChunkName: "demo-component" */ '@/pages/demo/component/BaiduMap.vue'),
                            meta: {
                                title: '百度地图示例',
                            },
                        },
                    ],
                ],
                // ---平台路由
                ...[
                    // 系统管理
                    ...[
                        // 系统设置
                        ...[
                            {
                                path: '/rs/set/org',
                                name: 'rs-set-org',
                                component: rsSetOrg,
                                meta: {
                                    title: '部门管理',
                                },
                            },
                            {
                                path: '/rs/set/role',
                                name: 'rs-set-role',
                                component: rsSetRole,
                                meta: {
                                    title: '角色管理',
                                },
                            },
                            {
                                path: '/rs/set/variable',
                                name: 'rs-set-variable',
                                component: () => import(/* webpackChunkName: "rs-set" */ '@/pages/rs/set/variable.vue'),
                                meta: {
                                    title: '系统变量',
                                },
                            },
                            {
                                path: '/rs/set/region',
                                name: 'rs-set-region',
                                component: () => import(/* webpackChunkName: "rs-set" */ '@/pages/rs/set/region.vue'),
                                meta: {
                                    title: '区域管理',
                                },
                            },
                            {
                                path: '/rs/set/menu',
                                name: 'rs-set-menu',
                                component: () => import(/* webpackChunkName: "rs-set" */ '@/pages/rs/set/menu.vue'),
                                meta: {
                                    title: '菜单管理',
                                },
                            },
                            {
                                path: '/rs/set/user',
                                name: 'rs-set-user',
                                component: rsSetUser,
                                meta: {
                                    title: '用户管理',
                                },
                            },
                            {
                                path: '/rs/set/app',
                                name: 'rs-set-app',
                                component: () => import(/* webpackChunkName: "rs-set" */ '@/pages/rs/set/app.vue'),
                                meta: {
                                    title: '应用管理',
                                },
                            },
                            {
                                path: '/rs/set/dic',
                                name: 'rs-set-dic',
                                component: () => import(/* webpackChunkName: "rs-set" */ '@/pages/rs/set/dic.vue'),
                                meta: {
                                    title: '字典管理',
                                },
                            },
                            {
                                path: '/rs/set/express',
                                name: 'rs-set-express',
                                component: () => import(/* webpackChunkName: "rs-set" */ '@/pages/rs/set/express.vue'),
                                meta: {
                                    title: '快递公司管理',
                                },
                            },
                        ],
                    ],
                    // 店铺管理
                    ...[
                        // 店铺管理
                        ...[
                            {
                                path: '/pfsp/spmg/shopLevel',
                                name: 'pfsp-spmg-shopLevel',
                                component: () =>
                                    import(/* webpackChunkName: "pfsp-spmg" */ '@/pages/pfsp/spmg/shopLevel.vue'),
                                meta: {
                                    title: '店铺等级管理',
                                },
                            },
                            {
                                path: '/pfsp/spmg/shop',
                                name: 'pfsp-spmg-shop',
                                component: () =>
                                    import(/* webpackChunkName: "pfsp-spmg" */ '@/pages/pfsp/spmg/shop.vue'),
                                meta: {
                                    title: '店铺管理',
                                },
                            },
                            {
                                path: '/pfsp/spmg/shop/edit/:id?',
                                name: 'pfsp-spmg-shop-edit',
                                component: () =>
                                    import(/* webpackChunkName: "pfsp-spmg" */ '@/pages/pfsp/spmg/shopEdit.vue'),
                                meta: {
                                    title: '店铺管理',
                                    parentUrl: '/pfsp/spmg/shop',
                                },
                            },
                            {
                                path: '/pfsp/spmg/shop/shopBuyerAuthSet/:id',
                                name: 'pfsp-spmg-shop-shopBuyerAuthSet',
                                component: () =>
                                    import(/* webpackChunkName: "pfsp-spmg" */ '@/pages/pfsp/spmg/shopBuyerAuthSet.vue'),
                                meta: {
                                    title: '会员认证设置',
                                    parentUrl: '/pfsp/spmg/shop',
                                },
                            },
                            {
                                path: '/pfsp/spmg/shop/shopPaymentConfig/:id',
                                name: 'pfsp-spmg-shop-shopPaymentConfig',
                                component: pfspSpmgShopPaymentConfig,
                                meta: {
                                    title: '支付设置',
                                    parentUrl: '/pfsp/spmg/shop',
                                },
                            },
                        ],
                    ],
                    // 平台运营
                    ...[
                        // 平台设置
                        ...[
                            {
                                path: '/pfom/set/wxmsgTemplate',
                                name: 'pfom-set-wxmsgTemplate',
                                component: () =>
                                    import(/* webpackChunkName: "pfom-set" */ '@/pages/pfom/set/wxmsgTemplate'),
                                meta: {
                                    title: '微信消息模板',
                                },
                            },
                            {
                                path: '/pfom/set/smsTemplate',
                                name: 'pfom-set-smsTemplate',
                                component: () =>
                                    import(/* webpackChunkName: "pfom-set" */ '@/pages/pfom/set/smsTemplate'),
                                meta: {
                                    title: '短信模板',
                                },
                            },
                            {
                                path: '/pfom/set/smsAccount',
                                name: 'pfom-set-smsAccount',
                                component: () =>
                                    import(/* webpackChunkName: "pfom-set" */ '@/pages/pfom/set/smsAccount'),
                                meta: {
                                    title: '短信设置',
                                },
                            },
                        ],
                    ],
                ],
                // ---商家路由
                ...[
                    // 店铺管理
                    ...[
                        // 权限管理
                        ...[
                            {
                                path: '/sp/set/org',
                                name: 'sp-set-org',
                                component: rsSetOrg,
                                meta: {
                                    title: '部门管理',
                                },
                            },
                            {
                                path: '/sp/set/role',
                                name: 'sp-set-role',
                                component: rsSetRole,
                                meta: {
                                    title: '角色管理',
                                },
                            },
                            {
                                path: '/sp/set/user', // 复用 rs-set-user .vue
                                name: 'sp-set-user',
                                component: rsSetUser,
                                meta: {
                                    title: '用户管理',
                                },
                            },
                        ],
                        // 供应商管理
                        ...[
                            {
                                path: '/sp/supplier/supplier',
                                name: 'sp-supplier-supplier',
                                component: () =>
                                    import(/* webpackChunkName: "sp-supplier" */ '@/pages/sp/supplier/supplier.vue'),
                                meta: {
                                    title: '供应商管理',
                                },
                            },
                            {
                                path: '/sp/supplier/supplier/goodsSaleStat',
                                name: 'sp-supplier-goodsSaleStat',
                                component: () =>
                                    import(/* webpackChunkName: "sp-supplier" */ '@/pages/stat/goodsStat/goodsSaleStat.vue'),
                                meta: {
                                    title: '供应商销量统计',
                                    parentUrl: '/sp/supplier/supplier',
                                },
                            },
                        ],
                        // 店铺管理
                        ...[
                            {
                                path: '/sp/spmg/shopInfo',
                                name: 'sp-spmg-shopInfo',
                                component: () =>
                                    import(/* webpackChunkName: "sp-spmg" */ '@/pages/sp/spmg/shopInfo.vue'),
                                meta: {
                                    title: '店铺信息',
                                },
                            },
                            {
                                path: '/sp/spmg/shopPaymentConfig',
                                name: 'sp-spmg-shopPaymentConfig',
                                component: pfspSpmgShopPaymentConfig,
                                meta: {
                                    title: '支付设置',
                                },
                            },
                            {
                                path: '/sp/spmg/shopFreightTemplate',
                                name: 'sp-spmg-shopFreightTemplate',
                                component: () =>
                                    import(/* webpackChunkName: "sp-spmg" */ '@/pages/sp/spmg/shopFreightTemplate.vue'),
                                meta: {
                                    title: '运费模板管理',
                                },
                            },
                            {
                                path: '/sp/spmg/shopFreightTemplate/edit/:id?',
                                name: 'sp-spmg-shopFreightTemplateEdit',
                                component: () =>
                                    import(/* webpackChunkName: "sp-spmg" */ '@/pages/sp/spmg/shopFreightTemplateEdit.vue'),
                                meta: {
                                    title: '运费模板管理',
                                    parentUrl: '/sp/spmg/shopFreightTemplate',
                                },
                            },
                            {
                                path: '/sp/spmg/shopFixedFreight',
                                name: 'sp-spmg-shopFixedFreight',
                                component: () =>
                                    import(/* webpackChunkName: "sp-spmg" */ '@/pages/sp/spmg/shopFixedFreight.vue'),
                                meta: {
                                    title: '固定运费管理',
                                },
                            },
                            {
                                path: '/sp/spmg/shopExpress',
                                name: 'sp-spmg-shopExpress',
                                component: () =>
                                    import(/* webpackChunkName: "sp-spmg" */ '@/pages/sp/spmg/shopExpress.vue'),
                                meta: {
                                    title: '快递公司管理',
                                },
                            },
                        ],
                        // CMS管理
                        ...[
                            // CMS分类
                            ...[
                                {
                                    path: '/pt/cms/cmsCatalog',
                                    name: 'pt-cms-cmsCatalog',
                                    component: () =>
                                        import(/* webpackChunkName: "pt-cms" */ '@/pages/pt/cms/cmsCatalog'),
                                    meta: {
                                        title: 'CMS分类',
                                    },
                                },
                            ],
                            // CMS文章
                            ...[
                                {
                                    path: '/pt/cms/cmsArticle',
                                    name: 'pt-cms-cmsArticle',
                                    component: () =>
                                        import(/* webpackChunkName: "pt-cms" */ '@/pages/pt/cms/cmsArticle'),
                                    meta: {
                                        title: 'CMS文章',
                                    },
                                },
                                {
                                    path: '/pt/cms/cmsArticle/edit/:id?',
                                    name: 'pt-cms-cmsArticle-edit',
                                    component: () =>
                                        import(/* webpackChunkName: "pt-cms" */ '@/pages/pt/cms/cmsArticleEdit.vue'),
                                    meta: {
                                        title: 'CMS文章',
                                        parentUrl: '/pt/cms/cmsArticle',
                                    },
                                },
                            ],
                        ],
                    ],
                    // 门店管理
                    ...[
                        // 门店管理
                        ...[
                            {
                                path: '/shopStore/storemg/shopStore',
                                name: 'shopStore-storemg-shopStore',
                                component: () =>
                                    import(/* webpackChunkName: "shopStore-storemg" */ '@/pages/shopStore/storemg/shopStore.vue'),
                                meta: {
                                    title: '门店管理',
                                },
                            },
                            {
                                path: '/shopStore/storemg/shopStore/edit/:id?',
                                name: 'shopStore-storemg-shopStoreEdit',
                                component: shopStoreStoremgShopStoreEdit,
                                meta: {
                                    title: '门店管理',
                                    parentUrl: '/shopStore/storemg/shopStore',
                                },
                            },
                            {
                                path: '/shopStore/storemg/shopStore/shopStoreServiceTime/:id',
                                name: 'shopStore-storemg-shopStoreServiceTime',
                                component: shopStoreStoremgShopStoreServiceTime,
                                meta: {
                                    title: '服务时间设置',
                                    parentUrl: '/shopStore/storemg/shopStore',
                                },
                            },
                            {
                                path: '/shopStore/storemg/shopStore/shopStoreFreight/:id',
                                name: 'shopStore-storemg-shopStoreFreight',
                                component: shopStoreStoremgShopStoreFreight,
                                meta: {
                                    title: '运费设置',
                                    parentUrl: '/shopStore/storemg/shopStore',
                                },
                            },
                        ],
                    ],
                    // 商品管理
                    ...[
                        // 商品管理
                        ...[
                            {
                                path: '/gd/goods/goods',
                                name: 'gd-goods-goods',
                                component: () =>
                                    import(/* webpackChunkName: "gd-goods" */ '@/pages/gd/goods/goods.vue'),
                                meta: {
                                    title: '商品管理',
                                },
                            },
                            {
                                path: '/gd/goods/addGoods/:goodsId?',
                                name: 'gd-goods-addGoods',
                                component: () =>
                                    import(/* webpackChunkName: "gd-goods" */ '@/pages/gd/goods/addGoods.vue'),
                                meta: {
                                    title: '添加商品',
                                    parentUrl: '/gd/goods/goods',
                                },
                            },
                            {
                                path: '/gd/goods/goods/skuMemberPrice/:id',
                                name: 'gd-goods-goods-skuMemberPrice',
                                component: () =>
                                    import(/* webpackChunkName: "gd-goods" */ '@/pages/gd/goods/skuMemberPrice.vue'),
                                meta: {
                                    title: '会员价',
                                    parentUrl: '/gd/goods/goods',
                                },
                            },
                        ],
                        // 类目管理
                        ...[
                            {
                                path: '/gd/catmg/goodsCat',
                                name: 'gd-catmg-goodsCat',
                                component: () =>
                                    import(/* webpackChunkName: "gd-catmg" */ '@/pages/gd/catmg/goodsCat.vue'),
                                meta: {
                                    title: '后台分类管理',
                                },
                            },
                            {
                                path: '/gd/catmg/shopGoodsCat',
                                name: 'gd-catmg-shopGoodsCat',
                                component: () =>
                                    import(/* webpackChunkName: "gd-catmg" */ '@/pages/gd/catmg/shopGoodsCat.vue'),
                                meta: {
                                    title: '店铺分类管理',
                                },
                            },
                        ],
                        // 活动管理
                        ...[
                            {
                                path: '/gd/activity/activity',
                                name: 'gd-activity-activity',
                                component: () =>
                                    import(/* webpackChunkName: "gd-activity" */ '@/pages/gd/activity/activity.vue'),
                                meta: {
                                    title: '活动列表',
                                },
                            },
                            {
                                path: '/gd/activity/activity/edit/:id?',
                                name: 'gd-activity-activity-edit',
                                component: () =>
                                    import(/* webpackChunkName: "gd-activity" */ '@/pages/gd/activity/activityEdit.vue'),
                                meta: {
                                    title: '活动管理',
                                    parentUrl: '/gd/activity/activity',
                                },
                            },
                            {
                                path: '/gd/activity/activityGoodsStock',
                                name: 'gd-activity-activityGoodsStock',
                                component: () =>
                                    import(/* webpackChunkName: "gd-activity" */ '@/pages/gd/activity/activityGoodsStock.vue'),
                                meta: {
                                    title: '活动库存',
                                },
                            },
                            {
                                path: '/gd/activity/activity/goodsSaleStat',
                                name: 'gd-activity-goodsSaleStat',
                                component: () =>
                                    import(/* webpackChunkName: "gd-activity" */ '@/pages/stat/goodsStat/goodsSaleStat.vue'),
                                meta: {
                                    title: '活动销量统计',
                                    parentUrl: '/gd/activity/activity',
                                },
                            },
                        ],
                    ],
                    // 会员管理
                    ...[
                        // 会员管理
                        ...[
                            {
                                path: '/mb/mbmg/buyerLevel',
                                name: 'mb-mbmg-buyerLevel',
                                component: () =>
                                    import(/* webpackChunkName: "mb-mbmg" */ '@/pages/mb/mbmg/buyerLevel.vue'),
                                meta: {
                                    title: '会员等级',
                                },
                            },
                            {
                                path: '/mb/mbmg/buyer',
                                name: 'mb-mbmg-buyer',
                                component: () => import(/* webpackChunkName: "mb-mbmg" */ '@/pages/mb/mbmg/buyer.vue'),
                                meta: {
                                    title: '会员列表',
                                },
                            },
                        ],
                        // 积分管理
                        ...[
                            {
                                path: '/mb/point/pointRule',
                                name: 'mb-point-pointRule',
                                component: () =>
                                    import(/* webpackChunkName: "mb-point" */ '@/pages/mb/point/pointRule.vue'),
                                meta: {
                                    title: '积分场景',
                                },
                            },
                        ],
                        // 会员认证
                        ...[
                            {
                                path: '/mb/buyerAuth/buyerAuthInfo',
                                name: 'mb-buyerAuth-buyerAuthInfo',
                                component: () =>
                                    import(/* webpackChunkName: "mb-buyerAuth" */ '@/pages/mb/buyerAuth/buyerAuthInfo.vue'),
                                meta: {
                                    title: '会员认证',
                                },
                            },
                            {
                                path: '/mb/buyerAuth/buyerAuthInfo/detail/:id',
                                name: 'mb-buyerAuth-buyerAuthInfoDetail',
                                component: () =>
                                    import(/* webpackChunkName: "mb-buyerAuth" */ '@/pages/mb/buyerAuth/buyerAuthInfoDetail.vue'),
                                meta: {
                                    title: '会员认证详情',
                                    parentUrl: '/mb/buyerAuth/buyerAuthInfo',
                                },
                            },
                        ],
                    ],
                    // 分销管理
                    ...[
                        //分销商管理
                        ...[
                            {
                                path: '/dt/dtmg/distributorLevel',
                                name: 'dt-dtmg-distributorLevel',
                                component: () =>
                                    import(/* webpackChunkName: "dt-point" */ '@/pages/dt/dtmg/distributorLevel.vue'),
                                meta: {
                                    title: '分销商等级',
                                },
                            },
                            {
                                path: '/dt/dtmg/distributor',
                                name: 'dt-dtmg-distributor',
                                component: () =>
                                    import(/* webpackChunkName: "dt-point" */ '@/pages/dt/dtmg/distributor.vue'),
                                meta: {
                                    title: '分销商列表',
                                },
                            },
                            {
                                path: '/dt/dtmg/distributor/edit/:id?',
                                name: 'dt-dtmg-distributorEdit',
                                component: () =>
                                    import(/* webpackChunkName: "dt-point" */ '@/pages/dt/dtmg/distributorEdit.vue'),
                                meta: {
                                    title: '分销商详情',
                                    parentUrl: '/dt/dtmg/distributor',
                                },
                            },
                        ],
                        //分销商统计
                        ...[
                            {
                                path: '/dt/stat/distributorStat',
                                name: 'dt-stat-distributorStat',
                                component: () =>
                                    import(/* webpackChunkName: "dt-stat" */ '@/pages/dt/stat/distributorStat.vue'),
                                meta: {
                                    title: '分销商统计',
                                },
                            },
                            {
                                path: '/dt/stat/distributionVisitLogStat',
                                name: 'dt-stat-distributionVisitLogStat',
                                component: () =>
                                    import(/* webpackChunkName: "dt-stat" */ '@/pages/dt/stat/distributionVisitLogStat.vue'),
                                meta: {
                                    title: '流量统计',
                                },
                            },
                            {
                                path: '/dt/stat/distributionUrllinkTypeStat',
                                name: 'dt-stat-distributionUrllinkTypeStat',
                                component: () =>
                                    import(/* webpackChunkName: "dt-stat" */ '@/pages/dt/stat/distributionUrllinkTypeStat.vue'),
                                meta: {
                                    title: '流量统计详情',
                                    parentUrl: '/dt/stat/distributionVisitLogStat',
                                },
                            },
                            {
                                path: '/dt/stat/distributorReconciliation',
                                name: 'dt-stat-distributorReconciliation',
                                component: () =>
                                    import(/* webpackChunkName: "dt-stat" */ '@/pages/dt/stat/distributorReconciliation.vue'),
                                meta: {
                                    title: '分销商账单',
                                },
                            },
                            {
                                path: '/dt/stat/distributorBill',
                                name: 'dt-stat-distributorBill',
                                component: () =>
                                    import(/* webpackChunkName: "dt-stat" */ '@/pages/dt/stat/distributorBill.vue'),
                                meta: {
                                    title: '分销月账单',
                                },
                            },
                        ],
                    ],
                    // 订单管理
                    ...[
                        // 订单管理
                        ...[
                            {
                                path: '/order/order/order',
                                name: 'order-order-order',
                                component: () =>
                                    import(/* webpackChunkName: "order-order" */ '@/pages/order/order/order.vue'),
                                meta: {
                                    title: '送货上门订单',
                                },
                            },
                            {
                                path: '/order/order/orderDetail/:id',
                                name: 'order-order-orderDetail',
                                component: orderOrderOrderDetail,
                                meta: {
                                    title: '订单详情',
                                    parentUrl: '/order/order/order',
                                },
                            },
                            {
                                path: '/order/order/virtualOrder',
                                name: 'order-order-virtualOrder',
                                component: () =>
                                    import(/* webpackChunkName: "order-order" */ '@/pages/order/order/virtualOrder.vue'),
                                meta: {
                                    title: '虚拟商品订单',
                                },
                            },
                            {
                                path: '/order/order/virtualOrderDetail/:id',
                                name: 'order-order-virtualOrderDetail',
                                component: orderOrderOrderDetail,
                                meta: {
                                    title: '订单详情',
                                    parentUrl: '/order/order/virtualOrder',
                                },
                            },
                            {
                                path: '/order/order/storeOrder',
                                name: 'order-order-storeOrder',
                                component: () =>
                                    import(/* webpackChunkName: "order-order" */ '@/pages/order/order/storeOrder.vue'),
                                meta: {
                                    title: '门店自取订单',
                                },
                            },
                            {
                                path: '/order/order/storeOrderDetail/:id',
                                name: 'order-order-storeOrderDetail',
                                component: orderOrderOrderDetail,
                                meta: {
                                    title: '订单详情',
                                    parentUrl: '/order/order/storeOrder',
                                },
                            },
                        ],
                        // 付款单管理
                        ...[
                            {
                                path: '/order/payment/paymentOfflineAudit',
                                name: 'order-payment-paymentOfflineAudit',
                                component: () =>
                                    import(/* webpackChunkName: "order-payment" */ '@/pages/order/payment/paymentOfflineAudit.vue'),
                                meta: {
                                    title: '线下付款审核',
                                },
                            },
                            {
                                path: '/order/payment/paymentOfflineAudit/detail/:id',
                                name: 'order-payment-paymentOfflineAuditDetail',
                                component: () =>
                                    import(/* webpackChunkName: "order-payment" */ '@/pages/order/payment/paymentOfflineAuditDetail.vue'),
                                meta: {
                                    title: '线下付款审核',
                                    parentUrl: '/order/payment/paymentOfflineAudit',
                                },
                            },
                        ],
                        // 订单售后
                        ...[
                            {
                                path: '/order/afterSale/orderRefund',
                                name: 'order-afterSale-orderRefund',
                                component: () =>
                                    import(/* webpackChunkName: "order-afterSale" */ '@/pages/order/afterSale/orderRefund.vue'),
                                meta: {
                                    title: '仅退款',
                                },
                            },
                            {
                                path: '/order/afterSale/orderRefund/detail/:id',
                                name: 'order-afterSale-orderRefundDetail',
                                component: () =>
                                    import(/* webpackChunkName: "order-afterSale" */ '@/pages/order/afterSale/orderRefundDetail.vue'),
                                meta: {
                                    title: '售后详情',
                                    parentUrl: '/order/afterSale/orderRefund',
                                },
                            },
                            {
                                path: '/order/afterSale/orderReturn',
                                name: 'order-afterSale-orderReturn',
                                component: () =>
                                    import(/* webpackChunkName: "order-afterSale" */ '@/pages/order/afterSale/orderReturn.vue'),
                                meta: {
                                    title: '退货退款',
                                },
                            },
                            {
                                path: '/order/afterSale/orderReturn/detail/:id',
                                name: 'order-afterSale-orderReturnDetail',
                                component: () =>
                                    import(/* webpackChunkName: "order-afterSale" */ '@/pages/order/afterSale/orderRefundDetail.vue'),
                                meta: {
                                    title: '售后详情',
                                    parentUrl: '/order/afterSale/orderReturn',
                                },
                            },
                        ],
                    ],
                    // 运营管理
                    ...[
                        // 平台设置
                        ...[
                            {
                                path: '/om/set/parameterSet',
                                name: 'om-set-parameterSet',
                                component: () =>
                                    import(/* webpackChunkName: "om-set" */ '@/pages/om/set/parameterSet.vue'),
                                meta: {
                                    title: '订单参数设置',
                                },
                            },
                            {
                                path: '/om/set/goodsTypeSet',
                                name: 'om-set-goodsTypeSet',
                                component: () =>
                                    import(/* webpackChunkName: "om-set" */ '@/pages/om/set/goodsTypeSet.vue'),
                                meta: {
                                    title: '商品类型参数设置',
                                },
                            },
                            {
                                path: '/om/set/orderSourceSet',
                                name: 'om-set-orderSourceSet',
                                component: () =>
                                    import(/* webpackChunkName: "om-set" */ '@/pages/om/set/orderSourceSet.vue'),
                                meta: {
                                    title: '订单来源参数设置',
                                },
                            },
                        ],
                        // 店铺装修
                        ...[
                            {
                                path: '/om/decoration/homeDecoration',
                                name: 'om-decoration-homeDecoration',
                                component: () =>
                                    import(/* webpackChunkName: "om-decoration" */ '@/pages/om/decoration/homeDecoration.vue'),
                                meta: {
                                    title: '首页装修',
                                },
                            },
                            {
                                path: '/om/decoration/activityDecoration',
                                name: 'om-decoration-activityDecoration',
                                component: () =>
                                    import(/* webpackChunkName: "om-decoration" */ '@/pages/om/decoration/activityDecoration.vue'),
                                meta: {
                                    title: '活动装修',
                                },
                            },
                            {
                                path: '/om/decoration/adPageDecoration',
                                name: 'om-decoration-adPageDecoration',
                                component: () =>
                                    import(/* webpackChunkName: "om-decoration" */ '@/pages/om/decoration/adPageDecoration.vue'),
                                meta: {
                                    title: '广告位装修',
                                },
                            },
                            // 装修编辑
                            {
                                path: '/om/decoration/home/edit/:id?',
                                name: 'om-decoration-home-edit',
                                component: () =>
                                    import(/* webpackChunkName: "om-decoration" */ '@/pages/om/decoration/edit/index.vue'),
                                meta: {
                                    title: '首页装修',
                                    parentUrl: '/om/decoration/homeDecoration',
                                },
                            },
                            {
                                path: '/om/decoration/activity/edit/:id?',
                                name: 'om-decoration-activity-edit',
                                component: () =>
                                    import(/* webpackChunkName: "om-decoration" */ '@/pages/om/decoration/edit/index.vue'),
                                meta: {
                                    title: '活动装修',
                                    parentUrl: '/om/decoration/activityDecoration',
                                },
                            },
                            {
                                path: '/om/decoration/adPage/edit/:id?',
                                name: 'om-decoration-adPage-edit',
                                component: () =>
                                    import(/* webpackChunkName: "om-decoration" */ '@/pages/om/decoration/edit/index.vue'),
                                meta: {
                                    title: '广告位装修',
                                    parentUrl: '/om/decoration/adPageDecoration',
                                },
                            },
                        ],
                        // 营销活动
                        ...[
                            {
                                path: '/om/coupon/couponTemplet',
                                name: 'om-coupon-couponTemplet',
                                component: () =>
                                    import(/* webpackChunkName: "om-coupon" */ '@/pages/om/coupon/couponTemplet.vue'),
                                meta: {
                                    title: '优惠券模板',
                                },
                            },
                            {
                                path: '/om/coupon/couponGiveProvide',
                                name: 'om-coupon-couponGiveProvide',
                                component: () =>
                                    import(/* webpackChunkName: "om-coupon" */ '@/pages/om/coupon/couponGiveProvide.vue'),
                                meta: {
                                    title: '优惠券发放',
                                },
                            },
                            {
                                path: '/om/coupon/couponGiveProvide/edit/:id?',
                                name: 'om-coupon-couponGiveProvide-edit',
                                component: () =>
                                    import(/* webpackChunkName: "om-coupon" */ '@/pages/om/coupon/couponGiveProvideEdit.vue'),
                                meta: {
                                    title: '优惠券发放',
                                    parentUrl: '/om/coupon/couponGiveProvide',
                                },
                            },
                            {
                                path: '/om/coupon/couponGiveReceive',
                                name: 'om-coupon-couponGiveReceive',
                                component: () =>
                                    import(/* webpackChunkName: "om-coupon" */ '@/pages/om/coupon/couponGiveReceive.vue'),
                                meta: {
                                    title: '优惠券领取',
                                },
                            },
                            {
                                path: '/om/coupon/couponGiveReceive/edit/:id?',
                                name: 'om-coupon-couponGiveReceive-edit',
                                component: () =>
                                    import(/* webpackChunkName: "om-coupon" */ '@/pages/om/coupon/couponGiveReceiveEdit.vue'),
                                meta: {
                                    title: '优惠券领取',
                                    parentUrl: '/om/coupon/couponGiveReceive',
                                },
                            },
                            {
                                path: '/om/coupon/couponGiveConfig',
                                name: 'om-coupon-couponGiveConfig',
                                component: () =>
                                    import(/* webpackChunkName: "om-coupon" */ '@/pages/om/coupon/couponGiveConfig.vue'),
                                meta: {
                                    title: '优惠券场景',
                                },
                            },
                        ],
                    ],
                    // 统计报表
                    ...[
                        // 商品统计
                        ...[
                            {
                                path: '/stat/goodsStat/goodsSaleStat',
                                name: 'stat-goodsStat-goodsSaleStat',
                                component: () =>
                                    import(/* webpackChunkName: "stat-goodsStat" */ '@/pages/stat/goodsStat/goodsSaleStat.vue'),
                                meta: {
                                    title: '销量统计',
                                },
                            },
                            {
                                path: '/stat/goodsStat/goodsBuyerVisitLog',
                                name: 'stat-goodsStat-goodsBuyerVisitLog',
                                component: () =>
                                    import(/* webpackChunkName: "stat-goodsStat" */ '@/pages/stat/goodsStat/goodsBuyerVisitLog.vue'),
                                meta: {
                                    title: '流量统计',
                                },
                            },
                        ],
                        // 财务统计
                        ...[
                            {
                                path: '/stat/payStat/payStat',
                                name: 'stat-payStat-payStat',
                                component: () =>
                                    import(/* webpackChunkName: "stat-payStat" */ '@/pages/stat/payStat/payStat.vue'),
                                meta: {
                                    title: '支付统计',
                                },
                            },
                        ],
                    ],
                ],
                // ---门店路由
                ...[
                    // 门店管理
                    ...[
                        // 门店管理
                        ...[
                            {
                                path: '/store/storemg/shopStoreInfo',
                                name: 'store-storemg-shopStoreInfo',
                                component: shopStoreStoremgShopStoreEdit,
                                meta: {
                                    title: '门店信息',
                                },
                            },
                            {
                                path: '/store/storemg/shopStoreServiceTime',
                                name: 'store-storemg-shopStoreServiceTime',
                                component: shopStoreStoremgShopStoreServiceTime,
                                meta: {
                                    title: '服务时间设置',
                                },
                            },
                            {
                                path: '/store/storemg/shopStoreFreight',
                                name: 'store-storemg-shopStoreFreight',
                                component: shopStoreStoremgShopStoreFreight,
                                meta: {
                                    title: '运费设置',
                                },
                            },
                        ],
                        // 门店商品
                        ...[
                            {
                                path: '/store/storeGoods/shopStoreGoods',
                                name: 'store-storeGoods-shopStoreGoods',
                                component: () =>
                                    import(/* webpackChunkName: "store-storeGoods" */ '@/pages/store/storeGoods/shopStoreGoods.vue'),
                                meta: {
                                    title: '商品列表',
                                },
                            },
                            {
                                path: '/store/storeGoods/shopStoreGoods/edit/:id?',
                                name: 'store-storeGoods-shopStoreGoodsEdit',
                                component: () =>
                                    import(/* webpackChunkName: "store-storeGoods" */ '@/pages/store/storeGoods/shopStoreGoodsEdit.vue'),
                                meta: {
                                    title: '商品列表',
                                    parentUrl: '/store/storeGoods/shopStoreGoods',
                                },
                            },
                            {
                                path: '/store/storeGoods/shopStoreGoodsCat',
                                name: 'store-storeGoods-shopStoreGoodsCat',
                                component: () =>
                                    import(/* webpackChunkName: "store-storeGoods" */ '@/pages/store/storeGoods/shopStoreGoodsCat.vue'),
                                meta: {
                                    title: '类目列表',
                                },
                            },
                        ],
                    ],
                    // 订单管理
                    ...[
                        // 订单管理
                        ...[
                            {
                                path: '/storeOrder/order/order',
                                name: 'storeOrder-order-order',
                                component: () =>
                                    import(/* webpackChunkName: "storeOrder-order" */ '@/pages/storeOrder/order/order.vue'),
                                meta: {
                                    title: '送货上门订单',
                                },
                            },
                            {
                                path: '/storeOrder/order/orderDetail/:id',
                                name: 'storeOrder-order-orderDetail',
                                component: orderOrderOrderDetail,
                                meta: {
                                    title: '订单详情',
                                    parentUrl: '/storeOrder/order/order',
                                },
                            },
                            {
                                path: '/storeOrder/order/storeOrder',
                                name: 'storeOrder-order-storeOrder',
                                component: () =>
                                    import(/* webpackChunkName: "storeOrder-order" */ '@/pages/storeOrder/order/storeOrder.vue'),
                                meta: {
                                    title: '门店自取订单',
                                },
                            },
                            {
                                path: '/storeOrder/order/storeOrderDetail/:id',
                                name: 'storeOrder-order-storeOrderDetail',
                                component: orderOrderOrderDetail,
                                meta: {
                                    title: '订单详情',
                                    parentUrl: '/storeOrder/order/storeOrder',
                                },
                            },
                        ],
                        // 订单售后
                        ...[
                            {
                                path: '/storeOrder/afterSale/orderRefund',
                                name: 'storeOrder-afterSale-orderRefund',
                                component: () =>
                                    import(/* webpackChunkName: "storeOrder-afterSale" */ '@/pages/order/afterSale/orderRefund.vue'),
                                meta: {
                                    title: '仅退款',
                                },
                            },
                            {
                                path: '/storeOrder/afterSale/orderRefund/detail/:id',
                                name: 'storeOrder-afterSale-orderRefundDetail',
                                component: () =>
                                    import(/* webpackChunkName: "storeOrder-afterSale" */ '@/pages/order/afterSale/orderRefundDetail.vue'),
                                meta: {
                                    title: '售后详情',
                                    parentUrl: '/storeOrder/afterSale/orderRefund',
                                },
                            },
                            {
                                path: '/storeOrder/afterSale/orderReturn',
                                name: 'storeOrder-afterSale-orderReturn',
                                component: () =>
                                    import(/* webpackChunkName: "storeOrder-afterSale" */ '@/pages/order/afterSale/orderReturn.vue'),
                                meta: {
                                    title: '退货退款',
                                },
                            },
                            {
                                path: '/storeOrder/afterSale/orderReturn/detail/:id',
                                name: 'storeOrder-afterSale-orderReturnDetail',
                                component: () =>
                                    import(/* webpackChunkName: "storeOrder-afterSale" */ '@/pages/order/afterSale/orderRefundDetail.vue'),
                                meta: {
                                    title: '售后详情',
                                    parentUrl: '/storeOrder/afterSale/orderReturn',
                                },
                            },
                        ],
                    ],
                ],
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "other" */ '@/pages/login.vue'),
            meta: {
                title: '登录',
            },
        },
        {
            path: '/error/:statusCode',
            name: 'error',
            component: () => import(/* webpackChunkName: "other" */ '@/pages/error.vue'),
            meta: {
                title: 'error',
            },
        },
        {
            path: '*',
            name: 'error2',
            component: () => import(/* webpackChunkName: "other" */ '@/pages/error.vue'),
            meta: {
                title: '错误页面',
            },
        },
        // ...BuildRouter.build(),
    ],
});

// 注入拦截器
routerInstance.beforeEach(routerBeforeEach);
routerInstance.afterEach(routerAfterEach);

export default routerInstance;
