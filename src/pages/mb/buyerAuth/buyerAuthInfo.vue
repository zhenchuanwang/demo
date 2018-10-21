<!-- Created by henian.xu on 2018/7/20. -->

<template>
    <page>
        <!-- 表单区 -->
        <template slot="secondHeader">
            <el-tabs
                class="classify-tabs"
                v-model="queryFormModel.auditStatus"
                type="card"
                @tab-click="onQuery()"
            >
                <el-tab-pane
                    label="待审核"
                    name="10"/>
                <el-tab-pane
                    label="已认证"
                    name="100"/>
                <el-tab-pane
                    label="不通过"
                    name="20"/>
            </el-tabs>
            <el-form
                ref="queryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="queryFormModel"
            >
                <el-form-item
                    prop="mobile"
                    label="会员手机号码"
                >
                    <el-input
                        v-model="queryFormModel.mobile"
                        placeholder="请输入会员手机号码"
                    />
                </el-form-item>
                <el-form-item
                    prop="phone"
                    label="认证手机号码"
                >
                    <el-input
                        v-model="queryFormModel.phone"
                        placeholder="请输入认证手机号码"
                    />
                </el-form-item>
                <el-form-item
                    prop="authType"
                    label="认证类型"
                >
                    <dictionaries-picker
                        type="buyerAuthType"
                        v-model="queryFormModel.authType"
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
                    prop="mobile"
                    label="会员手机号码"
                    min-width="100"
                />
                <el-table-column
                    prop="authTypeName"
                    label="认证类型"
                    min-width="100"
                />
                <el-table-column
                    prop="phone"
                    label="认证手机号码"
                    min-width="100"
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
                            @click="$router.push('/mb/buyerAuth/buyerAuthInfo/Detail/' + scope.row.id)"
                        >{{ scope.row.auditStatus == 10 ? '审核' : '查看' }}
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
    name: 'BuyerAuthInfo',
    mixins: [pagesMixin, queryFormList],
    data() {
        return {
            queryFormModel: {
                mobile: '', // 会员手机号码
                phone: '', // 认证手机号码
                authType: '',
                auditStatus: '10',
            },
            // 表格数据
            tableData: [],
        };
    },
    methods: {
        /* -- 方法 -- */
        // 请求列表数据
        getListData(queryData) {
            return this.$api.Mb.BuyerAuthInfo.data(queryData).then(json => {
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
