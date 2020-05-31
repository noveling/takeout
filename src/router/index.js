import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/view/content/content'

Vue.use(Router)

const Goods = ()=>import("@/view/content/page/goods")
const Ratings = ()=>import("@/view/content/page/ratings")
const Seller = ()=>import("@/view/content/page/seller")

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/content'
    },
    {
      path: '/content',
      name: 'content',
      component:Content,
      children:[
        {
          path:'/content',
          redirect:'goods'
        },
        {
          name:'goods',
          path:'goods',
          component:Goods,
        },
        {
          name:'ratings',
          path:'ratings',
          component:Ratings
        },
        {
          name:'seller',
          path:'seller',
          component:Seller
        }
      ]
    }
  ]
})
