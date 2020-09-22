import Vue from 'vue'
import format from 'date-fns/format'
// 时间格式
Vue.filter('date-format', function (value, formatStr='yyyy-MM-dd HH:mm:ss') {
  return format(value, formatStr)
})
//  时间截取前十位
let myData = value => {
  if(value && value.length>=10) {
    return value.substr(0,10)
  }else {
    return value
  }

}

let solveStatus = value => {
  if (value == 10) {
    return '待处理'
  } else if (value == 20) {
    return '已处理'
  } else if (value == 30) {
    return '已拒绝'
  } else {
    return value
  }
}



export { myData,solveStatus }
