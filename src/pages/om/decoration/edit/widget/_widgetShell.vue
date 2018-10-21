<!-- Created by henian.xu on 2018/9/5. -->

<template>
    <div
        ref="currRoot"
        :class="['widget-shell',{'active':isActive}]" 
        @click="onWidget">
        <template v-if="isSupport">
            <div
                :is="componentName"
                v-bind="componentProps"
                :style="componentStyles"
            />
            <div 
                class="add top" 
                @click="addComponent('top')"><i class="f-icon">&#xf013;</i></div>
            <div 
                class="add bottom"
                @click="addComponent('bottom')"><i class="f-icon">&#xf013;</i></div>
            <div class="move-bar">
                <el-button
                    v-if="index > 0"
                    size="mini"
                    type="warning"
                    icon="el-icon-arrow-up"
                    @click="moveUp(data.id)"
                >上移</el-button>
                <el-button
                    v-if="index < componentList.length-1"
                    size="mini"
                    type="success"
                    icon="el-icon-arrow-down"
                    @click="moveDown(data.id)"
                >下移</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="moveDelete(data.id)"
                >删除</el-button>
            </div>
        </template>
        <div
            v-else
            class="ta-c pa-a bc-g2 tc-g6"
            :style="componentStyles"
        >暂不支持 {{ componentName }} 组件</div>
    </div>
</template>

<script>
import storeMixin from '../storeMixin';
import * as Components from '../components';
// import Draggabilly from 'draggabilly';
export default {
    name: 'WidgetShell',
    components: { ...Components },
    mixins: [storeMixin],
    data() {
        return {};
    },
    props: {
        index: {
            type: Number,
            default: 0,
        },
        data: {
            type: Object,
            default() {
                return {};
            },
            required: true,
        },
    },
    computed: {
        componentName() {
            return this.data.componentType;
        },
        componentProps() {
            return this.data.props;
        },
        isActive() {
            if (!this.currentComponent) return false;
            return this.data.id === this.currentComponent.id;
        },
        isSupport() {
            return !!Components[this.componentName];
        },
        hasComponentMargin() {
            return !isNaN(this.data.componentMargin);
        },
        componentStyles() {
            if (this.hasComponentMargin) {
                return {
                    margin: `${this.data.componentMargin / 2}px 0`,
                };
            }
            return {};
        },
    },
    methods: {
        onWidget() {
            this.$nextTick(() => {
                this.setControlOffsetTop(this.isSupport ? this.$el.offsetTop : null);
                this.setCurrentId(this.data.id);
            });
        },
        addComponent(position) {
            // this.$refs.AddComponent.open();
            // console.log(position, this.data);
            this.$emit('add', position);
        },
    },
    mounted() {
        // new Draggabilly(this.$refs.currRoot);
        // console.log(this.$refs.currRoot, Draggabilly);
    },
};
</script>

<style lang="scss">
.widget-shell {
    position: relative;
    //background-color: $gray2;
    min-height: 20px;
    cursor: pointer;

    > .add {
        display: none;
        position: absolute;
        z-index: $z-index-2;
        left: 50%;
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        border-radius: 100%;
        text-align: center;
        background-color: $color-main;
        color: #fff;
        &.top {
            transform: translate(-50%, -50%);
            top: 0;
        }
        &.bottom {
            transform: translate(-50%, 50%);
            bottom: 0;
        }
    }

    > .move-bar {
        display: none;
        position: absolute;
        z-index: $z-index-1;
        bottom: 0;
        right: 0;
    }

    &.active,
    &:hover {
        z-index: $z-index-3;
        // outline-offset: -1px;
        outline: 2px solid $color-main;

        > .add,
        > .move-bar {
            display: block;
        }
    }
}
</style>
