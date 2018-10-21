<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 内容 -->
        <div
            class="body"
            slot="body"
        >
            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="adPageTypeName"
                    label="广告页面类型"
                    min-width="100"
                />
                <el-table-column
                    label="是否启用"
                    width="80"
                >
                    <template
                        slot-scope="scope"
                        v-if="scope.row.id"
                    >
                        <el-switch
                            v-model="scope.row.isAvailable"
                            @input="onIsAvailableInput($event,scope)"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.insertTime | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="修改时间"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.updateTime | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="90"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push(`/om/decoration/adPage/edit?pageType=2&adPageType=${scope.row.adPageType}`)"
                            v-if="!scope.row.id"
                        >新增
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push(`/om/decoration/adPage/edit/${scope.row.id}?pageType=2&adPageType=${scope.row.adPageType}`)"
                            v-if="scope.row.id"
                        >编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormList } from '@/mixin/queryForm';

export default {
    name: 'AdPageDecoration',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Sp.ShopDecoration.data({ ...queryData, pageType: 2 }).then(json => {
                const res = json.data;
                this.tableData = res.data;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onIsAvailableInput(val, scope) {
            const { row } = scope;
            if (!row) return;
            this.$api.Sp.ShopDecoration.status({
                id: row.id,
                isAvailable: row.isAvailable,
            })
                .then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                })
                .catch(() => {
                    this.$message({
                        message: '操作失败请重试！',
                        type: 'error',
                    });
                    row.isAvailable = !row.isAvailable;
                });
        },
    },
};
</script>

<style lang="scss">
</style>
