<template>
  <div class="cart-control">
    <transition name="animation"><div class="sub iconfont" @click="sub" v-show="isShow"><span class="icon-subtract_fill"></span></div></transition>
      <span class="count">{{num|numTxt}}</span>
      <div class="add iconfont" @click="add"><span class="icon-add"></span></div>
  </div>  
</template>

<script>
export default {
  props:{
    num:{
      default:0
    },
    isShow:{
      default:true
    },
    hookState:{
      default:false
    }
  },
  methods:{
    sub(){
      this.$emit("sub")
    },
    add(el){
      this.$emit("add",el.target)
    }
  },
  filters:{
    numTxt(val){
      if(val>0){
        return val
      }else{
        return ' '
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .cart-control
    display flex
    justify-content space-between
    position relative
    .sub
      position absolute
      right 100%
    .add
    .iconfont
      line-height 21px
      font-size 21px
      font-size 21px
      padding 6px
      color #00a0dc
    .count
      font-size 10px
      flex-center()
      color #999
      width 12px
  .animation-enter-active
    animation bouncein .4s
  .animation-leave-active
    animation bouncein .4s reverse
  @keyframes bouncein
    0%{
      transform rotate(0deg)
      opacity 0.1
      right 50%
    }
    50%{
    }
    100%{
      transform rotate(-360deg)
      opacity 1
      right 100%
    }
</style>
