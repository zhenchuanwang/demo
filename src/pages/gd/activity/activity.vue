<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-tabs
                class="classify-tabs"
                v-model="queryFormModel.activityStatus"
                type="card"
                @tab-click="onQuery()"
            >
                <el-tab-pane
                    label="全部"
                    name="0"/>
                <el-tab-pane
                    label="未发布"
                    name="50"/>
                <el-tab-pane
                    label="进行中"
                    name="1"/>
                <el-tab-pane
                    label="已关闭"
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
                    prop="activityName"
                    label="活动名称"
                >
                    <el-input
                        v-model="queryFormModel.activityName"
                        placeholder="请输入活动名称"
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
                        @click="$router.push('/gd/activity/activity/edit/')"
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
                    prop="activityName"
                    label="活动名称"
                    min-width="100"
                />
                <el-table-column
                    prop="activityDesc"
                    label="活动描述"
                    min-width="100"
                />
                <el-table-column
                    prop="activityStatusName"
                    label="活动状态"
                    min-width="100"
                />
                <el-table-column
                    prop="operatorName"
                    label="创建人"
                    width="150"
                />
                <el-table-column
                    label="创建时间"
                    width="150"
                >
                    <template slot-scope="scope">
                        {{ scope.row.insertTime | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lastOperatorName"
                    label="修改人"
                    width="150"
                />
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
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/gd/activity/activity/goodsSaleStat?activityId=' + scope.row.id)"
                        >销量统计
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="$router.push('/gd/activity/activity/edit/' + scope.row.id)"
                        >{{ scope.row.activityStatus === 2 ? '查看' : '编辑' }}
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            v-if="scope.row.activityStatus === 50"
                            @click="onReleaseActivity(scope.row)"
                        >发布
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            v-if="scope.row.activityStatus === 1"
                            @click="onCloseActivity(scope.row)"
                        >关闭
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            v-if="scope.row.activityStatus === 50"
                            @click="onDelActivity(scope.row)"
                        >删除
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
    name: 'Activity',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                activityName: '', // 活动名称
                activityStatus: '', // 活动状态
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Pm.Activity.data(queryData).then(json => {
                const res = json.data;
                this.tableData = res.data;
                this.pagination = res.pagination;
                return Promise.resolve(json);
            });
        },
        /* -- 事件 -- */
        onReleaseActivity(row) {
            this.$confirm('是否发布该活动！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Pm.Activity.onReleaseActivity({ activityId: row.id }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                });
            });
        },
        onCloseActivity(row) {
            this.$confirm('是否关闭该活动！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Pm.Activity.onCloseActivity({ activityId: row.id }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                });
            });
        },
        onDelActivity(row) {
            this.$confirm('是否删除该活动！', '温馨提示', {
                type: 'warning',
            }).then(() => {
                this.$api.Pm.Activity.onDelActivity({ activityId: row.id }).then(json => {
                    const res = json.data;
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.onQuery();
                });
            });
        },
    },
};
</script>

<style lang="scss">
</style>
