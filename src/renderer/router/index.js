import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Folder').default,
    },
    {
      path: ':directoryProp',
      name: 'nextFolder',
      props: true,
      component: require('@/components/Folder').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
