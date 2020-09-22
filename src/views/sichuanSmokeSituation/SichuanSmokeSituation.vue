<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <div class="widths">
      <h1 class="intro-title">企业简介</h1>
      <div class="intro-logo">
        <!--<img src="./images/pic_qiyejianjie.svg" alt="">-->
        <img :src="companyInfo.img" alt="">
      </div>
      <div class="content">
        <van-field
            v-model="companyInfo.introduction"
            rows="2"
            :border="false"
            :readonly="true"
            autosize
            type="textarea"
            placeholder="请输入留言"
            show-word-limit
        />

      </div>
    </div>
    <div class="widths">
      <h1 class="nav-title lead-info-title">领导信息</h1>
      <div class="leadInfo">
        <router-link :to="{path:'/sichuansmokesituation/leadinfo',query:{id:item.id}}"
                     v-for="item in leaderInfo"
                     :key="item.id"
                     class="GM">
          <div class="name">
            <span>{{item.name}}</span>
          </div>
          <div class="job time">{{item.position | filterPosition}}</div>
        </router-link>
        <div class="member" v-if="leaderInfo && leaderInfo[0] && leaderInfo[0].children">
          <router-link :to="{path:'/sichuansmokesituation/leadinfo',query:{id:item.id}}" class="member-item-1"
                       v-for="item in leaderInfo[0].children" :key="item.id" v-if="leaderInfo[0].children.length===1">
            <div class="name">
              <span>{{item.name }}</span>
            </div>
            <div class="job time">{{item.position| filterPosition}}</div>
          </router-link>
          <router-link :to="{path:'/sichuansmokesituation/leadinfo',query:{id:item.id}}" class="member-item"
                       v-for="item in leaderInfo[0].children" :key="item.id" v-if="leaderInfo[0].children.length!==1">
            <div class="name">
              <span>{{item.name}}</span>
            </div>
            <div class="job time">{{item.position | filterPosition}}</div>
          </router-link>

        </div>
      </div>

    </div>
    <my-li-jump-page nav-title="机构职能" :my-li="myLi"/>
    <mob-footer/>
  </div>
</template>

<script>
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import MyLiJumpPage from "@/components/control/myLiJumpPage/MyLiJumpPage";
  import {leaderInfo, companyInfo} from "@/api/request";

  export default {
    name: "SichuanSmokeSituation",
    components: {MyLiJumpPage, MobFooter, NavBar, MobHead},
    data() {
      return {
        companyInfo: {},//企业简介
        leaderInfo: [],
        myLi: [
          {title: '部门职责', name: 'DepartmentResponsibility'},
          {title: '组织机构', name: 'InstitutionalFramework'}
        ]
      }
    },
    created() {
      this.getLeaderInfo()
      this.getCompanyInfo()
    },
    filters: {
      // 過濾組織信息
      filterPosition(val) {
        return val.trim()
      }
    },
    methods: {
      async getLeaderInfo() {
        let {success, result} = await leaderInfo();
        if (success) {
          this.leaderInfo = result;
        }
      },
      async getCompanyInfo() {
        let {success, result} = await companyInfo();
        if (success) {
          this.companyInfo = result;
        }

      }
    }


  }
</script>

<style lang="less" scoped>
  /deep/ .van-cell {
    padding: 0.26667rem 0rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  /deep/ ::-webkit-scrollbar {
    display: none;
    width: 0;
  }

  .widths {
    .intro-title {
      margin: .6399rem auto;
      font-size: .5rem;
    }
    .intro-logo {
      width: 38.4%;
      img {
        width: 100%;
      }
    }
    .content {
      text-indent: 2em;
      text-align: justify;
      margin: .43rem auto 1rem auto;
      & > div {
        margin-bottom: .32rem;
      }
      /deep/ .van-field__control {
        font-size: .43rem !important;
        padding-top: 0rem;
        color: #323333 !important;
        font-weight: 400;
        line-height: .69333rem;
      }
      /deep/ .van-cell {
        padding: 0;
      }
    }
    .lead-info-title {
      padding-top: 0rem;
    }
    .leadInfo {
      text-align: center;
      padding-bottom: .5rem;
      .GM {
        padding: .5rem 0;
        display: inline-block;
      }
      .member {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .member-item {
          width: 50%;
          /*margin: .3rem auto; 1.01333*/
          margin: .3rem 0;
        }
        .member-item-1 {
          width: 50%;
          margin: .3rem auto;
        }
      }

      .name {
        color: #235399;
        font-size: .43rem;
        margin-bottom: .3rem;
        font-weight: 500;
        span {
          display: inline-block;
          width: 1.4rem;
          text-align: justify;
          text-align-last: justify;
          font-weight: bold;
        }
      }
    }
  }
</style>
