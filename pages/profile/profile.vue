<template>
    <view>
        <cmd-cel-item title="姓名" :addon="user.nickName" arrow></cmd-cel-item>
        <cmd-cel-item title="联系方式" :addon="user.phonenumber" arrow></cmd-cel-item>
       <!-- <cmd-cel-item title="所属部门" :addon="user.dept.deptName" arrow></cmd-cel-item> -->
        <cmd-cel-item title="电子邮箱" :addon="user.email" arrow></cmd-cel-item>
        <cmd-cel-item title="修改密码" arrow></cmd-cel-item>
        <cmd-cel-item v-if="user.openId==null||''===user.openId" title="授权小程序登录" @click="auth" arrow></cmd-cel-item>
        <cmd-cel-item v-else title="解除小程序登录授权" @click="cancelBindAccount" arrow></cmd-cel-item>
        <button class="btn-logout" @click="logout()">退出登录</button>
    </view>
</template>

<script>
    import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item"

    export default {
        components: {
            cmdCelItem,
        },

        data() {
            return {
                user: {},
                userId:null
            };
        },

        mounted() {
        },
        created() {
            let _this = this
            this.getUserInfo(function (data) {
                _this.userId=data.userId
                _this.getInfo(data.userId)
            })
        },
        methods: {
            getInfo(userId) {
                uni.showLoading({
                    title: '加载中'
                })
                this.sendRequest( "system/user/" + userId, 'GET', {}
                    , false).then(res => {
                    this.user=res.data.data
                    console.log(this.user.openId)
                    uni.hideLoading()
                }).catch(err => {
                    uni.hideLoading()
                    //请求失败
                })
            },
            auth() {
                const that = this;
                uni.getProvider({
                    service: 'oauth',
                    success: function (res) {
                        //支持微信、qq和微博等
                        if (~res.provider.indexOf('weixin')) {
                            uni.login({
                                provider: 'weixin',
                                success: function (loginRes) {
                                    uni.showModal({
                                        title: '登录提示',
                                        content: '请确定授权使用小程序快速登录！',
                                        success: ress => {
                                            if (ress.confirm) {
                                                uni.showLoading({
                                                    title: '数据处理中'
                                                });
                                                that.sendRequest(
                                                    "app/api/bindAccount",
                                                    'POST', {
                                                        code: loginRes.code
                                                    }, false)
                                                    .then(res => {
                                                        uni.showToast({
                                                            title: '绑定成功'
                                                        });
                                                        that.getInfo(that.userId)
                                                        uni.hideLoading()
                                                        //成功回调
                                                    }).catch(err => {
                                                    uni.showToast({
                                                        title: '绑定失败'
                                                    });
                                                    //请求失败
                                                    uni.hideLoading()
                                                })
                                            }
                                        }
                                    })
                                },
                                fail: function (res) {
                                    uni.showToast({
                                        title: '获取信息失败'
                                    });
                                }
                            });
                        }
                    }
                });
            },
            logout() {
                uni.navigateTo({
                    url: '/pages/login/login'
                })
            },
            cancelBindAccount: function () {
                let that=this
                uni.showModal({
                    title: '登录提示',
                    content: '请确定解除小程序授权登录！',
                    success: ress => {
                        if (ress.confirm) {
                            uni.showLoading({
                                title: '数据处理中'
                            });
                            that.sendRequest(
                                "app/api/cancelBindAccount",
                                'POST', {}, false)
                                .then(res => {
                                    uni.showToast({
                                        title: '解除绑定成功'
                                    });
                                    that.getInfo(that.userId)
                                    uni.hideLoading()
                                    //成功回调
                                }).catch(err => {
                                uni.showToast({
                                    title: '解除绑定失败'
                                });
                                //请求失败
                                uni.hideLoading()
                            })
                        }
                    }
                })
            },
        }
    }
</script>

<style>
    .btn-logout {
        margin-top: 30px;
        width: 80%;
        border-radius: 50 upx;
        font-size: 16px;
        color: #fff;
        background: linear-gradient(to right, #365fff, #36bbff);
    }
</style>
