<template>
	<view class="content">
		<view class="login-bg">
			<view  class="logo"><image class="logo-img" src="../../static/logo.4eeb8a8e.png"></image> </view>
			<view class="login-card">

				<view class="login-head">大都资产运营管理平台</view>
				<view class="login-input login-margin-b">
					<input type="text" v-model="userName" placeholder="请输入登录账号" />
				</view>
				<view class="login-input">
					<input class="uni-input" v-model="password" type="password" placeholder="请输入密码" />
				</view>
				<view class="login-input">
					<checkbox-group>
						<checkbox type="checkbox" :checked="rememberPsw" @tap="rememberPsw = !rememberPsw">
							记住账号密码
						</checkbox>
					</checkbox-group>

				</view>
				<view class="login-function">
					<!-- 	<view class="login-forget" @tap="goForget">忘记密码</view>
					<view class="login-register" @tap="goRegister">快速注册></view> -->
				</view>
			</view>
		</view>
		<view class="login-btn">
			<button class="landing" type="primary" @tap="login">登录</button>
			<button class="landing" type="primary" @tap="appLogin">快速登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: 'admin',
				password: 'admin123',
				rememberMe: true,
				rememberPsw: false
			}
		},
		onLoad(options) {},
		created() {
			//缓存的账号密码
			const WLPid = uni.getStorageSync('userName')
			const WLPpassword = uni.getStorageSync('password')
			//有缓存就赋值给文本没有就清空
			if (WLPid && WLPpassword) {
				this.userNames = WLPid
				this.passwords = WLPpassword
			}
			// else {
			// 	this.userNames = ''
			// 	this.passwords = ''
			// }
		},
		methods: {
			login() {
				let _this = this;
				if (_this.userName == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入登录账号'
					});
					return;
				}
				if (_this.password == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				uni.showLoading({
					title: '登录中'
				});
				uni.request({
					url: _this.BASE_URL + "/app/login",
					method: 'POST',
					dataType: 'post',
					header: {
						'content-type': 'application/x-www-form-urlencoded' // 默认值
					},
					data: {
						userName: _this.userName,
						password: _this.password,
						code: ''
					},
					success(res) {
						// console.log('登录成功-----', res)
						if (_this.rememberPsw) {
							uni.setStorageSync('WLPid', _this.userName)
							uni.setStorageSync('WLPpassword', _this.password)
						} else {
							uni.removeStorageSync('WLPid')
							uni.removeStorageSync('WLPpassword')
						}
						uni.setStorageSync('token', JSON.parse(res.data).data)
						uni.reLaunch({
							url: '../index/index'
						})
					},
					fail() {
						uni.showToast({
							title: '登录失败'
						});
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			appLogin: function() {
				const that = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						//支持微信、qq和微博等
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									uni.showLoading({
										title: '登录中'
									});
									// 获取用户信息
									uni.request({
										url: that.BASE_URL + "/app/login",
										method: 'POST',
										dataType: 'post',
										header: {
											'content-type': 'application/x-www-form-urlencoded' // 默认值
										},
										data: {
											userName: '',
											password: '',
											code: loginRes.code
										},
										success(res) {
											const data = JSON.parse(res
													.data)
											if (200 == data.code) {
												uni.setStorageSync('token', data.data)
												uni.reLaunch({
													url: '../index/index'
												})
											} else {
												uni.showModal({
													title: '登录提示',
													content: data.msg,
												})
											}
										},
										fail(err) {
											console.log(err)
											uni.showToast({
												title: '登录失败'
											});
										},
										complete: () => {
											uni.hideLoading()
										}
									})
								},
								fail: function(res) {
									uni.showToast({
										title: '登录失败'
									});
								}
							});
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.logo{


		// color: #ffffff;

		text-align: center;
	}

	.logo-img{
		border-radius: 200upx;
		height: 200upx;
		width: 200upx;

		background-color: #ffffff;
	}

	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		margin-top: 25upx;
		font-size: 32upx;
	}

	.login-btn {
		padding: 10upx 20upx;
		margin-top: 350upx;
	}

	.login-function {
		overflow: auto;
		padding: 20upx 20upx 30upx 20upx;
	}

	.login-forget {
		float: left;
		font-size: 26upx;
		color: #999;
	}

	.login-register {
		color: #666;
		float: right;
		font-size: 26upx;

	}

	.login-input input {
		background: #F2F5F6;
		font-size: 32upx;
		padding: 10upx 25upx;
		height: 62upx;
		line-height: 62upx;
		border-radius: 8upx;
	}

	.login-input checkbox {}

	.login-margin-b {
		margin-bottom: 25upx;
	}

	.login-input {
		padding: 10upx 20upx;
	}

	.login-head {
		font-size: 40upx;
		text-align: center;
		padding: 25upx 10upx 55upx 10upx;
	}

	.login-card {
		background: #fff;
		border-radius: 12upx;
		padding: 10upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
		position: relative;
		// margin-top: 120upx;
	}

	.login-bg {
		height: 260upx;
		padding: 25upx;
		background: linear-gradient(#11b8ff, #6cccff);
	}
</style>
