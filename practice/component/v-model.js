import Vue from 'vue'

const component = {
    model:{
        prop: 'value1',
        event: 'change'
    },
    props:[
    'value1'
    ],
    template: `
        <div>
            <input type="text" :value="value1" @input='handelInput'>
        </div>
    `,
    methods:{
        handelInput(e){
            this.$emit("change", e.target.value);
        }
    }
}

 new Vue({
    components:{
        CompOne: component
    },
    el: "#root",
    data (){
        return {
            value: "123"
        }
    },
    template:`
        <div>
            <comp-one v-model="value"></comp-one>
            <!--<comp-one :value="value" @input='value= arguments[0]'></comp-one>--> 
        </div>
    `
})