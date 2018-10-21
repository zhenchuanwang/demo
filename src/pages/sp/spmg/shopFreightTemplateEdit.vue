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
                        prop="templateName"
                        label="模板名称"
                        label-width="8em"
                    >
                        <el-input
                            v-model="formModel.templateName"
                            auto-complete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="billingMethod"
                        label="计费方式"
                        label-width="8em"
                    >
                        <dictionaries-picker
                            type="freightBillingMethod"
                            v-model="formModel.billingMethod"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="templateDesc"
                        label="计费规则说明"
                        label-width="8em"
                    >
                        <el-input
                            type="textarea"
                            v-model="formModel.templateDesc"
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
                        label="配送区域"
                        label-width="8em"
                    >
                        <el-button
                            type="primary"
                            size="small"
                            @click="addShopFreightTemplateRg()"
                        >新增
                        </el-button>
                    </el-form-item>
                    <el-form-item
                        label-width="8em"
                    >
                        <el-table
                            stripe
                            border
                            size="small"
                            :data="shopFreightTemplateRgList"
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="regionRangeName"
                                label="配送区域"
                                min-width="20"
                            />
                            <el-table-column
                                label="配送规则"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="onAddFreightTemplateRule(scope.row.shopFreightTemplateRuleList)"
                                    >新增规则
                                    </el-button>
                                    <el-table
                                        stripe
                                        border
                                        size="small"
                                        :data="scope.row.shopFreightTemplateRuleList"
                                        style="width: 100%"
                                    >
                                        <el-table-column
                                            prop="rangeStart"
                                            label="开始值"
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
                                            label="结束值"
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
                                            label="首值"
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
                                            label="首价格"
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
                                            label="增量值"
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
                                            label="增量价格"
                                            min-width="100"
                                        >
                                            <template slot-scope="scope">
                                                <el-input
                                                    v-model="scope.row.increasePrice"
                                                />
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            fixed="right"
                                            label="操作"
                                            width="90"
                                        >
                                            <template slot-scope="ruleScope">
                                                <el-button
                                                    type="text"
                                                    size="small"
                                                    @click="onDeleteTemplateRule(scope.row.shopFreightTemplateRuleList, ruleScope.row)"
                                                >删除规则
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
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
                                        @click="addShopFreightTemplateRg(scope.row)"
                                    >编辑区域
                                    </el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="onDeleteTemplateRg(scope.row)"
                                    >删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
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

        <el-dialog
            title="新增配送区域"
            center
            width="1300px"
            :visible.sync="addDialog.isVisible"
            @closed="onAddDialogCancel"
        >
            <el-form
                ref="freightForm"
                size="small"
            >
                <el-row>
                    <el-col :span="11">
                        <el-tree
                            show-checkbox
                            node-key="id"
                            ref="regionTree"
                            :data="regionTree"
                            :props="defaultProps"/>
                    </el-col>
                    <el-col 
                        :span="2" 
                        class="ta-c">
                        <el-button
                            type="primary"
                            size="small"
                            @click="addSelectRegionNode"
                        >添加
                        </el-button>
                        <el-button
                            class="nma-a ma-t"
                            type="primary"
                            size="small"
                            @click="delSelectRegionNode"
                        >移除
                        </el-button>
                    </el-col>
                    <el-col :span="11">
                        <el-tree
                            show-checkbox
                            node-key="id"
                            ref="selectTree"
                            :data="selectRegionTree"
                            :props="defaultProps"/>
                    </el-col>
                </el-row>
            </el-form>
            <div 
                slot="footer" 
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    @click="onAddDialogConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="onAddDialogCancel"
                >取 消
                </el-button>
            </div>
        </el-dialog>
    </page>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';

export default {
    name: 'ShopFreightTemplateEdit',
    mixins: [pagesMixin],
    data() {
        return {
            // 表单数据
            formModel: {
                id: '',
                templateName: '',
                billingMethod: '',
                templateDesc: '',
                isAvailable: true,
            },
            // 表单校验规则
            formRules: {
                templateName: {
                    required: true,
                    message: '请输入模板名称',
                    trigger: 'blur',
                },
                billingMethod: {
                    required: true,
                    message: '请输入计费方式',
                },
            },
            regionList: [],
            regionMap: {},
            defaultProps: {
                children: 'children',
                label: 'name',
            },
            shopFreightTemplateRgList: [],
            addDialog: {
                // 对话框显示
                isVisible: false,
                selectRegionList: [],
                selectRegionMap: {},
                regionList: [],
                regionMap: {},
                currentRow: {},
            },
        };
    },
    computed: {
        selectRegionTree() {
            const jsonStr = JSON.stringify(this.addDialog.selectRegionList);
            return this.$utils.Convert.listToTree(JSON.parse(jsonStr));
        },
        regionTree() {
            const jsonStr = JSON.stringify(this.addDialog.regionList);
            return this.$utils.Convert.listToTree(JSON.parse(jsonStr));
        },
    },
    methods: {
        onConfirm() {
            const { addForm } = this.$refs;
            addForm.validate().then(() => {
                this.$api.Sp.ShopFreightTemplate.save({
                    ...this.formModel,
                    shopFreightTemplateRgStr: JSON.stringify(this.shopFreightTemplateRgList),
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
            this.$api.Sp.ShopFreightTemplate.getDetail({ id: this.formModel.id }).then(json => {
                const shopFreightTemplate = json.data.data.shopFreightTemplate;
                this.$utils.Comm.formModelMerge(this.formModel, shopFreightTemplate);
                this.shopFreightTemplateRgList = json.data.data.shopFreightTemplateRgList;
            });
        },
        initRegionList() {
            this.$api.Rs.Region.selectAll().then(json => {
                this.regionList = json.data.data;
                // 所有地区数据
                const regionList = JSON.parse(JSON.stringify(this.regionList));
                regionList.forEach(item => {
                    this.regionMap[item.id] = item;
                });
                this.$utils.Convert.listToTree(regionList);
            });
        },
        addShopFreightTemplateRg(row) {
            // 总区域列表
            this.addDialog.regionList = [];
            this.addDialog.regionMap = {};
            // 已选择区域
            this.addDialog.selectRegionList = [];
            this.addDialog.selectRegionMap = {};
            this.addDialog.currentRow = null;
            /// 当前选择ID
            let selectIdList = null;
            if (row) {
                selectIdList = row.regionRange.split(',');
                this.addDialog.currentRow = row;
            }
            // 已选择ID
            let allSelectIdList = [];
            this.shopFreightTemplateRgList.forEach(item => {
                allSelectIdList.push(item.regionRange);
            });
            if (allSelectIdList.length !== 0) {
                allSelectIdList = allSelectIdList.join(',').split(',');
            } else {
                allSelectIdList = null;
            }
            const regionList = [];
            this.regionList.forEach(item => {
                // 当前选择数据
                if (selectIdList && selectIdList.indexOf(item.id + '') !== -1) {
                    // 当前选中节点
                    this.addDialog.selectRegionMap[item.id] = { ...item };
                    this.addDialog.selectRegionList.push(this.addDialog.selectRegionMap[item.id]);
                }
                if (allSelectIdList && allSelectIdList.indexOf(item.id + '') !== -1) {
                    regionList.push({ ...item });
                }
            });
            // 构建已选择数据
            const removeIdList = [];
            this.$utils.Convert.listToTree(regionList).forEach(province => {
                // 省
                let isSelectAllDisctict = true;
                province.children.forEach(city => {
                    // 市
                    // 判断是否选择全部的区县
                    if (city.children.length === this.regionMap[city.id].children.length) {
                        // 选择全部区县
                        removeIdList.push(city.id);
                    } else {
                        // 区县
                        isSelectAllDisctict = false;
                    }
                    city.children.forEach(district => {
                        removeIdList.push(district.id);
                    });
                });
                if (province.children.length === this.regionMap[province.id].children.length && isSelectAllDisctict) {
                    // 选择全部省及省下面所有市和区
                    removeIdList.push(province.id);
                }
            });
            this.regionList.forEach(item => {
                if (removeIdList.indexOf(item.id) === -1) {
                    this.addDialog.regionMap[item.id] = { ...item };
                    this.addDialog.regionList.push(this.addDialog.regionMap[item.id]);
                }
            });
            this.addDialog.isVisible = true;
        },
        addSelectRegionNode() {
            const { regionTree } = this.$refs;
            const selectHalfNode = regionTree.getHalfCheckedNodes();
            const { selectRegionMap, selectRegionList, regionMap, regionList } = this.addDialog;
            selectHalfNode.forEach(item => {
                if (!selectRegionMap[item.id]) {
                    selectRegionMap[item.id] = { ...regionMap[item.id] };
                    selectRegionList.push(selectRegionMap[item.id]);
                }
            });
            const selectNode = regionTree.getCheckedNodes(false);
            selectNode.forEach(item => {
                if (!selectRegionMap[item.id]) {
                    selectRegionMap[item.id] = { ...regionMap[item.id] };
                    selectRegionList.push(selectRegionMap[item.id]);
                }
                regionTree.setChecked(item.id, false, true);
                regionList.splice(regionList.indexOf(regionMap[item.id]), 1);
                delete regionMap[item.id];
            });
        },
        delSelectRegionNode() {
            const { selectTree } = this.$refs;
            const selectHalfNode = selectTree.getHalfCheckedNodes();
            const { selectRegionMap, selectRegionList, regionMap, regionList } = this.addDialog;
            selectHalfNode.forEach(item => {
                if (!regionMap[item.id]) {
                    regionMap[item.id] = { ...selectRegionMap[item.id] };
                    regionList.push(regionMap[item.id]);
                }
            });
            const selectNode = selectTree.getCheckedNodes(false);
            selectNode.forEach(item => {
                if (!regionMap[item.id]) {
                    regionMap[item.id] = { ...selectRegionMap[item.id] };
                    regionList.push(regionMap[item.id]);
                }
                selectTree.setChecked(item.id, false, true);
                selectRegionList.splice(selectRegionList.indexOf(selectRegionMap[item.id]), 1);
                delete selectRegionMap[item.id];
            });
        },
        onAddDialogConfirm() {
            if (this.addDialog.selectRegionList.length === 0) {
                this.$message.error('请至少选择一个地区');
                return;
            }
            // 计算所选地区名称
            // 已选择地区数据
            const selectRegionList = this.$utils.Convert.listToTree(
                JSON.parse(JSON.stringify(this.addDialog.selectRegionList)),
            );
            const regionRangeNameList = [];
            selectRegionList.forEach(province => {
                // 省
                let isSelectAllDisctict = true;
                const cityNameList = [];
                province.children.forEach(city => {
                    // 市
                    // 判断是否选择全部的区县
                    if (city.children.length === this.regionMap[city.id].children.length) {
                        // 选择全部区县
                        cityNameList.push(city.name);
                    } else {
                        // 区县
                        const districtNameList = [];
                        city.children.forEach(district => {
                            districtNameList.push(district.name);
                        });
                        cityNameList.push(city.name + '<' + districtNameList.join(',') + '>');
                        isSelectAllDisctict = false;
                    }
                });
                if (province.children.length === this.regionMap[province.id].children.length && isSelectAllDisctict) {
                    // 选择全部省及省下面所有市和区
                    regionRangeNameList.push(province.name);
                } else {
                    regionRangeNameList.push(province.name + '(' + cityNameList.join(',') + ')');
                }
            });
            // 所有选择ID
            const regionRangeList = [];
            this.addDialog.selectRegionList.forEach(item => {
                regionRangeList.push(item.id);
            });
            if (this.addDialog.currentRow) {
                // 编辑
                this.addDialog.currentRow.regionRange = regionRangeList.join(',');
                this.addDialog.currentRow.regionRangeName = regionRangeNameList.join(',');
            } else {
                // 新增
                this.shopFreightTemplateRgList.push({
                    regionRange: regionRangeList.join(','),
                    regionRangeName: regionRangeNameList.join(','),
                    shopFreightTemplateRuleList: [{}],
                });
            }
            this.addDialog.isVisible = false;
        },
        onAddDialogCancel() {
            const { freightForm } = this.$refs;
            freightForm.resetFields();
            this.addDialog.isVisible = false;
        },
        onDeleteTemplateRg(row) {
            this.shopFreightTemplateRgList.splice(this.shopFreightTemplateRgList.indexOf(row), 1);
        },
        onAddFreightTemplateRule(row) {
            row.push({});
        },
        onDeleteTemplateRule(list, row) {
            if (list.length !== 1) {
                list.splice(list.indexOf(row), 1);
            } else {
                this.$message.error('至少需要一条运费规则');
            }
        },
    },
    created() {
        this.initRegionList();
        this.formModel.id = this.$route.params.id;
        if (this.formModel.id) {
            this.init();
        }
    },
};
</script>

<style lang="scss">
</style>
