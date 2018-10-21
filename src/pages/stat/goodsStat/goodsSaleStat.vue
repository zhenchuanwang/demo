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
                <el-form-item
                    prop="orderByKey"
                    label="排序类型"
                >
                    <el-select
                        v-model="queryFormModel.orderByKey"
                        placeholder="请选择"
                    >
                        <el-option
                            key="1"
                            label="销售额"
                            value="1"/>
                        <el-option
                            key="2"
                            label="利润"
                            value="2"/>
                        <el-option
                            key="3"
                            label="库存"
                            value="3"/>
                        <el-option
                            key="4"
                            label="销量"
                            value="4"/>
                        <el-option
                            key="5"
                            label="售罄率"
                            value="5"
                            v-if="queryFormModel.activityId"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="orderByType"
                    label="排序方式"
                >
                    <el-select
                        v-model="queryFormModel.orderByType"
                        placeholder="请选择"
                    >
                        <el-option
                            key="1"
                            label="从高到低"
                            value="1"/>
                        <el-option
                            key="2"
                            label="从低到高"
                            value="2"/>
                    </el-select>
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
                        icon="el-icon-download"
                        size="small"
                        @click="exportExcel"
                    >统计报表导出
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
            >
                <el-table-column
                    type="index"
                    width="50"/>
                <el-table-column type="expand">
                    <template slot-scope="item">
                        <el-table
                            stripe
                            border
                            size="small"
                            :data="item.row.skuSaleStatList"
                            style="width: 100%"
                        >
                            <el-table-column
                                label="规格图片"
                                width="120"
                            >
                                <template slot-scope="scope">
                                    <ImageList
                                        :data="scope.row.specImageUrl"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="skuSn"
                                label="sku编码"
                                min-width="100"
                            />
                            <el-table-column
                                prop="specDesc"
                                label="规格说明"
                                min-width="100"
                            />
                            <el-table-column
                                prop="stock"
                                label="库存"
                                min-width="50"
                            />
                            <el-table-column
                                prop="saleQuantity"
                                label="销量"
                                min-width="50"
                            />
                            <el-table-column
                                prop="saleAmount"
                                label="销售额"
                                min-width="50"
                            />
                            <el-table-column
                                prop="profitAmount"
                                label="利润"
                                min-width="50"
                            />
                            <el-table-column
                                prop="salableQuantity"
                                label="活动库存"
                                min-width="50"
                                v-if="queryFormModel.activityId"
                            />
                            <el-table-column
                                prop="soldOutRate"
                                label="售罄率"
                                min-width="50"
                                v-if="queryFormModel.activityId"
                            >
                                <template slot-scope="scope">
                                    {{ scope.row.soldOutRate }}%
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
                                        @click="goodsSaleStatDetail(null, scope.row.skuId)"
                                    >查看详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
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
                    prop="stock"
                    label="库存"
                    min-width="50"
                />
                <el-table-column
                    prop="saleQuantity"
                    label="销量"
                    min-width="50"
                />
                <el-table-column
                    prop="saleAmount"
                    label="销售额"
                    min-width="50"
                />
                <el-table-column
                    prop="profitAmount"
                    label="利润"
                    min-width="50"
                />
                <el-table-column
                    prop="salableQuantity"
                    label="活动库存"
                    min-width="50"
                    v-if="queryFormModel.activityId"
                />
                <el-table-column
                    prop="soldOutRate"
                    label="售罄率"
                    min-width="50"
                    v-if="queryFormModel.activityId"
                >
                    <template slot-scope="scope">
                        {{ scope.row.soldOutRate }}%
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
                            @click="goodsSaleStatDetail(scope.row.goodsId, null)"
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
import 'echarts/lib/component/title';

export default {
    name: 'GoodsSaleStat',
    mixins: [pagesMixin, queryFormList],
    components: {
        Charts: ECharts,
    },
    data() {
        return {
            queryFormModel: {
                type: '1',
                orderByKey: '1',
                orderByType: '1',
                activityId: '',
                supplierId: '',
                goodsCatId: '',
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
                        text: '销量统计',
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
                            name: '销量',
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
            return this.$api.Stat.GoodsStat.goodsSaleStatList(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        goodsSaleStatDetail(goodsId, skuId) {
            this.$api.Stat.GoodsStat.goodsSaleStatDetail({
                ...this.queryFormModel,
                goodsId: goodsId,
                skuId: skuId,
            }).then(json => {
                const res = json.data.data;

                this.eChartDialog.option.title.text = res.chartsData.title;
                this.eChartDialog.option.title.subtext = res.chartsData.subTitle;

                this.eChartDialog.option.xAxis.data = [];
                this.eChartDialog.option.series[0].data = [];

                res.goodsSaleStatList.forEach(item => {
                    this.eChartDialog.option.xAxis.data.push(item.orderTime);
                    this.eChartDialog.option.series[0].data.push(item.saleQuantity || 0);
                });
            });
            this.eChartDialog.isVisible = true;
        },
        onEChartDialogCancel() {
            this.eChartDialog.isVisible = false;
        },
        exportExcel() {
            let statBeginDate = null;
            let statEndDate = null;
            if (this.queryFormModel.statDateDay != null && this.queryFormModel.statDateDay.length === 2) {
                statBeginDate = this.queryFormModel.statDateDay[0];
                statEndDate = this.queryFormModel.statDateDay[1];
            }
            this.$utils.Comm.exportExcel('/stat/goodsStat/exportExcel', {
                ...this.queryFormModel,
                statBeginDate: statBeginDate,
                statEndDate: statEndDate,
            });
        },
    },
    created() {
        this.queryFormModel.statDateDay = [
            this.$utils.Comm.getSysMonthFirstDayDate(),
            this.$utils.Comm.getSysDayDate(),
        ];
        this.queryFormModel.statBeginDateMonth = this.$utils.Comm.getSysYearFirstMonthDate();
        this.queryFormModel.statEndDateMonth = this.$utils.Comm.getSysMonthDate();

        this.queryFormModel.supplierId = this.$route.query.supplierId;
        this.queryFormModel.activityId = this.$route.query.activityId;
    },
};
</script>

<style lang="scss">
.echarts-demo {
    width: 100%;
}
</style>
