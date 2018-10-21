<!-- Created by henian.xu on 2018/7/18. -->

<template>
    <div
        class="login-container"
        :style="`background-image: url('${$globalVar.site.loginImageUrl||loginBg}');`"
        v-page-title="'登录'"
        @keyup.enter="onSubmit">
        <div class="inner">
            <div class="header">{{ $globalVar.site.name }}</div>
            <div class="body">
                <el-form
                    ref="form"
                    label-width="60px"
                    :model="formModel"
                    :rules="formRules"
                >
                    <el-form-item
                        label="账号:"
                        prop="account">
                        <el-input v-model="formModel.account"/>
                    </el-form-item>
                    <el-form-item
                        label="密码:"
                        prop="password">
                        <el-input
                            type="password"
                            v-model="formModel.password"/>
                    </el-form-item>
                    <!--<el-form-item label="验证码:">
                        <div class="captcha">
                            <el-input v-model="formModel.type"/>
                            <img
                                class="captcha-img"
                                src="@/assets/images/captcha.png">
                        </div>
                    </el-form-item>-->
                    <!--<el-form-item class="nma-a">-->
                    <el-button
                        class="w-100per"
                        type="primary"
                        @click="onSubmit"
                    >立即登录
                    </el-button>
                    <!--</el-form-item>-->
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapMutations } = createNamespacedHelpers('user');
import loginBg from '@/assets/images/login-bg.jpg';

export default {
    name: 'LoginPage',
    data() {
        return {
            loginBg,
            formModel: {
                account: this.$globalVar.isDev ? 'admin' : '',
                password: this.$globalVar.isDev ? 'admin' : '',
            },
            formRules: {
                account: {
                    required: true,
                    message: '请输入账号',
                },
                password: {
                    required: true,
                    message: '请输入密码',
                },
            },
            errorMessage: false,
        };
    },
    computed: {
        $$form() {
            return this.$refs.form;
        },
        backUrl() {
            return decodeURIComponent(this.$route.query.backUrl) || '/';
        },
    },
    methods: {
        ...mapMutations(['updateUserData']),
        onSubmit() {
            if (this.errorMessage) return;
            this.$$form.validate().then(() => {
                this.$api.Rs.User.login({
                    ...this.formModel,
                    _isHandleError: true,
                }).then(json => {
                    const res = json.data;
                    if (!res.success) {
                        this.errorMessage = true;
                        const self = this;
                        this.$alert(res.msg, '温馨提示', {
                            type: 'error',
                            callback() {
                                setTimeout(() => {
                                    self.errorMessage = false;
                                }, 500);
                            },
                        });
                        return;
                    }
                    this.updateUserData(res.data);
                    this.$message({
                        message: res.msg,
                        type: 'success',
                    });
                    this.$router.replace(this.backUrl);
                });
            });
        },
    },
};
</script>

<style lang="scss">
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: transparent center no-repeat;
    background-size: cover;

    > .inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > .header {
            letter-spacing: 5px;
            font-size: 50px;
            font-weight: bold;
            margin-bottom: $margin-big;
            color: #fff;
        }
        > .body {
            background-color: rgba(0, 0, 0, 0.3);
            box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
            padding: $padding-big * 2;
            border-radius: $padding;
            // border: 1px solid $gray3;
            width: 400px;

            .el-form-item {
                > .el-form-item__label {
                    color: #dfdf;
                }
            }

            .el-input {
                > .el-input__inner {
                    background-color: rgba(0, 0, 0, 0.4);
                    border-color: rgba(0, 0, 0, 0.6);
                    color: #efef;
                }
            }

            .captcha {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: stretch;
                .captcha-img {
                    width: 80px;
                    height: 40px;
                }
            }
        }
    }
}
</style>
