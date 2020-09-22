<template>
  <div class="Mob-footer">
    <div class="content">
      <div class="bottom-img">
        <img src="./images/pic_foot.png" @click="toError" />
      </div>
      <div class="bottom-title">
        <div class="bottom-title-left">
          <div class="left" @click="help">
            <span>使</span>
            <span>用</span>
            <span>帮</span>
            <span>助</span>
          </div>
          <div class="centerS"></div>
          <div class="right" @click="siteMap">网站地图</div>
        </div>

        <span class="bottom-title-right">
          您是第
          <span class="red">{{amount}}</span>位访问者
        </span>
      </div>

      <div class="contact-way">
        <div class="center">
          <div class="left">
            <span>邮</span>
            <span>箱</span>
          </div>
          <div class="centerS">：</div>
          <div class="right">sctobacco@sina.cn</div>
        </div>
        <div class="center">
          <div class="left">
            <span>联</span>
            <span>系</span>
            <span>方</span>
            <span>式</span>
          </div>
          <div class="centerS">：</div>
          <div class="right">028-86162185（传真），028-86162178（咨询）</div>
        </div>
        <div class="center">
          <div class="left line-height">
            <span>版</span>
            <span>权</span>
            <span>所</span>
            <span>有</span>
          </div>
          <div class="centerS centerSLine">：</div>
          <div class="right line-height">四川省烟草专卖局，未经许可，本网站包括图像、图标、文字在内的所有数据不得转载</div>
        </div>
      </div>
      <div class="company-info">
        <div class="bottom">
          <div class="left">
            <span>主</span>
            <span>办</span>
            <span>单</span>
            <span>位</span>
          </div>
          <div class="centerS">：</div>
          <div class="right">四川省烟草专卖局 中国烟草总公司四川省公司</div>
        </div>

        <div class="bottom">
          <div class="left">
            <span>ICP</span>
            <span>备</span>
            <span>案</span>
            <span>号</span>
          </div>
          <div class="centerS">：</div>
          <div class="right">蜀ICP备20023321号</div>
        </div>

        <div class="bottom">
          <div class="left">
            <span>网</span>
            <span>站</span>
            <span>标</span>
            <span>识</span>
            <span>码</span>
          </div>
          <div class="centerS">：</div>
          <div class="right">bm64220001</div>
        </div>

        <div class="bottom" display="height:20px; lineHeight:20px">
          <div class="left">
            <span>公</span>
            <span>安</span>
            <span>备</span>
            <span>案</span>
            <span>号</span>
          </div>
          <div class="centerS">：</div>
          <div class="right" style="lineHeight:20px">
            <a
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002002912"
              style="display:inline-block;text-decoration:none;"
            >
              <img src="~@/assets/police.png" style="display:inline-block;vertical-align: bottom;" />
              <span style="margin: 0;color:#979899">川公网安备 51019002002912号</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobFooter",
  data() {
    return {
      amount: 0
    };
  },
  mounted() {
    this.amount = localStorage.getItem("amount");
  },
  methods: {
    help() {
      return false;
      this.$router.push({ name: "Help" });
    },
    siteMap() {
      this.$router.push({ name: "SiteMap" });
    },
    toError() {
      // window.open('http://www.gov.cn/c125533/jbxxk.htm','_black')
      window.open(
        "http://121.43.68.40/exposure/jiucuo.html?site_code=5100000065&url=http%3A//jst.sc.gov.cn/",
        "_black"
      );
    }
  }
};
</script>

<style lang="less" scoped>
.centerSLine {
  margin-top: 0.08rem;
}
.left {
  display: flex;
  justify-content: space-between;
}
.Mob-footer {
  background: #353f49;
  padding-bottom: 0.3rem;
  .content {
    width: 91.5%;
    margin: 0 auto;
    .bottom-img {
      width: 16%;
      padding-top: 0.42rem;
      img {
        width: 100%;
        /*display: block;*/
      }
    }
    .line-height {
      line-height: 1.5;
    }
    .bottom-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bottom-title-left {
        // width: 150px;
        font-size: 12px;
        color: #dbdcdd;
        margin: 16px 0;
        display: flex;
        justify-content: flex-start;
        .left {
          // width: 17%;
        }
        .centerS {
          // width: 4%;
          width: 12px;
        }
        .right {
          // width: 79%;
        }
      }

      .bottom-title-right {
        margin: 0 15px 0 0;
        font-size: 12px;
        line-height: 12px;
        color: #979899;
        .red {
          margin: 0 4px;
          color: #ff6264;
        }
      }
    }
    .contact-way {
      color: #979899;
      font-size: 10px;
      border-bottom: solid 1px #656566;
      padding-bottom: 0.3rem;
      .center {
        display: flex;
        margin-bottom: 0.3rem;
        .left {
          width: 17%;
        }
        .centerS {
          width: 4%;
        }
        .right {
          width: 79%;
        }
      }
    }
    .company-info {
      color: #979899;
      font-size: 10px;
      margin: 0.4rem 0;

      .bottom {
        display: flex;
        margin-bottom: 0.21rem;
        align-items: center;
        .left {
          width: 17%;
        }
        .centerS {
          width: 4%;
        }
        .right {
          width: 79%;
        }
      }
    }
  }
}
</style>
