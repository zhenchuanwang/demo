<!-- Created by henian.xu on 2018/8/29. -->

<template>
    <el-dropdown
        class="user-menu"
        @command="onCommand">
        <span class="user-group">
            欢迎您: {{ fullName }}
            <i class="el-icon-arrow-down el-icon--right"/>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
                v-if="userData.user.id === 1"
                command="clearCache">清除缓存</el-dropdown-item>
            <el-dropdown-item
                command="modifyPassword">修改密码</el-dropdown-item>
            <el-dropdown-item
                divided
                command="logout">退出</el-dropdown-item>
                <!--<el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
        </el-dropdown-menu>

        <el-dialog
            center
            title="修改密码"
            width="500px"
            :visible.sync="modifyPasswordDialog.isVisible">
            <el-form
                ref="modifyPasswordForm"
                label-width="6em"
                :model="modifyPasswordModel"
                :rules="modifyPasswordRules">
                <el-form-item
                    label="旧密码:"
                    prop="oldPassword">
                    <el-input 
                        type="password" 
                        v-model="modifyPasswordModel.oldPassword"/>
                </el-form-item>
                <el-form-item
                    label="新密码:"
                    prop="password">
                    <el-input 
                        type="password" 
                        v-model="modifyPasswordModel.password"/>
                </el-form-item>
                <el-form-item
                    label="确认密码:"
                    prop="confirmPassword">
                    <el-input 
                        type="password" 
                        v-model="modifyPasswordModel.confirmPassword"/>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    type="primary"
                    size="small"
                    @click="onModifyPasswordDialogConfirm"
                >确 定
                </el-button>
                <el-button
                    size="small"
                    @click="modifyPasswordDialog.isVisible = false"
                >取 消
                </el-button>
            </div>
        </el-dialog>
    </el-dropdown>
</template>

<script>
import pagesMixin from '@/mixin/layout/pageMixin';
import GlobalVar from 'globalVar';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('user');
export default {
    name: 'UserMenu',
    mixins: [pagesMixin],
    data() {
        return {
            modifyPasswordDialog: {
                isVisible: false,
            },
            modifyPasswordModel: {
                password: this.$globalVar.isDev ? '0123456' : '',
                oldPassword: this.$globalVar.isDev ? '123456' : '',
                confirmPassword: this.$globalVar.isDev ? '0123456' : '',
            },
            modifyPasswordRules: {
                password: {
                    required: true,
                    message: '不能为空',
                },
                oldPassword: {
                    required: true,
                    message: '不能为空',
                },
                confirmPassword: [
                    {
                        required: true,
                        message: '不能为空',
                    },
                    {
                        validator: this.againPassword,
                        message: '两处密码不相等',
                    },
                ],
            },
        };
    },
    computed: {
        ...mapGetters(['acount', 'fullName']),
    },
    methods: {
        onCommand(command) {
            switch (command) {
                case 'logout': {
                    this.$api.Rs.User.logout().then(json => {
                        const res = json.data;
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                        // TODO 应该写一下退出程序的清理方法
                        GlobalVar.isInitAppDataEnd = false;
                        this.$store.commit('global/menu/clearData');
                        this.$store.commit('global/power/clearData');
                        this.$router.replace({
                            path: '/login',
                            query: {
                                backUrl: encodeURIComponent(this.$route.fullPath || ''),
                            },
                        });
                    });
                    break;
                }
                case 'clearCache': {
                    this.$api.Rs.User.clearCache().then(json => {
                        const res = json.data;
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                    });
                    break;
                }
                case 'modifyPassword': {
                    this.modifyPassword();
                    break;
                }
            }
        },
        modifyPassword() {
            this.modifyPasswordDialog.isVisible = true;
        },
        againPassword(rule, value, callback) {
            if (value !== this.modifyPasswordModel.password) {
                callback(new Error(rule.message));
            } else {
                callback();
            }
        },
        onModifyPasswordDialogConfirm() {
            const $modifyPasswordForm = this.$refs.modifyPasswordForm;
            $modifyPasswordForm.validate().then(() => {
                this.$api.Rs.User.modifyPwdByUser(this.modifyPasswordModel).then(() => {
                    this.modifyPasswordDialog.isVisible = false;
                });
            });
        },
    },
};
</script>

<style lang="scss">
.user-menu {
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    color: #fff;

    > .user-group {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: $padding;
    }
}
</style>
