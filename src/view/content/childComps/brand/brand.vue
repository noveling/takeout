<template>
  <div class="brand">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="...">
      </div>
      <div class="content">
        <div class="shop-name">
          <span>{{seller.name}}</span>
        </div>
        <div class="shop-description">
          <span>{{seller.description+'/'+seller.deliveryTime+"分钟送达"}}</span>
        </div>
        <div class="iconfont shop-support" v-if="seller.supports">
          <span><span class="icon-price" style="color: #daa279;padding-right:4px;"></span>{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="support-count iconfont" @click="showDetail">{{seller.supports&&seller.supports.length}}个<span class="icon-right" style="padding-left:4px;"></span></div>
    <div class="bulletin-wrapper iconfont" @click="showDetail">{{seller.bulletin}}<span class="icon-right" style="position:absolute;right:8px"></span></div>
    <div class="mask"></div>
    <div class="background">
      <img :src="seller.avatar" alt="...">
    </div>
  </div>
</template>

<script>
export default {
    props:{
        seller:{
          type:Object,
          required:true
        }
    },
    methods:{
      showDetail(){
        this.$emit("showDetail")
      }
    }
}
</script>

<style lang="stylus" scoped>
  img 
    width 100%
  .mask
    position absolute 
    top 0
    width 100%
    height 100%
    background: $mask
    z-index -1
  .background
    position absolute 
    top 0
    width 100%
    height 100%
    z-index -2
    filter: blur(10px);
    img 
      width 100%
      height 100%
  .brand 
    position fixed
    height 134px
    left 0
    right 0
    top 0
    color #ffffff
    .content-wrapper
      display flex
      height 105px
      align-items center
      .avatar
        width 64px
        height 64px
        margin-left 24px
      .content
        font-size 12px
        margin-left 16px
        height 64px
        display flex
        flex-direction column
        justify-content space-between
        .shop-name 
          font-size 16px
          line-height 18px
          font-weight 700
          text-ellipsis()
        .shop-support
          font-size 12px
    .support-count
      position absolute
      right 12px
      bottom 45px
      height 24px
      font-size 10px
      padding 0 8px
      background: rgba(0,0,0,.2);
      border-radius 9px
      flex-center()
    .bulletin-wrapper
      height 29px
      text-ellipsis()
      font-size 10px
      padding 0 22px 0 12px
      background-color rgba(7, 17, 27, 0.2)
      line-height 29px
    
</style>
