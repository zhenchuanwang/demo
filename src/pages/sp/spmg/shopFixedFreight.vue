<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 内容 -->
        <div 
            class="body"
            slot="body"
            v-loading="querying"
        >
            <label class="tc-red fs-big">
                系统根据地区层级关系：县（区）->市->省->中国，优先级由高至低计算运费。
            </label>
            <!-- 表格 -->
            <tree-table
                :lazy-load="getListData"
                init-not-load
                :expand-props="{
                    prop:'name',
                    label:'区域名称',
                    minWidth:200,
                }"
                ref="treeTable"
                stripe
                border
                size="small"
                style="width: 100%"
            >
                <el-table-column
                    label="免邮订单金额(大于等于此值免邮)"
                    min-width="80"
                >
                    <template slot-scope="scope">
                        <el-input
                            v-model="scope.row.freeFreightOrderAmount"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    label="固定运费金额(小于免邮订单金额固定收取多少)"
                    min-width="80"
                >
                    <template slot-scope="scope">
                        <el-input
                            v-model="scope.row.freightAmount"
                        />
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
                            @click="onSaveShopFixedFreight(scope.row)"
                        >保存
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="onClearShopFixedFreight(scope.row)"
                        >清空
                        </el-button>
                    </template>
                </el-table-column>
            </tree-table>
        </div>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormTree } from '@/mixin/queryForm';

export default {
    name: 'ShopFixedFreight',
    mixins: [pagesMixin, queryFormTree],
    data() {
        return {
            queryFormModel: {},
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData({ row = {} } = {}) {
            this.querying = true;
            return this.$api.Sp.ShopFixedFreight.data({
                pId: row ? row.id : null,
            }).then(json => {
                this.querying = false;
                const res = json.data.data.sort((prev, next) => {
                    return prev.orderNum - next.orderNum;
                });
                return Promise.resolve(res);
            });
        },
        /* -- 事件 -- */
        onSaveShopFixedFreight(row) {
            if (!row.freeFreightOrderAmount) {
                this.$message.error('免邮订单金额不能为空');
                return;
            }
            if (!row.freightAmount) {
                this.$message.error('固定运费金额不能为空');
                return;
            }
            this.$api.Sp.ShopFixedFreight.save({
                regionId: row.id,
                freeFreightOrderAmount: row.freeFreightOrderAmount,
                freightAmount: row.freightAmount,
            }).then(json => {
                const { msg } = json.data;
                this.$message({
                    message: msg,
                    type: 'success',
                });
            });
        },
        onClearShopFixedFreight(row) {
            this.$confirm('确定清空该地区固定运费设置？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.$api.Sp.ShopFixedFreight.save({
                    regionId: row.id,
                }).then(json => {
                    const { msg } = json.data;
                    this.$message({
                        message: msg,
                        type: 'success',
                    });
                    row.freeFreightOrderAmount = null;
                    row.freightAmount = null;
                });
            });
        },
    },
};
</script>

<style lang="scss">
</style>
