import Vue from 'vue'

new Vue({
    el: '#root',
    data: {
        isActive: false,
        arr: [1,2,3],
        html: '<span>123</span>',
        aaa: "main",
        styles: {
            color:'red',
        },
        styles2: {
            fontSize: '28px'
        }
    },
    // template: `
    //     <div :id="aaa" @click=handleClick> <p v-html="html"></p> </div>
    // `,
    template: `
        <div 
          :class="[{active : !isActive}, 'haha']"
          :style="[styles, styles2]"
        > 
            <p v-html="html"></p> 
        </div>
    `,
    methods: {
        handleClick () {
            console.log('1')
        }
    },
})