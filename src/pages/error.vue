<!-- Created by henian.xu on 2018/7/31. -->

<template>
    <el-main class="page-error">
        <div class="inner">
            <div class="code">{{ code }}</div>
            <div 
                class="desc" 
                v-if="message">{{ message }}</div>
        </div>
    </el-main>
</template>

<script>
export default {
    name: 'Error',
    data() {
        return {};
    },
    computed: {
        code() {
            return this.$route.params.statusCode || '404';
        },
        message() {
            return this.$route.query.message || '';
        },
    },
};
</script>

<style lang="scss">
.page-error {
    background-color: $gray2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .inner {
        > .code {
            font-size: 80px;
            font-weight: bold;
            color: $gray6;
        }
    }
}
</style>
