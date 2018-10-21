<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
                <el-form-item
                    prop="giveScope"
                    label="发放对象"
                >
                    <dictionaries-picker
                        type="couponGiveScope"
                        v-model="queryFormModel.giveScope"
                    />
                </el-form-item>
                <el-form-item
                    prop="remarks"
                    label="发放备注"
                >
                    <el-input
                        v-model="queryFormModel.remarks"
                        placeholder="请输入发放备注"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onQuery()"
                    >查询
                    </el-button>
                    <el-button
                        type="success"
                        @click="onReset"
                    >重置
                    </el-button>
                </el-form-item>
            </el-form>
        </template>

        <!-- 内容 -->
        <div 
            class="body"
            slot="body"
            v-loading="querying"
        >
            <!-- 操作 -->
            <div
                class="ma-b"
            >
                <el-button-group>
                    <el-button
                        type="success"
                        icon="el-icon-plus"
                        size="small"
                        @click="$router.push('/om/coupon/couponGiveProvide/edit')"
                    >新增
                    </el-button>
                </el-button-group>
            </div>

            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
                @selection-change="onTableSelectionChange"
            >
                <el-table-column
                    prop="couponAmount"
                    label="优惠券金额"
                    min-width="100"
                />
                <el-table-column
                    prop="couponUseAmount"
                    label="优惠券满减限制"
                    min-width="100"
                />
                <el-table-column
                    prop="giveScopeName"
                    label="发放对象"
                    min-width="100"
                />
                <el-table-column
                    prop="remarks"
                    label="发放备注"
                    min-width="100"
                />
                <el-table-column
                    label="发放时间"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.insertTime | moment('YYYY-MM-DD HH:mm:ss') }}
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
                            @click="$router.push('/om/coupon/couponGiveProvide/edit/' + scope.row.id)"
                        >查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="ma-t ta-r">
                <pagination
                    v-model="pagination"
                    @input="onQuery"
                />
            </div>
        </div>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormList } from '@/mixin/queryForm';

export default {
    name: 'CouponGiveProvide',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                couponGiveMode: 1, // 优惠券发放模式
                giveScope: '', // 发放对象
                remarks: '', // 发放备注
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Pm.CouponGive.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onTableSelectionChange(val) {
            this.currentTableSelect = val;
        },
        onTableEdit(row) {
            const { formModel } = this.addDialog;
            this.$api.Pm.CouponGive.getDetail({ id: row.id }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(formModel, res);
            });
            this.addDialog.isVisible = true;
        },
    },
};
</script>

<style lang="scss">
</style>
