import Vue from 'vue'

const component = {
    // template: `
    //     <div :style="style">
    //         <div class="header">
    //             <slot name="header"></slot>
    //         </div>
    //         <div class="body">
    //             <slot name="body"></slot>
    //         </div>
    //     </div>
    // `,
    template: `
        <div :style="style">
            <!--<slot value="456" aaa="111"></slot>-->
            <slot :value="value"></slot>
        </div>
    `,
    data(){
        return {
            style:{
                width: '200px',
                height:'200px',
                border: '1px solid #aaa'
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
    template:`
        <div>
            <comp-one>
                <span slot-scope="props">this is header {{props.value}}  {{props.aaa}}</span>
            </comp-one>
        </div>
    `
})