<template>
  <div class="shopinfo">
    <div class="title">商家信息</div>
    <ul>
      <li v-for="(item,index) in infolist" :key="index">{{item}}</li>
    </ul>
  </div>  
</template>

<script>
export default {
  props:{
    infolist:{
      default:()=>[]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shopinfo
    padding 0 18px 30px
    background-color #fff
    .title
      padding 14px 0
      font-size 14px
    ul
      li
        font-size 12px
        line-height 18px
        padding 14px 0
        border-top 1px solid rgba(7,17,27,.1)
</style>
