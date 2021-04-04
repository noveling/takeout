<template>
  <div class="tab-bar">
    <div class="left">
      <div class="logo-wrapper" @click="leftIconClick">
        <div class="iconfont logo" :class="{active:totalprice>0}">
          <span class="icon-shopping-cart"></span>
        </div>
        <div class="num" v-show="totalprice>0">{{totalcount}}</div>
      </div>
      <div class="total-price" :class="{active:totalprice>0}"><span>￥{{totalprice}}</span></div>
      <div class="desc"><span>另需配送费用￥{{sellerinfo.deliveryPrice}}</span></div>
    </div>
    <div class="right" :class="{enough:totalprice >= sellerinfo.minPrice}"><span>{{paydesc}}</span></div>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
  props:{
    sellerinfo:{
      default:()=>{}
    },
    left_icon_btn:{
      type:Boolean,
      defult:false
    }
  },
  methods:{
    leftIconClick(){
      if(this.left_icon_btn){this.$emit("btnClick")}
    }
  },
  computed:{
    ...mapState(['cart']),
    ...mapGetters(['totalprice','totalcount']),
    paydesc(){
      if(this.totalprice == 0){
        return `￥${this.sellerinfo.minPrice}起送`
      }else if(this.totalprice < this.sellerinfo.minPrice){
        return `还差￥${this.sellerinfo.minPrice-this.totalprice}起送`
      }else{
        return `去结算`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tab-bar
    position fixed
    display flex
    height 49px
    bottom 0
    right 0
    left 0
    background-color #141d27
    color #80858a
    z-index 99
    .left
      flex 1
      height 100%
      display flex
      .logo-wrapper
        position relative
        background-color #141d27
        width 56px
        height 56px
        border-radius 50%
        top -10px
        margin 0 12px
        padding 6px
        .logo
          width 100%
          height 100%
          flex-center()
          font-size 22px
          background-color #2b343c
          border-radius 50%
        .active
          color #ffffff
          background-color #00a0dc
        .num
          position absolute
          top 0
          right 0
          font-size 9px
          line-height 16px
          background-color #f01414
          box-shadow 0 4px 8px rgba(0,0,0,.4)
          padding 0 5px
          border-radius 9px
          color #ffffff
          font-weight 600
      .total-price
        flex-center()
        font-size 15px
        font-weight 700
        opacity 0.8
        span
          display inline-block
          border-right 1px solid hsla(0,0%,100%,.1)
          padding-right 15px
      &>.active
        color #ffffff
      .desc
        flex-center()
        font-size 10px
        color hsla(0,0%,100%,.4)
        &>span
          padding-left 18px
    .right 
      flex 0 0 105px
      flex-center()
      background-color #2b333b
      font-size 12px
      font-weight 700
      color hsla(0,0%,100%,.4)
    &>.enough
      background-color #00b43c
      color #ffffff
</style>
