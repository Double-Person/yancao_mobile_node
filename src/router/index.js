import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home/Home.vue'
import OnlineInTheSearch from '../views/interaction/online/OnlineInTheSearch'
import OnlineInTheSearchDetails from '../views/interaction/online/OnlineInTheSearchDetails'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: "/news/:pathUrl",//首页tabs列表
    name: 'TabsList',
    component: ()=>import('../views/home/tabsList/TabsList')
  },

  {
    path: "/home/intelligent",//智能问答
    name: 'Intelligent',
    component: ()=>import('@/components/control/intelligent/Intelligent')
  },
  //智能问答详情
  {
    path: "/home/intelligent/articleinfo",
    name: 'ArticleInfo',
    component: ()=>import('@/components/control/intelligent/ArticleInfo')
  },
  {
    path: '/home/servicenavigation',
    name: 'ServiceNavigation',
    component: ()=>import('../views/home/serviceNavigation/ServiceNavigation')
  },
  {
    path: '/home/specialeducation',//专题教育s
    name: 'SpecialEducation',
    component: ()=>import('../views/home/specialEducation/SpecialEducation')
  },
  {
    path: '/home/specialeducationdetial',//专题教育文章详情
    name: 'SpecialEducationDetial',
    component: ()=>import('../views/home/specialEducation/SpecialEducationDetial')
  },
  {
    path: '/home/partybuilding',//党的建设
    name: 'PartyBuilding',
    component: ()=>import('../views/home/partyBuilding/PartyBuilding')
  },
  {
    path: '/home/partybuildingdetial',//党的建设文章详情
    name: 'partyBuildingDetial',
    component: ()=>import('../views/home/partyBuilding/partyBuildingDetial')
  },
  {
    path: '/home/theenterpriseculture',//企业文化
    name: 'TheEnterpriseCulture',
    component: ()=>import('../views/home/theEnterpriseCulture/TheEnterpriseCulture')
  },
  {
    path: '/home/thesocialresponsibility',//社会责任
    name: 'TheSocialResponsibility',
    component: ()=>import('../views/home/theSocialResponsibility/TheSocialResponsibility')
  },
  {
    path: '/home/thesocialresponsibilitydetial',//社会责任文章详情
    name: 'TheSocialResponsibilityDetial',
    component: ()=>import('../views/home/theSocialResponsibility/TheSocialResponsibilityDetial')
  },
  {
    path: '/home/help',//使用帮助
    name: 'Help',
    component: ()=>import('@/components/control/mobFooter/help/Help')
  },
  {
    path: '/home/sitemap',// 网站地图
    name: 'SiteMap',
    component: ()=>import('@/components/control/mobFooter/siteMap/SiteMap')
  },
  {
    path: '/error',// 网站找错
    name: 'WebSiteLookingFor',
    component: ()=>import('@/components/control/webSiteLookingFor/WebSiteLookingFor')
  },
  {
    path: '/home/tabsinfo',
    name: 'TabsInfo',
    component: ()=>import('../views/home/tabsInfo/TabsInfo')
  },
  {
    path: '/home/servicenavigationtabs',
    name: 'ServiceNavigationTabs',
    component: ()=>import('../views/home/serviceNavigation/ServiceNavigationTabs')
  },
  {
    path: '/home/sichuansmokeview',
    name: 'SichuanSmokeView',
    component: ()=>import('../views/home/sichuanSmokeView/SichuanSmokeView')
  },

  {//使用幫助
    path: '/home/help',
    name: 'Help',//使用幫助
    component: () => import('@/components/control/mobFooter/help/Help')
  },

  //搜索
  {
    path: '/inthesearch',
    name: 'InTheSearch',
    component: ()=>import('../views/home/search/InTheSearch')
  },

  //  政務公開
  {
    path: '/governmentpublic',
    name: 'GovernmentPublic',
    component: () => import(/* webpackChunkName: "政务公开" */ '../views/governmentPublic/GovernmentPublic')
  },
  {
    path: '/governmentpublic/openprocurementresults',
    name: 'OpenProcurementResults',
    component: () => import(/* : "采购结果公开" */ '../views/governmentPublic/openProcurementResults/OpenProcurementResults')
  },
  {
    path: '/governmentpublic/discloseinformation',
    name: 'DiscloseInformation',
    component: () => import(/* webpackChunkName: "采购结果公开" */ '../views/governmentPublic/discloseInformation/DiscloseInformation')
  },
  {
    path: '/governmentpublic/articledetails',
    name: 'articleDetails',
    component: () => import(/* webpackChunkName: "采购结果公开 -->文章详情" */ '../views/governmentPublic/articleDetails/articleDetails')
  },




  // 办事服务
  {//BusinessServices  PublicService
    path: '/businessservices',
    name: 'BusinessServices',
    component: () => import(/* webpackChunkName: "办事服务" */ '../views/businessServices/BusinessServices')
  },
  // 行政许可
  {
    path: '/xzxk',
    name: 'xzxk',
    component: () => import( '../views/businessServices/xzxk')
  },
  {//  PublicService 政务服务
    path: '/businessservices/publicservice',
    name: 'PublicService',
    component: () => import(/* webpackChunkName: "政务服务" */ '../views/businessServices/publicService/PublicService')
  },
  {//  CommonService 公共服务
    path: '/businessservices/commonservice',
    name: 'CommonService',
    component: () => import(/* webpackChunkName: "公共服务" */ '../views/businessServices/commonService/CommonService')
  },
  {//   真假烟识别
    path: '/businessservices/commonservice/trueandfalsesmoke',
    name: 'TrueAndFalseSmoke',
    component: () => import(/* webpackChunkName: "真假烟识别" */ '../views/businessServices/commonService/TrueAndFalseSmoke')
  },
  {//    TrueArticleDetails
    path: '/businessservices/truearticledetails',
    name: 'TrueArticleDetails',
    component: () => import(/* webpackChunkName: "" */ '../views/businessServices/commonService/TrueArticleDetails')
  },

  //  互動交流
  {
    path: '/interaction',
    name: 'Interaction',
    component: () => import(/* webpackChunkName: "" */ '../views/interaction/Interaction')
  },
  //  我要留言
  {
    path: '/interaction/leavemessage',
    name: 'LeaveMessage',//  LeaveMessage
    component: () => import('../views/interaction/leaveMessage/LeaveMessage')
  },
  {
    path: '/interaction/torunaquery',
    name: 'ToRunAQuery',//办件查询(公用办件查询)
    component: () => import('../views/interaction/ToRunAQuery')
  },
  {
    path: '/interaction/submitok',
    name: 'SubmitOk',//办件查询提交成功(公用办件查询提交成功)SubmitOk
    component: () => import('../views/interaction/SubmitOk')
  },
  {
    path: '/interaction/replytolist',
    name: 'ReplyToList',//回复列表(公用回复列表)
    component: () => import('../views/interaction/ReplyToList')
  },
  {
    path: '/interaction/consultationservice',//互動交流-咨詢服務  ConsultationServiceItem
    name: 'ConsultationService',
    component: () => import('../views/interaction/consultationService/ConsultationService')
  },
  {
    path: '/interaction/consultationservice/consultationserviceitem',//互動交流-咨詢服務  ConsultationServiceItem
    name: 'ConsultationServiceItem',
    component: () => import('../views/interaction/consultationService/ConsultationServiceItem')
  },
  {
    path: '/interaction/submitquerylist',//互動交流-提交  SubmitQueryList
    name: 'SubmitQueryList',
    component: () => import('../views/interaction/submitQueryList/SubmitQueryList')
  },
  {
    path: '/interaction/submitqueryinfo',//互動交流-提交-详情  SubmitQueryList
    name: 'SubmitQueryInfo',
    component: () => import('../views/interaction/submitQueryList/SubmitQueryInfo')
  },
  {
    path: '/interaction/consultationservice/handelinfo',//互動交流-办件详情
    name: 'HandelInfoS',
    component: () => import('../views/interaction/consultationService/HandelInfo')
  },
  {
    path: '/interaction/consultationservice/chandelquery',//互動交流-办件查询 CHandelQuery
    name: 'CHandelQuery',
    component: () => import('../views/interaction/consultationService/CHandelQuery')
  },



  {
    path: '/interaction/leadmsg',//领导信箱
    name: 'LeadMsg',
    component: () => import('../views/interaction/leadMsg/LeadMsg')
  },
  {
    path: '/interaction/writemsg',
    name: 'WriteMsg',//我要写信
    component: () => import('../views/interaction/leadMsg/WriteMsg')
  },

  {
    path: '/interaction/writemsg/writemsgsubmitok',
    name: 'WriteMsgSubmitOk',//我要写信---提交
    component: () => import('../views/interaction/leadMsg/WriteMsgSubmitOk')
  },
  {
    path: '/interaction/writebacklist',
    name: 'WriteBackList',//回复列表
    component: () => import('../views/interaction/leadMsg/WriteBackList')
  },
  {
    path: '/interaction/writebacklist/handelinfo',
    name: 'HandelInfo',//回复列表--办件详情
    component: () => import('../views/interaction/leadMsg/HandelInfo')
  },
  {
    path: '/interaction/handelquery',
    name: 'HandelQuery',//办件查询
    component: () => import('../views/interaction/leadMsg/HandelQuery')
  },
  {
    path: '/interaction/reportcomplaints',
    name: 'ReportComplaints',//举报投诉
    component: () => import('../views/interaction/reportComplaints/ReportComplaints')
  },
  {
    path: '/interaction/havecomplaint',
    name: 'HaveComplaint',//我要投诉
    component: () => import('../views/interaction/reportComplaints/HaveComplaint')
  },
  {
    path: '/interaction/reportreplytolist',
    name: 'ReportReplyToList',//我要投诉 --回复列表  ReportReplyToList
    component: () => import('../views/interaction/reportComplaints/ReportReplyToList')
  },
  {
    path: '/interaction/reporttorunaquery',
    name: 'ReportToRunAQuery',//我要投诉 --办件查询  ReportReplyToList  ReportToRunAQuery
    component: () => import('../views/interaction/reportComplaints/ReportToRunAQuery')
  },

  {
    path: '/interaction/OnlineInTheSearch',
    name: 'OnlineInTheSearch',//在线问答
    component: OnlineInTheSearch
  },
  {
    path: '/interaction/onlineinthesearchdetails',
    name: 'OnlineInTheSearchDetails',//在线问答详情
    component: OnlineInTheSearchDetails
  },


  {
    path: '/interaction/forinvestigation',
    name: 'ForInvestigation',//征集调查
    component: () => import('../views/interaction/forInvestigation/ForInvestigation')
  },
  {
    path: '/interaction/forinvestigationinfo',
    name: 'ForInvestigationInfo',//征集调查详情
    component: () => import('../views/interaction/forInvestigation/ForInvestigationInfo')
  },


  {
    path: '/interaction/tobaccoanecdotes',
    name: 'TobaccoAnecdotes',//烟草逸事
    component: () => import('../views/interaction/tobaccoAnecdotes/TobaccoAnecdotes')
  },
  {
    path: '/interaction/tobaccoanecdotes/tobaccoanecdotesdetails',
    name: 'TobaccoAnecdotesDetails',//烟草逸事  TobaccoAnecdotesDetails
    component: () => import('../views/interaction/tobaccoAnecdotes/TobaccoAnecdotesDetails')
  },


  //  sichuanSmokeSituation  川烟概况
  {//  sichuanSmokeSituation  川烟概况
    path: '/sichuansmokesituation',
    name: 'SichuanSmokeSituation',
    component: () => import(/* webpackChunkName: "川烟概况" */ '../views/sichuanSmokeSituation/SichuanSmokeSituation')
  },
  {//   川烟概况-领导简介
    path: '/sichuansmokesituation/leadinfo',
    name: 'LeadInfo',
    component: () => import(/* webpackChunkName: "领导简介" */ '../views/sichuanSmokeSituation/leadInfo/LeadInfo')
  },
  {//   川烟概况-部门职责
    path: '/sichuansmokesituation/departmentresponsibility',
    name: 'DepartmentResponsibility',
    component: () => import(/* webpackChunkName: "部门职责" */ '../views/sichuanSmokeSituation/departmentResponsibility/DepartmentResponsibility')
  },
  {//   川烟概况-部门职责-部门职责詳情  DepartmentResponsibilityInfo
    path: '/sichuansmokesituation/departmentresponsibility/departmentresponsibilityinfo',
    name: 'DepartmentResponsibilityInfo',
    component: () => import(/* webpackChunkName: "部门职责詳情" */ '../views/sichuanSmokeSituation/departmentResponsibility/DepartmentResponsibilityInfo')
  },
  {//   川烟概况-组织机构
    path: '/sichuansmokesituation/institutionalframework',
    name: 'InstitutionalFramework',
    component: () => import(/* webpackChunkName: "组织机构" */ '../views/sichuanSmokeSituation/institutionalFramework/InstitutionalFramework')
  },


]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {

    return { x: 0, y: 0 }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
})
router.afterEach((to, from, next) => {
  // router.$el.scrollTop = 0;
  window.scrollTo(0, 10)
});
export default router
