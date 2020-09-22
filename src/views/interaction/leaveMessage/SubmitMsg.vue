<template>
  <div>
    <div class="hint">提示：带<span class="symbol">*</span>内容为必选项</div>
    <div class="inputs widths ">
      <!--用户姓名-->
      <div class="title">
        <div class="left-test">
          用户姓名 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="name" placeholder="请输入姓名"/>
          </div>
        </div>
      </div>

      <!--受理单位-->
      <div class="title">
        <div class="left-test">
          受理单位 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <div class="select">
              <van-action-sheet v-model="show" :actions="actions" @select="onSelect"/>
              <div class="changeObject" v-if="!object.length" @click="changeObjectFn">请选择</div>
              <div class="changeObj" v-if="object.length" @click="changeObjectFn">{{objectName}}</div>
            </div>
          </div>
        </div>
      </div>

      <!--受理类型-->
      <div class="title">
        <div class="left-test">
          受理类型 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <div class="select">
              <van-action-sheet v-model="show1" :actions="acceptType" @select="onSelect1"/>
              <div class="changeObject" v-if="!object1.length" @click="changeObjectFn1">请选择</div>
              <div class="changeObj" v-if="object1.length" @click="changeObjectFn1">{{object1}}</div>
            </div>
          </div>
        </div>
      </div>

      <!--事项类型-->
      <div class="title">
        <div class="left-test">
          事项类型 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <div class="select">
              <van-action-sheet v-model="show2" :actions="acceptanceType" @select="onSelect2"/>
              <div class="changeObject" v-if="!object2.length" @click="changeObjectFn2">请选择</div>
              <div class="changeObj" v-if="object2.length" @click="changeObjectFn2">{{object2}}</div>
            </div>
          </div>
        </div>
      </div>


      <div class="line-line">
        <div class="left"></div>
        <div class="right"></div>
      </div>

      <!--标题-->
      <div class="title">
        <div class="left-test">
          标题 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="title" placeholder="请输入主题"/>
          </div>
        </div>
      </div>
      <!--正文-->
      <div class="title-area">
        <div class="left-test">
          正文 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <!--<textarea class="area" cols="15" rows="4" v-model="content" style="border: none"></textarea>-->
            <van-field v-model="content" rows="6" type="textarea" placeholder="请输入留言"/>
          </div>
        </div>
      </div>

      <div class="line-line">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <!-- 上传附件 -->
      <div class="title">
        <div class="left-test">
          上传附件
        </div>
        <div class="right-test">
          <div class="warp upload-file">
            <van-uploader :after-read="afterRead">
              <span class="upload-file-name overflow-ellipsis" v-if="uploadFileName.length">{{uploadFileName}}</span>
              <van-field v-else center clearable label="" placeholder="请选择文件" @focus="upFile"/>
            </van-uploader>
          </div>
        </div>
      </div>

      <!-- 联系电话 -->
      <div class="title">
        <div class="left-test">
          联系方式 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <!--:formatter="formatter"-->
            <van-field v-model="mobile" placeholder="请输入联系方式"/>
          </div>
        </div>
      </div>

      <!--验证码-->
      <div class="title">
        <div class="left-test">
          验证码 <span class="symbol">*</span>
        </div>
        <div class="code-wrap">
          <div class="code">
            <van-field v-model="sms" placeholder="验证码" maxlength="4"/>
            <!--<input placeholder="验证码"/>-->
          </div>
          <div class="createdCode">
            <CreateCode slot="button" :contentWidth="100" :height="50" :fontSizeMax="30"/>
          </div>
        </div>
      </div>

      <div class="note">注意 :为准确了解您的诉求，方便进一步沟通，并及时告知您办理结果，请您填写真实联系方式</div>

      <button class="submit" @click="submitMsg">提交</button>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import CreateCode from "@/components/common/createCode";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  import {uploadFile, consultAdd, leaveMesSubmit, queryTreeList } from "@/api/request";

  export default {
    name: "SubmitMsg",
    inject:['reload'],
    components: {MobFooter, Crumbs, NavBar, MobHead, CreateCode},
    data() {
      return {
        attachmentUrl:'',//附件地址
        type:'',//受理类型
        show: false,
        show1: false,
        show2: false,
        actions: [
          // { name: '选项3', subname: '描述信息' }
          // {name: '四川省烟草专卖局（公司）'},
        ],
        //受理类型
        acceptType: [
          {name: '咨询', value: 'ZX'},
          {name: '投诉', value: 'TS'},
          {name: '举报', value: 'JB'},
          {name: '建议', value: 'JY'}
        ],
        //受理事项类型
        acceptanceType: [
          {name: '烟草营销类'},
          {name: '专卖管理类'},
          {name: '物流配送类'},
          {name: '烟叶生产类'},
          {name: '人事劳资类'},
          {name: '其他'},
        ],
        options: [],//投诉对象列表
        name: '',//姓名
        acceptUnits: '',
        mobile: '',//电话
        otherMobile: '',//其他联系方式
        objectName:'',
        object: '',//咨询投诉对象  ---id
        object1: '',//咨询投诉对象
        object2: '',//咨询投诉对象
        title: '',//
        content: '',//回复内容
        message: '',
        createCode: '',
        sms: '',
        fileList: [],
        uploadFileName: '',//上传文件名
        changeObject: true,//选择对象
      }
    },
    created() {
      PubSub.subscribe('codeMsg', (msg, data) => {
        this.createCode = data
      });
      this.getAcceptUnits()
    },
    methods: {
      /**
       * 获取受理单位
       * @returns {Promise<void>}
       */
     async getAcceptUnits(){
       let { success, message, result } = await queryTreeList()
       if(success){
         let resultArr = [];
         let obj = {
           id:result[0].id,
           departName:result[0].departName
         }
         resultArr.push(obj)
         resultArr.push(...result[0].children)
         this.actions = resultArr;
         this.actions.forEach(item=>{
           item.name = item.departName
         })
       }else {
         this.$toast(message);
       }


      },
      onSelect(item) {
        console.log(item);
        // 默认情况下点击选项时不会自动收起
        // 可以通过 close-on-click-action 属性开启自动收起
        this.show = false;
        this.objectName = item.departName;
        this.object = item.id;

      },
      onSelect1(item) {
        this.show1 = false;
        this.object1 = item.name;
        this.type = item.value
      },
      onSelect2(item) {
        this.show2 = false;
        this.object2 = item.name;
      },
      formatter(value) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
          this.$toast('手机号码有误，请重填');
          return value.replace(/\d/g, '');
        }
        // return value.replace(/\d/g, '');
      },
      changeObjectFn() {
        this.changeObject = false
        this.show = true
      },
      changeObjectFn1() {
        this.changeObject1 = false
        this.show1 = true
      },
      changeObjectFn2() {
        this.changeObject2 = false
        this.show2 = true
      },

      checkSms() {
        console.log('checkSms');
        if (this.sms.toLowerCase() != this.createCode.toLowerCase()) {
          this.$toast('验证码不正确')
          return false;
        }
      },
      //上传附件
      upFile() {
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        const formData = new FormData()
        formData.append('file', file.file)
        formData.append('token', "token")
        uploadFile(formData).then(res => {
          console.log(res);
          this.uploadFileName = res.result.original;
          if (res.code == 200) {
            this.$toast('上传成功');
            this.attachmentUrl = res.result.url
          } else {
            this.$toast(res.message);
          }
        })
        console.log(file);
      },
      submitMsg() {
        // v-model下拉框是是否显示  绑定赋值是@select事件

        const {name, mobile, object, object1, object2, title, content, message} = this;

        if (!name.trim()) {
          this.$toast('姓名不能为空')
          return false
        }

        if (!object.trim()) {
          this.$toast('受理单位不能为空')
          return false
        }
        if (!object1.trim()) {
          this.$toast('受理类型不能为空')
          return false
        }
        if (!object2.trim()) {
          this.$toast('事项类型不能为空')
          return false
        }
        if (!title.trim()) {
          this.$toast('标题不能为空')
          return false
        }
        if (!content.trim()) {
          this.$toast('正文内容不能为空')
          return false
        }
        if (mobile.length==0) {
          this.$toast('手机不能为空')
          return false
        }
        // if (mobile.length < 10) {
        //   this.$toast('手机格式不正确')
        //   return false
        // }
        // if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile))) {
        //   this.$toast('手机号码有误，请重填');
        //   return false;
        // }
        if (!this.sms) {
          this.$toast('验证码不能为空')
          return false
        }
        if (this.sms.toLocaleUpperCase().trim().toString() != this.createCode.toLocaleUpperCase().trim().toString()) {
          this.$toast('验证码不正确')
          PubSub.publish('upData');
          this.sms = '';
          return false;
        }
        let tel = mobile,departName = object,type = this.type,itemType=object2, attachmentUrl = this.attachmentUrl,attachmentName = this.uploadFileName;
        leaveMesSubmit({name, tel, acceptCompany:departName,type, title, content,itemType, attachmentUrl,attachmentName}).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$toast(res.message)
            // this.reload()
            this.$router.push({
              name: 'WriteMsgSubmitOk',
              params: {id: res.result.id, code: res.result.code, cxCode: res.result.cxCode, title: '我要留言'}
            })
          }
        })
        // this.$router.push({name:'WriteMsgSubmitOk'})

      }
    }
  }
</script>

<style lang="less" scoped>
  /*顶部圆圈*/
  .topCircle {
    margin: .6rem auto 0.1333rem auto;
    display: flex;
    justify-content: space-between;
    .itemCircle {
      width: 2.35rem;
      height: 2.35rem;
      background: rgba(35, 83, 153, 0);
      border: 0.0266rem solid #235399;
      border-radius: 50%;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      .number {
        font-size: .48rem;
        color: #235399;
        line-height: 1rem;
        margin-top: .5rem;
      }
      .title {
        font-size: .32rem;
        color: #656566;
        line-height: .32rem;
      }
    }
  }

  .title-area {
    /deep/ .van-cell {
      height: 3.5rem;
    }
  }

  .changeObject {
    color: #969799;
    font-size: .37rem;
    line-height: 1.2rem;
    padding-left: 0.42667rem;
  }

  .changeObj {
    color: #323233;
    font-size: .37rem;
    line-height: 1.2rem;
    padding-left: 0.42667rem;
  }

  .code {
    /deep/ .van-cell__value {
      position: relative;
      left: 11%;
    }
  }

  .upload-file-name {
    font-size: 0.37rem;
    display: block;
    line-height: 1.2rem;
    margin-top: .2rem;
    padding-left: 0.42667rem;
  }

  /deep/ .van-cell:not(:last-child)::after {
    border-bottom: none;
  }

  .upload-file {
    /deep/ .van-cell__value {
      position: relative;
      left: -50%;
    }
  }

  /deep/ .van-cell {
    height: 1.1rem;
  }

  /deep/ .van-uploader {
    position: relative;
    z-index: 5;
    top: -0.2666rem;
  }

  .inputs {

    .title {
      margin-top: .32rem;
      width: 100%;
      height: 1.2rem;
      line-height: 1.2rem;
      display: flex;
      justify-content: space-between;
      .left-test {
        width: 30%;
        font-size: .37rem;
      }
      .right-test {
        width: 70%;
        border: .0266rem solid #D8DCE6;
        border-radius: .2rem;
        .warp {
          width: 90%;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
        }
      }
    }

    /*横线*/
    .line-line {
      width: 100%;
      height: .64rem;
      padding-bottom: .32rem;
      display: flex;
      justify-content: space-between;
      .left {
        width: 30%;
      }
      .right {
        width: 70%;
        border-bottom: .0266rem solid #D8DCE6;
      }
    }

    /* 下拉框 */
    .select {
      margin-top: 0px;
      outline: none;
      /*border: 1px solid #BBBBBB;*/
      /*border-radius: .2rem;*/
      position: relative;
      .text {
        height: 1.1rem;
        -webkit-appearance: none;
        appearance: none;
        border: none;
        font-size: .37rem;
        padding: 0px 0.42667rem;

        display: block;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #FFFFFF;
        color: #333333;
        border-radius: .2rem;
        .maskOption {
          color: red;
        }
      }
    }

    /* 文本域 */
    .title-area {
      margin-top: .32rem;
      width: 100%;
      /*height: 1.2rem;*/
      line-height: 1.2rem;
      display: flex;
      justify-content: space-between;
      .left-test {
        width: 30%;
        font-size: .37rem;
      }
      .right-test {
        width: 70%;
        border: .0266rem solid #D8DCE6;
        border-radius: .2rem;
        .warp {
          width: 90%;
          margin: 0 auto;
          overflow: hidden;
          .area {
            width: 90%;
            margin-left: 6.5%;
            margin-top: 0.026rem;
            font-size: .37rem;
          }
        }
      }
    }

    /* 验证码 */
    .code-wrap {
      width: 70%;
      /*border: .0266rem solid #D8DCE6;*/
      /*background: skyblue;*/
      border-radius: .2rem;
      display: flex;
      justify-content: space-between;
      line-height: 1.2rem;
      .code {
        font-size: .37rem;
        border: .0266rem solid #D8DCE6;
        border-radius: .2rem;
        width: 55%;
        overflow: hidden;
      }
      .createdCode {
        width: 40%;
        overflow: hidden;
        vertical-align: center;

        /*background: skyblue;*/
      }
    }

    .note {
      margin-top: .5rem;
      height: 32px;
      font-size: .32rem;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #979899;
      line-height: 16px;
    }

  }

  .symbol {
    color: #FF1616;
  }

  .hint {
    background: #FFF4F4;
    height: .8rem;
    line-height: .8rem;
    font-size: .32rem;
    color: #656566;
    padding-left: 4%;
    margin-bottom: .106665rem;

  }

  .submit {
    background: #245399;
    width: 100%;
    color: #fff;
    border-radius: 1rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .43rem;
    border: none;
    margin: .64rem auto 1rem auto;
  }

  .createdCode {
    /*width: 2.5rem;*/
    width: 104%;
  }


</style>

