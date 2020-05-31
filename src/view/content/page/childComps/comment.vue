<template>
  <div class="comment">
    <div class="avatar">
      <img :src="rating.avatar" alt="...">
    </div>
    <div class="content">
      <div class="time">{{rating.rateTime|releaseTime}}</div>
      <div class="name">{{rating.username}}</div>
      <div class="star-box"><star :starsize="10" :score="rating.score"></star></div>
      <div class="txt">{{rating.text}}</div>
      <div class="recommend" v-if="rating.recommend.length>0">
        <div class="iconfont good"><span class="icon-good"></span></div>
        <div class="item" v-for="(item,index) in rating.recommend" :key="index">
          <span>{{item}}</span>
        </div>
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
    rating:{
      default(){}
    }
  },
  filters:{
    releaseTime(val){
      let time = new Date(val)
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      return y + '-' + m + '-' + (d < 10 ? "0" + d : d) + " " + time.toTimeString().substr(0, 8)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .comment
    display flex
    padding 18px 16px
    border-bottom 1px solid rgba(7,17,27,.1)
    .avatar
      width 28px
      margin-right 12px
      img
        max-width 100%
        border-radius 50%
    .content
      position relative
      flex 1
      .time
        position absolute 
        top 0
        right 0
        font-size 10px
        color #999
      .name 
        font-size 10px
      .star-box
        width 80px
        margin-bottom 6px
      .txt
        font-size 12px
        line-height 18px
        margin-bottom 8px
      .recommend
        display flex
        flex-wrap wrap
        font-size 0
        line-height 16px
        .good
          font-size 13px
          color #00a0dc
          margin-right 6px
        .item
          font-size 9px
          border 1px solid #ccc
          color #999
          margin 0 8px 2px 0
</style>
