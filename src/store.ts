import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabShow:true,
    userdata:[],
  },
  getters:{
    not_tabShow(state){//这里的state对应着上面这个state
      return !state.tabShow;
    }
  },
  mutations: {
    show_tabShow(state){
      state.tabShow = true;
    },
    hidetabShow(state){
      state.tabShow = false;
    },
    set_userdata(state,data){
      state.userdata = data
    }
  },
  actions: {
    switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
      context.commit('switch_dialog');
      //你还可以在这里触发其他的mutations方法
    },
    up_userdata(context,data){
      context.commit('set_userdata',data);
    }
  }
})
