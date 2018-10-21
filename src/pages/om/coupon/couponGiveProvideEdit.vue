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
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item
                            prop="couponDesc"
                            label="优惠券名称"
                            label-width="11em"
                        >
                            <el-input
                                v-model="formModel.couponDesc"
                                auto-complete="off"
                                :disabled="isEdit"
                            />
                        </el-form-item>
                        <el-form-item
                            prop="couponTempletId"
                            label="模板名称"
                            label-width="11em"
                        >
                            <el-select
                                v-model="couponTemplet"
                                value-key="id"
                                placeholder="请选择"
                                @change="someItemChange(couponTemplet)"
                                :disabled="isEdit"
                            >
                                <el-option
                                    v-for="item in couponTempletList"
                                    :key="item.id"
                                    :label="item.templetName"
                                    :value="item"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            prop="couponAmount"
                            label="优惠券金额"
                            label-width="11em"
                        >
                            <el-input
                                v-model="formModel.couponAmount"
                                auto-complete="off"
                                :disabled="isEdit"
                            />
                        </el-form-item>
                        <el-form-item
                            prop="couponUseAmount"
                            label="优惠券满减金额限制"
                            label-width="11em"
                        >
                            <el-input
                                v-model="formModel.couponUseAmount"
                                auto-complete="off"
                                :disabled="isEdit"
                            />
                        </el-form-item>
                        <el-form-item
                            prop="couponExpireMode"
                            label="优惠券到期模式"
                            label-width="11em"
                        >
                            <dictionaries-picker
                                type="couponExpireMode"
                                v-model="formModel.couponExpireMode"
                                :disabled="isEdit"
                            />
                        </el-form-item>
                        <el-form-item
                            prop="couponPeriod"
                            label="优惠券有效期(天)"
                            label-width="11em"
                            v-if="formModel.couponExpireMode == 1"
                        >
                            <el-input
                                v-model="formModel.couponPeriod"
                                auto-complete="off"
                                :disabled="isEdit"
                            />
                        </el-form-item>
                        <el-form-item
                            prop="couponExpireTime"
                            label="优惠券有效期至"
                            label-width="11em"
                            v-if="formModel.couponExpireMode == 2"
                        >
                            <el-date-picker
                                v-model="formModel.couponExpireTime"
                                type="datetime"
                                placeholder="选择优惠券有效期"
                                :disabled="isEdit"/>
                        </el-form-item>
                        <el-form-item

                            prop="giveScope"
                            label="发放对象"
                            label-width="11em"
                        >
                            <el-radio
                                v-model="formModel.giveScope"
                                label="2"
                                :disabled="isEdit">指定会员
                            </el-radio>
                            <el-radio
                                v-model="formModel.giveScope"
                                label="3"
                                :disabled="isEdit">指定会员等级
                            </el-radio>
                            <el-radio
                                v-model="formModel.giveScope"
                                label="1"
                                :disabled="isEdit">所有会员
                            </el-radio>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-form-item
                    label="会员列表"
                    label-width="11em"
                    v-if="formModel.giveScope == 2">
                    <div
                        class="ma-b"
                    >
                        <el-button-group>
                            <el-button
                                type="success"
                                icon="el-icon-plus"
                                size="small"
                                @click="onAddSelect"
                                :disabled="isEdit"
                            >新增会员
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
                            prop="nickName"
                            label="用户昵称"
                            min-width="100"
                        />
                        <el-table-column
                            label="头像"
                            width="120"
                        >
                            <template slot-scope="scope">
                                <ImageList
                                    :data="scope.row.avatar"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="电话"
                            min-width="100"
                        />
                        <el-table-column
                            prop="registerTime"
                            label="注册时间"
                            min-width="100"
                        />
                        <el-table-column
                            prop="buyerStatusName"
                            label=" 买家状态"
                            min-width="100"
                        />
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="45"
                            v-if="!isEdit"
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
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item
                            prop="buyerLevelId"
                            label="会员等级"
                            label-width="11em"
                            v-if="formModel.giveScope == 3"
                        >
                            <el-select
                                v-model="formModel.buyerLevelId"
                                placeholder="请选择"
                                :disabled="isEdit"
                            >
                                <el-option
                                    v-for="item in buyerLevelList"
                                    :key="item.id"
                                    :label="item.levelName"
                                    :value="item.id + ''"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            prop="remarks"
                            label="发放备注"
                            label-width="11em"
                        >
                            <el-input
                                type="textarea"
                                v-model="formModel.remarks"
                                auto-complete="off"
                                :disabled="isEdit"
                            />
                        </el-form-item>
                        <el-form-item
                            label-width="11em"
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
                </el-col>
            </el-form>
        </el-row>
        <!-- 弹框 -->
        <el-dialog
            title="新增会员"
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
                    prop="nickName"
                    label="用户昵称"
                >
                    <el-input
                        v-model="selectDialog.queryFormModel.nickName"
                        placeholder="请输入用户昵称"
                    />
                </el-form-item>
                <el-form-item
                    prop="mobile"
                    label="电话"
                >
                    <el-input
                        v-model="selectDialog.queryFormModel.mobile"
                        placeholder="请输入电话"
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
                        prop="nickName"
                        label="用户昵称"
                        min-width="100"
                    />
                    <el-table-column
                        label="头像"
                        width="120"
                    >
                        <template slot-scope="scope">
                            <ImageList
                                :data="scope.row.avatar"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="电话"
                        min-width="100"
                    />
                    <el-table-column
                        prop="registerTime"
                        label="注册时间"
                        min-width="100"
                    />
                    <el-table-column
                        prop="buyerStatusName"
                        label="买家状态"
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
import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item.vue';

export default {
    components: { ElFormItem },
    name: 'CouponGiveProvideEdit',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                // 优惠券名称
                couponDesc: '',
                // 模板名称ID
                couponTempletId: '',
                // 优惠券金额
                couponAmount: '',
                // 优惠券满减金额限制
                couponUseAmount: '',
                // 优惠券到期模式
                couponExpireMode: '',
                // 优惠券有效期(天)
                couponPeriod: '',
                // 优惠券到期时间
                couponExpireTime: '',
                // 发放对象
                giveScope: '',
                // 会员等级
                buyerLevelId: '',
                // 发放备注
                remarks: '',
                // 优惠券发放模式
                couponGiveMode: '',
                // 优惠券模板类型
                couponTempletType: '',
            },
            // 表单校验规则
            formRules: {
                couponDesc: {
                    required: true,
                    message: '请输入优惠券名称',
                    trigger: 'blur',
                },
                couponTempletId: {
                    required: true,
                    message: '请选择模板名称',
                },
                couponAmount: {
                    required: true,
                    message: '请输入优惠券金额',
                    trigger: 'blur',
                },
                couponUseAmount: {
                    required: true,
                    message: '请输入优惠券满减金额限制',
                    trigger: 'blur',
                },
                couponExpireMode: {
                    required: true,
                    message: '请选择优惠券到期模式',
                },
                couponPeriod: {
                    required: true,
                    message: '请输入优惠券有效期(天)',
                    trigger: 'blur',
                },
                couponExpireTime: {
                    required: true,
                    message: '请选择优惠券到期时间',
                    trigger: 'blur',
                },
                giveScope: {
                    required: true,
                    message: '请选择发放对象',
                },
                buyerLevelId: {
                    required: true,
                    message: '请选择会员等级',
                },
                remarks: {
                    required: true,
                    message: '请输入发放备注',
                    trigger: 'blur',
                },
            },
            // 优惠券模板列表
            couponTempletList: [],
            // 优惠券到期模式列表
            couponExpireModeList: [],
            // 会员等级列表
            buyerLevelList: [],
            // 模板对象
            couponTemplet: {},
            // 是否编辑
            isEdit: false,
            // 新增/编辑
            selectDialog: {
                // 对话框显示
                isVisible: false,
                // 查询数据
                queryFormModel: {
                    // 用户昵称
                    nickName: '',
                    // 电话
                    mobile: '',
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
                const buyerIdList = [];
                this.selectDataList.forEach(item => {
                    buyerIdList.push(item.id);
                });
                this.$api.Pm.CouponGive.save({
                    ...this.formModel,
                    buyerIds: buyerIdList.join(','),
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
        initShop() {
            this.$api.Pm.CouponGive.getDetail({ id: this.formModel.id }).then(json => {
                const res = json.data.data.couponGive;
                this.$utils.Comm.formModelMerge(this.formModel, res);
                this.formModel.giveScope = this.formModel.giveScope + '';
                this.couponTemplet = json.data.data.couponTempletName;
                this.selectDataList = json.data.data.buyerList || [];
            });
        },
        initCouponTempletList() {
            this.$api.Pm.CouponTemplet.data({ isAvailable: 1, couponGiveMode: 1 }).then(json => {
                const res = json.data.data;
                this.couponTempletList = res;
            });
        },
        initBuyerLevelList() {
            this.$api.Mb.BuyerLevel.select().then(json => {
                const res = json.data.data;
                this.buyerLevelList = res;
            });
        },
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
            return this.$api.Mb.Buyer.data({
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
        someItemChange(value) {
            this.formModel.couponTempletId = value.id + '';
            this.formModel.couponTempletType = value.templetType;
            this.formModel.couponAmount = value.couponAmount;
            this.formModel.couponUseAmount = value.couponUseAmount;
            this.formModel.couponPeriod = value.couponPeriod;
            this.formModel.couponGiveMode = value.couponGiveMode + '';
        },
    },
    created() {
        this.formModel.id = this.$route.params.id;
        if (this.formModel.id) {
            this.initShop();
            this.isEdit = true;
        } else {
            this.formModel.couponExpireMode = 1;
            this.formModel.giveScope = '2';
        }
        this.initCouponTempletList();
        this.initBuyerLevelList();
    },
};
</script>

<style lang="scss">
</style>
