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
                    prop="distributorName"
                    label="姓名"
                >
                    <el-input
                        v-model="queryFormModel.distributorName"
                        placeholder="请输入姓名"
                    />
                </el-form-item>
                <el-form-item
                    prop="distributorTel"
                    label="电话"
                >
                    <el-input
                        v-model="queryFormModel.distributorTel"
                        placeholder="请输入电话"
                    />
                </el-form-item>
                <el-form-item
                    prop="distributorLevelId"
                    label="分销商等级"
                >
                    <el-select
                        v-model="queryFormModel.distributorLevelId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in distributorLevelList"
                            :key="item.id"
                            :label="item.levelName"
                            :value="item.id + ''"/>
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
                        icon="el-icon-plus"
                        size="small"
                        @click="$router.push('/dt/dtmg/distributor/edit')"
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
            >
                <el-table-column
                    prop="distributorName"
                    label="姓名"
                    min-width="100"
                />
                <el-table-column
                    prop="distributorTel"
                    label="电话"
                    min-width="100"
                />
                <el-table-column
                    prop="distributorLevelName"
                    label="分销商等级"
                    min-width="100"
                />
                <el-table-column
                    prop="waitCompleteDistributorOrderCount"
                    label="未完成订单数"
                    min-width="100"
                />
                <el-table-column
                    prop="completeDistributorOrderCount"
                    label="已完成订单数"
                    min-width="100"
                />
                <el-table-column
                    prop="cancelDistributorOrderCount"
                    label="已取消订单数"
                    min-width="100"
                />
                <el-table-column
                    label="是否分销商"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        {{ scope.row.isDistributor ? '是' : '否' }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="审核状态"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        {{ scope.row.approvalStatusName }}
                        <label v-if="scope.row.approvalStatus === 3">
                            ({{ scope.row.approvalRemark }})
                        </label>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="120"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/dt/dtmg/distributor/edit/' + scope.row.id)"
                            v-if="scope.row.approvalStatus !== 3"
                        >{{ scope.row.approvalStatus === 2 ?'审核' : '编辑' }}
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="onCancelDistributor(scope.row.id)"
                            v-if="scope.row.approvalStatus === 1"
                        >取消分销商
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
    name: 'Distributor',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                distributorName: '', // 姓名
                distributorTel: '', // 电话
                distributorLevelId: '',
                isJoinDistributor: '1',
            },
            // 表格数据
            tableData: [],
            // 表格当前选中行
            currentTableSelect: [],
            //分销等级列表
            distributorLevelList: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Mb.Distributor.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onCancelDistributor(id) {
            this.$confirm('是否确定取消该分销商！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Mb.Distributor.cancelDistributor({ id }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                });
            });
        },
        initDistributorLevelList() {
            this.$api.Mb.DistributorLevel.select().then(json => {
                this.distributorLevelList = json.data.data;
            });
        },
    },
    created() {
        this.initDistributorLevelList();
    },
};
</script>

<style lang="scss">
</style>
