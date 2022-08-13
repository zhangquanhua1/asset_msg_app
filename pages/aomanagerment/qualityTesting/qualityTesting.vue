<template>
    <view class="container">
        <uni-section title="基本信息" type="line">
            <uni-row>
                <uni-col :span="7" class="title">设备型号：</uni-col>
                <uni-col :span="17">{{equipSpecificFormat(inspect.equipSpecific)}}</uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="7" class="title title_top">上次项目工地：</uni-col>
                <uni-col :span="17">
                    <uni-easyinput v-model="inspect.projectName" placeholder="请输入上次项目工地"/>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="7" class="title title_top">上次项目时间：</uni-col>
                <uni-col :span="17">
                    <uni-datetime-picker type="date" v-model="inspect.projectTime"/>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="7" class="title title_top">检修班组：</uni-col>
                <uni-col :span="17">
                    <uni-easyinput v-model="inspect.inspectTeam" placeholder="请输入检修班组"/>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="7" class="title title_top">检修日期：</uni-col>
                <uni-col :span="17">
                    <uni-datetime-picker type="date" v-model="inspect.inspectDate"/>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="7" class="title title_top">现安装工地：</uni-col>
                <uni-col :span="17">
                    <uni-easyinput v-model="inspect.installationSite" placeholder="请输入现安装工地"/>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="7" class="title title_top">安装时间：</uni-col>
                <uni-col :span="17">
                    <uni-datetime-picker type="date" v-model="inspect.installationTime"/>
                </uni-col>
            </uni-row>
        </uni-section>
        <uni-section title="质检明细" type="line">
            <uni-card v-for="(item,index) in inspect.inspectMaintainDetailList" :title="'名称：'+item.inspectName"
                      :key="index" @click="goTest(item.id)">
                <uni-row>
                    <uni-col :span="6" class="title">作业内容：</uni-col>
                    <uni-col :span="18">{{item.inspectContent}}</uni-col>
                </uni-row>
                <uni-row>
                    <uni-col :span="6" class="title">检修要求：</uni-col>
                    <uni-col :span="18">{{item.inspectDemand}}</uni-col>
                </uni-row>
                <!--<uni-row>-->
                    <!--<uni-col :span="6" class="title">存在问题：</uni-col>-->
                    <!--<uni-col :span="18">-->
                        <!--<uni-easyinput type="textarea" v-model="item.inspectProblem" placeholder="请输入存在问题" />-->
                    <!--</uni-col>-->
                <!--</uni-row>-->
                <!--<uni-row style="margin-top: 5px">-->
                    <!--<uni-col :span="6" class="title">检修结果：</uni-col>-->
                    <!--<uni-col :span="18">-->
                        <!--<uni-easyinput type="textarea" v-model="item.inspectResult" placeholder="请输入存在问题" />-->
                    <!--</uni-col>-->
                <!--</uni-row>-->
            </uni-card>
        </uni-section>
    </view>
</template>

<script>
    import UniCol from "../../../uni_modules/uni-row/components/uni-col/uni-col";
    import UniRow from "../../../uni_modules/uni-row/components/uni-row/uni-row";
    import UniCard from "../../../uni_modules/uni-card/components/uni-card/uni-card";

    export default {
        components: {UniCard, UniRow, UniCol},
        onLoad: function (option) {
            if (option.id != null)
                this.getInspectMaintain(option.id)
        },
        data() {
            return {
                inspect: {},
                equipSpecificOptions: [],
            }
        },
        created() {
            this.getEquipSpecificlList()
        },
        methods: {
            /**查询质检维保信息*/
            getInspectMaintain(id) {
                uni.showLoading({
                    title: '加载中'
                })
                this.sendRequest('assetMsg/inspectMaintain/' + id, 'GET', {}, false).then(res => {
                    this.inspect = res.data.data
                    // console.log(this.inspect)
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
            goTest(id){
                uni.navigateTo({
                    url: '/pages/aomanagerment/qualityTesting/testEdit?id='+id
                })
            },
        }
    };
</script>

<style lang="scss">
    .container {
        margin: 10px;
        font-size: 14px;
    }

    .title {
        text-align: right
    }

    .title_top {
        height: 40px;
        margin-top: 8px
    }
</style>
