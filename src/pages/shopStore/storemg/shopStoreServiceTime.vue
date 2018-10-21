<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page
        back
    >
        <el-row>
            <el-form
                ref="addForm"
                size="small"
                :model="formModel"
                :rules="formRules"
            >
                <el-col :span="12">
                    <el-form-item
                        prop="prepareGoodsDesc"
                        label="备货描述"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.prepareGoodsDesc"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="prepareGoodsMode"
                        label="备货方式"
                        label-width="8em"
                    >
                        <el-radio-group v-model="formModel.prepareGoodsMode">
                            <el-radio :label="0">每天</el-radio>
                            <el-radio :label="1">周期</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item
                        label="门店服务时间段"
                        label-width="8em">
                        <div
                            class="ma-b"
                        >
                            <el-button-group>
                                <el-button
                                    type="success"
                                    icon="el-icon-plus"
                                    size="small"
                                    @click="onAddItem"
                                >新增
                                </el-button>
                            </el-button-group>
                        </div>
                        <!-- 表格 -->
                        <el-table
                            stripe
                            border
                            size="small"
                            :data="shopStoreServiceTimeList"
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="serviceFrequency"
                                label="下单结束日期"
                                width="120"
                                v-if="formModel.prepareGoodsMode == 1"
                            >
                                <template slot-scope="scope">
                                    <el-select
                                        v-model="scope.row.serviceFrequency"
                                        placeholder="请选择"
                                        class="w-100px"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in serviceFrequencyList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"/>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="orderEndTime"
                                label="下单结束时间"
                                width="220"
                            >
                                <template slot-scope="scope">
                                    <el-select
                                        v-model="scope.row.orderEndTime1"
                                        placeholder="小时"
                                        class="w-90px"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in hourSelect"
                                            :key="item"
                                            :label="item"
                                            :value="item"/>
                                    </el-select>
                                    :
                                    <el-select
                                        v-model="scope.row.orderEndTime2"
                                        placeholder="分钟"
                                        class="w-90px"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in minSelect"
                                            :key="item"
                                            :label="item"
                                            :value="item"/>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="intervalDays"
                                label="服务时间间隔"
                                min-width="150"
                            >
                                <template slot-scope="scope">
                                    <el-input-number
                                        controls-position="right"
                                        :min="0"
                                        :max="1000"
                                        v-model.number="scope.row.intervalDays"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="beginTime"
                                label="服务开始时间"
                                width="220"
                            >
                                <template slot-scope="scope">
                                    <el-select
                                        v-model="scope.row.beginTime1"
                                        placeholder="小时"
                                        class="w-90px"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in hourSelect"
                                            :key="item"
                                            :label="item"
                                            :value="item"/>
                                    </el-select>
                                    :
                                    <el-select
                                        v-model="scope.row.beginTime2"
                                        placeholder="分钟"
                                        class="w-90px"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in minSelect"
                                            :key="item"
                                            :label="item"
                                            :value="item"/>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="endTime"
                                label="服务结束时间"
                                width="220"
                            >
                                <template slot-scope="scope">
                                    <el-select
                                        v-model="scope.row.endTime1"
                                        placeholder="小时"
                                        class="w-90px"
                                        filterable>
                                        <el-option
                                            v-for="item in hourSelect"
                                            :key="item"
                                            :label="item"
                                            :value="item"/>
                                    </el-select>
                                    :
                                    <el-select
                                        v-model="scope.row.endTime2"
                                        placeholder="分钟"
                                        class="w-90px"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in minSelect"
                                            :key="item"
                                            :label="item"
                                            :value="item"/>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="serviceLimit"
                                label="服务人数上限(0为不限制)"
                                min-width="160"
                            >
                                <template slot-scope="scope">
                                    <el-input-number
                                        controls-position="right"
                                        :min="0"
                                        :max="1000"
                                        v-model.number="scope.row.serviceLimit"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="isAvailable"
                                label="是否可用"
                                min-width="70"
                            >
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="scope.row.isAvailable"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="45"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="onDeleteItem(scope.row)"
                                    >删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label-width="8em"
                    >
                        <el-button
                            type="primary"
                            size="small"
                            @click="onConfirm"
                        >保 存
                        </el-button>
                        <el-button
                            size="small"
                            @click="$router.back()"
                        >返 回
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'ShopStoreServiceTime',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                storeId: '',
                prepareGoodsDesc: '',
                prepareGoodsMode: 0,
            },
            // 表单校验规则
            formRules: {
                prepareGoodsDesc: {
                    required: true,
                    message: '请输入备货描述',
                    trigger: 'blur',
                },
                prepareGoodsMode: {
                    required: true,
                    message: '请输入选择备货方式',
                },
            },
            // 表格数据
            shopStoreServiceTimeList: [],
            serviceFrequencyList: [
                { value: 1, label: '星期一' },
                { value: 2, label: '星期二' },
                { value: 3, label: '星期三' },
                { value: 4, label: '星期四' },
                { value: 5, label: '星期五' },
                { value: 6, label: '星期六' },
                { value: 7, label: '星期日' },
            ],
            hourSelect: [
                '00',
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
            ],
            minSelect: ['00', '30'],
        };
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.shopStoreServiceTimeList.forEach(item => {
                    item.beginTime = item.beginTime1 + ':' + item.beginTime2;
                    item.endTime = item.endTime1 + ':' + item.endTime2;
                    item.orderEndTime = item.orderEndTime1 + ':' + item.orderEndTime2;

                    if (this.formModel.prepareGoodsMode === 0) {
                        item.serviceFrequency = 8;
                    }
                });
                this.$api.Sp.ShopStoreServiceTime.save({
                    ...this.formModel,
                    serviceTimeJson: JSON.stringify(this.shopStoreServiceTimeList),
                }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.$router.back();
                });
            });
        },
        init() {
            this.$api.Sp.ShopStoreServiceTime.getDetail({
                storeId: this.formModel.storeId,
            }).then(json => {
                const res = json.data.data;
                this.$utils.Comm.formModelMerge(this.formModel, res);
                this.shopStoreServiceTimeList = json.data.data.shopStoreServiceTimeList || [];
                this.shopStoreServiceTimeList.forEach(item => {
                    item.beginTime1 = item.beginTime.split(':')[0];
                    item.beginTime2 = item.beginTime.split(':')[1];
                    item.endTime1 = item.endTime.split(':')[0];
                    item.endTime2 = item.endTime.split(':')[1];
                    if (item.orderEndTime) {
                        item.orderEndTime1 = item.orderEndTime.split(':')[0];
                        item.orderEndTime2 = item.orderEndTime.split(':')[1];
                    }

                    if (item.serviceFrequency === 8) {
                        item.serviceFrequency = undefined;
                    }
                });
            });
        },
        /* -- 事件 -- */
        onAddItem() {
            this.shopStoreServiceTimeList.push({
                intervalDays: undefined,
                serviceLimit: 0,
                isAvailable: true,
            });
        },
        onDeleteItem(row) {
            this.shopStoreServiceTimeList.splice(this.shopStoreServiceTimeList.indexOf(row), 1);
        },
    },
    created() {
        this.formModel.storeId = this.$route.params.id;
        this.init();
    },
};
</script>

<style lang="scss">
</style>
