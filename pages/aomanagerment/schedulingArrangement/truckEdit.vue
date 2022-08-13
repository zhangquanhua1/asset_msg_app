<template>
    <view>
        <uni-section title="承运单位信息" type="line">
            <uni-forms ref="baseForm" style="margin: 10px">
                <uni-forms-item label="物流编号">
                    <uni-easyinput placeholder="请输入物流编号" v-model="shipmentRequest.logisticsNumber"/>
                </uni-forms-item>
                <uni-forms-item label="承运单位">
                    <uni-easyinput placeholder="请输入物承运单位" v-model="shipmentRequest.carrier"/>
                </uni-forms-item>
                <uni-forms-item label="物流费用">
                    <uni-easyinput placeholder="请输入物流费用" v-model="shipmentRequest.logisticsCost"/>
                </uni-forms-item>
            </uni-forms>
        </uni-section>
        <uni-section title="车辆安排信息" type="line">
            <!--<view style="text-align: center" v-if="truckList.length===0">-->
                <!--<button type="primary" size="mini" style="width: 200px" @click="add()">新增车辆-->
                <!--</button>-->
            <!--</view>-->
            <uni-card v-for="(item, index) in truckList" :key="index">
                <uni-forms-item label="车辆长度" required>
                    <uni-easyinput placeholder="请输入车辆长度" v-model="item.entruckLength"/>
                </uni-forms-item>
                <uni-forms-item label="车牌号" required>
                    <uni-easyinput placeholder="请输入车牌号" v-model="item.carNumber"/>
                </uni-forms-item>
                <uni-forms-item label="司机姓名" required>
                    <uni-easyinput placeholder="请输入司机姓名" v-model="item.driverName"/>
                </uni-forms-item>
                <uni-forms-item label="身份证号" required>
                    <uni-easyinput placeholder="请输入身份证号码" v-model="item.idNumber"/>
                </uni-forms-item>
                <uni-forms-item label="联系电话" required>
                    <uni-easyinput placeholder="请输入联系电话" v-model="item.tel"/>
                </uni-forms-item>
                <view class="card-actions">
                    <view class="card-actions-item" @click="del(item,index)">
                        <view class="tag-view">
                            <uni-tag text="删除" type="error"/>
                        </view>
                    </view>
                    <!--<view class="card-actions-item" @click="add" v-if="index===truckListLength-1">-->
                        <!--<view class="tag-view">-->
                            <!--<uni-tag text="新增车辆" type="primary" @click="add()"/>-->
                        <!--</view>-->
                    <!--</view>-->
                </view>
            </uni-card>
        </uni-section>

        <view style="text-align: center;margin: 15px" v-if="truckList.length>0">
            <button type="primary" size="mini" style="width: 100px" @click="submitForm()">保存安排
            </button>
            <button type="primary" size="mini" style="width: 100px;margin-left: 15px" @click="add()">新增车辆
            </button>
        </view>
    </view>
</template>

<script>
    export default {
        onLoad: function (option) {
            this.shipmentRequest['shipmentRequestId'] = option.id
            if (option.id)
                this.getShipmentRequest(option.id)
        },
        data() {
            return {
                truckList: [],
                shipmentRequest: [],
                truckListLength: 0
            }
        },
        methods: {
            getShipmentRequest(id) {
                uni.showLoading({
                    title: '加载中'
                })
                this.sendRequest('assetMsg/shipmentRequest/' + id, 'GET', {}, false).then(res => {
                    this.shipmentRequest = res.data.data
                    this.truckList = this.shipmentRequest.shipmentCarList
                    this.truckListLength=this.truckList.length
                    let equipSpecifics = []
                    this.shipmentRequest.shipmentEquipList.forEach(function (item) {
                        equipSpecifics.push(item.equipSpecific)
                    })
                    if (equipSpecifics.length > 0 && 0 === this.truckList.length) {
                        this.getTruckList(equipSpecifics[0])
                    }
                    uni.hideLoading()
                }).catch(err => {
                    //请求失败
                    uni.hideLoading()
                })
            },
            //获取默认装车工艺
            getTruckList(equipSpecifics) {
                let params = { equipSpecifics: equipSpecifics }
                let equipSpecific = null
                if (equipSpecifics.length < 2) {
                    params = {}
                    equipSpecific = equipSpecifics[0]
                }
                this.sendRequest('assetMsg/entruckingItem/list', 'GET',this.qs.stringify({ params: params, equipSpecific: equipSpecific },{arrayFormat: 'repeat'}), false).then(res => {
                    let _this = this
                    res.data.rows.forEach(function (item) {
                        item['entruckingItemId'] = item.id
                        item['id'] = null
                        _this.truckList.push(item)
                    })
                }).catch(err => {
                    //请求失败
                })
            },
            add() {
                this.truckList.push({
                    entruckLength: '',
                    carNumber: '',
                    driverName: '',
                    idNumber: '',
                    tel: '',
                    remark: '',
                })
                this.truckListLength++
            },
            del(row, index) {
                if (row.id !== null&&row.id!==undefined) {
                    uni.showLoading({
                        title: '数据处理中...',
                    })
                    this.sendRequest('assetMsg/shipmentCar/' + row.id, 'delete', {}, 'application/json').then(res => {
                        uni.hideLoading()
                        uni.showToast({
                            title: '操作成功'
                        });
                    }).catch(err => {
                        //请求失败
                        uni.hideLoading()
                    })
                }
                const list = []
                let size = 0;
                this.truckList.forEach(function (item) {
                    if (size !== index) {
                        list.push(item)
                    }
                    size++
                })
                this.truckList = list
            },
            submitForm() {
                uni.showLoading({
                    title: '数据处理中...',
                })
                this.shipmentRequest['shipmentEquipList'] = null
                this.shipmentRequest['shipmentComponentsList'] = null
                this.shipmentRequest['shipmentCarList'] = this.truckList
                this.sendRequest('assetMsg/shipmentRequest', 'put', this.shipmentRequest, 'application/json').then(res => {
                    uni.hideLoading()
                    uni.showToast({
                        title: '操作成功'
                    });
                    uni.navigateTo({
                        url: '/pages/aomanagerment/schedulingArrangement/schedulingArrangement'
                    })
                }).catch(err => {
                    //请求失败
                    uni.hideLoading()
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
