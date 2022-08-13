import {sendRequest} from './request.js'

// 根据字典类型查询字典数据信息
export const getData = (dictType,callback) => {
    sendRequest( 'system/dict/data/type/' + dictType, 'GET', {
    }, false).then(res => {
        callback(res.data.data)
    }).catch(err => {
        //请求失败
        console.log(err)
    })
}
// 回显数据字典
export function selectDictLabel(datas, value) {
    var actions = [];
    Object.keys(datas).some((key) => {
        if (datas[key].dictValue == ('' + value)) {
            actions.push(datas[key].dictLabel);
            return true;
        }
    })
    return actions.join('');
}
