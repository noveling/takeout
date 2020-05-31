<template>
  <div class="control-tab">
    <div class="tab-item" v-for="(item,index) in menu" :key="index" @click="changeState(index)" :class="{active:currentIndex==index}">{{item}}</div>
  </div>
</template>

<script>
export default {
  props:{
    menu:{
      type:Array,
      required:true
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  created(){
    switch(this.$route.path){
      case '/content/goods':
      this.currentIndex = 0
      break
      case '/content/ratings':
      this.currentIndex = 1
      break
      case '/content/seller':
      this.currentIndex = 2
      break
      default:
      console.log('- -')
    }
  },
  methods:{
    changeState(index){
        if(this.currentIndex != index){
        switch(index){
          case 0:
          this.$router.push('/content/goods')
          break
          case 1:
          this.$router.push('/content/ratings')
          break
          case 2:
          this.$router.push('/content/seller')
          break
          default:
          console.log('- -')
        }
      }
      this.currentIndex = index
    }
  }
}
</script>

<style scoped lang="stylus">
  .control-tab
    display flex
    text-align center
    height 40px
    background-color #ffffff
    font-size 14px
    color #666
    border-bottom 1px solid #eee
    .tab-item
      flex 1
      flex-center()
    .active
      color #f01414
</style>
