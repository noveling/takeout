<template>
  <div class="content">
    <brand :seller='sellerinfo' @showDetail="changeDetail"/>
    <control-tab :menu="tabmenu" class="tab-menu"></control-tab>
    <div class="my-router" v-if="!showDetail">
      <keep-alive><router-view @showMore="showMore($event)"/></keep-alive>
    </div>
    <transition name="fade"><detail :seller="sellerinfo" @close="changeDetail" v-show="detailState"></detail></transition>
    <transition name="slide"><food v-if="showDetail" :food="currentGood" @back="closeDetail"></food></transition>
    <tab-bar :sellerinfo="sellerinfo"></tab-bar>
  </div>    
</template>

<script>

import Brand from './childComps/brand/brand'
import Detail from './childComps/detail/detail'
import ControlTab from 'components/content/ControlTab'
import {getSeller} from 'network/api'
import Food from './page/childComps/food'
import TabBar from 'components/content/tabbar/TabBar'
export default {
  components:{
      Brand,
      ControlTab,
      Detail,
      Food,
      TabBar
  },
  data(){
      return {
          sellerinfo:{},
          tabmenu:['商品','评论','商家'],
          detailState:false,
          showDetail:false,
          currentGood:{}
      }
  },
  methods:{
    changeDetail(){
      this.detailState = !this.detailState
    },
    showMore(food){
      this.currentGood = food
      this.showDetail = true
    },
    closeDetail(){
      this.showDetail = false
    }
  },
  created(){
      getSeller().then(res=>{
          this.sellerinfo = res.data.data
      })
  }
}
</script>

<style lang="stylus" scoped>
  .tab-menu
    position fixed
    top 134px
    right 0
    left 0
  .fade-enter-active,.fade-leave-active
    transition opacity .5s
  .fade-enter, .fade-leave-to
    opacity 0
  .slide-enter-active,.slide-leave-active
    transition all .15s linear
  .slide-enter,.slide-leave-active
    transform translate3d(100%,0,0)
</style>
