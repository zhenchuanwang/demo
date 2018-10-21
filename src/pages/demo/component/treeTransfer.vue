<!-- Created by henian.xu on 2018/7/31. -->

<template>
    <page>
        <el-row>
            <el-col :span="11">
                <el-tree
                    ref="leftTree"
                    show-checkbox
                    :props="{
                        children: 'children',
                        label: 'name',
                    }"
                    node-key="id"
                    :default-expanded-keys="expandedKeys"
                    @node-expand="onLeftNodeExpand"
                    @node-collapse="onLeftNodeCollapse"
                    :data="leftRegionData"
                />
            </el-col>
            <el-col 
                :span="2" 
                class="ta-c">
                <el-button
                    @click="onTreeAdd"
                >&gt;&gt;
                </el-button>
                <el-button
                    class="nma-a ma-t"
                    @click="onTreeDelete"
                >&lt;&lt;
                </el-button>
            </el-col>
            <el-col :span="11">
                <el-tree
                    ref="rightTree"
                    show-checkbox
                    :props="{
                        children: 'children',
                        label: 'name',
                    }"
                    node-key="id"
                    :default-expanded-keys="expandedKeys"
                    @node-expand="onRightNodeExpand"
                    @node-collapse="onRightNodeCollapse"
                    :data="rightRegionData"
                />
            </el-col>
        </el-row>
    </page>
</template>

<script>
export default {
    name: 'FormDemo',
    data() {
        return {
            regionList: [],
            // expandedKeys: [],
            expandedKeysMap: {},
            leftExpandedKeys: [],
            rightExpandedKeys: [],
        };
    },
    computed: {
        minLv() {
            return this.regionList.reduce((prev, curr) => {
                if (!curr.id) return prev;
                return curr.lv < prev ? curr.lv : prev;
            }, 9999999);
        },
        regionMap() {
            return this.regionList.reduce((prev, curr) => {
                prev[curr.id] = curr;
                return prev;
            }, {});
        },
        leftRegionData() {
            const data = JSON.parse(JSON.stringify(this.regionList));
            return this.listToTree(data, 1);
        },
        rightRegionData() {
            const data = JSON.parse(JSON.stringify(this.regionList));
            return this.listToTree(data, 2);
        },
        expandedKeys() {
            const res = [];
            const { expandedKeysMap } = this;
            for (const key in expandedKeysMap) {
                if (expandedKeysMap.hasOwnProperty(key)) {
                    expandedKeysMap[key] && res.push(+key);
                }
            }
            return res;
        },
    },
    methods: {
        listToTree(list, status = 1, lv) {
            const res = [];
            const parentNodeMap = {};
            let minLv = 9999999;
            list.forEach(item => {
                // item.id 有值时才可能是父节点
                if (item.id) {
                    parentNodeMap[item.id] = item;
                    minLv = lv || (item.lv < minLv ? item.lv : minLv);
                }
            });
            list.forEach(item => {
                if (!(status & item.status)) return;
                if (item.lv === minLv) {
                    res.push(item);
                } else {
                    const parentNode = parentNodeMap[item.parentId];
                    if (parentNode) {
                        parentNode.children = parentNode.children || [];
                        parentNode.children.push(item);
                    } else {
                        console.error('此节点数据有问题', item);
                    }
                }
            });
            this.$utils.Convert.sortTreeData(res);
            return res;
        },
        onTreeAdd() {
            const { leftTree } = this.$refs;
            const checkedNode = leftTree.getCheckedNodes();
            const halfNode = leftTree.getHalfCheckedNodes();
            this.setListItemsStatus(checkedNode, 2);
            this.setListItemsStatus(halfNode, 1 | 2);
        },
        onTreeDelete() {
            const { rightTree } = this.$refs;
            const checkedNode = rightTree.getCheckedNodes();
            const halfNode = rightTree.getHalfCheckedNodes();
            this.setListItemsStatus(checkedNode, 1);
            this.setListItemsStatus(halfNode, 1 | 2);
        },
        setListItemsStatus(list, status = 1) {
            list.forEach(item => {
                const id = item.id;
                const mapItem = this.regionMap[id];
                if (!mapItem) return;
                mapItem.status = status;
            });
        },
        recordExpandedKeys(key, val) {
            const { expandedKeysMap } = this;
            this.$set(expandedKeysMap, key, val);
            expandedKeysMap[key] = val;
        },
        setNodeExpanded(treeComponent, key, val) {
            this.recordExpandedKeys(key, val);
            const node = treeComponent.getNode(key);
            if (!node) return;
            node.expanded = val;
        },
        onLeftNodeCollapse(data /*, currNode, currVm*/) {
            const { rightTree } = this.$refs;
            this.setNodeExpanded(rightTree, data.id, false);
        },
        onLeftNodeExpand(data, currNode, currVm) {
            const { rightTree } = this.$refs;
            this.setNodeExpanded(rightTree, data.id, true);
            console.log(data, currNode, currVm);
        },
        onRightNodeCollapse(data /*, currNode, currVm*/) {
            const { leftTree } = this.$refs;
            this.setNodeExpanded(leftTree, data.id, false);
        },
        onRightNodeExpand(data /*, currNode, currVm*/) {
            const { leftTree } = this.$refs;
            this.setNodeExpanded(leftTree, data.id, true);
        },
    },
    created() {
        // Stat.Region.selectAll().then((json) => {
        this.$api.Rs.Org.selectAll().then(json => {
            // Comm.
            this.regionList = json.data.data.map(item => {
                item.status = 1;
                return item;
            });
        });
    },
};
</script>

<style lang="scss">
</style>
