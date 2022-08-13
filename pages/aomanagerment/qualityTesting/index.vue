<template>
    <view>
        <uni-card v-for="(item, index) in inspectMaintainList" :key="index" :title="equipSpecificFormat(item.equipSpecific)"
                  :extra="item.equipSerial">
            <uni-row>
                <uni-col :span="24">出厂日期：{{item.exwDate}}</uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="24">检修班组：{{item.inspectTeam}}</uni-col>
            </uni-row>
            <view class="card-actions">
                <view class="card-actions-item" @click="getDetail(item.id)">
                    <view class="tag-view">
                        <uni-tag text="详情" type="primary"/>
                    </view>
                </view>
                <view class="card-actions-item" @click="submitForm()">
                    <view class="tag-view">
                        <uni-tag text="提交" type="primary"/>
                    </view>
                </view>
                <view class="card-actions-item" @click="getTest(item.id)">
                    <view class="tag-view">
                        <uni-tag text="质检" type="success"/>
                    </view>
                </view>
            </view>
        </uni-card>
        <view class="pagination_top" v-if="inspectMaintainList">
            <uni-pagination title="普通分页" :total="total" @change="pagination"></uni-pagination>
        </view>
        <view v-else style="font-size: 14px;text-align: center;margin-top: 50px;color: #8f939c">
            暂无数据...
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                // 总条数
                total: 0,
                // 质检维保表格数据
                inspectMaintainList: [],
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                },
                // 设备名称字典
                equipCategoryOptions: [],
                //规格型号字典
                equipSpecificOptions: [],
            }
        },
        created() {
            this.getList()
            this.getEquipSpecificlList()
            let _this = this
            this.getData('equip_category', function (data) {
                _this.equipCategoryOptions = data
            })
        },
        methods: {
            getList() {
                uni.showLoading({
                    title: '加载中'
                })
                this.sendRequest('assetMsg/inspectMaintain/list', 'GET', this.queryParams
                    , false).then(res => {
                    this.inspectMaintainList = res.data.rows
                    this.total = res.data.total
                    uni.hideLoading()
                }).catch(err => {
                    //请求失败
                    uni.hideLoading()
                })
            },
            //规格型号
            getEquipSpecificlList() {
                this.sendRequest('assetMsg/equipSpecific/list', 'GET', {}
                    , false).then(res => {
                    this.equipSpecificOptions = res.data.rows
                }).catch(err => {
                    //请求失败
                })
            },
            equipSpecificFormat(value) {
                const actions = []
                const datas = this.equipSpecificOptions
                Object.keys(datas).some((key) => {
                    if (datas[key].code === ('' + value)) {
                        actions.push(datas[key].modelSummary)
                        return true
                    }
                })
                return actions.join('')
            },
            pagination(e) {
                this.queryParams.pageNum = e.current
                this.getList()
            },
            submitForm(){

            },
            getTest(id){
                uni.navigateTo({
                    url: '/pages/aomanagerment/qualityTesting/qualityTesting?id='+id
                })
            }
        }
    }
</script>

<style>
    .card-actions-item {
        float: right;
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>
