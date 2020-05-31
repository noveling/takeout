<template>
  <div class="abstract" v-if="seller.name">
    <div class="shop-tip">
      <div class="title">
        <div class="name"><div class="store">{{seller.name}}</div></div>
        <div class="rank"><star :score="seller.score" v-if="seller&&seller.name"></star><span>月售{{seller.sellCount}}单</span></div>
      </div>
      <div class="favor" @click="toggleCollect">
        <div class="iconfont icon" :class="{active:isCollected}"><span class="icon-heart"></span></div>
        <div class="info">{{isCollected|collect}}</div>
      </div>
    </div>
    <div class="remark">
      <div class="block">
        <h1>起送价</h1>
        <span><span class="count">{{seller.minPrice}}</span>元</span>
      </div>
      <div class="block">
        <h1>商家配送</h1>
        <span><span class="count">{{seller.deliveryPrice}}</span>元</span>
      </div>
      <div class="block">
        <h1>配送时间</h1>
        <span><span class="count">{{seller.deliveryTime}}</span>分钟</span>
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
  data(){
    return {
      isCollected:false
    }
  },
  props:{
    seller:{
      default(){}
    }
  },
  filters:{
    collect(val){
      if(val){
        return '收藏'
      }else{
        return '已收藏'
      }
    }
  },
  methods:{
    toggleCollect(){
      this.isCollected = !this.isCollected
    }
  }
}
</script>

<style lang="stylus" scoped>
  .abstract
    position relative
    background-color #fff 
    .shop-tip
      display flex
      padding 18px
      .title
        flex 1
        line-height 25px
        .name
          font-size 14px
        .rank
          display flex
        span
          font-size 12px
          color #666
          padding-left 15px
      .favor
        width 50px
        text-align center
        .icon
          font-size 24px
          color #d4d6d9
        .active
          color #f01414
        .info
          font-size 10px
          line-height 25px
          color #666
    .remark
      display flex
      border-top 1px solid rgba(7,17,27,.1)
      text-align center
      padding 16px 0
      .block
        flex 1
        border-right 1px solid rgba(7,17,27,.1)
        &:nth-last-child(1)
          border none
        h1
          font-size 10px
          color #999
          font-weight normal
          padding 0
          margin 0
        span
          &>.count
            font-size 24px
            color #444
</style>
