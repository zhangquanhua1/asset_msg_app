<template>
	<view>
		<scroll-view class="scroll" scroll-y>
			<uni-card v-for="(item, index) in shipmentCarList" :key="index"
				style="margin-left: 7px;margin-right: 7px;padding-left: 5px;padding-right: 5px;">
				<uni-section title="司机信息" type="line"></uni-section>
				<uni-card style="margin-left: 0;margin-right: 0;margin-top: 5px;margin-bottom: 0;">
					<uni-row>
						<uni-col :span="24">司机姓名：{{item.test!=null?(item.test):'-'}}</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="24">联系电话：{{item.phoneNum!=null?item.phoneNum:'-'}}</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="24">运输车牌号：{{item.test!=null?item.test:'-'}}
						</uni-col>
					</uni-row>
				</uni-card>
				<uni-section title="货物清单" type="line"></uni-section>
				<uni-card v-for="(item, index) in shipmentRequest" :key="index" style="margin-left: 0;margin-right: 0;">
					<view style="font-weight:750">
						<uni-row>
							<uni-col :span="12" >序号：{{index+1}}
							</uni-col>
							<uni-col :span="12">部件名称：{{item.test!=null?item.test:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">外形尺寸(mm)：{{item.test!=null?item.test:'-'}}</uni-col>
							<uni-col :span="12">件重(Kg)：{{item.test!=null?item.test:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">数量：{{item.test!=null?item.test:'-'}}</uni-col>
							<uni-col :span="12">单位：{{item.test!=null?item.test:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="24">备注：{{item.test!=null?item.test:'-'}}</uni-col>
						</uni-row>
					</view>
					<br />
					<view v-for="(item2, index2) in item.kits" :key="index2">
						<uni-row>
							<uni-col :span="12">序号：{{index+1+"."+(index2+1)}}
							</uni-col>
							<uni-col :span="12">部件名称：{{item2.test!=null?item2.test:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">外形尺寸(mm)：{{item2.test!=null?item2.test:'-'}}</uni-col>
							<uni-col :span="12">件重(Kg)：{{item2.test!=null?item2.test:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">数量：{{item2.test!=null?item2.test:'-'}}</uni-col>
							<uni-col :span="12">单位：{{item2.test!=null?item2.test:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="24">备注：{{item2.test!=null?item2.test:'-'}}</uni-col>
						</uni-row>
						<br />
					</view>
				</uni-card>

			</uni-card>
		</scroll-view>

		<!-- <uni-section v-for="(item, index) in shipmentCarList" :key="index" :title="item.carNumber" type="line">
			<uni-card v-for="(equip, equipIndex) in item.shipmentCarItemList" :key="equipIndex"
				:title="equip.componGeneric" :extra="equip.number+''+equip.calculate">
				<text>规格型号：{{equip.componModel}}</text>
				<view slot="actions" class="card-actions">
					<view class="card-actions-item" v-if="equip.signFor">
						<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text" v-if="equip.signFor==='0'">已签收</text>
						<text class="card-actions-item-text" v-if="equip.signFor==='1'">异常签收</text>
					</view>
					<view class="card-actions-item line" @click="actionsErrClick(equip)" v-if="!equip.signFor">
						<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">异常签收</text>
					</view>
					<view class="card-actions-item line" @click="actionsClick(equip)" v-if="!equip.signFor">
						<uni-icons type="checkbox" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">正常签收</text>
					</view>
				</view>
			</uni-card>
		</uni-section>
		<uni-section title="指定签收人" type="line">
			<view style="text-align: center">
				<button size="mini" style="margin: 10px; width: 200px;" type="primary" @tap="add">指定签收人</button>
			</view>
		</uni-section>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input" placeholder="请输入异常签收原因" title="异常签收原因" type="error" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup> -->
	</view>
</template>

<script>
	export default {
		// onLoad: function(option) {
		// 	this.id = option.id
		// 	this.getShipmentRequest(this.id)
		// },
		data() {
			return {
				id: null,
				shipmentCarList: [{
					test: "诸葛亮的",
					phoneNum: 18593938512
				}],
				shipmentRequest: [{
					test: "2",
					kits: [{
						test: "233"
					}, {
						test: 555
					}]
				}, {
					test: "4"
				}],
				equipId: null
			}
		},
		created() {},
		methods: {
			// getShipmentRequest(id) {
			// 	console.log(id)
			// 	uni.showLoading({
			// 		title: '加载中'
			// 	})
			// 	this.sendRequest('assetMsg/shipmentRequest/' + id, 'GET', {}, false).then(res => {
			// 		this.shipmentRequest = res.data.data
			// 		this.shipmentCarList = this.shipmentRequest.shipmentCarList
			// 		uni.hideLoading()
			// 	}).catch(err => {
			// 		//请求失败
			// 		console.log(err)
			// 		uni.hideLoading()
			// 	})
			// },
			// 	actionsClick(row) {
			// 		this.sendRequest('assetMsg/shipmentComponents', 'put', {
			// 			id: row.id,
			// 			signFor: '0'
			// 		}, 'application/json').then(res => {
			// 			uni.showToast({
			// 				title: '操作成功'
			// 			});
			// 			this.getShipmentRequest(this.id)
			// 		}).catch(err => {
			// 			//请求失败
			// 			console.log(err)
			// 		})
			// 	},
			// 	actionsErrClick(row) {
			// 		this.equipId = row.id
			// 		this.$refs.popup.open('center')
			// 	},
			// 	close() {
			// 		this.$refs.popup.close()
			// 	},
			// 	confirm(value) {
			// 		this.sendRequest('assetMsg/shipmentComponents', 'put', {
			// 			id: this.equipId,
			// 			signFor: '1',
			// 			remark: value
			// 		}, 'application/json').then(res => {
			// 			uni.showToast({
			// 				title: '操作成功'
			// 			});
			// 			this.getShipmentRequest(this.id)
			// 		}).catch(err => {
			// 			//请求失败
			// 			console.log(err)
			// 		})
			// 		this.$refs.popup.close()
			// 	},
			// 	add() {
			// 		console.log(this.id)
			// 		uni.navigateTo({
			// 			url: '/pages/aomanagerment/signFor/userList?id=' + this.id
			// 		})
			// 	}

		}
	}
</script>


<style lang="scss" scoped>
	.card-actions-item {
		float: right;
		margin-left: 20px;
		margin-bottom: 5px;
	}

	.line {
		/*padding: 3px;*/
		border-bottom: 1px solid #5574cc;
	}

	.scroll {
		flex-direction: column;
		flex: 1;
	}

	/deep/ uni-collapse-item__title {
		padding-left: 0px;
		padding-right: 0px;
		padding-bottom: 0px;
		padding-top: 0px;
	}
</style>
