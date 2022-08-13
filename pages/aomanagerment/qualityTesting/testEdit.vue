<template>
    <view class="container">
        <uni-row>
            <uni-col :span="6" class="title">名称：</uni-col>
            <uni-col :span="18">{{detail.inspectName}}</uni-col>
        </uni-row>
        <uni-row>
            <uni-col :span="6" class="title">作业内容：</uni-col>
            <uni-col :span="18">{{detail.inspectContent}}</uni-col>
        </uni-row>
        <uni-row>
            <uni-col :span="6" class="title">检修要求：</uni-col>
            <uni-col :span="18">{{detail.inspectDemand}}</uni-col>
        </uni-row>
        <uni-row>
            <uni-col :span="6" class="title">存在问题：</uni-col>
            <uni-col :span="18">
                <uni-easyinput type="textarea" v-model="detail.inspectProblem" placeholder="请输入存在问题"/>
            </uni-col>
        </uni-row>
        <uni-row style="margin-top: 5px">
            <uni-col :span="6" class="title">检修结果：</uni-col>
            <uni-col :span="18">
                <uni-easyinput type="textarea" v-model="detail.inspectResult" placeholder="请输入存在问题"/>
            </uni-col>
        </uni-row>
        <uni-section title="检修前图片" type="line">
            <view class="example-body">
                <!--<uni-file-picker limit="3" title="最多选择3张图片" @select="beforeUpload()"></uni-file-picker>-->
                <uni-file-picker
                        limit="3"
                        v-model="imageValue"
                        fileMediatype="image"
                        mode="grid"
                        @select="select"
                        @progress="progress"
                        @success="success"
                        @fail="fail"
                />
            </view>
        </uni-section>
        <uni-section title="检修后图片" type="line">
            <view class="example-body">
                <uni-file-picker limit="3" title="最多选择3张图片"></uni-file-picker>
            </view>
        </uni-section>
    </view>
</template>

<script>
    export default {
        onLoad: function (option) {
            if (option.id != null)
                this.getDetail(option.id)
        },
        data() {
            return {
                detail: {},
                imageValue: [
                    // {
                    //     url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg',
                    //     extname: 'png',
                    //     name: 'shuijiao.png'
                    // }, {
                    //     url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg',
                    //     extname: 'png',
                    //     name: 'uniapp-logo.png'
                    // }, {
                    //     url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg',
                    //     extname: 'png',
                    //     name: 'shuijiao.png'
                    // }
                ]
            }
        },
        methods: {
            getDetail(id) {
                uni.showLoading({
                    title: '加载中'
                })
                this.sendRequest('assetMsg/inspectMaintainDetail/' + id, 'GET', {}, false).then(res => {
                    this.detail = res.data.data
                    uni.hideLoading()
                }).catch(err => {
                    //请求失败
                    uni.hideLoading()
                })
            },

            // 获取上传状态
            select(e) {
                // console.log('选择文件：', e.tempFiles[0])
                const uploadTask = uni.uploadFile({
                    url: this.BASE_URL + '/assetMsg/inspectMaintainDetail/upload',
                    filePath: e.tempFilePaths[0],
                    name: 'file',
                    header: {
                        'Authorization': 'Bearer ' + uni.getStorageSync('token')
                    },
                    success: (res)=> {
                        console.log('success',res)
                    },
                    complete: (res)=> {
                        console.log('complete',res)
                    },
                    fail: (res)=> {
                        console.log('fail',res)
                    }
                });

                uploadTask.onProgressUpdate((res) => {
                    console.log('上传进度' + res.progress);
                    console.log('已经上传的数据长度' + res.totalBytesSent);
                    console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

                    // 测试条件，取消上传任务。
                    // if (res.progress > 50) {
                    //     uploadTask.abort();
                    // }
                });
            },
            // 获取上传进度
            progress(e) {
                console.log('上传进度：', e)
            },

            // 上传成功
            success(e) {
                console.log('上传成功')
            },

            // 上传失败
            fail(e) {
                console.log('上传失败：', e)
            }
        }
    }
</script>

<style lang="scss">
    .container {
        margin: 10px;
        font-size: 14px;
    }

    .title {
        text-align: right;
        height: 25px;
    }

    .title_top {
        height: 40px;
        margin-top: 8px
    }
</style>
