<template>
  <div>
    <ul>
      <li v-for="item in homeInteraction" @click="homeToOtherPage(item.path,item.name)">
        <div><img :src="item.img" alt=""></div>
        <div>{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {ImagePreview} from 'vant'

  export default {
    name: "VideoButtomItem",
    data() {
      return {
        homeInteraction: [
          // videoButtomItem  id:'shujufabu'
          // {img: require('../images/homeInteraction/icon_home_hudong_lingdaoxinxiang.svg'), name: '领导信箱',path:'/interaction/leadmsg'},
          {
            img: require('../images/videoButtomItem/icon_home_hudong_wangzhannianbao.svg'),
            name: '网站年报',
            path: '/businessservices/commonservice/trueandfalsesmoke?id=wangzhannianbao&getTitle=网站年报'
          },
          {
            img: require('../images/videoButtomItem/icon_home_hudong_weixinguanzhu.svg'),
            name: '微信关注',
            path: ''
          },
          // {
          //   img: require('../images/videoButtomItem/icon_home_hudong_woyaoliuyan.svg'),
          //   name: '我要留言',
          //   path: '/interaction/leavemessage'
          // },
          {
            img: require('../images/videoButtomItem/icon_home_hudong_zhinengwenda.svg'),
            name: '智能问答',
            path: '/home/intelligent'
          },
        ]
      }
    },
    methods: {
      homeToOtherPage(path,name) {
        if (path == ''&&name=='微信关注') {
          ImagePreview({
            images: [
              require('../images/erqude.png')
            ],
            startPosition: 0,
            onClose() {
              // do something
            }
          });
          return false;
        }
        this.$router.push({path})
      }
    }
  }
</script>

<style lang="less" scoped>
  ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 0.6666rem;
    li {
      width: 29.33%;
      border: #DBDBDB solid 1px;
      margin-bottom: .48rem;
      font-size: .37rem;
      text-align: center;
      padding: .3999rem 0;
      img {
        width: 1.28rem;
      }
    }

  }
</style>




