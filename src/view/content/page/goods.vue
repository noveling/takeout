<template>
  <div class="goods">
    <my-scroll class="menu-wrap">
      <div class="menu">
        <div class="menu-item" v-for="(item,index) in goodslist" :key="index" :class="{active:index==defaultActive}" @click="toggleActive(index)">{{item.name}}</div>
      </div>
    </my-scroll>
    <my-scroll class="foods-wrap" ref="foodsScroll">
      <div class="foods">
        <div class="food-item" v-for="(item,index) in goodslist" :key="index" ref="foodItem">
          <h1 class="title">{{item.name}}</h1>
          <div class="food-list">
            <div class="food-detail" v-for="(food,order) in item.foods" :key="order">
              <div class="food-img"  @click="showMore(food)"><img :src="food.icon" alt="..."></div>
              <div class="food-desc" @click="showMore(food)">
                <h2 class="name">{{food.name}}</h2>
                <div class="desc">{{food.description}}</div>
                <div class="extra"><span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <cart-control class='cart-control' @add="addIntoCart($event,index,order)" @sub="removeFromCart(index,order)" :num="cart.find(item=>item.name==food.name)&&cart.find(item=>item.name==food.name).count" :isShow="(cart.find(item=>item.name==food.name)&&cart.find(item=>item.name==food.name).count)>0"></cart-control>
            </div>
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
import {getGoods,getSeller} from 'network/api'
import {mapState,mapMutations} from 'vuex'
import Ball from './childComps/ball'
import MyScroll from 'components/common/myscroll/MyScroll'
import CartControl from 'components/content/cartcontrol/CartControl'
export default {
  components:{
    MyScroll,
    CartControl,
    Ball
  },
  data(){
    return {
      goodslist:[],
      sellerinfo:{},
      defaultActive:0,
      allItemsHeight:[],
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
  computed:{
    ...mapState(['cart'])
  },
  methods:{
    ...mapMutations(['addtoCart','countIncrease','removefromCart','countDecrease']),
    toggleActive(index){
      this.defaultActive = index
      if(this.allItemsHeight.length>0&&index>0){
        this.$refs.foodsScroll.scroll.scrollTo(0,-this.allItemsHeight[index-1]-1,200)
      }else{
        this.$refs.foodsScroll.scroll.scrollTo(0,-1,0)
        this.$refs.foodsScroll.scroll.scrollTo(0,-this.allItemsHeight[index-1]-1,200)
      }
    },
    showMore(food){
      this.$emit('showMore',food)
    },
    addIntoCart(el,index,order){
      if((this.cart&&this.cart.filter(item=>item.name==this.goodslist[index].foods[order].name)).length==0){
        let obj = {name:this.goodslist[index].foods[order].name,price:this.goodslist[index].foods[order].price,count:1}
        this.addtoCart(obj)
      }else{
        let key = this.cart.findIndex(item=>item.name==this.goodslist[index].foods[order].name)
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
    removeFromCart(index,order){
       if((this.cart&&this.cart.filter(item=>item.name==this.goodslist[index].foods[order].name)).length>0){
        let key = this.cart.findIndex(item=>item.name==this.goodslist[index].foods[order].name)
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
  created(){
    getGoods().then(res=>this.goodslist=res.data.data)
    getSeller().then(res=>this.sellerinfo=res.data.data)
  },
  mounted(){
    this.$refs.foodsScroll.scroll.on("scroll",pos=>{
      // 对商品列表滚动位置进行判断
      if(this.allItemsHeight.length==0){
        let Height = []
        let defaultVal = 0
        this.$refs.foodItem.forEach((item,index)=>{
          defaultVal += item.offsetHeight
          Height.push(defaultVal)
          })
        this.allItemsHeight = Height
      }
      else{
        let activeIndex = 0
        activeIndex = this.allItemsHeight.findIndex(item=>item>-pos.y)
        if(activeIndex==-1){
          this.defaultActive = 0
        }else{this.defaultActive = activeIndex}
        }
    })
  }
}
</script>

<style lang="stylus" scoped>
  h1,h2
    margin 0
    padding 0
  .goods
    position fixed
    display flex
    top 174px
    bottom 49px
    left 0
    right 0
    overflow hidden
    background-color #ffffff
    .menu-wrap
      height calc(100vh - 223px)
      background-color #f3f5f7
      .content
        width 100%
      .menu
        font-size 12px
        padding 0 12px
        width 80px
        .menu-item
          height 65px
          flex-center()
          border-bottom 1px solid #eee
        .active
          background-color #ffffff
          margin 0 -12px
          padding 0 12px
    .foods-wrap
      height calc(100vh - 223px)
      flex 1
      .foods
        .food-item
          .title
            background-color #f3f5f7
            font-size 12px
            color #93999f
            border-left 2px solid #d9dde1
            padding-left 14px
            height 26px
            line-height 26px
          .food-list
            background-color #ffffff
            .food-detail
              border-bottom 1px solid #eee
              display flex
              padding 20px
              position relative
              .food-img
                img
                  width 57px
                  height 57px
              .food-desc
                padding-left 15px
                .name
                  color #555
                  font-size 15px
                .desc
                  color #aaa
                  line-height 12px
                  font-size 10px
              .extra
                color #aaa
                font-size 10px
                .count 
                  margin-right 15px
              .price
                font-size 17px
                .now 
                  color #f01414
                .old 
                  color #aaa
                  text-decoration line-through
                  font-size 15px
              .cart-control
                position absolute 
                right 15px
                bottom 12px
    .ball
      width 21px
      height 21px
      transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      position fixed
      z-index 99
      bottom 30px
      left 28px
  </style>
