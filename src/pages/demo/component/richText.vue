<!-- Created by henian.xu on 2018/9/11. -->

<template>
    <page>
        <Tinymce
            :height="500"
            image-action="/rs/attachment/uploadCmsArticleImage"
            v-model="content"/>
        <div class="pa-a bc-g2 tc-g6">--------------------------- 内容 ---------------------------</div>
        <div
            class="editor-content" 
            v-html="content"/>
    </page>
</template>

<script>
export default {
    name: 'RichText',
    data() {
        return {
            content: ``,
        };
    },
};
</script>

<style lang="scss">
</style>
