<template>
  <div class="seller">
    <my-scroll class="myscroll">
      <abstract :seller="seller"></abstract>
      <div class="split"></div>
      <bulletin :seller="seller"></bulletin>
      <div class="split"></div>
      <photowall :photolist="seller.pics"></photowall>
      <div class="split"></div>
      <shopinfo :infolist="seller.infos"></shopinfo>
    </my-scroll>
  </div>  
</template>

<script>
import {getSeller} from 'network/api'
import Abstract from './childComps/abstract'
import Bulletin from './childComps/bulletin'
import Photowall from './childComps/photowall'
import Shopinfo from './childComps/shopinfo'
import MyScroll from 'components/common/myscroll/MyScroll'
export default {
  components:{
    Abstract,
    Bulletin,
    Photowall,
    Shopinfo,
    MyScroll
  },
  data(){
    return {
      seller:()=>{}
    }
  },
  created(){
    getSeller().then(res=>this.seller = res.data.data)
  }
}
</script>

<style lang="stylus" scoped>
  .seller
    position relative
    z-index 10
    .myscroll
      position fixed
      background-color #fff
      top 174px
      bottom 0
      left 0
      right 0
      overflow hidden
    .split
      height 16px
      border-bottom 1px solid rgba(7,17,27,.1)
      background-color #f3f5f7
</style>
