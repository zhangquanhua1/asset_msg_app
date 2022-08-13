<template>
    <view class="tabs">
        <uni-row>
            <uni-col :span="21">
                <uni-search-bar placeholder="请输入项目名称搜索" @confirm="search" @cancel="cancel">
                    <uni-icons color="#999999" size="18" type="search"/>
                </uni-search-bar>
            </uni-col>
            <uni-col :span="3">
                <span class="search-more" @click="open">筛选</span>
            </uni-col>
        </uni-row>
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
        <uni-card v-for="(item, index) in dataList" :key="index" :title="item.projectName"
                  :extra="statusFormat(item.status)">
            <uni-row>
                <uni-col :span="24">收货联系人：{{item.receivingContact}}-{{item.receivingContactTel}}</uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="24">发货日期：{{item.actualDeliveryDate}}</uni-col>
            </uni-row>
            <view class="card-actions">
                <view class="card-actions-item" @click="actionsClick(item.id)">
                    <view class="tag-view">
                        <uni-tag text="发货装车" type="primary"/>
                    </view>
                </view>
            </view>
        </uni-card>
        <view class="pagination_top" v-if="dataList">
            <uni-pagination title="普通分页" :total="total" @change="pagination"></uni-pagination>
        </view>
        <view v-else style="font-size: 14px;text-align: center;margin-top: 50px;color: #8f939c">
            暂无数据...
        </view>
    </view>
</template>

<script>
    import UniRow from "../../../uni_modules/uni-row/components/uni-row/uni-row";
    import UniCol from "../../../uni_modules/uni-row/components/uni-col/uni-col";

    export default {
        components: {UniCol, UniRow},
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
                statusOptions: [
                    {
                        dictValue: '',
                        dictLabel: '请选择'
                    }
                ],
                index: 0,
                user: []
            }
        },
        created() {
            let _this = this
            this.getData('shipment_request_status', function (data) {
                data.forEach(function (item) {
                    _this.statusOptions.push(item)
                })
            })
            this.getUserInfo(function (data) {
                _this.user = data;
                _this.getList()
            })
        },
        methods: {
            getList() {
                uni.showLoading({
                    title: '加载中'
                })
                // this.queryParams.receivingContactId = this.user.userId
                this.sendRequest('assetMsg/shipmentRequest/list', 'GET', this.queryParams
                    , false).then(res => {
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
                // uni.navigateTo({
                // 	url: '/pages/aomanagerment/signFor/equipList?id=' + id
                // })
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
            },
            searchMore() {
                this.getList()
                this.$refs.popup.close()
            },
            bindPickerChange: function (e) {
                this.index = e.detail.value
                this.queryParams.status = this.statusOptions[this.index].dictValue
            },
            actionsClick(id) {
                uni.navigateTo({
                    url: '/pages/aomanagerment/loadingAndDelivery/loadingEdit?id=' + id
                })
            },
        }
    };
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
        border-top: 1px solid rgb(248, 248, 248);
        border-bottom: 1px solid rgb(248, 248, 248);
    }

    .card-actions-item {
        float: right;
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>
