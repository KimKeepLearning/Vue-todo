import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        component: Todo,
        name: 'app',
        mata: {// 保存路由信息
            title: 'this is app',
            description: 'huangyan'
        },
        // children: [ // 嵌套路由
        //     {
        //         path: '/test',
        //         component: Login
        //     }
        // ]
    },
    {
        path:'/login',
        component: Login
    }
]