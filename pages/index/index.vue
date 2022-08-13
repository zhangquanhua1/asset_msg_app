<template>
    <view>
        <uni-section title="库存查询" type="line" padding>
            <uni-grid :column="4" :show-border="false" :square="false" @change="change($event,'1')">
                <uni-grid-item v-for="(item ,index) in list" :index="index" :key="index">
                    <view class="grid-item-box">
                        <image class="image" :src="item.url" mode="aspectFill"/>
                        <text class="text">{{item.text}}</text>
                        <view v-if="item.badge" class="grid-dot">
                            <uni-badge :text="item.badge" :type="item.type"/>
                        </view>
                    </view>
                </uni-grid-item>
            </uni-grid>
        </uni-section>
        <uni-section title="资产运营管理" type="line" padding>
            <uni-grid :column="4" :show-border="false" :square="false" @change="change($event,'2')">
                <uni-grid-item v-for="(item ,index) in aomanagermentList" :index="index" :key="index">
                    <view class="grid-item-box">
                        <image class="image" :src="item.url" mode="aspectFill"/>
                        <text class="text">{{item.text}}</text>
                        <view v-if="item.badge" class="grid-dot">
                            <uni-badge :text="item.badge" :type="item.type"/>
                        </view>
                    </view>
                </uni-grid-item>
            </uni-grid>
        </uni-section>
    </view>
</template>

<script>
    import uniSection from '@/components/uni-section/uni-section';

    export default {
        components: {
            uniSection
        },
        data() {
            return {
                list: [{
                    url: '/static/kc1.png',
                    text: '场地库存',
                    type: "primary",
                    page: '/pages/inventoryQuery/warehouse/warehouse'
                },
                    {
                        url: '/static/kc2.png',
                        text: '项目库存',
                        type: "success",
                        page: '/pages/inventoryQuery/project/project'
                    },
                    {
                        url: '/static/kc3.png',
                        text: '物流库存',
                        type: "warning",
                        page: '/pages/inventoryQuery/logistics/logistics'
                    },
                    {
                        url: '/static/kc4.png',
                        text: '转租库存',
                        type: "error",
                        page: '/pages/inventoryQuery/sublease/sublease'
                    }
                ],
                aomanagermentList: [
                    {
                        url: '/static/fhsq.png',
                        text: '发货申请',
                        type: "success",
                        page: '/pages/aomanagerment/shipmentRequest/index'
                    },
                    {
                        url: '/static/ddap.png',
                        text: '调度安排',
                        type: "success",
                        page: '/pages/aomanagerment/schedulingArrangement/schedulingArrangement'
                    },
                    {
                        url: '/static/zcfh.png',
                        text: '装车发货',
                        type: "success",
                        page: '/pages/aomanagerment/loadingAndDelivery/loadingAndDelivery'
                    },
                    {
                        url: '/static/qs.png',
                        text: '签收',
                        badge: '1',
                        type: "error",
                        page: '/pages/aomanagerment/signFor/index'
                    },
                    {
                        url: '/static/zj.png',
                        text: '质检',
                        type: "success",
                        page: '/pages/aomanagerment/qualityTesting/index'
                    },
                ],
                user:[]
            }
        },
        onLoad() {

        },
        created() {
            let _this=this
            uni.setTabBarBadge({ //显示数字
                index: 1,//tabbar下标
                text: '1'//数字
            })
            this.getUserInfo(function (data) {
                _this.user=data;
            })
        },
        methods: {
            change(e, type) {
                let {
                    index
                } = e.detail
                let page
                if ('1' === type)
                    page = this.list[index].page
                else if ('2' === type)
                    page = this.aomanagermentList[index].page
                if (page) {
                    uni.navigateTo({
                        url: page
                    })
                }
            },
        }
    }
</script>

<style lang="scss">
    .image {
        width: 25px;
        height: 25px;
    }

    .text {
        font-size: 14px;
        margin-top: 5px;
    }

    .example-body {
        /* #ifndef APP-NVUE */
        // display: block;
        /* #endif */
    }

    .grid-dynamic-box {
        margin-bottom: 15px;
    }

    .grid-item-box {
        flex: 1;
        // position: relative;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
    }

    .grid-item-box-row {
        flex: 1;
        // position: relative;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
    }

    .grid-dot {
        position: absolute;
        top: 5px;
        right: 15px;
    }

    .swiper {
        height: 420px;
    }

    /* #ifdef H5 */
    @media screen and (min-width: 768px) and (max-width: 1425px) {
        .swiper {
            height: 630px;
        }
    }

    @media screen and (min-width: 1425px) {
        .swiper {
            height: 830px;
        }
    }

    /* #endif */
</style>


