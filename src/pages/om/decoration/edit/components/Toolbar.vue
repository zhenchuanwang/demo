<!-- Created by henian.xu on 2017/10/2. -->

<template>
    <GridGroup
        class="toolbar"
        :columns="column"
        :grid-line="gridLine"
    >
        <Grid
            v-for="(item,index) in data"
            :key="index"
            icon="&#xf01c;"
            :label="item.label"
        >
            <div
                class="icon"
                slot="icon"
                :style="`background-image: url('${item.src}');`"
            />
            <div
                class="label"
                slot="label">{{ item.label }}</div>
        </Grid>
    </GridGroup>
</template>

<script>
export default {
    name: 'Toolbar',
    data() {
        return {};
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        column: {
            type: [Number, String],
            default: 4,
        },
        gridLine: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
.toolbar {
    .icon {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 50px;
        height: 50px;
    }
    .label {
        min-height: $body-font-size * 1.5;
        @include text-line(1);
    }
}
</style>
