
import Vue from 'vue'

const component = {
    props:{
        active: Boolean
    },
    template: `
        <div>this is child {{text}}
            <span v-show="active"> see me if active</span>
        </div>
    `,
    data () {
        return {
            text: 123
        }
    }
}

Vue.component('CompOne', component)

new Vue({
    components:{
        CompOne: component, // 名字：组件内容
    },
    el:"#root",
    template: `
        <comp-one :active="active">this is father</comp-one>
    `,
    data:{
        active:true,
    }
})