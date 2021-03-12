<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <!-- <Todo></Todo> -->
        <router-link :to="{name: 'app'}">app</router-link>
        <router-link to="/login">login</router-link>
        <transition name="fade">
            <router-view/>
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
import Todo from './views/todo/todo.vue'
    export default {
        components: {
            Header,
            Footer,
            Todo
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