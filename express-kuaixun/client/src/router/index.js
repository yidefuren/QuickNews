import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import KxList from '../views/Kx/List.vue'
import KxAdd from '../views/Kx/Add.vue'
import NoFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {path: '/Kx/list', component: KxList},
            {path: '/Kx/add', component: KxAdd},
            {path: '/Kx/edit/:id', component: KxAdd, props: true},
        ]
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '*',
        name: 'NoFound',
        component: NoFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false
    if (to.path == '/login') {
        next();
    } else {
        isLogin ? next() : next('/login')
    }
})

// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

export default router
