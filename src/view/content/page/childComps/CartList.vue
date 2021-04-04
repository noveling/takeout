<template>
  <div class="cart-list">
    <div class="head-title">购物清单</div>
    <ul class="food-list">
      <li v-for="(food, index) in cart" :key="index" class="food-item">
        <div class="food-desc">
          <h2 class="name">{{food.name}}</h2>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
          </div>
          <div class="count"><span style="font-size:13px;color:#444">数量</span>{{food.count}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
computed:{
  ...mapState(['cart'])
}
}
</script>

<style lang="stylus" scoped>
  .cart-list
    width 100%
    padding-bottom 10px
    box-shadow 0 -2px 2px rgba(0,0,0,.1)
    .head-title
      height 40px
      text-align center
      line-height 40px
      box-sizing border-box
      font-weight 150
      color #444
    .food-item:last-child
      border none
    .food-item
      height 50px
      padding 0 20px
      border-bottom 1px solid #eeeeee
      .food-desc
        display flex
        height 100%
        .name
          flex 1
          position relative
          top 50%
          margin-top -8px
          color #555
          font-size 15px
        .price
          flex 1
          position relative
          top 50%
          margin-top -9px
          height 100%
          font-size 17px
          .now 
            color #f01414
        .count
          color #f01414
          flex 1
          font-size 14px
          position relative
          top 50%
          margin-top -8px
          span 
           padding 0 20px
            
</style>
