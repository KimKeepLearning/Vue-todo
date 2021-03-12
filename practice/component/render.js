import Vue from 'vue'

const ChildComp = {
    template: `
        <div>child component</div>
    `
}


const component = {
    components: {
        ChildComp
    },
    
    render(createElement) {
        return createElement('div', {
            style: this.style
        }, this.$slots.default)
    },
    data(){
        return {
            style:{
                width: '200px',
                height:'200px',
                border: '1px solid #990'
            },
            value: "huangyan"
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
    // template:`
    //     <comp-one ref='comp'>
    //         <span ref='span'>{{value}}</span>
    //     </comp-one>
        
    // `,
    render(createElement){
        return createElement('comp-one', {
            ref: 'comp'
        }, [
            createElement('span', {
                ref: 'span'
            }), this.value
        ])
    }
})