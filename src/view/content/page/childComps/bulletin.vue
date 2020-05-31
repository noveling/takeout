<template>
  <div class="bulletin">
    <div class="title">公告与活动</div>
    <div class="content">{{seller.bulletin}}</div>
    <ul>
      <li v-for="(item,index) in seller.supports" :key="index">{{item.description}}</li>
    </ul>
  </div>  
</template>

<script>
export default {
  props:{
    seller:{
      default(){}
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bulletin
    background-color #fff
    padding 18px 18px 0
    border-bottom 1px solid rgba(7,17,27,.1)
    .title
      font-size 14px
      color #555
      line-height 20px
    .content
      font-size 12px
      color #f01414
      line-height 24px
      padding 0 12px 16px
    ul
      font-size 12px
      line-height 16px
      color #07111b
      li
        padding 16px 12px
        border-top 1px solid rgba(7,17,27,.1)
</style>
