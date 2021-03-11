import Vue from 'vue'

new Vue({
    el:'#root',
    template: `
        <div >
            <div v-text="text"></div>
            <div v-html="html"></div>
            <div v-show="active">Text:{{text}}</div>
            <div v-if="active">Text:{{text}}</div>
            <ul>
                <li v-for="(item, index) in arr">{{item}}:{{index}}</li>
            </ul>
            <input type="text" v-model="text"></input> <br>
            <input type="checkbox" v-model="active"></input>
            <div>
                <input type="checkbox" :value="1" v-model="arr"></input>
                <input type="checkbox" :value="2" v-model="arr"></input>
                <input type="checkbox" :value="3" v-model="arr"></input>
            </div>
            <div>
                <input type="radio" value="one" v-model="picked"></input>
                <input type="radio" value="two" v-model="picked"></input>
            </div>
        </div>
    `,
    data:{
        text: 0,
        active:false,
        html: '<span>this is html</span>',
        arr: [,2,3],
        picked: ""
    }
})