<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-tabs
                class="classify-tabs"
                v-model="queryFormModel.paymentStatus"
                type="card"
                @tab-click="onQuery()"
            >
                <el-tab-pane
                    label="待审核"
                    name="2"/>
                <el-tab-pane
                    label="审核通过"
                    name="1"/>
                <el-tab-pane
                    label="审核不通过"
                    name="3"/>
            </el-tabs>
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
                <el-form-item
                    prop="paymentSn"
                    label="系统付款单号"
                >
                    <el-input
                        v-model="queryFormModel.paymentSn"
                        placeholder="请输入系统付款单号"
                    />
                </el-form-item>
                <el-form-item
                    prop="payer"
                    label="付款人"
                >
                    <el-input
                        v-model="queryFormModel.payer"
                        placeholder="请输入付款人"
                    />
                </el-form-item>
                <el-form-item
                    prop="paymentTime"
                    label="付款时间"
                >
                    <el-date-picker
                        v-model="queryFormModel.paymentTime"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"/>
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
            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="paymentSn"
                    label="系统付款单号"
                    min-width="100"
                />
                <el-table-column
                    prop="payer"
                    label="付款人"
                    min-width="100"
                />
                <el-table-column
                    prop="paymentAmount"
                    label="付款金额"
                    min-width="100"
                />
                <el-table-column
                    label="付款时间"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.paymentTime | moment('YYYY-MM-DD HH:mm:ss') }}
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
                            @click="$router.push('/order/payment/paymentOfflineAudit/Detail/' + scope.row.id)"
                        >{{ scope.row.paymentStatus == 2 ? '审核' : '查看' }}
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
    name: 'PaymentOfflineAudit',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                paymentSn: '', // 系统付款单号
                payer: '', // 付款人
                paymentTime: '',
                paymentStatus: '2',
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Ex.Payment.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
    },
};
</script>

<style lang="scss">
</style>
