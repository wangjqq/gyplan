import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: '网页列表',
    component: () => import("@/views/WebList.vue"),
    children: [{
        path: "/Index",
        name: '首页',
        component: () => import("@/views/Index.vue"),
      },
      {
        path: "/GyStation",
        name: '顾渊工作站',
        component: () => import("@/views/GyStation/GyStation.vue"),
      },
      {
        path: "/GyShop",
        name: '顾渊商城',
        component: () => import("@/views/GyShop.vue"),
      },
      {
        path: "/House",
        name: '快客租房',
        component: () => import("@/views/House.vue"),
      },
      {
        path: "/StopWatch",
        name: '码表后台管理系统',
        component: () => import("@/views/StopWatch.vue"),
      },
      {
        path: "/Admin",
        name: '商城后台管理系统',
        component: () => import("@/views/Admin.vue"),
      },
    ]
  }, {
    path: "/GyStationIndex",
    name: '顾渊工作站首页',
    component: () => import('@/views/GyStation/GyStationIndex.vue'),
  }

]

const router = new VueRouter({
  routes
})

export default router