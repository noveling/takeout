<template>
  <div class="overview" v-if="seller.name">
    <div class="left">
      <div class="score">{{seller.score}}</div>
      <div class="title">综合评分</div>
      <div class="rank">高于周边商铺{{seller.rankRate}}%</div>
    </div>
    <div class="right">
      <div class="service">
        <span class="title">服务态度</span>
        <star :score="seller.score"></star>
        <span class="count">{{seller.score}}</span>
      </div>
      <div class="goods">
        <span class="title">商品评分</span>
        <star :score="seller.foodScore"></star>
        <span class="count">{{seller.foodScore}}</span>
      </div>
      <div class="delivery">
        <span class="title">送达时间</span>
        <span class="txt">{{seller.deliveryTime}}分钟</span>
      </div>
    </div>
  </div>  
</template>

<script>
import Star from 'components/content/star'
export default {
  components:{
    Star
  },
  props:{
    seller:{
      default(){}
    }
  }
}
</script>

<style lang="stylus" scoped>
  .overview
    display flex
    background-color #ffffff
    padding 18px 0
    border-bottom 1px solid rgba(7,17,27,.1)
    .title
      font-size 12px
    .left
      width 137px
      border-right 1px solid rgba(7,17,27,.1)
      .score
        font-size 24px
        color #f90
        flex-center()
      .title
        flex-center()
      .rank
        flex-center()
        font-size 10px
        color #999
        line-height 25px
    .right 
      padding 6px 0 6px 24px
      flex 1
      line-height 23px
      span
        padding-right 6px
      .count
        font-size 12px
        color #f90
        padding-left 10px
      .service
        display flex
      .goods
        display flex
      .delivery
        display flex
        .txt
          font-size 12px
          color #777
</style>
