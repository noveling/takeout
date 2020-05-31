<template>
  <div class="star">
    <div v-for="(item,index) in starbox" :key="index" class="iconfont" :class="item">
      <span class="icon-star" :style="{fontSize:`${starsize}px`}"></span>
    </div>
  </div>  
</template>

<script>
export default {
  props:{
    score:{
      required:true
    },
    max:{
      default:5
    },
    starsize:{
      default:16
    }
  },
  data(){
    return {
      starbox:[]
    }
  },
  watch:{
    score(val){
      this.starbox=[]
      for(let i = 0; i < this.max; i++){
        if(i < Math.floor(val)){
          this.starbox.push('gold')
        }else{
          this.starbox.push('dark')
        }
      }
    }
  },
  created(){
    for(let i = 0; i < this.max; i++){
      if(i < Math.floor(this.score)){
        this.starbox.push('gold')
      }else{
        this.starbox.push('dark')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .star
    flex-center()
    .iconfont
      padding 0 2px
    .gold
      color #f90
    .dark
      color #d4d6d9
</style>
