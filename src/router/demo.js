/**
 * Created by henian.xu on 2018/7/14.
 * 与项目无关的路由
 */

export default [
    {
        path: '/hello',
        name: 'hello',
        component: resolve => require(['@/pages/HelloWorld'], resolve),
    },
];
