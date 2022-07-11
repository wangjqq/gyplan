import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'; //引入elm组件
import 'element-ui/lib/theme-chalk/index.css'; //引入elm样式
import '@/assets/base.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')