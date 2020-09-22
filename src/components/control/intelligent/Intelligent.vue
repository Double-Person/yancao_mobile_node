<template>
<div style="height: 100%;overflow-y: hidden;position: relative;">
  <div style="position: fixed;top: 0;left: 0;right: 0;">
    <mob-head />
    <crumbs :crumbs="crumbs" />
  </div>
  <div class="box" ref="box">
    <div class="content widths" v-for="(item, index) in content">
      <!-- system -->
      <div class="content-item is-pic" v-if="item.type">
        <span class="pic" style="margin-right: .2133rem;">
          <img :src="item.type?userHeadPortrait:pcHeadPortrait" />
        </span>
        <div class="val is-pic-val">
          <span v-for="(i, index) in item.val" :key="index" v-html="i.title" @click="articleInfo(i.id)" class="is-pic-val-item">
          </span>
        </div>
      </div>
      <!-- user -->
      <div class="content-item is-user" v-if="!item.type">
        <div class="val is-user-val">
          <span v-html="item.val"></span>
        </div>
        <span class="pic" style="margin-left: .2133rem;">
          <img :src="item.type?userHeadPortrait:pcHeadPortrait" />
        </span>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="tip">
      没有满意的结果？请到
      <router-link :to="{path:'/interaction/leavemessage'}">我要留言</router-link>
      提交问题
    </div>
    <div class="sendMsg">
      <van-field v-model="sendValue" center clearable placeholder="请输入您的问题">
        <template #button>
          <van-button size="small" type="primary" @click="sendMsg">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>

  <div class="znwd znwd-detail" v-show="znwdDetailShow">
    <div class="znwd-top">
      问答详情<img @click="znwdDetailShow = false" src="~@/assets/icon_home_close.png" alt="" />
    </div>
    <div style="padding: 16px;overflow-y: scroll;height: calc(90%)">
      <h1 v-html="sysArticleDetails.title" style="font-size: 0.42rem;lineHeight:19px;margin: 0 0 12px 0;"></h1>
      <div v-html="sysArticleDetails.content" style="font-size: 14px;lineHeight:26px"></div>
    </div>
  </div>
  <div class="mark" v-show="znwdDetailShow"></div>
</div>
</template>

<script>
import Crumbs from "../crumbs/Crumbs";
import MobHead from "../mobHead/MobHead";
import {
  boxSearch,
  queryById
} from "@/api/request";
import $ from 'jquery'
export default {
  name: "Intelligent",
  components: {
    MobHead,
    Crumbs,
  },
  data() {
    return {
      crumbs: [{
          name: '首页',
          path: '/home'
        },
        {
          name: '智能问答',
          path: ''
        }
      ],
      sendValue: '', //用户输入内容
      copySendValue: '', //用户输入内容
      userHeadPortrait: require('@/assets/pic_kefu@3x.png'),
      pcHeadPortrait: require('@/assets/pic_head@3x.png'),
      content: [
        // {type:false,val:'用户输入用1'},
        {
          type: true,
          val: [{
            id: '',
            title: '您好，有什么可以帮您的？'
          }]
        },
      ],
      znwdDetailShow: false,
      sysArticleDetails: {}
    }
  },
  methods: {
    sendMsg() {
      this.$nextTick(async () => {
        if (!this.sendValue.trim()) {
          return false;
        }
        let obj = {
          type: false,
          val: this.sendValue
        };
        this.content.push(obj);
        this.copySendValue = this.sendValue;
        this.sendValue = '';
        await this.getBoxSearch();
        this.$refs.box.scrollTop = this.$refs.box.scrollHeight + this.$refs.box.clientHeight;
        var t = this.$refs.box.scrollHeight + this.$refs.box.clientHeight;
        this.$refs.box.scroll({
          top: t,
          left: 0,
          behavior: 'smooth'
        });

      })
    },
    async getBoxSearch() {
      let {
        success,
        message,
        result
      } = await boxSearch({
        keyword: this.copySendValue
      });
      if (success) {

        if (result && result[0] && result[0].title) {
          let val = [];
          // result.forEach(item=>{
          //   console.log(item);
          //   let temp = {id:item.id,val:item.title}
          //   val.push(item.temp)
          // })
          let obj = {
            type: true,
            val: result
          };
          console.log(obj);
          this.content.push(obj)
        } else {
          let obj = {
            type: true,
            val: [{
              id: '',
              title: '暂无相关信息'
            }]
          };
          this.content.push(obj)
        }

      }

    },

    articleInfo(id) {
      this.sysArticleDetails = {}
      this.znwdDetailShow = true
      queryById({
        id
      }).then(res => {
        if (res.code == 0 || res.code == 200) {
          this.sysArticleDetails = res.result;
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.box {
  padding-top: .53rem;
  position: fixed;
  /*top:3.1989rem;*/
  top: 2.6989rem;
  /*top: calc(1vh - (1.5999rem + 1.066rem + 2.4rem));*/
  left: 0;
  right: 0;
  bottom: 2.4rem;
  width: 100%;
  /*height: calc(100% - (1.5999rem + 1.066rem));*/
  overflow-y: auto;

  .content {
    margin-bottom: 0.64rem;

    .content-item {
      display: flex;
      align-items: flex-start;

      .pic {
        width: 1.066rem;

        img {
          width: 1.066rem;
        }
      }

      .val {
        margin-top: 0.21rem;
        font-size: .3733rem;
        padding: .2133rem;
        position: relative;
        max-width: 60.5%;
        min-height: 0.399rem;
        border-radius: 4pt;
        line-height: 1.5em;

        span {
          word-wrap: break-word;
        }

        /*text-align: left;*/
        & :after {
          content: " ";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 0 solid transparent;
          border-bottom: 10px solid transparent;

          top: 5px;
        }
      }

      .is-user-val {
        background: #04549e;
        color: #fff;

        & :after {
          border-left: 8px solid #04549e;
          right: -8px;
        }
      }

      .is-pic-val {
        background: #f3f4f7;

        .is-pic-val-item {
          display: block;
        }

        & :after {
          border-right: 8px solid #f3f4f7;
          left: -8px;
        }
      }
    }

    .is-user {
      justify-content: flex-end;
      /*flex-wrap: wrap-reverse;*/
    }

    .is-pic {
      justify-content: flex-start;

    }
  }
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  .tip {
    font-size: .37rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #828282;
    line-height: 0.5333rem;

    a {
      color: #235399;
    }
  }

  .sendMsg {
    border-top: #F2F3F5 solid 0.0266rem;
    margin-top: .3999rem;
    height: 1.36rem;

    .van-button--primary {
      background: #235399;
      border: 0.02667rem solid #235399;
    }
  }
}

.mark {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 4;
  background: rgba(0, 0, 0, 0.6);
}

.znwd {
  &-detail {
    width: 8.72rem;
    height: 90%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }

  background: #fff;
  z-index: 5;
  left: 50%;
  box-shadow: 0px 54px 17px 0px rgba(4, 16, 35, 0.07);

  &-top {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #04549e;
    height: 1.06rem;
    color: #fff;
    position: relative;
    font-size: 0.5rem;

    img {
      width: 0.85rem;
      height: 0.85rem;
      position: absolute;
      right: 0.5rem;
      top: 0.1rem;
      cursor: pointer;
    }
  }
}
</style>
