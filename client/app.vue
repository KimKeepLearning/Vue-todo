<template>
    <div id="app">
        <div id="cover"></div>
        <Header/>
        <p>{{fullname}} {{count}}</p>
        <!-- <Todo></Todo> -->
        <router-link :to="{name: 'app'}">app</router-link>
        <router-link to="/login">login</router-link>
        <transition name="fade">
            <router-view/>
        </transition>
        
        <Footer/>
       
    </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
} from 'vuex'
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
    export default {
        components: {
            Header,
            Footer,
            // Todo
        },
        mounted () {
            console.log(this.$store)
            // let i = 1;
            // setInterval(()=>{this.$store.commit('updateCount', i++)}, 1000)
            this.$store.dispatch('updateCountSync', {
                num: 5,
                time: 2000
            })
        },
        computed: {
            ...mapState(['count']),
            // count () {
            //     return this.$store.state.count
            // },
            ...mapGetters(['fullname'])
            // fullname (){
            //     return this.$store.getters.fullname
            // }
        }
    }
</script>

<style lang="stylus" scoped>
#app
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  #cover
      position absolute
      left 0
      right 0
      top 0
      bottom 0   
      background-color #fff 
      background-attachment:fixed
      opacity 0.7
      z-index -1
</style>