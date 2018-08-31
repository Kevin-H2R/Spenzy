import Vue from 'vue'
import Router from 'vue-router'
import HomeDashboard from '@/components/HomeDashboard'
import GroupPage from '@/components/GroupPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  relative: true,
  base: '/spenzy',
  routes: [
    {
      path: '/',
      name: 'HomeDashboard',
      component: HomeDashboard
    },
    {
      path: '/group',
      name: 'GroupPage',
      component: GroupPage
    }
  ]
})
