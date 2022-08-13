<template>
    <view>
        <uni-collapse ref="collapse" v-model="value">
            <uni-collapse-item title="设备信息">
                <view>
                    <view class="text">设备编号：{{equipment.recordSerial!=null?equipment.recordSerial:'-'}}</view>
                    <view class="text">制造许可证号：{{equipment.licenseNumber!=null?equipment.licenseNumber:'-'}}</view>
                    <view class="text">出厂编号：{{equipment.exwSerial!=null?equipment.exwSerial:'-'}}</view>

                    <view class="text">设备自编号：{{equipment.equipSerial!=null?equipment.equipSerial:'-'}}</view>
                    <view class="text">出厂日期：{{equipment.exwDate!=null?equipment.exwDate:'-'}}</view>
                    <view class="text">生产厂家：{{equipment.equipVender!=null?equipment.equipVender:'-'}}</view>

                    <view class="text">设备名称：{{equipment.equipGeneric!=null?equipment.equipGeneric:'-'}}</view>
                    <view class="text">采购日期：{{equipment.purchaseDate!=null?equipment.purchaseDate:'-'}}</view>
                    <view class="text">合同单价(元)：{{equipment.assetValue!=null?equipment.assetValue:'-'}}</view>

                    <view class="text">规格型号：{{equipment.equipSpecific!=null?equipment.equipSpecific:'-'}}</view>
                    <view class="text">报废日期：{{equipment.scrapDate!=null?equipment.scrapDate:'-'}}</view>
                    <view class="text">税率：{{equipment.taxRate!=null?equipment.taxRate:'-'}}</view>

                    <view class="text">设备类别：{{equipment.equipCategory!=null?equipment.equipCategory:'-'}}</view>
                    <view class="text">单位责任人：{{equipment.dutyman!=null?equipment.dutyman:'-'}}</view>
                    <view class="text">不含税价(元)：{{equipment.priceTaxFree!=null?equipment.priceTaxFree:'-'}}</view>

                    <view class="text">产权单位：{{equipment.propertyEnt!=null?equipment.propertyEnt:'-'}}</view>
                    <view class="text">所属部门：{{equipment.depId!=null?equipment.depId:'-'}}</view>
                    <view class="text">税金：{{equipment.amountTax!=null?equipment.amountTax:'-'}}</view>

                    <view class="text">备案编号：{{equipment.recordId!=null?equipment.recordId:'-'}}</view>
                    <view class="text">楼号：{{equipment.buildingNum!=null?equipment.buildingNum:'-'}}</view>
                    <view class="text">折旧率：{{equipment.depreciateRate!=null?equipment.depreciateRate:'-'}}</view>

                    <view class="text">归属仓库：{{equipment.storeId!=null?equipment.storeId:'-'}}</view>
                    <view class="text">设备来源：{{equipment.equipSource!=null?equipment.equipSource:'-'}}</view>
                    <view class="text">联系电话：{{equipment.dutymanTel!=null?equipment.dutymanTel:'-'}}</view>

                    <view class="text">项目地址：{{equipment.projectAddress!=null?equipment.projectAddress:'-'}}</view>
                    <view class="text">登记人：{{equipment.userName!=null?equipment.userName:'-'}}</view>
                    <view class="text">登记时间：{{equipment.providedDate!=null?equipment.providedDate:'-'}}</view>
                </view>
            </uni-collapse-item>
            <uni-collapse-item title="设备参数">
                <!--塔机参数-->
                <view v-if="'S'===equipment.equipGeneric">
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">设备名称：{{crane.equipmentName!=null?crane.equipmentName:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">生产厂家：{{crane.manufacturer!=null?crane.manufacturer:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">塔机型号：{{crane.equipmentModel!=null?crane.equipmentModel:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">额定起重力距：{{crane.ratedLiftingDistance!=null?crane.ratedLiftingDistance:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">最大起重量：{{crane.maximumLiftingCapacity!=null?crane.maximumLiftingCapacity:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">最大幅度额定起重量：{{crane.maximumRatedLiftingCapacity!=null?crane.maximumRatedLiftingCapacity:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">最大起重量工作幅度：{{crane.maxWrolfc!=null?crane.maxWrolfc:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">最大工作幅度：{{crane.maximumOperatingRange!=null?crane.maximumOperatingRange:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">最大起升高度：{{crane.maximumLiftingHeight!=null?crane.maximumLiftingHeight:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">起升速度：{{crane.liftingSpeed!=null?crane.liftingSpeed:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">变幅速度：{{crane.derrickingSpeed!=null?crane.derrickingSpeed:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">回转速度：{{crane.slewingSpeed!=null?crane.slewingSpeed:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">顶升速度：{{crane.jackingSpeed!=null?crane.jackingSpeed:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">塔机自重：{{crane.equipmentWeight!=null?crane.equipmentWeight:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">平衡重量：{{crane.balanceWeight!=null?crane.balanceWeight:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">工作电压：{{crane.workingVoltage!=null?crane.workingVoltage:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">装机总容量：{{crane.totalInstalledCapacity!=null?crane.totalInstalledCapacity:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">电机功率：{{crane.motorPower!=null?crane.motorPower:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">变频器功率：{{crane.converterPower!=null?crane.converterPower:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">标准节规格：{{crane.standardSectionSpecification!=null?crane.standardSectionSpecification:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">附墙框规格：{{crane.attachedWallFrameSpecification!=null?crane.attachedWallFrameSpecification:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">备注：{{crane.remark!=null?crane.remark:'-'}}</view>
                        </uni-col>
                    </uni-row>
                </view>
                <!--电梯参数-->
                <view v-if="'T'===equipment.equipGeneric">
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">生产厂家：{{crane.manufacturer!=null?crane.manufacturer:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">吊笼重量(kg)：{{crane.ratedLiftingDistance!=null?crane.ratedLiftingDistance:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">底笼尺寸：{{crane.bottomCageSize!=null?crane.bottomCageSize:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">吊笼内空尺寸：{{crane.inCageSize!=null?crane.inCageSize:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">标准节重量（kg）：{{crane.maximumLiftingCapacity!=null?crane.maximumLiftingCapacity:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">最大高度（m）：{{crane.maximumRatedLiftingCapacity!=null?crane.maximumRatedLiftingCapacity:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">额定载荷（kg）：{{crane.maxWrolfc!=null?crane.maxWrolfc:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">额定乘员（人）：{{crane.maximumOperatingRange!=null?crane.maximumOperatingRange:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">总功率（KW）：{{crane.maximumLiftingHeight!=null?crane.maximumLiftingHeight:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">起升速度：{{crane.liftingSpeed!=null?crane.liftingSpeed:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">额定电压（v）：{{crane.derrickingSpeed!=null?crane.derrickingSpeed:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">额定电流（A）：{{crane.slewingSpeed!=null?crane.slewingSpeed:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">减速机速比：{{crane.jackingSpeed!=null?crane.jackingSpeed:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">限速器制动力矩（KN）：{{crane.equipmentWeight!=null?crane.equipmentWeight:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">制动速度（m/min）：{{crane.balanceWeight!=null?crane.balanceWeight:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">基础要求：{{crane.workingVoltage!=null?crane.workingVoltage:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">供电要求：{{crane.totalInstalledCapacity!=null?crane.totalInstalledCapacity:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">标准节规格：{{crane.standardSectionSpecification!=null?crane.standardSectionSpecification:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">附着要求：{{crane.attachedWallFrameSpecification!=null?crane.attachedWallFrameSpecification:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="12">
                            <view class="text">规格型号：{{crane.specificationClassification!=null?crane.specificationClassification:'-'}}</view>
                        </uni-col>
                        <uni-col :span="12">
                            <view class="text">防坠器型号：{{crane.specificationOfFallArrester!=null?crane.specificationOfFallArrester:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">防坠器规格：{{crane.modelOfFallArrester!=null?crane.modelOfFallArrester:'-'}}</view>
                        </uni-col>
                    </uni-row>
                    <uni-row>
                        <uni-col :span="24">
                            <view class="text">备注：{{crane.remark!=null?crane.remark:'-'}}</view>
                        </uni-col>
                    </uni-row>
                </view>
            </uni-collapse-item>
            <uni-collapse-item title="部件清单">
                <view>
                    <uni-card :is-shadow="false" v-for="(item,index) in cranePartsList" :key="index">
                        <uni-row>
                            <uni-col :span="12">
                                <view class="text">部件名称:{{item.accessoryName}}</view>
                            </uni-col>
                            <uni-col :span="12">
                                <view class="text">型号:{{item.accessoryModel}}</view>
                            </uni-col>
                        </uni-row>
                        <uni-row>
                            <uni-col :span="12">
                                <view class="text">数量:{{item.num}}</view>
                            </uni-col>
                            <uni-col :span="12">
                                <view class="text">计量单位:{{item.unitOfMeasure}}</view>
                            </uni-col>
                        </uni-row>
                        <uni-row>
                            <uni-col :span="24">
                                <view class="text">技术参数:{{item.technicalParameter}}</view>
                            </uni-col>
                        </uni-row>
                    </uni-card>
                </view>
            </uni-collapse-item>
            <uni-collapse-item title="零配件清单">
                <view>
                    <uni-card :is-shadow="false" v-for="(item,index) in sparePartsList" :key="index">
                        <uni-row>
                            <uni-col :span="12">
                                <view class="text">部件名称:{{item.accessoryName}}</view>
                            </uni-col>
                            <uni-col :span="12">
                                <view class="text">型号:{{item.accessoryModel}}</view>
                            </uni-col>
                        </uni-row>
                        <uni-row>
                            <uni-col :span="12">
                                <view class="text">数量:{{item.num}}</view>
                            </uni-col>
                            <uni-col :span="12">
                                <view class="text">计量单位:{{item.unitOfMeasure}}</view>
                            </uni-col>
                        </uni-row>
                        <uni-row>
                            <uni-col :span="24">
                                <view class="text">技术参数:{{item.technicalParameter}}</view>
                            </uni-col>
                        </uni-row>
                    </uni-card>
                </view>
            </uni-collapse-item>
        </uni-collapse>
    </view>
</template>

<script>
    import UniRow from "../../../uni_modules/uni-row/components/uni-row/uni-row";

    export default {
        components: {UniRow},
        onLoad: function (option) {
            this.equipId = option.id
            if (this.equipId != null) {
                this.getEquip(this.equipId)
            }
        },
        data() {
            return {
                equipId: null,
                equipment: [],
                equipPartsList: [],
                equipSparePartsList: [],
                value: ['0'],
                //塔机、电梯参数对象
                crane: [],
                partData: [{
                    p1: "部件1",
                    p2: "G4434",
                    p3: "3",
                    p4: "件",
                    p5: "参数"
                }, {
                    p1: "部件2",
                    p2: "G4434",
                    p3: "4",
                    p4: "件",
                    p5: "参数2"
                }],
                // 设备名称字典
                equipCategoryOptions: [],
                //部件列表
                cranePartsList: [],
                //零配件清单
                sparePartsList: [],
            }
        },
        created() {
            //设备名称
            this.getData('equip_category', function (data) {
                this.equipCategoryOptions = data
            })
        },
        methods: {
            getEquip(id) {
                uni.showLoading({
                    title: '加载中'
                })
                this.sendRequest('assetMsg/ddzlEquipment/' + id, 'GET', {}, false).then(res => {
                    this.equipment = res.data.data
                    this.equipPartsList = this.equipment.equipPartsList
                    this.equipSparePartsList = this.equipment.equipSparePartsList
                    this.cranePartsList = this.equipment.equipPartsList
                    this.sparePartsList = this.equipment.equipSparePartsList
                    //获取设备基本参数
                    this.getCrane(this.equipment.equipSpecific)
                    uni.hideLoading()
                }).catch(err => {
                    //请求失败
                    console.log(err)
                    uni.hideLoading()
                })
            },
            //时间戳转换
            timestampToTime(timestamp) {
                return formatDate(timestamp)
            },
            getCrane(v) {
                this.sendRequest('assetMsg/crane/getInfoByEquipmentModel/' + v, 'GET', {}, false).then(res => {
                    this.crane = res.data
                    this.crane.equipmentName=this.equipGenericFormat2(this.crane.equipmentName)
                }).catch(err => {
                    //请求失败
                    console.log(err)
                })
            },
            equipGenericFormat2(value) {
                return this.selectDictLabel(this.equipStatusOptions, value)
            },
        }
    }
</script>

<style>
    .example-body {
        flex-direction: column;
        flex: 1;
    }

    .item {
        background-color: #ffffff;
        border-style: solid;
        border-color: #55557f;
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 10px;
        margin: 10px 10px 10px 10px;
    }

    .text {
        font-size: 14px;
        color: #000000;
        line-height: 20px;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 20px;
    }
</style>
