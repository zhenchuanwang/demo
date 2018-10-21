/**
 * Created by henian.xu on 2018/9/5.
 *
 */

import { Sp } from '@/api';
import { Utils } from 'common-platform-frame';

let count = 0; // 临时 Id 计数

// 新旧数据转换适配器
const componentConvert = component => {
    const { componentsType } = component;
    if (componentsType === 'page') {
        component.componentType = 'Page';
        const { data } = component;
        component.props = {
            backgroundColor: data.bc,
            title: data.title,
        };
        delete component.componentMargin;
        delete data.bc;
    } else if (componentsType === 'title') {
        component.componentType = 'Divider';
        component.props = {
            // type: component.type,
            label: component.text,
        };
        delete component.data;
        delete component.text;
        delete component.type;
        delete component.label;
    } else if (componentsType === 'AD') {
        component.componentType = 'Ad';
        const oldData = component.data.map(item => ({
            src: item.src || item.imgUrl,
            href: item.href,
            label: item.label,
        }));
        component.props = {
            margin: component.margin,
            type: component.type,
            data: oldData,
        };
        delete component.data;
        delete component.margin;
        delete component.type;
    } else if (componentsType === 'toolBar') {
        component.componentType = 'Toolbar';
        const oldData = component.data.map(item => ({
            src: item.src || item.imgUrl,
            href: item.href,
            label: item.label,
        }));
        component.props = {
            column: 5,
            gridLine: false,
            data: oldData,
        };
        delete component.data;
    } else if (componentsType === 'goods') {
        component.componentType = 'Goods';
        const oldData = component.data.map(item => item);
        component.props = {
            type: component.type,
            ids: component.ids,
            data: oldData,
        };
        delete component.data;
        delete component.ids;
        delete component.type;
    } else if (componentsType === 'goodsList') {
        component.componentType = 'GoodsList';
        const oldData = component.data.map(item => item);
        component.props = {
            type: component.type,
            count: component.count,
            orderBy: `${component.orderBy.type || ''},${component.orderBy.ASC || ''}`,
            data: oldData,
        };
        delete component.data;
        delete component.ids;
        delete component.count;
        delete component.type;
        delete component.orderBy;
    } else if (componentsType === 'ADCube') {
        component.componentType = 'AdCube';
        const oldData = component.data.map(item => ({
            src: item.src || item.imgUrl,
            href: item.href,
            label: item.label,
        }));
        component.props = {
            border: component.border,
            reverse: component.mirroring,
            data: oldData,
        };
        delete component.data;
        delete component.type;
        delete component.mirroring;
        delete component.border;
    } else if (componentsType === 'magicCube') {
        component.componentType = 'MagicCube';
        const oldData = component.data.map(item => ({
            src: item.src || item.imgUrl,
            href: item.href,
            label: item.label,
        }));
        component.props = {
            column: component.column,
            data: oldData,
        };
        delete component.data;
        delete component.type;
        delete component.column;
    }
    delete component.componentsType;
};

function parseDecorationJson(json) {
    const componentList = JSON.parse(json);
    componentList.forEach(component => {
        component.id = ++count;
        componentConvert(component);
        const { componentType, props } = component;
        switch (componentType) {
            case 'Page':
                break;
            case 'Ad':
            case 'Toolbar':
            case 'AdCube':
            case 'MagicCube':
                component.props.data.forEach(item => {
                    item.id = Utils.Comm.getKey();
                    // 图片上传组件要用到 FIXME 应该可以修复上传组件
                    item.imgModel = [
                        {
                            address: item.src,
                            name: '',
                        },
                    ];
                });
                break;
        }
        if (componentType === 'Toolbar') {
            component.props.column = component.props.column || 4;
            component.props.gridLine = component.props.gridLine || false;
        }
        if (componentType === 'Ad' && +props.type === 1) {
            component.props.delay = component.props.delay || 3000;
        }
    });
    return componentList;
}

// 添加时默认数据
const defaultData = {
    Page() {
        return {
            id: ++count,
            componentType: 'Page',
            props: {
                backgroundColor: '#f8f9fa',
                title: '页面标题',
            },
        };
    },
    Divider() {
        return {
            id: ++count,
            componentType: 'Divider',
            componentMargin: 0,
            props: {
                label: '',
            },
        };
    },
    Ad() {
        return {
            id: ++count,
            componentType: 'Ad',
            componentMargin: 0,
            props: {
                margin: '',
                type: '1',
                delay: 3000,
                data: [],
            },
        };
    },
    Toolbar() {
        return {
            id: ++count,
            componentType: 'Toolbar',
            componentMargin: 0,
            props: {
                gridLine: false,
                column: 4,
                data: [],
            },
        };
    },
    Goods() {
        return {
            id: ++count,
            componentType: 'Goods',
            componentMargin: 0,
            props: {
                type: '1',
                ids: [],
                data: [],
            },
        };
    },
    GoodsList() {
        return {
            id: ++count,
            componentType: 'GoodsList',
            componentMargin: 0,
            props: {
                type: '2',
                orderBy: 'onSaleTime,asc',
                data: [],
            },
        };
    },
    AdCube() {
        return {
            id: ++count,
            componentType: 'AdCube',
            componentMargin: 0,
            props: {
                border: false,
                reverse: false,
                data: [],
            },
        };
    },
    MagicCube() {
        return {
            id: ++count,
            componentType: 'MagicCube',
            componentMargin: 0,
            props: {
                column: 2,
                data: [],
            },
        };
    },
    test() {
        return {
            id: ++count,
            componentType: 'test',
            componentMargin: 0,
            props: {},
        };
    },
};

// 状态对象
export default {
    namespaced: true,
    state() {
        return {
            decoration: {},
            buyerUrl: '',
            decorationJson: '',
            decorationData: [],
            currentId: 0,
            controlOffsetTop: null,
        };
    },
    getters: {
        decorationMap(state) {
            return state.decorationData.reduce((prev, curr, index) => {
                curr.__index = index;
                prev[curr.id] = curr;
                return prev;
            }, {});
        },
        pageData(state) {
            for (let i = 0, item; (item = state.decorationData[i++]); ) {
                if (item.componentType === 'Page') {
                    return item;
                }
            }
            return {};
        },
        componentList(state) {
            const res = [];
            state.decorationData.forEach(item => {
                if (item.componentType === 'Page') return;
                res.push(item);
            });
            return res;
        },
        currentComponent(state, getters) {
            return getters.decorationMap[state.currentId];
        },
        decorationJson: state => () => {
            const decorationData = JSON.parse(JSON.stringify(state.decorationData));
            decorationData.forEach(component => {
                delete component.id;
                delete component.__index;
                switch (component.componentType) {
                    case 'Ad':
                    case 'Toolbar':
                    case 'AdCube':
                    case 'MagicCube':
                        component.props.data.forEach(item => {
                            item.src = item.imgModel.length ? item.imgModel[0].address : item.src;
                            delete item.id;
                            delete item.imgModel;
                        });
                        break;
                    case 'Goods':
                        component.props.ids = component.props.data.reduce((prve, curr) => {
                            prve.push(curr.goodsId);
                            return prve;
                        }, []);
                        component.props.data = [];
                        break;
                    case 'GoodsList':
                        component.props.data = [];
                        break;
                }
            });
            return JSON.stringify(decorationData);
        },
    },
    // 如引用类型不一定要通过 mutations 来改变数据
    mutations: {
        setDecoration(state, data) {
            state.decoration = data;
            state.buyerUrl = data.buyerUrl;
            state.decorationJson = data.pageContent;
            state.decorationData = parseDecorationJson(data.pageContent);
        },
        restoreDecorationData(state) {
            state.decorationData = parseDecorationJson(state.decorationJson);
            state.controlOffsetTop = null;
        },
        /**
         * 设置当前编辑组件 Id
         */
        setCurrentId(state, id) {
            state.currentId = id;
        },
        upDateDecoration(state, data) {
            for (let key in state.decoration) {
                if (state.decoration.hasOwnProperty(key) && data[key] !== undefined) {
                    state.decoration[key] = data[key];
                }
            }
        },
        /**
         * 设置操作表单偏移
         * @param state
         * @param val
         */
        setControlOffsetTop(state, val) {
            state.controlOffsetTop = val;
        },
        _moveUp(state, index) {
            const item = state.decorationData.splice(index, 1);
            state.decorationData.splice(index - 1, 0, ...item);
        },
        _moveDown(state, index) {
            const item = state.decorationData.splice(index, 1);
            state.decorationData.splice(index + 1, 0, ...item);
        },
        _moveDelete(state, index) {
            state.decorationData.splice(index, 1);
        },
        addComponent(state, { componentType, index }) {
            const initData = defaultData[componentType]();
            state.decorationData.splice(index, 0, initData);
            state.currentId = initData.id;
            console.log(state, initData, index);
        },
    },
    actions: {
        getPageData({ state, commit }, id) {
            if (state.decorationJson !== '') return Promise.resolve();
            return Sp.ShopDecoration.getJsonData({ id }).then(json => {
                const res = json.data;
                commit('setDecoration', res.data.decoration);
                return Promise.resolve(json);
            });
        },
        savePageData({ state, getters, commit }, data = {}) {
            return Sp.ShopDecoration.saveJsonData({
                id: state.decoration.id,
                pageType: state.decoration.pageType,
                ...data,
                JsonData: getters.decorationJson(),
            }).then(json => {
                const res = json.data.data;
                commit('upDateDecoration', res);
                return Promise.resolve(json);
            });
        },
        moveUp({ getters, commit }, id) {
            const item = getters.decorationMap[id];
            if (!item) return;
            commit('_moveUp', item.__index);
        },
        moveDown({ getters, commit }, id) {
            const item = getters.decorationMap[id];
            if (!item) return;
            commit('_moveDown', item.__index);
        },
        moveDelete({ getters, commit }, id) {
            const item = getters.decorationMap[id];
            if (!item) return;
            commit('_moveDelete', item.__index);
        },
    },
};
