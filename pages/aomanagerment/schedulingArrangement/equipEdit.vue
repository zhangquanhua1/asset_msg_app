<template>
    <view class="container">
        <uni-forms ref="baseForm" style="margin: 10px">
            <uni-forms-item label="计划发货日期">
                <uni-datetime-picker type="date" v-model="shipmentRequest.plannedDeliveryDate"/>
            </uni-forms-item>
            <uni-forms-item label="实际发货日期">
                <uni-datetime-picker type="date" v-model="shipmentRequest.actualDeliveryDate"/>
            </uni-forms-item>
            <uni-forms-item label="发货仓库">
                <picker @change="bindPickerChange" :value="index" :range="storeList"
                        :range-key="'storeName'">
                    <uni-easyinput suffixIcon="search" v-model="shipmentRequest.storeName"
                                   class="uni-mt-5" trim="all"
                                   placeholder="请选择规发货仓库"></uni-easyinput>
                </picker>
            </uni-forms-item>
        </uni-forms>
        <uni-collapse accordion v-model="accordionVal">
            <uni-collapse-item title="整机安排">
                <view style="text-align: center" v-if="equipList.length===0">
                    <button type="primary" size="mini" style="width: 200px" @click="showDrawer('showRight')">新增设备
                    </button>
                </view>
                <uni-card v-for="(item, index) in equipList" :title="item.equipSpecific"
                          :extra="item.equipGeneric"
                          :key="index">
                    <uni-forms-item label="自编号" required>
                        <view style="margin-top: 6px">{{item.equipSerial}}</view>
                    </uni-forms-item>
                    <uni-forms-item label="楼号" required>
                        <uni-easyinput placeholder="请输入楼号" v-model="item.buildingNum"/>
                    </uni-forms-item>
                    <uni-forms-item label="调拨时间">
                        <uni-datetime-picker type="date" v-model="item.dispatchDate"/>
                    </uni-forms-item>
                    <uni-forms-item label="预计进场时间">
                        <uni-datetime-picker type="date" v-model="item.approachDate"/>
                    </uni-forms-item>
                    <uni-forms-item label="预计拆卸时间">
                        <uni-datetime-picker type="date" v-model="item.disassembleDate"/>
                    </uni-forms-item>
                    <view class="card-actions">
                        <view class="card-actions-item" @click="del(item,index)">
                            <view class="tag-view">
                                <uni-tag text="删除" type="error"/>
                            </view>
                        </view>
                        <view class="card-actions-item">
                            <view class="tag-view">
                                <uni-tag text="新增设备" type="primary" @click="showDrawer('showRight')"/>
                            </view>
                        </view>
                    </view>
                </uni-card>
            </uni-collapse-item>
            <uni-collapse-item title="零部件安排">
                <view style="text-align: center" v-if="shipmentComponentsList.length===0">
                    <button type="primary" size="mini" style="width: 200px" @click="showDrawer('showLeft')">新增设零部件
                    </button>
                </view>
                <uni-card v-for="(item, index) in shipmentComponentsList" :key="index">
                    <uni-forms-item label="部件名称" required>
                        <view style="margin-top: 6px">{{item.componGeneric}}</view>
                    </uni-forms-item>
                    <uni-forms-item label="配件型号" required>
                        <view style="margin-top: 6px">{{item.componModel}}</view>
                    </uni-forms-item>
                    <uni-forms-item label="数量" required>
                        <uni-easyinput placeholder="请输入数量" v-model="item.number"/>
                    </uni-forms-item>
                    <uni-forms-item label="单位" required>
                        <view style="margin-top: 6px">{{item.calculate}}</view>
                    </uni-forms-item>
                    <view class="card-actions">
                        <view class="card-actions-item" @click="del2(item,index)">
                            <view class="tag-view">
                                <uni-tag text="删除" type="error"/>
                            </view>
                        </view>
                        <view class="card-actions-item">
                            <view class="tag-view">
                                <uni-tag text="新增零部件" type="primary" @click="showDrawer('showLeft')"/>
                            </view>
                        </view>
                    </view>
                </uni-card>
            </uni-collapse-item>
        </uni-collapse>
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
                                <uni-search-bar placeholder="请输入设备型号搜索" @confirm="search"
                                                v-model="queryParams.equipSerial"
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
                            <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in equipmentList"
                                   :key="item.equipId">
                                <uni-list-item :title="equipGenericFormat(item.equipGeneric)+'【'+item.equipSerial+'】'"
                                               :note="equipSpecificFormat(item.equipSpecific)"
                                               showArrow :rightText="equipStatusFormat(item.status)">
                                    <template v-slot:footer>
                                        <view class="radioItem">
                                            <radio :value="String(item.equipId)"
                                                   :checked="index === current"/>
                                        </view>
                                    </template>
                                </uni-list-item>
                            </label>
                        </radio-group>
                        <view class="pagination_top">
                            <uni-pagination title="普通分页" :total="total" @change="pagination"></uni-pagination>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </uni-drawer>
        <uni-drawer ref="showLeft" mode="left" :mask-click="false" :width="320">
            <view class="scroll-view">
                <scroll-view class="scroll-view-box" scroll-y="true">
                    <view>
                        <uni-row>
                            <uni-col :span="20">
                                <uni-search-bar placeholder="请输入零部件名称搜索" @confirm="search2"
                                                v-model="queryComponents.componGeneric"
                                                @cancel="cancel2" @clear="cancel2">
                                </uni-search-bar>
                            </uni-col>
                            <uni-col :span="4">
                                <view class="tag-view" style="margin-top: 13px">
                                    <uni-tag text="关闭" type="success" @click="closeDrawer('showLeft')"/>
                                </view>
                            </uni-col>
                        </uni-row>
                    </view>
                    <view>
                        <radio-group @change="radioChangeLeft">
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
                            <uni-pagination title="普通分页" :total="componentsTotal"
                                            @change="pagination2"></uni-pagination>
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

    export default {
        components: {UniCol, UniRow},
        onLoad: function (option) {
            this.shipmentRequest['shipmentRequestId'] = option.id
            this.getShipmentRequest(option.id)
        },
        data() {
            return {
                accordionVal: '0',
                equipList: [],
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    equipSerial: '',
                    status: '0',
                    storeId: null
                },
                total: 0,
                equipmentList: [],
                //设备名称字典项
                equipGenericOptions: [],
                //设备规格型号
                equipSpecificOptions: [],
                //设备状态
                equipStatusOptions: [],
                current: null,
                //零部件列表
                shipmentComponentsList: [],
                componentsList: [],
                queryComponents: {
                    pageNum: 1,
                    pageSize: 10,
                    storeId: null,
                    componGeneric: ''
                },
                componentsTotal: 0,
                storeList: [],
                index: 0,
                shipmentRequest: [],
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
            this.getEquipSpecificlList('')
        },
        methods: {
            getShipmentRequest(id) {
                uni.showLoading({
                    title: '加载中'
                })
                this.sendRequest('assetMsg/shipmentRequest/' + id, 'GET', {}, false).then(res => {
                    this.shipmentRequest = res.data.data
                    this.equipList = this.shipmentRequest.shipmentEquipList
                    this.shipmentComponentsList = this.shipmentRequest.shipmentComponentsList
                    this.getStoreList()
                    this.getEquipComponentsList(this.shipmentRequest.storeId)
                    this.getList(this.shipmentRequest.storeId)
                    uni.hideLoading()
                }).catch(err => {
                    //请求失败
                    uni.hideLoading()
                })
            },
            getList(storeId) {
                uni.showLoading({
                    title: '加载中'
                })
                // if (this.exwDateRange.length>0) {
                //     this.queryParams.params.exwDateStart = this.exwDateRange[0]
                //     this.queryParams.params.exwDateEnd = this.exwDateRange[1]
                // }
                this.queryParams.storeId = storeId
                this.sendRequest('assetMsg/ddzlEquipment/list', 'GET', this.queryParams
                    , false).then(res => {
                    this.equipmentList = res.data.rows
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
            getEquipComponentsList(storeId) {
                let _this = this
                _this.queryComponents.storeId = storeId
                this.sendRequest('assetMsg/equipComponents/list', 'GET', _this.queryComponents
                    , false).then(res => {
                    _this.componentsList = res.data.rows
                    _this.componentsTotal = res.data.total
                }).catch(err => {
                    //请求失败
                })
            },
            getStoreList() {
                let _this = this
                this.sendRequest('assetMsg/tStoreHouse/list', 'GET', {}
                    , false).then(res => {
                    _this.storeList = res.data.rows
                    _this.storeList.forEach(function (item) {
                        if (_this.shipmentRequest.storeId === item.storeId) {
                            _this.shipmentRequest['storeName'] = item.storeName
                        }
                    })
                }).catch(err => {
                    //请求失败
                })
            },
            del(row, index) {
                if (row.id !== null) {
                    uni.showLoading({
                        title: '数据处理中...',
                    })
                    this.sendRequest('assetMsg/shipmentEquip/' + row.id, 'delete', {}, 'application/json').then(res => {
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
                let size = 0
                this.equipList.forEach(function (item) {
                    if (size !== index) {
                        list.push(item)
                    }
                    size++
                })
                this.equipList = list
            },
            del2(row, index) {
                if (row.id !== null) {
                    uni.showLoading({
                        title: '数据处理中...',
                    })
                    this.sendRequest('assetMsg/shipmentComponents/' + row.id, 'delete', {}, 'application/json').then(res => {
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
                let size = 0
                this.shipmentComponentsList.forEach(function (item) {
                    if (size !== index) {
                        list.push(item)
                    }
                    size++
                })
                this.shipmentComponentsList = list
            },
            showDrawer(e) {
                this.$refs[e].open()
            },
            // 关闭窗口
            closeDrawer(e) {
                this.$refs[e].close()
            },
            search() {
                this.getList()
            },
            cancel() {
                this.queryParams.equipSerial = null
                this.getList()
            },
            radioChange(e) {
                let _this = this
                this.equipmentList.forEach(function (item) {
                    if (item.equipId === parseInt(e.detail.value)) {
                        let flag = true
                        _this.equipList.forEach(function (equip) {
                            if (equip.equipId === parseInt(e.detail.value)) {
                                flag = false
                            }
                        })
                        if (flag) {
                            item.equipSpecific = _this.equipSpecificFormat(item.equipSpecific)
                            item.equipGeneric = _this.equipGenericFormat(item.equipGeneric)
                            _this.equipList.push(item)
                            _this.getEquipPartsList(item.equipId)
                        }
                    }
                })
                this.$refs['showRight'].close()
            },
            getEquipPartsList(equipId) {
                let _this=this
                this.sendRequest('assetMsg/equipParts/list', 'GET', { equipId: equipId }
                    , false).then(res => {
                    res.data.rows.forEach(function(item) {
                        _this.shipmentComponentsList.push({
                            componGeneric: item.accessoryName,
                            componModel: item.accessoryModel,
                            componCode: item.accessoryCode,
                            componSerial: item.componSerial,
                            equipVender: item.equipVender,
                            dimensions: item.technicalParameter,
                            number: item.number,
                            componentsId: item.id,
                            id: null,
                            equipId:equipId,
                            calculate:item.unitOfMeasure
                        })
                    })
                }).catch(err => {
                    //请求失败
                })
            },
            radioChangeLeft(e) {
                let _this = this
                this.componentsList.forEach(function (item) {
                    if (item.id === parseInt(e.detail.value)) {
                        let flag = true
                        _this.shipmentComponentsList.forEach(function (comp) {
                            if (comp.id === parseInt(e.detail.value)) {
                                flag = false
                            }
                        })
                        if (flag) {
                            item['componentsId'] = item.id
                            item.id = null
                            _this.shipmentComponentsList.push(item)
                        }
                    }
                })
                this.$refs['showLeft'].close()
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
            pagination(e) {
                this.queryParams.pageNum = e.current
                this.getList()
            },
            bindPickerChange(e) {
                this.index = e.detail.value
                this.shipmentRequest.storeId = this.storeList[this.index].storeId
                this.shipmentRequest.storeName = this.storeList[this.index].storeName
                // this.queryParams.status = this.statusOptions[this.index].dictValue
                this.getEquipComponentsList(this.shipmentRequest.storeId)
                this.getList(this.shipmentRequest.storeId)
            },
            submitForm() {
                uni.showLoading({
                    title: '数据处理中...',
                })
                this.shipmentRequest['shipmentEquipList'] = this.equipList
                this.shipmentRequest['shipmentComponentsList'] = this.shipmentComponentsList
                this.shipmentRequest['shipmentCarList'] = null
                this.sendRequest('assetMsg/shipmentRequest', 'put', this.shipmentRequest, 'application/json').then(res => {
                    uni.showToast({
                        title: '操作成功'
                    });
                    uni.hideLoading()
                    uni.navigateTo({
                        url: '/pages/aomanagerment/schedulingArrangement/schedulingArrangement'
                    })
                }).catch(err => {
                    //请求失败
                    uni.hideLoading()
                })
            },
            search2() {
                this.getEquipComponentsList(this.shipmentRequest.storeId)
            },
            cancel2() {
                this.queryComponents.componGeneric = null
                this.getEquipComponentsList(this.shipmentRequest.storeId)
            },
            pagination2(e) {
                this.queryComponents.pageNum = e.current
                this.getEquipComponentsList(this.shipmentRequest.storeId)
            },
        }
    }
</script>

<style>
    .card-actions-item {
        float: right;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .scroll-view {
        /* #ifndef APP-NVUE */
        width: 100%;
        height: 100%;
        /* #endif */
        flex: 1
    }

    .scroll-view-box {
        flex: 1;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .pagination_top {
        margin: 10px;
    }
</style>
