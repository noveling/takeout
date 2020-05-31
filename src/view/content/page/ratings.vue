<template>
  <div class="ratings">
    <my-scroll class="myscroll">
      <overview :seller="sellerinfo" v-if="sellerinfo&&sellerinfo.name"></overview>
      <div class="split"></div>
      <div class="comment-wrap">
        <div class="control-tab">
          <div class="option" @click="toAll" :class="{active:currentState=='all'}">全部<span class="count">{{ratings.length}}</span></div>
          <div class="option" @click="toPleased" :class="{active:currentState=='pleased'}">满意<span class="count">{{pleasedList.length}}</span></div>
          <div class="option negative" @click="toDissatisfied" :class="{active:currentState=='dissatisfied'}">不满意<span class="count">{{dissatisfiedList.length}}</span></div>
        </div>
        <div class="iconfont switch">
          <span class="icon-yes" :class="{active:hasContent}" @click="toggleHasContent"></span>
          <span class="txt">只看有评价的内容</span>
        </div>
        <div class="comment-list">
          <comment v-for="(item,index) in openList" :key="index" :rating="item" v-show="item.text || !hasContent"></comment>
        </div>
      </div>
    </my-scroll>
  </div>  
</template>

<script>
import {getSeller,getRatings} from 'network/api'
import Overview from './childComps/overview'
import Comment from './childComps/comment'
import MyScroll from 'components/common/myscroll/MyScroll'
export default {
  components:{
    Overview,
    Comment,
    MyScroll
  },
  data(){
    return {
      sellerinfo:{},
      ratings:{},
      currentState:'all',
      hasContent:false
    }
  },
  methods:{
    toAll(){
      this.currentState = 'all'
    },
    toPleased(){
      this.currentState = 'pleased'
    },
    toDissatisfied(){
      this.currentState = 'dissatisfied'
    },
    toggleHasContent(){
      this.hasContent = !this.hasContent
    }
  },
  created(){
    getSeller().then(res=>{
      this.sellerinfo = res.data.data
    })
    getRatings().then(res=>{
      this.ratings = res.data.data
    })
  },
  computed:{
    pleasedList(){
      if(Object.keys(this.ratings).length>0){
        return this.ratings.filter(item=>{
          return item.score > 3
        })
      }else{
        return []
      }
    },
    dissatisfiedList(){
      if(Object.keys(this.ratings).length>0){
        return this.ratings.filter(item=>{
          return item.score <= 3
        })
      }else{
        return []
      }
    },
    openList(){
      switch(this.currentState){
        case 'all':
        return this.ratings
        case 'pleased':
        return this.pleasedList
        case 'dissatisfied':
        return this.dissatisfiedList
        default:
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ratings
    position relative
    z-index 100
    .myscroll
      position fixed
      top 174px
      bottom 0
      left 0
      right 0
      background-color #fff
      overflow hidden
    .split
      height 16px
      border-bottom 1px solid rgba(7,17,27,.1)
      background-color #f3f5f7
    .comment-wrap
      .control-tab
        padding 18px
        display flex
        .option
          padding 8px 12px
          font-size 12px
          background-color rgba(0,160,220,.2)
          margin-right 8px
          color #666
          line-height 16px
        .negative
          background-color rgba(77,85,93,.2)
        .negative.active
          background-color #4d555d
        .active
          background-color #00a0dc
          color #fff
      .switch
        padding 12px 18px
        border-top 1px solid rgba(7,17,27,.1)
        border-bottom 1px solid rgba(7,17,27,.1)
        color #999
        font-size 12px
        display flex
        align-content center
        line-height 20px
        .active
          color #00c850
        .icon-yes
          padding-right 10px
          font-size 18px
          line-height 20px
</style>
