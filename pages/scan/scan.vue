<template>
    <view class="container">
        <button class="button" type="primary" @click="scanCode()">扫一扫</button>
    </view>
</template>
<script>
    export default {
        onLoad: function (option) {
            // this.scanCode()
        },
        data() {
            return {};
        },
        methods: {
            scanCode() {
                // 允许从相机和相册扫码
                uni.scanCode({
                    success: function (res) {
                        console.log('条码类型：' + res.scanType);
                        console.log('条码内容：' + res.result);
                        uni.navigateTo({
                            url: res.result
                        })
                    }
                });
            }
        }
    }
</script>
<style>
    .button{
        width: 260px;
    }
    .container{
        margin: 20px;
        text-align: center;
    }
</style>

