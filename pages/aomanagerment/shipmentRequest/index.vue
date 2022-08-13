<template>
	<view class="tabs">
		<uni-row>
			<uni-col :span="18">
				<uni-search-bar placeholder="请输入项目名称搜索" @confirm="search" @cancel="cancel">
					<uni-icons color="#999999" size="18" type="search" />
				</uni-search-bar>
			</uni-col>
			<uni-col :span="3">
				<view class="tag-view search-more" @click="open">
					<uni-tag text="筛选" type="primary" />
				</view>
			</uni-col>
			<uni-col :span="3">
				<view class="tag-view search-more" @tap="add">
					<uni-tag text="新增" type="success" />
				</view>
			</uni-col>
		</uni-row>

		<uni-popup ref="inputDialog" :mask-click="false" style="width: 70%;">
			<view class="more-text">
				 <uni-section title="请选择发货类型" type="line">
				<view class="uni-list">
					<radio-group @change="radioChange">
						<label  v-for="(item, index) in items"
							:key="item.value">
							<view>
								<radio :value="item.value" :checked="index === current" style="padding-top: 15px;"/>{{item.name}}
							</view>
						</label>
					</radio-group>
				</view>
				</uni-section>
				<view class="more-foot">
					<uni-row>
						<button @click="close" size="mini" style="margin-right: 10px">关闭</button>
						<button type="primary" size="mini" style="margin-right: 10px" @click="searchMore">确定</button>
					</uni-row>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="popup" :mask-click="false">
			<view class="more-text">
				<view>
					<uni-row>
						<uni-col :span="6">
							<view class="more-label">
								项目名称：
							</view>
						</uni-col>
						<uni-col :span="18">
							<view>
								<uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入项目名称"></uni-easyinput>
							</view>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="6">
							<view class="more-label line">
								状态：
							</view>
						</uni-col>
						<uni-col :span="18">
							<view class="more-input line">
								<picker @change="bindPickerChange" :value="index" :range="statusOptions"
									:range-key="'dictLabel'">
									<view class="uni-input">{{statusOptions[index].dictLabel}}</view>
								</picker>
							</view>
						</uni-col>
					</uni-row>
				</view>
				<view class="more-foot">
					<uni-row>
						<button @click="close" size="mini" style="margin-right: 10px">关闭</button>
						<button type="primary" size="mini" style="margin-right: 10px" @click="searchMore">查询</button>
					</uni-row>
				</view>
			</view>
		</uni-popup>
		<view v-if="dataList.length>0">
			<uni-list>
				<uni-list-item v-for="(item, index) in dataList" :key="index" ellipsis="1" :title="item.projectName"
					:note="item.actualDeliveryDate" showArrow :rightText="statusFormat(item.status)" clickable
					@click="onClick(item.id)" />
			</uni-list>
			<view class="pagination_top">
				<uni-pagination title="普通分页" :total="total" @change="pagination"></uni-pagination>
			</view>
		</view>
		<view v-else class="no_task">
			暂无数据...
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					status: '',
					projectName: ''
				},
				total: 0,
				//发货申请状态字典
				statusOptions: [{
					dictValue: '',
					dictLabel: '请选择'
				}],
				index: 0,
				
				items: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					},
				],
				current: 0
			}
		},
		created() {
			let _this = this
			this.getData('shipment_request_status', function(data) {
				data.forEach(function(item) {
					_this.statusOptions.push(item)
				})
			})
			this.getList()
		},
		methods: {
			getList() {
				uni.showLoading({
					title: '加载中'
				})
				this.sendRequest('assetMsg/shipmentRequest/list', 'GET', this.queryParams, false).then(res => {
					this.dataList = res.data.rows
					this.total = res.data.total
					uni.hideLoading()
				}).catch(err => {
					//请求失败
					uni.hideLoading()
				})
			},
			// 申请状态字典翻译
			statusFormat(value) {
				return this.selectDictLabel(this.statusOptions, value)
			},
			pagination(e) {
				this.queryParams.pageNum = e.current
				this.getList()
			},
			onClick(id) {
				uni.navigateTo({
					url: '/pages/aomanagerment/shipmentRequest/edit?id=' + id
				})
			},
			add() {
				// uni.navigateTo({
				//     url: '/pages/aomanagerment/shipmentRequest/edit'
				// })
				this.$refs.inputDialog.open()
			},
			search(res) {
				this.queryParams.projectName = res.value
			},
			cancel(res) {
				console.log(res.value)
			},
			open() {
				this.$refs.popup.open('top')
			},
			close() {
				this.$refs.popup.close()
				this.$refs.inputDialog.close()
			},
			searchMore() {
				this.getList()
				this.$refs.popup.close()
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.queryParams.status = this.statusOptions[this.index].dictValue
			},
			
			
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			}

		}
	};
</script>

<style lang="scss">
	.pagination_top {
		margin-top: 5px;
	}

	.no_task {
		font-size: 14px;
		text-align: center;
		margin-top: 50px;
		color: rgba(139, 139, 139, 0.45);
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
		border-top: 1px solid rgb(248, 248, 248);
		border-bottom: 1px solid rgb(248, 248, 248);
	}
	.uni-list-cell {
		justify-content: flex-start
	}
</style>
