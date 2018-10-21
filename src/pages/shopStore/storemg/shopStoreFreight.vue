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
                        prop="startDeliverAmount"
                        label="起送金额(元)"
                        label-width="10em"
                    >
                        <el-input
                            v-model="formModel.startDeliverAmount"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="freeDeliverAmount"
                        label="免邮费金额(元)"
                        label-width="10em"
                    >
                        <el-input
                            v-model="formModel.freeDeliverAmount"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="maxDeliverRange"
                        label="最大配送范围(km)"
                        label-width="10em"
                    >
                        <el-input-number
                            controls-position="right"
                            :min="0"
                            :max="1000"
                            v-model.number="formModel.maxDeliverRange"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="maxDeliverTime"
                        label="最长配送时间(分钟)"
                        label-width="10em"
                    >
                        <el-input-number
                            controls-position="right"
                            :min="0"
                            :max="1000"
                            v-model.number="formModel.maxDeliverTime"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="freightDesc"
                        label="运费描述"
                        label-width="10em"
                    >
                        <el-input
                            v-model="formModel.freightDesc"
                            auto-complete="off"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item
                        label="运费规则"
                        label-width="10em">
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
                            :data="freightRouteList"
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="rangeStart"
                                label="开始值(km)"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.rangeStart"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="rangeEnd"
                                label="结束值(km)"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.rangeEnd"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="rangeFirst"
                                label="首值(km)"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.rangeFirst"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="firstPrice"
                                label="首价格(元)"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.firstPrice"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="increaseValue"
                                label="增量值(km)"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.increaseValue"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="increasePrice"
                                label="增量价格(元)"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.increasePrice"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="planDeliverTime"
                                label="预计送达时间(分钟)"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.planDeliverTime"
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
                        label-width="10em"
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
                startDeliverAmount: '',
                freeDeliverAmount: '',
                freightDesc: '',
                maxDeliverRange: '',
                maxDeliverTime: '',
            },
            // 表单校验规则
            formRules: {
                startDeliverAmount: {
                    required: true,
                    message: '请输入起送金额',
                },
                freeDeliverAmount: {
                    required: true,
                    message: '请输入免邮费金额',
                },
                maxDeliverRange: {
                    required: true,
                    message: '请输入最大配送范围',
                },
            },
            // 表格数据
            freightRouteList: [],
        };
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Sp.ShopStoreFreight.save({
                    ...this.formModel,
                    freightRouteJson: JSON.stringify(this.freightRouteList),
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
            this.$api.Sp.ShopStoreFreight.getDetail({
                storeId: this.formModel.storeId,
            }).then(json => {
                const res = json.data.data;
                if (res) {
                    this.$utils.Comm.formModelMerge(this.formModel, res);
                    this.freightRouteList = json.data.data.freightRouteList || [];
                }
            });
        },
        /* -- 事件 -- */
        onAddItem() {
            this.freightRouteList.push({});
        },
        onDeleteItem(row) {
            this.freightRouteList.splice(this.freightRouteList.indexOf(row), 1);
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
