<template>
	<view>
		<uni-row>
			<uni-col :span="21">
				<uni-search-bar placeholder="请输入设备型号" @confirm="search" @cancel="search" cancel-text="搜索">
					<uni-icons color="#999999" size="18" type="search"/>
				</uni-search-bar>
			</uni-col>
			<uni-col :span="3">
				<span class="search-more" @click="showDrawer('showRight')">筛选</span>
			</uni-col>
		</uni-row>
		<uni-drawer ref="showRight" mode="right" :mask-click="false" :width="330">
			<view class="more-text">
				<view>
					<uni-row>
						<uni-col :span="7">
							<view class="more-label line">
								设备名称：
							</view>
						</uni-col>
						<uni-col :span="17">
							<view class="more-input line">
								<picker @change="bindPickerChange" :value="index" :range="equipGenericOptions"
										:range-key="'dictLabel'">
									<uni-easyinput suffixIcon="search" v-model="queryParams.equipGenericName"
												   class="uni-mt-5" trim="all"
												   placeholder="请选择设备名称"></uni-easyinput>
								</picker>
							</view>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="7">
							<view class="more-label line">
								规格型号：
							</view>
						</uni-col>
						<uni-col :span="17">
							<view class="more-input line">
								<picker @change="equipSpecificChange" :value="equipSpecificIndex"
										:range="equipSpecificOptions"
										:range-key="'equipmentModel'">
									<uni-easyinput suffixIcon="search" v-model="queryParams.equipSpecificName"
												   class="uni-mt-5" trim="all"
												   placeholder="请选择规格型号"></uni-easyinput>
								</picker>
							</view>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="7">
							<view class="more-label line">
								设备状态：
							</view>
						</uni-col>
						<uni-col :span="17">
							<view class="more-input line">
								<picker @change="equipStatusChange" :value="equipStatusIndex"
										:range="equipStatusOptions"
										:range-key="'dictLabel'">
									<uni-easyinput suffixIcon="search" v-model="queryParams.statusName" class="uni-mt-5"
												   trim="all"
												   placeholder="请选择设备状态"></uni-easyinput>
								</picker>
							</view>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="7">
							<view class="more-label line">
								设备自编号：
							</view>
						</uni-col>
						<uni-col :span="17">
							<view class="line">
								<uni-easyinput v-model="queryParams.equipSerial" class="uni-mt-5" trim="all"
											   placeholder="请输入设备自编号"></uni-easyinput>
							</view>
						</uni-col>
					</uni-row>
					<uni-section :title="'出厂日期：'" type="line"></uni-section>
					<view class="example-body">
						<uni-datetime-picker v-model="exwDateRange" type="daterange" @maskClick="maskClick"/>
					</view>
				</view>
				<view class="more-foot">
					<uni-row>
						<button @click="closeDrawer('showRight')" size="mini" style="margin-right: 10px">关闭</button>
						<button type="primary" size="mini" style="margin-right: 10px" @click="searchMore('showRight')">
							查询
						</button>
					</uni-row>
				</view>
			</view>
		</uni-drawer>
		<uni-list>
			<uni-list-item v-for="(item, index) in dataList" :key="index" ellipsis="1"
						   :title="equipGenericFormat(item.equipGeneric)+'【'+item.equipSerial+'】'"
						   :note="equipSpecificFormat(item.equipSpecific)"
						   showArrow :rightText="equipStatusFormat(item.status)" clickable
						   @click="onClick(item.equipId)"/>
		</uni-list>
		<view class="pagination_top">
			<uni-pagination title="普通分页" :total="total" @change="pagination"></uni-pagination>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					equipSerial: '',
					equipGeneric: '',
					equipGenericName: '',
					equipSpecific: '',
					equipSpecificName: '',
					statusName:'',
					locationType:'2'
					// params:{
					//     exwDateStart: '',
					//     exwDateEnd: '',
					// }
				},
				total: 0,
				dataList: [],
				index: 0,
				//设备名称字典项
				equipGenericOptions: [],
				//设备规格型号
				equipSpecificOptions: [],
				equipSpecificIndex: 0,
				//设备状态
				equipStatusOptions: [],
				equipStatusIndex: 0,
				//出厂日期
				exwDateRange: [],
				showRight: false,
			}
		},
		created() {
			let _this = this
			this.getData('equip_category', function (data) {
				_this.equipGenericOptions = data
			})
			this.getData('equip_status', function (data) {
				_this.equipStatusOptions = data
			})
			_this.getList()
			this.getEquipSpecificlList('')
		},
		methods: {
			getList() {
				uni.showLoading({
					title: '加载中'
				})
				// if (this.exwDateRange.length>0) {
				//     this.queryParams.params.exwDateStart = this.exwDateRange[0]
				//     this.queryParams.params.exwDateEnd = this.exwDateRange[1]
				// }
				this.sendRequest('assetMsg/ddzlEquipment/list', 'GET', this.queryParams
						, false).then(res => {
					this.dataList = res.data.rows
					this.total = res.data.total
					uni.hideLoading()
				}).catch(err => {
					//请求失败
					uni.hideLoading()
				})
			},
			//规格型号
			getEquipSpecificlList(equipmentName) {
				let _this = this
				this.sendRequest('assetMsg/crane/list', 'GET', {equipmentName: equipmentName}
						, false).then(res => {
					res.data.rows.forEach(function (item) {
						_this.equipSpecificOptions.push(item)
					})
				}).catch(err => {
					//请求失败
				})
			},
			pagination(e) {
				this.queryParams.pageNum = e.current
				this.getList()
			},
			search(res) {
				// console.log(res.value)
				this.queryParams.equipSpecific = res.value
				this.getList()
			},
			cancel(res) {
				// console.log(res.value)
				this.queryParams.equipSpecific = res.value
				this.getList()
			},
			searchMore(e) {
				this.$refs[e].close()
				this.getList()
			},
			bindPickerChange: function (e) {
				this.index = e.detail.value
				this.queryParams.equipGeneric = this.equipGenericOptions[this.index].dictValue
				this.queryParams.equipGenericName = this.equipGenericOptions[this.index].dictLabel
				this.getEquipSpecificlList(this.equipGenericOptions[this.index].dictValue)
			},
			equipSpecificChange: function (e) {
				this.equipSpecificIndex = e.detail.value
				this.queryParams.equipSpecific = this.equipSpecificOptions[this.equipSpecificIndex].code
				this.queryParams.equipSpecificName = this.equipSpecificOptions[this.equipSpecificIndex].equipmentModel
			},
			equipStatusChange: function (e) {
				this.equipStatusIndex = e.detail.value
				this.queryParams.status = this.equipStatusOptions[this.equipStatusIndex].dictValue
				this.queryParams.statusName = this.equipStatusOptions[this.equipStatusIndex].dictLabel
			},
			onClick(id) {
				uni.navigateTo({
					url: '/pages/inventoryQuery/warehouse/detail?id='+id
				})
			},
			equipStatusFormat(value) {
				return this.selectDictLabel(this.equipStatusOptions, value)
			},
			equipGenericFormat(value) {
				return this.selectDictLabel(this.equipGenericOptions, value)
			},
			equipSpecificFormat(value) {
				const actions = []
				const datas = this.equipSpecificOptions
				Object.keys(datas).some((key) => {
					if (datas[key].code === ('' + value)) {
						actions.push(datas[key].equipmentModel)
						return true
					}
				})
				return actions.join('')
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
		}
	}
</script>

<style lang="scss">
	.pagination_top {
		margin-top: 5px;
	}

	.search-more {
		height: 56px;
		line-height: 56px;
		font-size: 14px;
	}

	.more-text {
		height: 50%;
		background-color: white;
		font-size: 14px;
		padding: 10px;
	}

	.more-foot {
		margin-top: 10px;
		text-align: right;
	}

	.more-label {
		height: 35px;
		line-height: 35px;
		text-align: right;
	}

	.more-input {
		height: 35px;
		line-height: 35px;
		text-align: left;
	}

	.line {
		margin: 3px;
		/*border-top: 1px solid rgb(248, 248, 248);*/
		/*border-bottom: 1px solid rgb(248, 248, 248);*/
	}

</style>
