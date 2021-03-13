// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        component: () => import('../views/todo/todo.vue'), // 异步加载组件
        // components: {
        //     default: Todo,
        //     a: Login
        // },
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
        component: () => import('../views/login/login.vue') //异步加载组件
    //     components: {
    //         default: Login,
    //         a: Todo
    //     }
    }
]