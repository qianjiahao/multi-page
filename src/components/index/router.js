import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login'
import Layout from './components/layout'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout
    },
    {
      path: '/',
      name: '/',
      redirect: '/layout'
    },
    {
      path: '*',
      redirect: '/layout'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    next()
  } else {
    next()
  }
})

export default router
