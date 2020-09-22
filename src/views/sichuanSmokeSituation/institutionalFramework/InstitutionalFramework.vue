<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths nav-title">组织机构</div>

    <div class="frame">
      <div class="title">
        {{info.companyName}}
      </div>
      <!--v-if="info.organizations.length<=10"-->
      <div class="organizations">
        <div class="symbol">
          <div class="organization" v-for="(item, index) in info.organizations" :key="index" :style="{height: maxHeight}">
            <span class="organization-span">{{item.name | reverseSymbol}}</span>
          </div>
        </div>


      </div>
    </div>


    <div class="institutionalFramework margin-bottom" @click="">
      <!--<img src="../images/institutionalFramework/pic_zuzhijigou1.svg"/>-->
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import {ImagePreview} from 'vant'
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import {organizationList,addLog} from "@/api/request";
  import { LOGLIST } from "@/assets/js/constant";

  export default {
    name: "InstitutionalFramework",//组织机构
    components: {MobFooter, Crumbs, NavBar, MobHead},
    data() {
      return {
        crumbs: [
          {name: '川烟概况', path: '/sichuansmokesituation'},
          {name: '组织机构', path: '/sichuansmokesituation/institutionalframework'}
        ],
        maxHeight: '',//最大高度
        info: {
          companyName: "",
          organizations: [
            // {name: '综合计划处（经济运行处）01'},
            // {name: '综合计划处（经济运行处）02'},
            // {name: '综合计划处（经济运行处）03'},
            // {name: '综合计划处（经济运行处）04'},
            // {name: '综合计划处（经济运行处）05'},
            // {name: '综合计划处（经济运行处综合计划综合计划综合计划）06'},
            // {name: '综合计划处（经济运行处）07'},
            // {name: '综合计划处（经济运行处）08'},
            // {name: '综合计划处（经济运行处）09'},
            // {name: '综合计划处（经济运行处）10'},
            // {name: '综合计划处（经济运行处）11'},
            // {name: '综合计划处（经济运行处）12'},
            // {name: '综合计划处（经济运行处）13'},
            // {name: '综合计划处（经济运行处）14'},
          ]
        }
      }
    },
    created() {
      this.getOrganizationList()
      addLog({ columnTypeCode: LOGLIST.CYGK, subColumnTypeCode: "cygk_zuzhijigou" });
    },
    mounted() {
      this.computedMaxHeight()
    },
    filters: {
      // 過濾具體機構名稱將左右括號轉為上下括號
      reverseSymbol(val) {
        let str = '', str1 = '';
        str = val.replace(/\(/g, " ︵ ");
        str = val.replace(/\(/g, " ︵ ");
        str = val.replace(/\（/g, " ︵ ");

        str1 = str.replace(/\)/g, " ︶ ");
        str1 = str.replace(/\）/g, " ︶ ");
        return str1
      }
    },

    methods: {
      test() {
        ImagePreview({
          images: [
            require('../images/institutionalFramework/pic_zuzhijigou1.svg')
          ],
          startPosition: 0,
          onClose() {
            // do something
          }
        });


      },

      /** 2020/4/22 by yu
       *@meathod: getStyle
       *@param: {mod} argName - desc {obj:獲取的目標對象，name：目標樣式的具體樣式名}
       *@desc: 獲取某個對象的計算後的樣式
       */
      getStyle(obj, name) {
        if (window.getComputedStyle) {
          return getComputedStyle(obj, null)[name]
        } else {
          return obj.currentStyle[name]
        }
      },

      /** 2020/4/22 by yu
       *@meathod: computedMaxHeight
       *@param: {mod} argName - desc
       *@desc: 計算目標樣式的最大高度
       */
      computedMaxHeight() {
        this.$nextTick(() => {
          let allDiv = document.getElementsByClassName('organization');
          allDiv = Array.from(allDiv);
          let maxLengthArr = [];
          allDiv.forEach((item, index) => {
            let temp = this.getStyle(allDiv[index], 'height');
            maxLengthArr.push(temp)
          })
         let conversionData = maxLengthArr.map(item=>parseInt(item));
          this.maxHeight = (Math.max(...conversionData) + 'px')
        })
      },
      /**
       * 獲取數據
       * @returns {Promise<void>}
       */
      async getOrganizationList() {
        let {success, result} = await organizationList();
        if (success) {
          this.info = result;
          // console.log(result);
        }

      }
    }

  }
</script>

<style lang="less" scoped>
  .nav-title {
    margin-top: .5rem;
  }

  .frame {
    /* 标题机构名称 */
    .title {
      color: #fff;
      font-size: .32rem;
      text-align: center;
      width: 5.55rem;
      background: #235399;
      margin: .64rem auto 0.48rem auto;
      padding: .2133rem 0;
    }

    /* 機構名稱 */
    .organizations {
      /*width: 98%;*/
      padding: 0 0.32rem;
      margin: 0 auto;
      .symbol {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        font-size: .32rem;
        justify-content: center;
        flex-shrink: 0;

        /*文字框*/
        .organization {
          overflow: hidden;
          background: rgb(240, 243, 249);
          border: #DBDBDB solid .02rem;
          width: .76rem;
          padding-bottom: 0.399rem;
          margin: 0 0.06rem 0.32rem 0.06rem;
          .organization-span {
            font-size: .32rem;
            line-height: .32rem;
            display: inline-block;
            width: .2rem;
            writing-mode: horizontal-tb; // 文字豎排
            word-wrap: break-word; // 字母數字換行
            text-align: center;
            padding: 0.3999rem .1rem;
            height: 5rem;
            margin-left: 50%;
            transform: translate(-50%, 0);
          }

        }
      }

    }
  }

  .institutionalFramework {
    padding: .6rem .1rem;
  }

  .institutionalFramework > img {
    width: 100%;
  }
</style>
