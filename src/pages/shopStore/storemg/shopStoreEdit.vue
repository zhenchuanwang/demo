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
                        prop="storeName"
                        label="门店名称"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.storeName"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="storeLogo"
                        label="门店Logo"
                        label-width="8em"
                    >
                        <upload
                            action="/rs/attachment/uploadStoreLogo"
                            :limit="1"
                            v-model="formModel.storeLogo"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="storeAdImage"
                        label="门店广告图"
                        label-width="8em"
                    >
                        <upload
                            action="/rs/attachment/uploadStoreLogo"
                            :limit="1"
                            v-model="formModel.storeAdImage"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="openTime"
                        label="营业时间"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.openTime"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="storeNotice"
                        label="门店公告"
                        label-width="8em"
                    >
                        <el-input
                            type="textarea"
                            v-model="formModel.storeNotice"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="storeType"
                        label="门店类型"
                        label-width="8em"
                    >
                        <checkbox-group-andOr
                            type="storeType"
                            v-model="formModel.storeType"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="storeDesc"
                        label="门店简介"
                        label-width="8em"
                    >
                        <el-input
                            type="textarea"
                            v-model="formModel.storeDesc"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="storeRegionId"
                        label="门店地址"
                        label-width="8em"
                    >
                        <CascaderPicker
                            :api-class="selectApi"
                            v-model="formModel.storeRegionId"
                            :p-id="2"
                            :min-lv="2"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="storeDetailAddress"
                        label="门店详细地址"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.storeDetailAddress"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="latLng"
                        label="门店坐标"
                        label-width="8em"
                    >
                        <LatLngPicker v-model="formModel.latLng"/>
                    </el-form-item>
                    <el-form-item
                        prop="contactFullname"
                        label="联系人姓名"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.contactFullname"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="contactTel"
                        label="联系人电话"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.contactTel"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="isAvailable"
                        label="是否可用"
                        label-width="8em"
                    >
                        <el-switch
                            v-model="formModel.isAvailable"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item
                        label="门店管理员"
                        label-width="8em">
                        <div
                            class="ma-b"
                        >
                            <el-button-group>
                                <el-button
                                    type="success"
                                    icon="el-icon-plus"
                                    size="small"
                                    @click="onAddSelect"
                                >新增管理员
                                </el-button>
                            </el-button-group>
                        </div>

                        <!-- 表格 -->
                        <el-table
                            stripe
                            border
                            size="small"
                            :data="selectDataList"
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="userName"
                                label="用户名"
                                min-width="100"
                            />
                            <el-table-column
                                prop="fullName"
                                label="姓名"
                                min-width="100"
                            />
                            <el-table-column
                                prop="orgName"
                                label="部门"
                                min-width="100"
                            />
                            <el-table-column
                                prop="userStatusName"
                                label="用户状态"
                                min-width="100"
                            />
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="45"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="onDeleteSelect(scope.row)"
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
        <!-- 弹框 -->
        <el-dialog
            title="新增管理员"
            center
            width="1200px"
            :visible.sync="selectDialog.isVisible"
            @closed="onSelectCancel"
        >
            <!-- 表单区 -->
            <el-form
                ref="selectDialogQueryForm"
                class="second-header npa-b"
                size="small"
                :inline="true"
                :model="selectDialog.queryFormModel"
            >
                <el-form-item
                    prop="userName"
                    label="用户名"
                >
                    <el-input
                        v-model="selectDialog.queryFormModel.userName"
                        placeholder="请输入用户名"
                    />
                </el-form-item>
                <el-form-item
                    prop="fullName"
                    label="姓名"
                >
                    <el-input
                        v-model="selectDialog.queryFormModel.fullName"
                        placeholder="请输入姓名"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onSelectDialogQuery()"
                    >查询
                    </el-button>
                    <el-button
                        type="success"
                        @click="onResetSelectDialog"
                    >重置
                    </el-button>
                </el-form-item>
            </el-form>

            <!-- 内容 -->
            <div class="body">
                <!-- 表格 -->
                <el-table
                    stripe
                    border
                    size="small"
                    :data="selectDialog.tableData"
                    style="width: 100%"
                    height="400"
                    row-key="id"
                    ref="selectDialogTable"
                    @selection-change="onSelectDialogSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="36"
                    />
                    <el-table-column
                        prop="userName"
                        label="用户名"
                        min-width="100"
                    />
                    <el-table-column
                        prop="fullName"
                        label="姓名"
                        min-width="100"
                    />
                    <el-table-column
                        prop="orgName"
                        label="部门"
                        min-width="100"
                    />
                    <el-table-column
                        prop="userStatusName"
                        label="用户状态"
                        min-width="100"
                    />
                </el-table>

                <!-- 分页 -->
                <div class="ma-t ta-r">
                    <pagination
                        v-model="selectDialog.pagination"
                        @input="onSelectDialogQuery"
                    />
                </div>
            </div>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    @click="onSelectConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onSelectCancel"
                >取 消
                </el-button>
            </div>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'ShopStoreEdit',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                storeName: '',
                storeLogo: [],
                storeAdImage: [],
                openTime: '',
                storeNotice: '',
                storeType: 0,
                storeDesc: '',
                storeRegionId: '',
                storeDetailAddress: '',
                contactFullname: '',
                contactTel: '',
                isAvailable: true,
                latLng: '',
            },
            // 表单校验规则
            formRules: {
                storeName: {
                    required: true,
                    message: '请输入门店名称',
                    trigger: 'blur',
                },
                storeLogo: {
                    type: 'array',
                    required: true,
                    message: '请上传门店Logo',
                },
                storeAdImage: {
                    type: 'array',
                    required: true,
                    message: '请上传门店广告图',
                },
                openTime: {
                    required: true,
                    message: '请输入营业时间',
                    trigger: 'blur',
                },
                storeType: [
                    {
                        required: true,
                        message: '请选择门店类型',
                    },
                    {
                        type: 'integer',
                        min: 1,
                        message: '请选择门店类型',
                    },
                ],
                storeRegionId: {
                    required: true,
                    message: '请选择门店地址',
                    trigger: 'blur',
                },
                storeDetailAddress: {
                    required: true,
                    message: '请输入门店详细地址',
                    trigger: 'blur',
                },
                contactFullname: {
                    required: true,
                    message: '请输入联系人姓名',
                    trigger: 'blur',
                },
                contactTel: {
                    required: true,
                    message: '请输入联系人电话',
                    trigger: 'blur',
                },
                isAvailable: {
                    required: true,
                    message: '请选择是否可用',
                },
                latLng: {
                    required: true,
                    message: '请选择门店坐标',
                    trigger: 'blur',
                },
            },
            selectApi: this.$api.Rs.Region,

            // 新增/编辑
            selectDialog: {
                // 对话框显示
                isVisible: false,
                // 查询数据
                queryFormModel: {
                    userName: '', // 用户名
                    fullName: '', // 姓名
                },
                // 表单数据
                tableData: [],
                // 分页
                pagination: {},
                // 当前选择行
                currentTableSelect: [],
            },
            // 表格数据
            selectDataList: [],
            // 表格当前选中行
            currentTableSelect: [],
        };
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                const userIdList = [];
                this.selectDataList.forEach(item => {
                    userIdList.push(item.id);
                });
                this.$api.Sp.ShopStore.save({
                    ...this.formModel,
                    userIds: userIdList.join(','),
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
        init(type) {
            this.$api.Sp.ShopStore.getDetail({ id: this.formModel.id, type: type }).then(json => {
                const res = json.data.data.shopStore;
                this.$utils.Comm.formModelMerge(this.formModel, res);
                this.selectDataList = json.data.data.shopStoreUserList || [];
            });
        },
        /* -- 事件 -- */
        onAddSelect() {
            this.selectDialog.isVisible = true;
            this.$nextTick(() => {
                this.onSelectDialogQuery();
                // 初始化已选择数据
                if (this.$refs.selectDialogTable) {
                    this.$refs.selectDialogTable.clearSelection();
                }
                this.selectDataList.forEach(item => {
                    this.$refs.selectDialogTable.toggleRowSelection(item, true);
                });
            });
        },
        onSelectDialogQuery(pagination) {
            return this.$api.Rs.User.data({
                ...this.selectDialog.queryFormModel,
                ...pagination,
                isShopStoreUser: 0,
                storeIdNE: this.formModel.id,
            }).then(json => {
                const res = json.data;
                this.selectDialog.tableData = res.data;
                this.selectDialog.pagination = res.pagination;
            });
        },
        onSelectDialogSelectionChange(val) {
            this.selectDialog.currentTableSelect = val;
        },
        onResetSelectDialog() {
            this.$refs.selectDialogQueryForm.resetFields();
        },
        onSelectConfirm() {
            this.selectDataList = [...this.selectDialog.currentTableSelect];
            this.selectDialog.isVisible = false;
        },
        onSelectCancel() {
            this.selectDialog.isVisible = false;
        },
        onDeleteSelect(row) {
            this.selectDataList.splice(this.selectDataList.indexOf(row), 1);
        },
    },
    created() {
        this.formModel.id = this.$route.params.id;
        if (this.$route.name === 'shopStore-storemg-shopStoreEdit') {
            // 店铺编辑
            if (this.formModel.id) {
                this.init(1);
            }
        } else {
            this.init(2);
        }
    },
};
</script>

<style lang="scss">
</style>
