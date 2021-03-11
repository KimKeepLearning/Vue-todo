import Vue from 'vue'

const app = new Vue({
    el:'#root',
    template:'<div>{{text}}</div>',
    data: {
        text: "aaa"
    },
    beforeCreate() {
        console.log(this, 'beforeCreate')
    },
    created() {
        console.log(this, 'created')
    },
    beforeMount() {
        console.log(this, 'beforeMount')
    },
    mounted() {
        console.log(this, 'mounted')
    },
    beforeUpdate() {
        console.log(this, 'beforeUpdate')
    },
    updated() {
        console.log(this, 'updated')
    },
    activated() {
        console.log(this, 'activated')
    },
    deactivated() {
        console.log(this, 'deactivated')
    },
    beforeDestroy() {
        console.log(this, 'beforeDestroy')
    },
    destroyed() {
        console.log(this, 'destroyed')
    },
})