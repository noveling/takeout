<template>
  <div class="food">
      <my-scroll class="myscroll">
        <div class="header">
          <img :src="food.image" alt="">
          <div class="iconfont back" @click="goBack"><span class="icon-back"></span></div>
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="detail">
            <span class="seller-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <cart-control class='cartcontrol' @add="addIntoCart($event,food)" @sub="removeFromCart(food)" :num="cart.find(item=>item.name==food.name)&&cart.find(item=>item.name==food.name).count" :isShow="(cart.find(item=>item.name==food.name)&&cart.find(item=>item.name==food.name).count)>0"></cart-control>
        </div>
        <div class="split" v-if="food.info"></div>
        <div class="info" v-if="food.info">
          <div class="title">商品信息</div>
          <div class="content">{{food.info}}</div>
        </div>
        <div class="split"></div>
        <div class="rating">
          <div class="title">商品评价</div>
          <div class="control-tab">
            <div class="option" @click="toAll" :class="{active:currentState=='all'}">全部<span class="count" v-show="food.ratings.length>0">{{food.ratings.length}}</span></div>
            <div class="option" @click="toPleased" :class="{active:currentState=='pleased'}">推荐<span class="count" v-show="pleasedList.length>0">{{pleasedList.length}}</span></div>
            <div class="option negative" @click="toDissatisfied" :class="{active:currentState=='dissatisfied'}">吐槽<span class="count" v-show="dissatisfiedList.length>0">{{dissatisfiedList.length}}</span></div>
          </div>
          <div class="iconfont switch">
            <span class="icon-yes" :class="{active:hasContent}" @click="toggleHasContent"></span>
            <span class="txt">只看有评价的内容</span>
          </div>
          <div class="comment-box">
            <div class="comment" v-for="(item,index) in openList" :key="index" v-show="item.text || !hasContent">
              <div class="time">{{item.rateTime|releaseTime}}</div>
              <div class="iconfont text"><span class="icon" :class="{'icon-good':item.rateType==0,'icon-bad':item.rateType==1}"></span>{{item.text}}</div>
              <div class="user"><div class="avatar"><img :src="item.avatar" alt="..."></div>{{item.username}}</div>
            </div>
          </div>
        </div>
      </my-scroll>
      <div class="ball-container">
        <div v-for="ball in balls" :key="ball.index">
          <transition name="drop" @before-enter="beforeDrop" @enter="droping" @after-enter="droped"><ball v-if="ball.show"></ball></transition>
        </div>
      </div>
    </div>  
</template>

<script>
import MyScroll from 'components/common/myscroll/MyScroll'
import CartControl from 'components/content/cartcontrol/CartControl'
import {mapState,mapMutations} from 'vuex'
import Ball from './ball'
export default {
  components:{
    MyScroll,
    CartControl,
    Ball
  },
  props:{
    food:{
      default(){}
    }
  },
  data(){
    return {
      currentState:'all',
      hasContent:false,
      balls:[{show:false,index:0},
            {show:false,index:1},
            {show:false,index:2},
            {show:false,index:3},
            {show:false,index:4},
            {show:false,index:5},
            {show:false,index:6},
            {show:false,index:7},
            {show:false,index:8},
            {show:false,index:9},
            {show:false,index:10},
            {show:false,index:11}],
      dropballs:[]
    }
  },
  methods:{
    ...mapMutations(['addtoCart','countIncrease','removefromCart','countDecrease']),
    goBack(){
      this.$emit("back")
    },
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
    },
    addIntoCart(el,food){
      if((this.cart&&this.cart.filter(item=>item.name==food.name)).length==0){
        let obj = {name:food.name,price:food.price,count:1}
        this.addtoCart(obj)
      }else{
        let key = this.cart.findIndex(item=>item.name==food.name)
        this.countIncrease(key)
      }
      for(var i=0;i<this.balls.length;i++){
           if(!this.balls[i].show){//把小球show为false的变成true，展示出来
            let ball = this.balls[i];
            ball.show = true;  //这里这样写他继承的this.balls的值也会变成true
            ball.el = el; //把这个球的位置保留下来
            this.dropballs.push(ball);  //把这个已经drop的球放到dropballs中
            return  //结束循环和函数，不会让循环再往后执行了
          }
        }
    },
    removeFromCart(food){
       if((this.cart&&this.cart.filter(item=>item.name==food.name)).length>0){
        let key = this.cart.findIndex(item=>item.name==food.name)
        this.countDecrease(key)
        if(this.cart[key].count == 0){
          this.removefromCart(key)
        }
       }
    },
    beforeDrop(el){
      if(this.dropballs.length > 0){
        let cur = this.dropballs[0]
        let rect = cur.el.getBoundingClientRect()
        let x = rect.left - 32;
        let y = -(window.innerHeight - rect.top - 42)
        let inner = el.getElementsByClassName('hook')[0]
        el.style.transform = `translate3d(0,${y}px,0)`
        inner.style.transform = `translate3d(${x}px,0,0)`
      }
    },
    droping(el,done){
      setTimeout(()=>{
        let inner = el.getElementsByClassName('hook')[0]
        el.style.transform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      },20)
    },
    droped(el){
      this.dropballs.shift().show = false
    }
  },
  computed:{
    ...mapState(['cart']),
    pleasedList(){
      if(this.food.ratings.length>0){
        return this.food.ratings.filter(item=>{
          return item.rateType == 0
        })
      }else{
        return []
      }
    },
    dissatisfiedList(){
      if(this.food.ratings.length > 0){
        return this.food.ratings.filter(item=>{
          return item.rateType == 1
        })
      }else{
        return []
      }
    },
    openList(){
      switch(this.currentState){
        case 'all':
        return this.food.ratings
        case 'pleased':
        return this.pleasedList
        case 'dissatisfied':
        return this.dissatisfiedList
        default:
        return []
      }
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
  .food
    position fixed
    width 100vw
    height 100vh
    background-color #fff
    .myscroll
      width 100vw
      height calc(100vh - 49px)
      background-color #fff
      z-index 60
      overflow hidden
      div
        display block
      .split
        height 16px
        border-bottom 1px solid rgba(7,17,27,.1)
        background-color #f3f5f7
      .header
        position relative
        width 100vw
        padding-top 100%
        img
          position absolute
          left 0
          top 0
          width 100%
          height 100%
        .back
          position absolute
          left 0 
          top 10px
          color #fff
          font-size 20px
          padding 10px
      .content
        position relative
        padding 18px
        border-bottom 1px solid rgba(7,17,27,.1)
        .cartcontrol
          display flex
          position absolute
          right 15px
          bottom 12px
        .title
          font-size 14px
          color #07111b
          font-weight 700
          line-height 18px
          letter-spacing 1px
        .detail
          font-size 10px
          color #999
          padding 6px 0
          border none
          .rating
            padding-left 8px
        .price
          .now
            font-size 14px
            color #f01414
            font-weight 520
          .old
            font-size 10px
            color #999
            text-decoration line-through
      .info
        padding 18px
        border-bottom 1px solid rgba(7,17,27,.1)
        .title
          font-size 14px
          margin-bottom 6px
        .content
          padding 0 8px
          font-size 12px
          line-height 24px
          border none
          color #444
      .rating
        padding-top 18px
        .title
          margin-left 18px
          font-size 14px
          color #333
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
          .count
            padding-left 4px
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
        .comment-box
          padding 0 18px
          .comment
            padding 16px 0
            position relative
            border-bottom 1px solid rgba(7,17,27,.1)
            .time
              font-size 10px
              color #999
              line-height 12px
              margin-bottom 6px
            .text
              font-size 12px
              line-height 16px
              color #111
              vertical-align bottom
              padding 12px 0
              .icon
                padding-right 4px
              .icon-good
                color #00a0dc
              .icon-bad
                color #93999f
            .user
              position absolute
              top 16px
              right 0
              line-height 12px
              font-size 10px
              .avatar
                overflow hidden
                display inline-block
                vertical-align top
                img
                  border-radius 50%
                  width 12px
                  height 12px
    .ball
      width 21px
      height 21px
      transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      position fixed
      z-index 99
      bottom 30px
      left 28px
</style>
