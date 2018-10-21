<template>
    <page class="hello">
        <!--<div v-power="['user:add:user:add:user:add:user:add:user:add']">['user:add']</div>-->
        <!--<div v-power="['menu:add','user:add']">['menu:add','user:add']</div>-->
        <!--<div v-power.&&="['menu:add','user:add']">['menu:add','user:add']&&</div>-->
        <!--<div v-power.&&="['menu:add','region:add']">['menu:add','region:add']&&</div>-->
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'Index',
    mixins: [pagesMixin],
    data() {
        return {};
    },
};
</script>

<style lang="scss">
</style>
