import ajax from '@/api/ajax'

export function getAction(url, parameter) {
  return ajax({
    url,
    method: 'GET',
    data: parameter
  })
}

//上传文件
export const uploadFile = (params) => ajax('/common/upload_file', params, 'POST')
//  首页搜索
export const sysArticleSearch = (params) => ajax('/system/sysArticle/search', params, 'GET')

//提交举报投诉
export const consultAdd = (params) => ajax('/mobile/consult/add', params, 'POST')
//信件提交
export const letterAdd = (params) => ajax('/mobile/letter/add', params, 'POST')

//信件查询列表
export const letterList = (params) => ajax('/mobile/letter/list', params, 'GET')

//信件查询详情
export const letterInfo = (id) => ajax('/mobile/letter/' + id, {}, 'GET')


// 文章-通过id查询
export const queryById = (params) => ajax('/system/sysArticle/queryById', params, 'GET')

// 咨询服务 -回复列表
export const consultList = (params) => ajax('mobile/consult/list', params, 'GET')


// 智能问答关键字搜索接口
export const questionSearch = (params) => ajax('system/sysArticle/question/search', params, 'GET')

// 查询服务导航列表
export const navigationList = (params) => ajax('/mobile/navigation/list', params, 'GET')

// 征集调查列表
export const questionnaireList = (params) => ajax('/mobile/questionnaire/list', params, 'GET')


// 调查详情
export const questionnaire = (id) => ajax('/mobile/questionnaire/' + id, {}, 'GET')


// 提交问卷调查
export const questionnaireSubmit = (optionId) => ajax('/mobile/questionnaire/submit', optionId, 'GET')


/* 互动交流 办件查询 根据id查询 */
export const mobileConsult = (id) => ajax('/mobile/consult/' + id, {}, 'GET')

/* **首页****/
/* 首页顶部广告 | 轮播 */
export const sysAdvertiseList = (optionId) => ajax('/system/sysAdvertise/list', optionId, 'GET')
export const shuffling = (optionId) => ajax('/system/sysAdvertise/active_list', optionId, 'GET')


/* 首页顶部广告下选择菜单栏  专题教育 */
//文章-分页列表前端查询 ||    烟草逸事  || 办事服务-公共服务-真假烟识别
export const activeList = (params) => ajax('/system/sysArticle/active_list', params, 'GET')


/* 首页视屏 */
export const videoList = (params) => ajax('/mobile/video/list', params, 'GET')

/* 首页党的建设 */
export const sysArticleActiveList = (params) => ajax('/system/sysArticle/active_list', params, 'GET')

/* 根据关键字获取文章类型 */
export const sysArticleGetType = (params) => ajax('/system/sysArticle/get_type', params, 'GET')

/* 提交留言 */
export const leaveMesSubmit = (params) => ajax('/mobile/leave_mes/submit', params, 'POST')

/* 查询留言列表 */
export const leaveMesList = (params) => ajax('/mobile/leave_mes/list', params, 'GET')

/* 查询留言统计 */
export const leaveMesList2 = (params) => ajax('/system/sysArticle/active_list', params, 'GET')

/* 统计处理留言 */
export const leaveMesStatistical = (params) => ajax('/mobile/leave_mes/statistical', params, 'GET')

/* 统计处理留言 */
export const leaveMesQueryById = (id) => ajax('/mobile/leave_mes/' + id, {}, 'GET')

/* 前端查询所有的部门 */
export const queryTreeList = () => ajax('/sysdepart/sysDepart/mobile/queryTreeList', {}, 'GET')


/* 首页智能问答 */
export const boxSearch = (params) => ajax('/system/sysArticle/question/box/search', params, 'GET')


/* 查询领导信息 */
export const leaderInfo = () => ajax('/mobile/leader/list', {}, 'GET')

/* 通过id查询领导信息 */
export const leaderInfoById = (id) => ajax('/mobile/leader/'+ id, {}, 'GET')

/* 查询组织机构 */
export const organizationList = () => ajax('/mobile/organization/list', {}, 'GET')

/* 查询组织机构 */
export const companyInfo = () => ajax('/mobile/company/info', {}, 'GET')

/* 埋点 */
export const addLog =(params) => ajax('/mobile/web_visit_log/add',params,'POST')

/* 访问量埋点 */
export const addVisitLog =(params) => ajax('/mobile/visitor/add',params,'get')





