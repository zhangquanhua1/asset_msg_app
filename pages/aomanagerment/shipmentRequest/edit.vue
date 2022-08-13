<template>
    <view>
        <view class="active">
            <uni-steps :options="activeList" :active="active"/>
        </view>
        <view v-if="active===0">
            <view class="example">
                <!-- 基础用法，不包含校验规则 -->
                <uni-forms ref="valiForm" :rules="rules" :modelValue="form">
                    <uni-forms-item label="调拨类型" required name="allocationType">
                        <uni-data-checkbox @change="checkAllocationType" v-model="form.allocationType"
                                           :localdata="allocationTypeOptions"/>
                    </uni-forms-item>
                    <uni-forms-item label="货物类型" required name="goodsType">
                        <uni-data-checkbox @change="checkGoodType" v-model="form.goodsType"
                                           :localdata="goodsTypeOptions"/>
                    </uni-forms-item>
                    <uni-forms-item label="新旧状态" required name="oldNewType">
                        <uni-data-checkbox v-model="form.oldNewType" :localdata="oldNewTypeOptions"/>
                    </uni-forms-item>
                    <uni-forms-item label="是否空顶" required name="isEmptyRoof">
                        <uni-data-checkbox v-model="form.isEmptyRoof" :localdata="isEmptyRoofOptions"/>
                    </uni-forms-item>
                    <uni-forms-item label="是否转租" required name="isSublease">
                        <uni-data-checkbox v-model="form.isSublease" :localdata="isSubleaseOptions"/>
                    </uni-forms-item>
                    <uni-forms-item label="发货类型" required name="shipmentType">
                        <uni-data-checkbox v-model="form.shipmentType" :localdata="shipmentTypeOptions"/>
                    </uni-forms-item>
                    <view v-if="'4'!==allocationType">
                        <uni-forms-item label="承租方">
                            <picker @change="tenantryIdChange" :value="index"
                                    :range="tenantryList"
                                    :range-key="'name'">
                                <uni-easyinput suffixIcon="search" v-model="form.tenantryName" placeholder="请选择承租方"/>
                            </picker>
                        </uni-forms-item>
                        <uni-forms-item label="项目名称" required name="projectName">
                            <uni-easyinput v-model="form.projectName" placeholder="请输入项目名称"/>
                        </uni-forms-item>
                        <uni-forms-item label="项目地址" required name="projectAddress">
                            <uni-easyinput v-model="form.projectAddress" placeholder="请输入项目地址"/>
                        </uni-forms-item>
                        <uni-forms-item label="租赁合同">
                            <uni-easyinput v-model="form.contractNo" placeholder="请输入租赁合同"/>
                        </uni-forms-item>
                        <uni-forms-item label="项目经理">
                            <uni-easyinput v-model="form.projectManager" placeholder="请输入项目经理" @focus="setUser('1')"/>
                        </uni-forms-item>
                        <uni-forms-item label="联系电话">
                            <uni-easyinput v-model="form.managerTel" placeholder="请输入联系电话"/>
                        </uni-forms-item>
                    </view>
                    <view v-if="'4'===allocationType">
                        <uni-forms-item label="转出仓库">
                            <view style="margin-top: 9px;border-bottom: 1px solid rgba(135,135,135,0.43);">
                                <picker @change="storeChange" :value="storeIndex"
                                        :range="storeHouseList"
                                        :range-key="'storeName'">
                                    <view class="uni-input">{{storeHouseList[storeIndex].storeName}}</view>
                                </picker>
                            </view>
                        </uni-forms-item>
                        <uni-forms-item label="转入仓库">
                            <view style="margin-top: 9px;border-bottom: 1px solid rgba(135,135,135,0.43);">
                                <picker @change="storeChange2" :value="storeIndex2"
                                        :range="storeHouseList"
                                        :range-key="'storeName'">
                                    <view class="uni-input">{{storeHouseList[storeIndex2].storeName}}</view>
                                </picker>
                            </view>
                        </uni-forms-item>
                    </view>
                    <uni-forms-item label="设备编号">
                        <uni-easyinput v-model="form.equipNo" placeholder="请输入设备编号"/>
                    </uni-forms-item>
                    <uni-forms-item label="出厂日期">
                        <uni-datetime-picker type="datetime"
                                             v-model="form.exwDate"/>
                    </uni-forms-item>
                    <uni-forms-item label="收货联系人">
                        <uni-easyinput v-model="form.receivingContact" placeholder="请输入收货联系人" @focus="setUser('2')"/>
                    </uni-forms-item>
                    <uni-forms-item label="联系电话">
                        <uni-easyinput v-model="form.receivingContactTel" placeholder="请输入联系电话"/>
                    </uni-forms-item>
                    <uni-forms-item label="计划发货日期">
                        <uni-datetime-picker type="datetime"
                                             v-model="form.plannedDeliveryDate"/>
                    </uni-forms-item>
                    <uni-forms-item label="实际发货日期">
                        <uni-datetime-picker type="datetime"
                                             v-model="form.actualDeliveryDate"/>
                    </uni-forms-item>
                </uni-forms>
            </view>
        </view>
        <view v-if="active===1">
            <view class="example">
                <uni-forms ref="baseForm">
                    <uni-card :is-shadow="false" v-for="(item,index) in dynamicLists" :key="item.keyId">
                        <uni-forms-item label="名称" required>
                            <picker @change="bindPickerChange($event,index)" :value="pickerIndex" :range="goods"
                                    :range-key="'text'">
                                <uni-easyinput suffixIcon="search" v-model="item.goodsName" placeholder="请选择货物"/>
                            </picker>
                        </uni-forms-item>
                        <uni-forms-item label="数量" required>
                            <uni-easyinput v-model="item.number" placeholder="请输入数量"/>
                        </uni-forms-item>
                        <uni-forms-item label="单位" required>
                            <uni-easyinput v-model="item.unit" placeholder="请输入单位"/>
                        </uni-forms-item>
                        <button class="button" size="mini" type="default" @click="del(item.keyId)" v-if="index>0">删除
                        </button>
                    </uni-card>
                </uni-forms>
            </view>
        </view>
        <view style="text-align: center">

            <view class="button-group">
                <button v-if="active>0" type="primary" size="mini" style="margin: 30px 10px; width: 100px;"
                        @click="previous ">上一步
                </button>
                <button type="primary" size="mini" style="margin: 30px 10px; width: 100px;" @click="next('valiForm')"
                        v-if="active<1">
                    下一步
                </button>
                <button type="primary" size="mini" style="margin: 30px 10px; width: 100px;" @click="submit('valiForm')"
                        v-if="form.id==null||'-1'===form.status">
                    保存信息
                </button>
                <button type="primary" size="mini" style="margin: 30px 10px; width: 100px;" @click="add"
                        v-if="active===1">新增货物
                </button>
            </view>
        </view>
        <!--用户选择抽屉-->
        <uni-drawer ref="showRight" mode="right" :mask-click="false" :width="300">
            <view class="scroll-view">
                <view>
                    <uni-search-bar placeholder="请输入姓名搜索" @confirm="search" v-model="queryParams.nickName"
                                    @cancel="cancel" @clear="clear">
                    </uni-search-bar>
                </view>
                <scroll-view class="scroll-view-box" scroll-y="true">
                    <view>
                        <radio-group @change="radioChange">
                            <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in userList"
                                   :key="item.userId">
                                <uni-row>
                                    <uni-col :span="4" class="line">
                                        <view class="radioItem">
                                            <radio :value="String(item.userId+','+item.nickName)"
                                                   :checked="index === current"/>
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
                        <view class="close">
                            <button @click="closeDrawer('showRight')">
                                <text class="word-btn-white">取消</text>
                            </button>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </uni-drawer>
    </view>
</template>

<script>
    export default {
        onLoad: function (option) {
            this.form.id = option.id
        },
        data() {
            return {
                active: 0,
                activeList: [{
                    title: '基本信息'
                }, {
                    title: '发货信息'
                }],
                // 基础表单数据
                form: {
                    id: null,
                    tenantryId: '',
                    tenantryName: '',
                    contractNo: '',
                    projectName: '',
                    equipNo: '',
                    exwDate: null,
                    projectAddress: '',
                    projectManager: '',
                    projectManagerId: null,
                    managerTel: '',
                    receivingContact: '',
                    receivingContactId: null,
                    receivingContactTel: '',
                    goodsType: '',
                    allocationType: '',
                    isEmptyRoof: '',
                    isSublease: '',
                    shipmentType: '',
                    oldNewType: '',
                    plannedDeliveryDate: '',
                    actualDeliveryDate: '',
                    storeId: null,
                    receivingStoreId: null,
                    shipmentItemList: []
                },
                // 校验规则
                rules: {
                    projectName: {
                        rules: [{
                            required: true,
                            errorMessage: '项目名称不能为空'
                        }]
                    },
                    projectAddress: {
                        rules: [{
                            required: true,
                            errorMessage: '项目地址不能为空'
                        }]
                    },
                    goodsType: {
                        rules: [{
                            required: true,
                            errorMessage: '请选择货物类型'
                        }]
                    },
                    allocationType: {
                        rules: [{
                            required: true,
                            errorMessage: '请选择调拨类型'
                        }]
                    },
                    isEmptyRoof: {
                        rules: [{
                            required: true,
                            errorMessage: '请选择是否空顶'
                        }]
                    },
                    isSublease: {
                        rules: [{
                            required: true,
                            errorMessage: '请选择是否转租'
                        }]
                    },
                    shipmentType: {
                        rules: [{
                            required: true,
                            errorMessage: '请选择发货类型'
                        }]
                    },
                    oldNewType: {
                        rules: [{
                            required: true,
                            errorMessage: '请选择新旧状态'
                        }]
                    },
                },
                //承租方列表
                tenantryList: [
                    {
                        id: 1,
                        name: '中建八局南方建设有限公司'
                    }
                ],
                pickerIndex: 0,
                storeIndex: 0,
                storeIndex2: 0,
                // 货物类型：1、整机，2、部件，3、零配件字典
                goodsTypeOptions: [],
                //调拨类型
                allocationTypeOptions: [],
                // 是否空顶字典
                isEmptyRoofOptions: [],
                // 是否转租字典
                isSubleaseOptions: [],
                // 发货类型字典
                shipmentTypeOptions: [],
                // 新旧状态字典
                oldNewTypeOptions: [],
                allocationType: '',
                //仓库列表
                storeHouseList: [
                    {
                        storeId: null,
                        storeName: '请选择'
                    }
                ],
                showRight: false,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    nickName: ''
                },
                total: 0,
                userList: [],
                current: null,
                personType: '',
                dynamicLists: [
                    {
                        id: null,
                        goodsName: '',
                        number: null,
                        unit: '',
                        keyId: Date.now()
                    }
                ],
                goods: [
                    {
                        value: 0,
                        text: '主机（台）',
                        unit: '台'
                    }, {
                        value: 1,
                        text: '标准节（节/台）',
                        unit: '节/台'
                    }, {
                        value: 2,
                        text: '附着架（套/台）',
                        unit: '套/台'
                    }, {
                        value: 3,
                        text: '地脚螺栓（套/台）',
                        unit: '套/台'
                    }, {
                        value: 4,
                        text: '主电缆（米/台）*2',
                        unit: '米/台'
                    }, {
                        value: 5,
                        text: '钢丝绳（米）',
                        unit: '米'
                    }, {
                        value: 6,
                        text: '附墙拉杆（套）',
                        unit: '套'
                    }],
                index: 0,
            }
        },
        onReady() {
        },
        created() {
            let _this = this
            this.getData('goods_type', function (data) {
                data.forEach(function (item) {
                    _this.goodsTypeOptions.push({
                        text: item.dictLabel,
                        value: item.dictValue
                    })
                })
            })
            this.getData('allocation_type', function (data) {
                data.forEach(function (item) {
                    _this.allocationTypeOptions.push({
                        text: item.dictLabel,
                        value: item.dictValue
                    })
                })
            })
            this.getData('sys_yes_no', function (data) {
                data.forEach(function (item) {
                    _this.isEmptyRoofOptions.push({
                        text: item.dictLabel,
                        value: item.dictValue
                    })
                    _this.isSubleaseOptions.push({
                        text: item.dictLabel,
                        value: item.dictValue
                    })
                })
            })
            this.getData('shipment_type', function (data) {
                data.forEach(function (item) {
                    _this.shipmentTypeOptions.push({
                        text: item.dictLabel,
                        value: item.dictValue
                    })
                })
            })
            this.getData('old_new_type', function (data) {
                data.forEach(function (item) {
                    _this.oldNewTypeOptions.push({
                        text: item.dictLabel,
                        value: item.dictValue
                    })
                })
            })
            _this.getStoreHouseList()
            _this.getUserList()
            if (_this.form.id) {
                this.getShipmentRequest(_this.form.id)
            }
        },
        methods: {
            getShipmentRequest(id) {
                uni.showLoading({
                    title: '加载中'
                })
                this.sendRequest('assetMsg/shipmentRequest/' + id, 'GET', {}, false).then(res => {
                    this.form = res.data.data
                    this.allocationType = this.form.allocationType
                    if (this.form.shipmentItemList.length > 0)
                        this.dynamicLists = this.form.shipmentItemList
                    uni.hideLoading()
                }).catch(err => {
                    //请求失败
                    console.log(err)
                    uni.hideLoading()
                })
            },
            getStoreHouseList() {
                let _this = this
                this.sendRequest('assetMsg/tStoreHouse/list', 'GET', {}
                    , false).then(res => {
                    res.data.rows.forEach(function (item) {
                        _this.storeHouseList.push(item)
                    })
                }).catch(err => {
                    //请求失败
                })
            },
            tenantryIdChange(e) {
                this.index = e.detail.value
                this.form.tenantryId = this.tenantryList[this.index].id
                this.form.tenantryName = this.tenantryList[this.index].name
            },
            storeChange(e) {
                this.storeIndex = e.detail.value
                this.form.storeId = this.storeHouseList[this.storeIndex].storeId
            },
            storeChange2(e) {
                this.storeIndex2 = e.detail.value
                this.form.receivingStoreId = this.storeHouseList[this.storeIndex2].storeId
            },
            next(ref) {
                this.$refs[ref].validate().then(res => {
                    if (this.active < this.activeList.length - 1) {
                        this.active += 1
                    } else {
                        this.active = 0
                    }
                }).catch(err => {
                    uni.showToast({
                        title: `请填写必填项`,
                        image: '/static/err.png'
                    })
                })
            },
            previous() {
                if (this.active > 0) {
                    this.active -= 1
                }
            },
            submit(ref) {
                if (this.active == 0) {
                    this.$refs[ref].validate().then(res => {
                        this.submitForm()
                    }).catch(err => {
                        uni.showToast({
                            title: `请填写必填项`,
                            image: '/static/warn.png'
                        })
                    })
                } else {
                    this.submitForm()
                }
            },
            submitForm() {
                uni.showLoading({
                    title: '数据处理中...',
                })
                this.form.shipmentItemList = this.dynamicLists
                let method = 'post'
                if (this.form.id)
                    method = 'put'
                this.sendRequest('assetMsg/shipmentRequest', method, this.form, 'application/json').then(res => {
                    uni.showToast({
                        title: '操作成功'
                    });
                    uni.navigateTo({
                        url: '/pages/aomanagerment/shipmentRequest/index'
                    })
                    uni.hideLoading()
                }).catch(err => {
                    //请求失败
                    uni.hideLoading()
                })
            },
            checkGoodType(e) {
                console.log(e.detail.value)
            },
            checkAllocationType(e) {
                this.allocationType = e.detail.value
            },
            setUser(type) {
                this.$refs['showRight'].open()
                this.personType = type
            },
            closeDrawer() {
                this.$refs['showRight'].close()
            },
            getUserList() {
                this.sendRequest('system/user/list', 'GET', this.queryParams
                    , false).then(res => {
                    this.userList = res.data.rows
                    this.total = res.data.total
                }).catch(err => {
                    //请求失败
                })
            },
            radioChange(evt) {
                if ('1' === this.personType) {
                    this.form.projectManagerId = evt.detail.value.split(',')[0]
                    this.form.projectManager = evt.detail.value.split(',')[1]
                    this.form.receivingContactId = evt.detail.value.split(',')[0]
                    this.form.receivingContact = evt.detail.value.split(',')[1]
                } else {
                    this.form.receivingContactId = evt.detail.value.split(',')[0]
                    this.form.receivingContact = evt.detail.value.split(',')[1]
                }
                this.$refs['showRight'].close()
            },
            pagination(e) {
                this.queryParams.pageNum = e.current
                this.getUserList()
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
            bindPickerChange(e, id) {
                this.pickerIndex = e.detail.value
                this.dynamicLists[id].goodsName = this.goods[this.pickerIndex].text
                this.dynamicLists[id].unit = this.goods[this.pickerIndex].unit
            },
            add() {
                this.dynamicLists.push({
                    id: null,
                    goodsName: '',
                    number: null,
                    unit: '',
                    keyId: Date.now()
                })
            },
            del(id) {
                let index = this.dynamicLists.findIndex(v => v.keyId === id)
                this.dynamicLists.splice(index, 1)
            },
        }
    }
</script>

<style>
    .active {
        margin: 10px;
    }

    .example {
        padding: 15px;
        background-color: #fff;
    }

    .pagination_top {
        margin-top: 5px;
    }

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

    .close {
        padding: 10px;
    }

</style>
