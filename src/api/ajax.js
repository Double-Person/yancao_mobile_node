/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
import {Toast} from 'vant'
import vue from 'vue'

vue.use(Toast)
// baseURL: process.env.VUE_APP_BASE_API,
// axios.defaults.baseURL = 'http://api.test.yancao.cdqdsy.com'
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
// axios.defaults.baseURL = 'http://47.108.159.119:84';
axios.defaults.timeout = 999999;
let toast1 = null;

function showLoading() {
  toast1 = Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: '数据加载中'
  });
}

function hideLoading() {
  if(toast1 != null){
    toast1.clear();
  }
}

axios.interceptors.request.use(
  config => {
    //  在线问答不使用loading效果
    if(!config.url.includes('system/sysArticle/question/search')){
      showLoading();
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  hideLoading()
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default function ajax(url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else if (type == 'POST') {
      // 发送post请求
      promise = axios.post(url, data)
    } else {
      promise = axios[type](url, data)
    }
    promise.then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}

