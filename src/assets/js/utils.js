/*
* @params
* date 需要转换的时间
* fmt 需要转换的格式string（'yyyy-MM-DD hh:mm:ss'）|| （'yyyy-MM-DD'）……
* */
export function formatDate(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1,//月份
    "D+": date.getDay(),//日
    "h+": date.getHours(),//hours
    "m+": date.getMinutes(),//分钟
    's+': date.getSeconds(),//秒,
  }

  if (/(y+)/.test(fmt)) {
    //RegExp.$1 是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串，以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return fmt;
}


/*
调用：
项目中：import {formatDate} from "./formatDate.js"
js中：formate(new Date(),'yyyy-MM-DD hh:mm:ss'*/



