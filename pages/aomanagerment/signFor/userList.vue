<template>
    <view class="uni-list">
        <uni-row>
            <uni-col :span="21">
                <uni-search-bar placeholder="请输入姓名搜索" @confirm="search" v-model="queryParams.nickName"
                                @cancel="cancel" @clear="clear">
                </uni-search-bar>
            </uni-col>
            <uni-col :span="3">
                <span class="search-more" @click="openMsg">选择</span>
            </uni-col>
        </uni-row>
        <radio-group @change="radioChange">
            <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.userId">
                <uni-row>
                    <uni-col :span="4" class="line">
                        <view class="radioItem">
                            <radio :value="String(item.userId+','+item.nickName)" :checked="index === current"/>
                        </view>
                    </uni-col>
                    <uni-col :span="6" class="line">
                        <view class="radioItem">{{item.nickName}}</view>
                    </uni-col>
                    <uni-col :span="14" class="line">
                        <view class="radioItem">{{item.dept.deptName}}</view>
                    </uni-col>
                </uni-row>
            </label>
        </radio-group>

        <view class="pagination_top">
            <uni-pagination title="普通分页" :total="total" @change="pagination"></uni-pagination>
        </view>
        <!-- 提示窗示例 -->
        <uni-popup ref="alertDialog" type="dialog">
            <uni-popup-dialog type="warn" cancelText="取消" confirmText="确认" title="指定签收人提示" :content="confirmText"
                              @confirm="dialogConfirm"
            ></uni-popup-dialog>
        </uni-popup>
    </view>
</template>

<script>
    import UniRow from "../../../uni_modules/uni-row/components/uni-row/uni-row";
    import UniCol from "../../../uni_modules/uni-row/components/uni-col/uni-col";

    export default {
        name: "userList",
        components: {UniCol, UniRow},
        onLoad: function (option) {
            this.id = option.id
        },
        data() {
            return {
                id: null,
                items: [],
                current: null,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    nickName: ''
                },
                total: 0,
                checkUserId: null,
                checkUserName: '',
                confirmText: ''
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            getUserList() {
                uni.showLoading({
                    title: '加载中'
                })
                console.log(this.queryParams.nickName)
                this.sendRequest('system/user/list', 'GET', this.queryParams
                    , false).then(res => {
                    this.items = res.data.rows
                    this.total = res.data.total
                    uni.hideLoading()
                }).catch(err => {
                    //请求失败
                    uni.hideLoading()
                })
            },
            pagination(e) {
                this.queryParams.pageNum = e.current
                this.getUserList()
            },
            radioChange(evt) {
                this.checkUserId = evt.detail.value.split(',')[0]
                this.checkUserName = evt.detail.value.split(',')[1]
            },
            search(res) {
                this.queryParams.nickName = ''
                this.getUserList()
            },
            clear(res) {
                this.queryParams.nickName = ''
                this.getUserList()
            },
            cancel(res) {
                this.getUserList()
            },
            openMsg() {
                if(this.checkUserId){
                    this.confirmText = '请确认指定【' + this.checkUserName + '】为签收人!'
                    this.$refs.alertDialog.open('center')
                }else {
                    uni.showToast({
                        title: '请指定签收人'
                    });
                }
            },
            dialogConfirm() {
                this.sendRequest('assetMsg/shipmentRequest', 'put', {
                    id: this.id,
                    receivingContact: this.checkUserName,
                    receivingContactId: this.checkUserId
                }, 'application/json').then(res => {
                    uni.showToast({
                        title: '操作成功'
                    });
                    uni.navigateTo({
                        url: '/pages/home/home'
                    })
                }).catch(err => {
                    //请求失败
                    console.log(err)
                })
                this.$refs.alertDialog.close()
            },
        }
    }
</script>

<style scoped>
    .radioItem {
        float: left;
        margin: 5px;
        font-size: 14px;
    }

    .line {
        /*padding: 3px;*/
        border-bottom: 1px solid #f8f8f8;
        height: 35px;
        /*line-height: 40px;*/
    }

    .pagination_top {
        margin-top: 5px;
    }

    .search-more {
        height: 56px;
        line-height: 56px;
        font-size: 14px;
    }
</style>
