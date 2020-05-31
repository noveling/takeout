<template>
  <div class="photobox">
    <div class="title">商店实景</div>
    <my-scroll class="my-scroll" ref="myscroll">
      <div class="photo-wrap">
        <div class="photo-item" v-for="(itme,index) in photolist" :key="index">
          <img :src="itme" alt="...">
        </div>
      </div>
    </my-scroll>
  </div>  
</template>

<script>
import MyScroll from 'components/common/myscroll/MyScroll'
export default {
  components:{
    MyScroll
  },
  props:{
    photolist:{
      default:()=>[]
    }
  },
  watch:{
    photolist(val){
    this.$refs.myscroll.$el.getElementsByClassName('photo-wrap')[0].style.width = val.length * 126-6 + "px"
    this.$refs.myscroll.myRefresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .photobox

    background-color #fff
    display inline-block
    width 100vw
    padding-bottom 20px
    border-bottom 1px solid rgba(7,17,27,.1)
    .title
      font-size 14px
      line-height 14px
      padding 12px 0 12px 20px
    .my-scroll
      width 90vw
      margin-left 5vw
      overflow hidden
      display inline-block
      .photo-wrap
        white-space nowrap
        .photo-item
          display inline-block
          width 120px
          height 90px
          margin-right 6px
          img
            width 120px
            height 90px
</style>
