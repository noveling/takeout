<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
    name:"MyScroll",
    data(){
        return {
            scroll:null,
        }
    },
    props:{
        PullUpLoad:{
            type:Boolean,
            default:false
        },
        scrollx:{
          default:false
        },
        scrolly:{
          defalut:true
        }
    },
    methods:{
        myRefresh(){
            this.scroll.refresh()
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            // 弹性设置
            bounce:true,
            
            // 下拉设置
            pullDownRefresh:false,
            // 监听滚动
            probeType:3,
            click:true,
            pullUpLoad:this.PullUpLoad,
            preventDefault:true,
            scrollX: true,
            scrollY: true,
        })
        // 监听滚动
        // this.scroll.on("scroll",pos=>{
        //     this.$emit("backToTop",pos)
        // })
        // this.scroll.on("pullingUp",()=>{
        //     this.$emit("pullingUp")
        // })
    },
    beforeDestroy(){
    }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    &>.content
      display inline-block
      overflow hidden
</style>
