<template>
  <div>
    <div class="sc-map" ref="scMap" style=""></div>
    <div class="childLink">
      <h1 class="nav-title">子站链接</h1>
      <ul>
        <li v-for="(item, index) in urlList" @click="actives(index,item.url)"
            :class="{activeClass:currentIndex ==index}">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import uploadedDataURL from "@/assets/js/scdata.json";

  export default {
    name: "maps",
    data() {
      return {
        currentIndex: -1,
        urlList: [
        { name: "成都", url: "http://sc.tobacco.com.cn/nportal/portal/s/CD" },
        { name: "自贡", url: "http://sc.tobacco.com.cn/nportal/portal/s/ZG" },
        {
          name: "攀枝花",
          url: "http://sc.tobacco.com.cn/nportal/portal/s/PZH"
        },
        { name: "泸州", url: "http://sc.tobacco.com.cn/nportal/portal/s/LZ" },
        { name: "德阳", url: "http://sc.tobacco.com.cn/nportal/portal/s/DY" },
        { name: "绵阳", url: "http://sc.tobacco.com.cn/nportal/portal/s/MY" },
        { name: "广元", url: "http://sc.tobacco.com.cn/nportal/portal/s/GY" },
        { name: "遂宁", url: "http://sc.tobacco.com.cn/nportal/portal/s/SN" },
        { name: "内江", url: "http://sc.tobacco.com.cn/nportal/portal/s/NJ" },
        { name: "乐山", url: "http://sc.tobacco.com.cn/nportal/portal/s/LES"},
        { name: "南充", url: "http://sc.tobacco.com.cn/nportal/portal/s/NC" },
        { name: "眉山", url: "http://sc.tobacco.com.cn/nportal/portal/s/MS" },
        { name: "宜宾", url: "http://sc.tobacco.com.cn/nportal/portal/s/YB" },
        { name: "广安", url: "http://sc.tobacco.com.cn/nportal/portal/s/GA" },
        { name: "达州", url: "http://sc.tobacco.com.cn/nportal/portal/s/DZ" },
        { name: "雅安", url: "http://sc.tobacco.com.cn/nportal/portal/s/YA" },
        { name: "巴中", url: "http://sc.tobacco.com.cn/nportal/portal/s/BZ" },
        { name: "资阳", url: "http://sc.tobacco.com.cn/nportal/portal/s/ZY" },
        { name: "凉山", url: "http://sc.tobacco.com.cn/nportal/portal/s/LS" },
        { name: "阿坝", url: "http://sc.tobacco.com.cn/nportal/portal/s/AB" },
        { name: "甘孜", url: "http://sc.tobacco.com.cn/nportal/portal/s/GZ" },
      ],
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.getScMap();
      })

    },
    methods: {
      // 获取四川地图
      getScMap() {
        let _this = this;
        let scMap = this.$echarts.init(_this.$refs.scMap);
        _this.$echarts.registerMap("scMap", uploadedDataURL);
        scMap.setOption(
          {
            legend: {
              //地图上面的点
              orient: "vertical",
              left: "left",
              data: ["四川"]
            },
            series: [
              {
                zoom: 1.2,
                type: "map",
                map: "scMap",
                // zlevel: 0,
                label: {
                  normal: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: "#9bbfd9",
                    areaColor: "#3c9edc",
                    borderWidth: 1,
                    label: {
                      color: "#fff",
                      textShadowColor: '#031B30',
                      textShadowBlur: "1",
                      textShadowOffsetX: "2",
                      textShadowOffsetY: "1",
                    }
                  },
                  emphasis: {
                    areaColor: "#475fc9",
                    label: {
                      color: "#fff"
                    }
                  }
                }
              }
            ]
          },
          true
        );
        const clickCity = param => {
          // console.log(param);
          let title = this.$route.query.getTitle;
          let cityName = param.name == '攀枝花市'?'攀枝花':param.name.substr(0,2);
          this.$router.push({name: 'ServiceNavigationTabs', query: {cityName, title}});
          return false;
          this.$router.push({path:'/home/servicenavigation?id=&getTitle=服务导航',query:{cityName:(param.name == '攀枝花市'?'攀枝花':param.name.substr(0,2))}})
          if (param.name == '攀枝花市') {
            // this.$router.push({name:'ServiceNavigationTabs',query:{cityName:'攀枝花'}})
            this.$router.push({path: '/home/servicenavigation?id=&getTitle=服务导航', query: {cityName: '攀枝花'}})
          } else {
            this.$router.push({
              path: '/home/servicenavigation?id=&getTitle=服务导航',
              query: {cityName: param.name.substr(0, 2)}
            })
            // this.$router.push({name:'ServiceNavigationTabs',query:{cityName:param.name.substr(0,2)}})
          }

        };
        scMap.on("click", clickCity);
      },
      actives(index, url) {
        this.currentIndex = index
        window.open(url, "_blank");
      }
    }
  }
</script>

<style lang="less" scoped>
  .activeClass {
    background: #235399;
    color: #fff !important;
  }

  .sc-map {
    height: 10rem;
    overflow: hidden;
  }

  .childLink {
    ul {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      font-size: .37rem;
      margin-bottom: .43rem;
      li {
        width: 30%;
        height: 1rem;
        line-height: 1rem;
        border: #DBDBDB solid .027rem;
        margin-bottom: .43rem;
        text-align: center;
        color: #235399;
      }
    }
  }
</style>
