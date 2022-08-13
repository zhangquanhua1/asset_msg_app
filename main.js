import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
import { sendRequest,BASE_URL } from './utils/request.js'
import { getData ,selectDictLabel} from './utils/dicData.js'
import { getUserInfo } from './utils/userData'
import qs from 'qs'

//挂载到全局，让所有页面都能接收
// 挂载全局自定义方法
Vue.prototype.sendRequest = sendRequest //挂载到Vue的原型上
Vue.prototype.BASE_URL = BASE_URL //挂载到Vue的原型上
Vue.prototype.getData = getData //挂载到Vue的原型上
Vue.prototype.selectDictLabel = selectDictLabel //挂载到Vue的原型上
Vue.prototype.getUserInfo = getUserInfo
Vue.prototype.qs = qs
