let fullPath = '';
let title = '';
export const myMixin = {
  beforeRouteEnter(to, from, next) {
     fullPath = from.fullPath +"";//path: "/home"

    next(vm => {
      vm.foo = fullPath;
    })
  },
  data: function () {
    return {
      timer:null,
      foo: '',//  路径
      bar:'', //  名称
    }
  },
  created: function () {
    this.foo = fullPath;
    this.bar = title;

  },
  methods: {

  }
}
