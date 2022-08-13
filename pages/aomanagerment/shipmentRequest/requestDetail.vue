<template>
	<view>
		<uni-collapse ref="collapse" v-model="value">
			<uni-collapse-item title="基本信息">
				<view>
					<view class="text">
						承租方：{{shipmentRequest.tenantryId!=null?(shipmentRequest.tenantryId):'-'}}</view>
					<view class="text">租赁合同号：{{shipmentRequest.contractNo!=null?shipmentRequest.contractNo:'-'}}</view>
					<view class="text">项目名称：{{shipmentRequest.projectName!=null?shipmentRequest.projectName:'-'}}</view>
					<view class="text">设备编号：{{shipmentRequest.equipNo!=null?shipmentRequest.equipNo:'-'}}</view>
					<view class="text">出厂日期：{{shipmentRequest.exwDate!=null?shipmentRequest.exwDate:'-'}}</view>
					<view class="text">项目地址：{{shipmentRequest.projectAddress!=null?shipmentRequest.projectAddress:'-'}}
					</view>
					<view class="text">项目经理：{{shipmentRequest.projectManager!=null?shipmentRequest.projectManager:'-'}}
					</view>
					<view class="text">联系电话：{{shipmentRequest.managerTel!=null?shipmentRequest.managerTel:'-'}}</view>
					<view class="text">
						收获联系人：{{shipmentRequest.receivingContact!=null?shipmentRequest.receivingContact:'-'}}</view>
					<view class="text">
						联系电话：{{shipmentRequest.receivingContactTel!=null?shipmentRequest.receivingContactTel:'-'}}
					</view>
					<view class="text">货物类型：{{shipmentRequest.goodsType!=null?shipmentRequest.goodsType:'-'}}</view>
					<view class="text">调拨类型：{{shipmentRequest.allocationType!=null?shipmentRequest.allocationType:'-'}}
					</view>
					<view class="text">
						是否空顶：：{{shipmentRequest.isEmptyRoof!=null?(shipmentRequest.isEmptyRoof):'-'}}
					</view>
					<view class="text">
						是否转租：{{shipmentRequest.isSublease!=null?(shipmentRequest.isSublease):'-'}}
					</view>
					<view class="text">
						发货类型：{{shipmentRequest.shipmentType!=null?(shipmentRequest.shipmentType):'-'}}
					</view>
					<view class="text">
						新旧状态：{{shipmentRequest.oldNewType!=null?(shipmentRequest.oldNewType):'-'}}
					</view>
					<view class="text">
						计划发货日期：{{shipmentRequest.plannedDeliveryDate!=null?shipmentRequest.plannedDeliveryDate:'-'}}
					</view>
					<view class="text">
						实际发货日期：{{shipmentRequest.actualDeliveryDate!=null?shipmentRequest.actualDeliveryDate:'-'}}
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="合同信息">
				<view>
					<view class="text">合作模式：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}</view>
					<view class="text">产品型号：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}</view>
					<view class="text">地脚预埋形式：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}</view>
					<view class="text">合同高度(米)：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}</view>
					<view class="text">工作幅度(米)：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}</view>
					<view class="text">主机(台)：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}
					</view>
					<view class="text">标准节(节/台)：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}
					</view>
					<view class="text">附着架(套/台)：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}</view>
					<view class="text">地脚螺栓(套/台)：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}
					</view>

					<view class="text">
						主电缆(米/台)*2：{{shipmentRequest.receivingContactTel!=null?shipmentRequest.receivingContactTel:'-'}}
					</view>
					<view class="text">电控形式：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}</view>
					<view class="text">塔身截面：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}
					</view>

					<view class="text">
						起升机构：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}
					</view>
					<view class="text">
						最大起重量(T)：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}</view>
					<view class="text">
						钢丝绳：{{shipmentRequest.test!=null?shipmentRequest.test:'-'}}
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="发货信息">
				<view>
					<uni-card v-for="(item, index) in shipmentItemList" :key="index">
						<uni-row>
							<uni-col :span="12">货物类型：{{item.goodsType!=null?(item.goodsType):'-'}}
							</uni-col>
							<uni-col :span="12">货物名称：{{item.goodsName!=null?item.goodsName:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">数量：{{item.number!=null?item.number:'-'}}</uni-col>
							<uni-col :span="12">计量单位：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
					</uni-card>
				</view>
			</uni-collapse-item>

			<uni-collapse-item title="设备安排信息">
				<view>
					<uni-card v-for="(item, index) in shipmentItemList" :key="index">
						<uni-row>
							<uni-col :span="12">设备名称：{{item.goodsType!=null?(item.goodsType):'-'}}
							</uni-col>
							<uni-col :span="12">规格型号：{{item.goodsName!=null?item.goodsName:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">生产厂家：{{item.number!=null?item.number:'-'}}</uni-col>
							<uni-col :span="12">设备编号：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">设备自编号：{{item.number!=null?item.number:'-'}}</uni-col>
							<uni-col :span="12">设备编号：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">楼号：{{item.number!=null?item.number:'-'}}</uni-col>
							<uni-col :span="12">调拨时间：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">预计进场时间：{{item.number!=null?item.number:'-'}}</uni-col>
							<uni-col :span="12">预计拆卸时间：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="24">备注：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
					</uni-card>
				</view>
			</uni-collapse-item>

			<uni-collapse-item title="零部件安排信息">
				<view>
					<uni-card v-for="(item, index) in shipmentItemList" :key="index">
						<uni-row>
							<uni-col :span="12">零部件名称：{{item.goodsType!=null?(item.goodsType):'-'}}
							</uni-col>
							<uni-col :span="12">配件型号：{{item.goodsName!=null?item.goodsName:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">配件代码：{{item.number!=null?item.number:'-'}}</uni-col>
							<uni-col :span="12">产品编号：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">生产厂家：{{item.number!=null?item.number:'-'}}</uni-col>
							<uni-col :span="12">配件规格：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">数量：{{item.number!=null?item.number:'-'}}</uni-col>
							<uni-col :span="12">单位：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="24">备注：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
					</uni-card>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="车辆安排信息">
				<view>
					<uni-card v-for="(item, index) in shipmentItemList" :key="index">
						<uni-row>
							<uni-col :span="12">车辆长度：{{item.goodsType!=null?(item.goodsType):'-'}}
							</uni-col>
							<uni-col :span="12">车牌号：{{item.goodsName!=null?item.goodsName:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="12">司机姓名：{{item.number!=null?item.number:'-'}}</uni-col>
							<uni-col :span="12">产品编号：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="24">身份证号码：{{item.number!=null?item.number:'-'}}</uni-col>
						</uni-row>

						<uni-row>
							<uni-col :span="24">联系电话：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
						<uni-row>
							<uni-col :span="24">备注：{{item.unit!=null?item.unit:'-'}}</uni-col>
						</uni-row>
					</uni-card>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default {
		onLoad: function(option) {
			if (option.id != null) {
				this.getShipmentRequest(option.id)
			}

		},
		created() {
			// this.getData('goods_type', function (data) {
			//     this.goodsTypeOptions = data
			// })
			// this.getDicts('allocation_type').then(response => {
			// 	this.allocationTypeOptions = response.data
			// })
			// this.getDicts('sys_yes_no').then(response => {
			// 	this.isEmptyRoofOptions = response.data
			// })
			// this.getDicts('sys_yes_no').then(response => {
			// 	this.isSubleaseOptions = response.data
			// })
			// this.getDicts('shipment_type').then(response => {
			// 	this.shipmentTypeOptions = response.data
			// })
			// this.getDicts('old_new_type').then(response => {
			// 	this.oldNewTypeOptions = response.data
			// })

		},
		data() {
			return {
				shipmentRequest: {},
				value: ['0'],
				// 货物清单列表
				shipmentItemList: [{
					goodsType: "1",
					goodsName: "1",
					number: "2",
					unit: "套"
				},
				{
					goodsType: "1",
					goodsName: "1",
					number: "2",
					unit: "套"
				}],
				// 货物类型：1、整机，2、部件，3、零配件字典
				goodsTypeOptions: [],
				// 调拨类型：1、场地-项目，2、项目-场地，3、项目-项目，4字典
				allocationTypeOptions: [],
				// 是否空顶字典
				isEmptyRoofOptions: [],
				// 是否转租字典
				isSubleaseOptions: [],
				// 发货类型字典
				shipmentTypeOptions: [],
				// 新旧状态字典
				oldNewTypeOptions: [],
				//承租方列表
				tenantryOptions: [{
					id: '1',
					label: '中建八局南方建设有限公司'
				}],
			}
		},
		methods: {
			getShipmentRequest(id) {
				uni.showLoading({
					title: '加载中'
				})
				this.sendRequest('assetMsg/shipmentRequest/' + id, 'GET', {}, false).then(res => {
					this.shipmentRequest = res.data.data
					this.shipmentItemList = response.data.shipmentItemList
					console.log(this.shipmentRequest)
					uni.hideLoading()
				}).catch(err => {
					//请求失败
					uni.hideLoading()
				})
			},
			// // 货物类型字典翻译
			// goodsTypeFormat(goodsType) {
			// 	return this.selectDictLabel(this.goodsTypeOptions, goodsType)
			// },
			// // 调拨类型字典翻译
			// allocationTypeFormat(allocationType) {
			// 	return this.selectDictLabel(this.allocationTypeOptions, allocationType)
			// },
			// // 是否空顶字典翻译
			// isEmptyRoofFormat(isEmptyRoof) {
			// 	return this.selectDictLabel(this.isEmptyRoofOptions, isEmptyRoof)
			// },
			// // 是否转租字典翻译
			// isSubleaseFormat(isSublease) {
			// 	return this.selectDictLabel(this.isSubleaseOptions, isSublease)
			// },
			// // 发货类型字典翻译
			// shipmentTypeFormat(shipmentType) {
			// 	return this.selectDictLabel(this.shipmentTypeOptions, shipmentType)
			// },
			// // 新旧状态字典翻译
			// oldNewTypeFormat(oldNewType) {
			// 	return this.selectDictLabel(this.oldNewTypeOptions, oldNewType)
			// },
			// // 承租方翻译
			// tenantryIdFormat(tenantryId) {
			// 	const list = this.tenantryOptions
			// 	for (let i = 0; i < list.length; i++) {
			// 		if (list[i].id == tenantryId) {
			// 			return list[i].label
			// 		}
			// 	}
			// 	return ""
			// },


		}
	}
</script>

<style>
	.example-body {
		flex-direction: column;
		flex: 1;
	}

	.item {
		background-color: #ffffff;
		border-style: solid;
		border-color: #55557f;
		padding-left: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-right: 10px;
		margin: 10px 10px 10px 10px;
	}

	.text {
		font-size: 14px;
		color: #000000;
		line-height: 20px;
		padding-left: 20px;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-right: 20px;
	}
</style>
