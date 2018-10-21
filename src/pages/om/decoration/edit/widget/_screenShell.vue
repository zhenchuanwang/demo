<!-- Created by henian.xu on 2018/9/5. -->

<template>
    <div 
        class="screen-shell" 
        :style="`background-color: ${data.backgroundColor};`">
        <div
            ref="header"
            class="header" 
            @click="onHeader">
            <div class="label">{{ data.title }}</div>
        </div>
        <div class="body">
            <slot/>
        </div>
    </div>
</template>

<script>
import storeMixin from '../storeMixin';
export default {
    name: 'ScreenShell',
    mixins: [storeMixin],
    computed: {
        data() {
            return this.pageData.props || {};
        },
    },
    methods: {
        onHeader() {
            this.setControlOffsetTop(this.$el.offsetTop);
            this.setCurrentId(this.pageData.id);
        },
    },
};
</script>

<style lang="scss">
.screen-shell {
    background-color: #fff;
    width: 375px;
    min-height: 667px;
    > .header {
        background-color: #22292c;
        color: #fff;
        text-align: center;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        > .label {
            @include text-line(1);
            flex: 1 1 1%;
            text-align: center;
            font-size: 18px;
        }
    }
}
</style>
