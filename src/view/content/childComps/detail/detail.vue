<template>
  <div class="detail">
    <div class="detail-main">
      <h1>{{seller.name}}</h1>
      <div class="star-wrapper" v-if="seller&&seller.score&&starbox.length>0">
        <div v-for="(item,index) in starbox" :key="index" class="iconfont" :class="item">
          <span class="icon-star"></span>
        </div>
      </div>
      <div class="title"><div class="line"></div><div class="txt">优惠信息</div><div class="line"></div></div>
      <ul class="support" v-if="seller&&seller.score&&starbox.length>0">
        <li v-for="(item,index) in seller.supports" :key="index">{{item.description}}</li>
      </ul>
      <div class="title"><div class="line"></div><div class="txt">商家公告</div><div class="line"></div></div>
      <div class="content" v-if="seller&&seller.score&&starbox.length>0"><div class="bulletin">{{seller.bulletin}}</div></div>
    </div>
    <div class="close" @click="closeDetail">
      <div class="iconfont icon">
        <span class="icon-baseline-close-px"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    seller:{
      default(){}
    }
  },
  data(){
    return {
      starbox:[],
      max:5
    }
  },
  methods:{
    closeDetail(){
      this.$emit("close")
    }
  },
  watch:{
    seller:function(val){
      if(val&&val.score){
        for(let i = 0; i < this.max; i++){
          if(i < Math.floor(val.score)){
            this.starbox.push("gold")
          }else{
            this.starbox.push("dark")
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .detail
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0,0,0,.8)
    z-index 999
    color #ffffff
    .detail-main
      margin-top 64px
      width 100%
      min-height 100%
      h1
        font-size 16px
        line-height 16px
        text-align center
      .star-wrapper
        flex-center()
        margin-top 10px
        .iconfont
          font-size 23px
          padding 0 10px
        .gold
          color rgb(255, 153, 0)
        .dark
          color rgb(71, 77, 85)
  .title
    display flex
    width 80%
    margin 28px auto 24px
    align-items center
    .txt
      padding 0 12px
      font-size 14px
      font-weight 700
    .line
      flex 1
      border-bottom 1px solid hsla(0,0%,100%,.2)
  ul
    list-style none
    font-size 12px
    width 80%
    margin 0 auto
    li
      line-height 16px
      padding 0 12px
      margin-bottom 12px
      text-ellipsis()
  .content
    width 80%
    margin 0 auto
    font-size 12px
    .bulletin
      line-height 24px
      padding 0 12px
  .close
    position absolute
    bottom 35px
    left 50%
    transform translate(-50%,0)
    width 32px
    height 32px
    .icon
      font-size 30px
</style>
