
import Vue from 'vue'

const component = {
    props:{
        active: Boolean,
        propOne: {
            require: true,
        }
    },
    template: `
        <div>this is child {{text}}
            <span v-show="active"> see me if active: </span>
            <p>{{propOne}}</p>
        </div>
    `,
    data () {
        return {
            text: 123
        }
    },
    mounted() {
        console.log('comp mounted----1')
    },
}


const CompVue = Vue.extend(component)

new CompVue ({
    el:"#root",
    propsData:{
        propOne: "111"
    },
    mounted() {
        console.log('comp mounted----0')
    },
    data:{
        text:"18261195537"
    }
})