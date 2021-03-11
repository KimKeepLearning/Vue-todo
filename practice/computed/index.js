import Vue from 'vue'

new Vue({
    el: '#root',
    template: `
        <div 
        > 
           {{name}}
           <input type="text" v-model="obj.a">{{obj.a}}</input>
        </div>
        
    `,
    data: {
        fistname: 'yan',
        lastname: 'huang',
        obj:{
            a:'123'
        }
    },
    
    computed: {
        name () {
            return this.fistname + " " + this.lastname;
        }
    },
    watch:{
        'obj.a':{
            handler(){
                console.log('obj.a changed')
            },
            // deep:true
        },
        
    },
    
})