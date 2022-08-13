<template>
    <view>
        <uni-section v-for="(item, index) in shipmentCarList" :title="'车牌号：'+item.carNumber" type="line" :key="index">
            <uni-card v-for="(carItem,carItemIndex) in item.shipmentCarItemList" :key="carItemIndex">
                <uni-row>
                    <uni-col :span="24">名称：{{carItem.componGeneric}}</uni-col>
                </uni-row>
                <uni-row>
                    <uni-col :span="24">规格型号：{{carItem.componModel}}</uni-col>
                </uni-row>
                <uni-row>
                    <uni-col :span="20">
                        <uni-forms-item label="数量：" required>
                            <!--<uni-easyinput placeholder="请输入数量" v-model="carItem.number"/>-->
                            <uni-number-box v-model="carItem.number" :max="1000"/>
                        </uni-forms-item>
                    </uni-col>
                    <uni-col :span="4">
                        <view style="margin-top: 3px">{{carItem.calculate}}</view>
                    </uni-col>
                </uni-row>
            </uni-card>
            <view style="text-align: center">
                <button type="primary" size="mini" style="width: 200px" @click="showDrawer('showRight',item)">新增设零部件
                </button>
            </view>
        </uni-section>

        <view style="text-align: center;margin: 15px">
            <button type="primary" size="mini" style="width: 280px" @click="submitForm()">保存安排
            </button>
        </view>
        <uni-drawer ref="showRight" mode="right" :mask-click="false" :width="320">
            <view class="scroll-view">
                <scroll-view class="scroll-view-box" scroll-y="true">
                    <view>
                        <uni-row>
                            <uni-col :span="20">
                                <uni-search-bar placeholder="请输入零部件名称搜索" @confirm="search"
                                                v-model="queryComponents.componGeneric"
                                                @cancel="cancel" @clear="cancel">
                                </uni-search-bar>
                            </uni-col>
                            <uni-col :span="4">
                                <view class="tag-view" style="margin-top: 13px">
                                    <uni-tag text="关闭" type="success" @click="closeDrawer('showRight')"/>
                                </view>
                            </uni-col>
                        </uni-row>
                    </view>
                    <view>
                        <radio-group @change="radioChange">
                            <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in componentsList"
                                   :key="item.id">
                                <uni-list-item :title="item.componGeneric+'【'+item.componModel+'】'"
                                               :note="item.componSerial"
                                               showArrow :rightText="item.componSerial">
                                    <template v-slot:footer>
                                        <view class="radioItem">
                                            <radio :value="String(item.id)"
                                                   :checked="index === current"/>
                                        </view>
                                    </template>
                                </uni-list-item>
                            </label>
                        </radio-group>
                        <view class="pagination_top">
                            <uni-pagination title="普通分页" :total="total"
                                            @change="pagination"></uni-pagination>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </uni-drawer>
    </view>
</template>

<script>
    import UniRow from "../../../uni_modules/uni-row/components/uni-row/uni-row";
    import UniCol from "../../../uni_modules/uni-row/components/uni-col/uni-col";
    import uniNumberBox from 'components/uni-number-box/uni-number-box'

    export default {
        components: {UniCol, UniRow,uniNumberBox},
        onLoad: function (option) {
            this.shipmentRequest['shipmentRequestId'] = option.id
            if (option.id)
                this.getShipmentRequest(option.id)
            this.listShipmentComponents(option.id)
        },
        data() {
            return {
                shipmentRequest: [],
                shipmentCarList: [],
                queryComponents: {
                    pageNum: 1,
                    pageSize: 10,
                    storeId: null,
                    componGeneric: ''
                },
                total: 0,
                componentsList: [],
                current: null,
                currentRow: [],
                //装车清单Ids
                entruckingItemIds: [],
                //零部件安排对象信息
                shipmentComponentsList: [],
            }
        },
        created() {
        },
        methods: {
            getShipmentRequest(id) {
                uni.showLoading({
                    title: '加载中'
                })
                let that=this
                this.sendRequest('assetMsg/shipmentRequest/' + id, 'GET', {}, false).then(res => {
                    this.shipmentRequest = res.data.data
                    this.shipmentCarList = this.shipmentRequest.shipmentCarList
                    this.getEquipComponentsList(this.shipmentRequest.storeId)
                    let config = true
                    this.shipmentCarList.forEach(function(car) {
                        if(car.shipmentCarItemList.length>0){
                            config = false
                        }
                        if (car.entruckingItemId){
                            that.entruckingItemIds.push(car.entruckingItemId)
                        }
                    })
                    if (config&&this.entruckingItemIds.length>0) {
                        //components没有关联car
                        this.listEntruckingThird(this.entruckingItemIds)
                    }
                    uni.hideLoading()
                }).catch(err => {
                    //请求失败
                    uni.hideLoading()
                })
            },
            listEntruckingThird(itemIds){
                let params = {entruckingItemIds: itemIds}
                let entruckingItemId = null
                if (itemIds.length < 2) {
                    params = {}
                    entruckingItemId = itemIds[0]
                }
                let that = this
                this.sendRequest('assetMsg/entruckingThird/list', 'GET', {entruckingItemIds: itemIds.join(','), entruckingItemId: entruckingItemId}
                    , false).then(res => {
                    //比对components跟third，将itemId写入components
                    this.shipmentComponentsList.forEach(function (components) {
                        res.data.rows.forEach(function(item) {
                            if (components.componCode == item.componCode){
                                components['entruckingItemId'] = item.entruckingItemId
                                components['isEdit'] = true
                            }
                        })
                    })
                    //通过itemId比对components跟car
                    this.shipmentCarList.forEach(function (car) {
                        let shipmentCarItemList = []
                        that.shipmentComponentsList.forEach(function (components) {
                            if (car.entruckingItemId == components.entruckingItemId){
                                //将carId写入components中
                                components.shipmentCarId = car.id
                                shipmentCarItemList.push(components)
                            }
                        })
                        car.shipmentCarItemList = shipmentCarItemList
                    })
                }).catch(err => {
                    //请求失败
                })
            },
            /**查询发货申请-零部件安排对象信息*/
            listShipmentComponents(requestId) {
                let _this=this
                this.sendRequest('assetMsg/shipmentComponents/list', 'GET', {shipmentRequestId:requestId}
                    , false).then(res => {
                    _this.shipmentComponentsList = res.data.rows
                }).catch(err => {
                    //请求失败
                })
            },
            getEquipComponentsList(storeId) {
                let _this = this
                _this.queryComponents.storeId = storeId
                this.sendRequest('assetMsg/equipComponents/list', 'GET', _this.queryComponents
                    , false).then(res => {
                    _this.componentsList = res.data.rows
                    _this.total = res.data.total
                }).catch(err => {
                    //请求失败
                })
            },
            showDrawer(e, row) {
                this.currentRow = row
                this.getEquipComponentsList(this.shipmentRequest.storeId)
                this.$refs[e].open()
            },
            // 关闭窗口
            closeDrawer(e) {
                this.$refs[e].close()
            },
            search() {
            },
            cancel() {
            },
            radioChange(e) {
                let _this = this
                this.componentsList.forEach(function (item) {
                    if (item.id === parseInt(e.detail.value)) {
                        let flag = true
                        _this.currentRow.shipmentCarItemList.forEach(function (comp) {
                            if (comp.id === parseInt(e.detail.value)) {
                                flag = false
                            }
                        })
                        if (flag) {
                            // item['componentsId'] = item.id
                            // item['id']=null
                            // _this.currentRow.shipmentCarItemList.push(item)
                            _this.currentRow.shipmentCarItemList.push({
                                id: null,
                                shipmentRequestId: _this.shipmentRequest.id,
                                componentsId: item.id,
                                componGeneric: item.componGeneric,
                                componModel: item.componModel,
                                calculate: item.calculate,
                                componCode: item.componCode,
                                componSerial: item.componSerial,
                                equipVender: item.equipVender,
                                dimensions: item.dimensions,
                                number: 1,
                            })
                        }
                    }
                })
                this.$refs['showRight'].close()
            },
            submitForm() {
                uni.showLoading({
                    title: '数据处理中...',
                })
                this.shipmentRequest['shipmentEquipList'] = null
                this.shipmentRequest['shipmentComponentsList'] = null
                this.shipmentRequest['shipmentCarList'] = this.shipmentCarList
                this.sendRequest('assetMsg/shipmentRequest', 'put', this.shipmentRequest, 'application/json').then(res => {
                    uni.showToast({
                        title: '操作成功'
                    });
                    uni.hideLoading()
                    uni.navigateTo({
                        url: '/pages/aomanagerment/loadingAndDelivery/loadingAndDelivery'
                    })
                }).catch(err => {
                    //请求失败
                    uni.hideLoading()
                })
            },
        }
    }
</script>

<style>

</style>
