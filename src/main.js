import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible';
import echarts from 'echarts'

// import Router from 'vue-router'
//
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }


Vue.filter('solveStatus', function (value) {
  if (value == 10) {
    return '待处理'
  } else if (value == 20) {
    return '已处理'
  } else if (value == 30) {
    return '已拒绝'
  } else {
    return value
  }
})

Vue.filter('formatTime', function (value) {

})

Vue.prototype.$echarts = echarts


// 复制粘贴
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

import jq from "jquery";
Vue.prototype.jq = jq

Vue.config.productionTip = false

import {
  Button, Icon, Field, CellGroup, Cell, RadioGroup, Radio, Swipe,Search,
  SwipeItem, Tab, Tabs, Overlay, Toast, Uploader, ImagePreview, Checkbox, CheckboxGroup,ActionSheet  } from 'vant';

Vue.use(Button).use(Icon).use(Field).use(CellGroup).use(Cell).use(RadioGroup).use(Radio)
  .use(Swipe).use(Search).use(SwipeItem).use(Tab).use(Tabs).use(Overlay).use(Toast)
  .use(Uploader).use(ImagePreview ).use(Checkbox).use(CheckboxGroup).use(ActionSheet);


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)




import * as filters from "@/assets/js/globalFilter"
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// console.log(process.env.VUE_APP_BASE_API);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



