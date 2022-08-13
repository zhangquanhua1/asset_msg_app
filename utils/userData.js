import {sendRequest} from './request.js'

export const getUserInfo = (callback) => {
    sendRequest('getInfo', 'GET', {
        data: {}
    }, false).then(res => {
        callback(res.data.user)
        //成功回调
    }).catch(err => {
        //请求失败
        console.log(err)
    })
}
