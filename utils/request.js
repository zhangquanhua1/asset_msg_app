export const BASE_URL = 'https://mh1210.mynatapp.cc'
// export const BASE_URL = 'http://47.92.145.187:8080'
// import qs from 'qs'
export const sendRequest = (url, method = 'GET', data = {}, contentType) => {
	//判断header提交数据类型
	let types = '';
	if (method == 'POST' && !contentType) {
		types = 'application/x-www-form-urlencoded'
	} else if (method == 'POST' && contentType) {
		types = contentType
	} else {
		types = 'application/json';
	}
	// console.log(uni.getStorageSync('token'))
	// console.log(data)
	return new Promise(function(resolve, reject) {
		uni.request({
			url:  BASE_URL + '/' + url,
			data: data,
			// data: qs.stringify(data, {arrayFormat: 'repeat'}),
			method: method,
			header: {
				'content-type': types,
				'Authorization': 'Bearer ' + uni.getStorageSync('token')
			},
			dataType: 'json',
			success(res) {
				if (res.header.authorization) {
					// console.log('token',res.header.authorization)
					uni.setStorageSync('token', res.header.authorization);
				} else {
					// var code = res.statusCode;
					var code = res.data.code;
					switch (code) {
						case 401:
							uni.showModal({
								title: '登录提示',
								content: '登录状态已过期，您可以继续留在该页面，或者重新登录！',
								success: ress => {
									if (ress.confirm) {
										uni.redirectTo({
											url: '/pages/login/login'
										})
									}
								}
							})
							break;
						default:
							resolve(res);
							break;
					}
				}
			},
			fail(err) {
				reject(err);
			}
		})
	})
}


//url-后台接口
//data-参数，传递给后台的参数
// this.$http.sendRequest(url, 'GET', {
// 				data:data
// }).then(res => {
// 	//成功回调
// }).catch(err => {
//     //请求失败
//     console.log(err)
// })

// //url-后台接口
// //data-参数，传递给后台的参数
// this.$http.sendRequest(url,'POST',{
// 					data：data
// 				}).then(res => {
// 					//成功回调
// 				}).catch(err => {
// 					//请求失败
// 				})
