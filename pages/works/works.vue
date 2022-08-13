<template>
	<view>
		<view v-if="taskList.length>0">
			<uni-list>
				<uni-list-item v-for="(item, index) in taskList" :key="index" ellipsis="1"
							   :title="item.instanceName"
							   :note="'创建时间：'+item.createdDate"
							   showArrow :rightText="item.name" clickable
							   @click="onClick(item.equipId)"/>
			</uni-list>
			<view class="pagination_top">
				<uni-pagination title="普通分页" :total="total" @change="pagination"></uni-pagination>
			</view>
		</view>
		<view v-if="taskList.length===0" class="no_task">
			{{loadingText}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taskList: [],
				loadingText: '',
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10
				},
				total: 0,
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				console.log('============')
				uni.showLoading({
					title: '加载中'
				})
				this.loadingText = ''
				this.sendRequest('task/list', 'GET', this.queryParams
						, false).then(res => {
					this.taskList = res.data.rows
					this.total = res.data.total
					uni.hideLoading()
					console.log(this.taskList.length+'============')
					if (this.taskList.length === 0)
						this.loadingText = '暂无代办事项...'
				}).catch(err => {
					//请求失败
					uni.hideLoading()
				})
			},
			pagination(e) {
				this.queryParams.pageNum = e.current
				this.getList()
			},
		}
	}
</script>

<style lang="scss">
	.no_task {
		font-size: 14px;
		text-align: center;
		margin-top: 50px;
		color: rgba(139, 139, 139, 0.45);
	}
</style>
