import ajax from '@/api/ajax'

export const postAction =(url,parmas)=>ajax(url,parmas,'POST')
export const getAction =(url,parmas)=>ajax(url,parmas)
//首页视频
export const videoIndex =()=> ajax('/mobile/video/index')
//查询所有的省
export const searchAllProvinces =()=> ajax('/common/sys_area/all')




