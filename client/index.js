import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import VueRouter from 'vue-router'
import createStore from './store/store'
import './assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(VueRouter)
Vue.use(Vuex)


const router = createRouter()
const store = createStore()

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if(to.fullPath === '/login'){}
  next()
})

router.beforeResolve((to, from, next) => {
  // to and from are both route objects. must call `next`.
  next()
})
router.afterEach((to, from) => {
  // to and from are both route objects.

})
// const root = document.createElement('div')
// document.body.appendChild(root)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
