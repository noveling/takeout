import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex)

const state = {
  cart:[]
}

const mutations = {
  addtoCart(state,goodsObj){
    state.cart.push(goodsObj)
  },
  removefromCart(state,index){
    state.cart.splice(index,1)
  },
  countIncrease(state,index){
      let newVal = ()=>{}
      newVal = state.cart[index]
      newVal.count++
      Vue.set(state.cart,index,newVal)
  },
  countDecrease(state,index){
    let newVal = ()=>{}
    newVal = state.cart[index]
    newVal.count--
    Vue.set(state.cart,index,newVal)
  }
}

const getters = {
  totalprice(state){
    let total = 0
    if(state.cart.length > 0){
      state.cart.forEach(item=>{total+=item.price*item.count})
    }
    return total
  },
  totalcount(state){
    let total = 0
    if(state.cart.length>0){
      state.cart.forEach(item=>{total+=item.count})
    }
    return total
  }
}
export default new vuex.Store({
  state,
  mutations,
  getters
})