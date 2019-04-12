import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Localforage from 'localforage'
// import common from '../public/js/common'
// @ts-ignore
import IconSvg from "@/assets/iconfont/icon-svg"

import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import './common/index.less';



Vue.use(iView);

Vue.component('icon-svg',IconSvg)

Vue.prototype.$Server = 'http://localhost:3000';
Vue.prototype.$lf = Localforage;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
