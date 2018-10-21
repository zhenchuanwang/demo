<!-- Created by henian.xu on 2018/9/7. -->

<template>
    <el-dialog
        title="选择商品"
        center
        width="800px"
        :visible.sync="dialog.visible"
    >
        <el-form
            size="mini"
            :inline="true"
            :model="queryFormModel"
        >
            <el-form-item
                prop="goodsName"
                label="商品名称"
            >
                <el-input
                    v-model="queryFormModel.goodsName"
                    placeholder="请输入商品名称"
                />
            </el-form-item>
            <el-button 
                size="mini" 
                type="primary"
                @click="onQuery"
            >查询</el-button>
        </el-form>
        <el-table
            ref="table"
            :data="goodsList"
            row-key="goodsId"
            @selection-change="onSelectionChange"
        >
            <el-table-column
                type="selection"
                reserve-selection
                width="55"/>
            <el-table-column
                prop="goodsName"
                label="图片"
                width="50px"
            >
                <template slot-scope="scope">
                    <image-list
                        class="dp-ifx"
                        no-preview
                        :item-width="30"
                        :data="[scope.row.mainImageUrl]"
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="goodsName"
                label="名称"
            >
                <template slot-scope="scope">
                    <!--<div class="label">{{ scope.row.goodsId }}</div>-->
                    <div class="label">{{ scope.row.goodsName }}</div>
                    <div class="label fs-small tc-g6">{{ scope.row.goodsSubtitle }}</div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="ma-t ta-r">
            <pagination
                v-model="pagination"
                @input="getListData"
            />
        </div>

        <div
            slot="footer"
            class="dialog-footer">
            <el-button
                type="primary"
                size="small"
                @click="onDialogConfirm"
            >确 定
            </el-button>
            <el-button
                size="small"
                @click="onDialogCancel"
            >取 消
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'GoodsPicker',
    data() {
        return {
            dialog: {
                visible: false,
            },
            queryFormModel: {
                goodsName: '',
            },
            pagination: {},
            goodsList: [],
            selectedList: [],
        };
    },
    props: {
        value: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    methods: {
        getListData(queryData) {
            return this.$api.Gd.Goods.selectByPage({
                ...this.queryFormModel,
                ...queryData,
            }).then(json => {
                const res = json.data;
                this.goodsList = res.data;
                this.pagination = res.pagination;
                console.log(res);
            });
        },
        open() {
            this.dialog.visible = true;
            this.getListData();
            this.$nextTick(() => {
                this.$refs.table.clearSelection();
                this.value.forEach(item => {
                    console.log(item);
                    this.$refs.table.toggleRowSelection({ goodsId: item }, true);
                });
            });
        },
        close() {
            this.dialog.visible = false;
            this.pagination = {};
        },
        onQuery() {
            this.pagination = {};
            this.getListData();
        },
        onSelectionChange(val) {
            console.log(val);
            this.selectedList = val.reduce((prev, curr) => {
                prev.push(curr.goodsId);
                return prev;
            }, []);
        },
        onDialogConfirm() {
            this.$emit('input', this.selectedList);
            this.close();
        },
        onDialogCancel() {
            this.close();
        },
    },
};
</script>

<style lang="scss">
</style>
