<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-tabs
                class="classify-tabs"
                v-model="queryFormModel.type"
                type="card"
                @tab-click="onQuery()"
            >
                <el-tab-pane
                    label="实时视图"
                    name="0"/>
                <el-tab-pane
                    label="天视图"
                    name="1"/>
                <el-tab-pane
                    label="月视图"
                    name="2"/>
            </el-tabs>
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
                <el-form-item
                    prop="statDate"
                    label="统计时间"
                    v-show="queryFormModel.type == 0"
                    key="statDate"
                >
                    <el-date-picker
                        v-model="queryFormModel.statDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"/>
                </el-form-item>
                <el-form-item
                    prop="statDateDay"
                    label="统计时间"
                    v-show="queryFormModel.type == 1"
                    key="statDateDay"
                >
                    <el-date-picker
                        v-model="queryFormModel.statDateDay"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item
                    label="统计时间"
                    v-show="queryFormModel.type == 2"
                    key="statDateMonth"
                >
                    <el-date-picker
                        v-model="queryFormModel.statBeginDateMonth"
                        type="month"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        placeholder="选择月"/>
                    至
                    <el-date-picker
                        v-model="queryFormModel.statEndDateMonth"
                        type="month"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        placeholder="选择月"/>
                </el-form-item>
                <el-form-item
                    prop="statBeginDateMonth"
                />
                <el-form-item
                    prop="statEndDateMonth"
                />
                <el-form-item
                    prop="goodsName"
                    label="商品名称"
                >
                    <el-input
                        v-model="queryFormModel.goodsName"
                        placeholder="请输入商品名称"
                    />
                </el-form-item>
                <el-form-item
                    prop="goodsSn"
                    label="商品货号"
                >
                    <el-input
                        v-model="queryFormModel.goodsSn"
                        placeholder="请输入商品货号"
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
            <!-- 表格 -->
            <el-table
                stripe
                border
                size="small"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    type="index"
                    width="50"/>
                <el-table-column
                    label="商品图片"
                    width="120"
                >
                    <template slot-scope="scope">
                        <ImageList
                            :data="scope.row.mainImageUrl"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    min-width="100"
                />
                <el-table-column
                    prop="goodsSn"
                    label="商品货号"
                    min-width="50"
                />
                <el-table-column
                    prop="pv"
                    label="PV"
                    min-width="50"
                />
                <el-table-column
                    prop="uv"
                    label="UV"
                    min-width="50"
                />
                <el-table-column
                    prop="ip"
                    label="ip数"
                    min-width="50"
                />
                <el-table-column
                    prop="orderNum"
                    label="订单数"
                    min-width="50"
                />
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="90"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="goodsBuyerVisitLogDetail(scope.row.goodsId)"
                        >查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 弹框 -->
        <el-dialog
            title="查看报表"
            center
            width="1200px"
            :visible.sync="eChartDialog.isVisible"
            @closed="onEChartDialogCancel"
        >
            <Charts
                class="echarts-demo"
                :options="eChartDialog.option"/>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    size="small"
                    @click="onEChartDialogCancel"
                >关闭
                </el-button>
            </div>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import { queryFormList } from '@/mixin/queryForm';

import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';

export default {
    name: 'GoodsBuyerVisitLog',
    mixins: [pagesMixin, queryFormList],
    components: {
        Charts: ECharts,
    },
    data() {
        return {
            queryFormModel: {
                type: '0',
                goodsName: '',
                goodsSn: '',
                statDateDay: '',
                statBeginDateMonth: '',
                statEndDateMonth: '',
            },
            // 新增/编辑
            eChartDialog: {
                // 对话框显示
                isVisible: false,
                option: {
                    tooltip: {
                        trigger: 'axis',
                        position: function(pt) {
                            return [pt[0], '10%'];
                        },
                    },
                    title: {
                        left: 'center',
                        text: '流量统计',
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none',
                            },
                            restore: {},
                            saveAsImage: {},
                        },
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 0,
                            end: 100,
                        },
                        {
                            start: 0,
                            end: 10,
                            handleIcon:
                                'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                            handleSize: '80%',
                            handleStyle: {
                                color: '#fff',
                                shadowBlur: 3,
                                shadowColor: 'rgba(0, 0, 0, 0.6)',
                                shadowOffsetX: 2,
                                shadowOffsetY: 2,
                            },
                        },
                    ],
                    series: [
                        {
                            name: 'pv',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            sampling: 'average',
                            data: [],
                        },
                        {
                            name: 'uv',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            sampling: 'average',
                            data: [],
                        },
                        {
                            name: 'ip数',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            sampling: 'average',
                            data: [],
                        },
                        {
                            name: '订单数',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            sampling: 'average',
                            data: [],
                        },
                    ],
                },
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Stat.BuyerVisitLog.goodsBuyerVisitLogList(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        goodsBuyerVisitLogDetail(goodsId) {
            this.$api.Stat.BuyerVisitLog.goodsBuyerVisitLogDetail({
                ...this.queryFormModel,
                goodsId: goodsId,
            }).then(json => {
                const res = json.data.data;

                this.eChartDialog.option.title.text = res.chartsData.title;
                this.eChartDialog.option.title.subtext = res.chartsData.subTitle;

                this.eChartDialog.option.xAxis.data = [];
                this.eChartDialog.option.series[0].data = [];

                res.statList.forEach(item => {
                    this.eChartDialog.option.xAxis.data.push(item.orderTime);
                    this.eChartDialog.option.series[0].data.push(item.pv || 0);
                    this.eChartDialog.option.series[1].data.push(item.uv || 0);
                    this.eChartDialog.option.series[2].data.push(item.ip || 0);
                    this.eChartDialog.option.series[3].data.push(item.orderNum || 0);
                });
            });
            this.eChartDialog.isVisible = true;
        },
        onEChartDialogCancel() {
            this.eChartDialog.isVisible = false;
        },
    },
    created() {
        this.queryFormModel.statDate = this.$utils.Comm.getSysDayDate();
        this.queryFormModel.statDateDay = [
            this.$utils.Comm.getSysMonthFirstDayDate(),
            this.$utils.Comm.getSysDayDate(),
        ];
        this.queryFormModel.statBeginDateMonth = this.$utils.Comm.getSysYearFirstMonthDate();
        this.queryFormModel.statEndDateMonth = this.$utils.Comm.getSysMonthDate();
    },
};
</script>

<style lang="scss">
.echarts-demo {
    width: 100%;
}
</style>
