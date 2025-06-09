import {createWebHashHistory, createRouter} from 'vue-router'

const routes = [
    {
        name: 'app_home',
        path: '/',
        component: () => import("../views/Home/Home.vue")
    },
    {
        name: 'app_manual_kits',
        path: '/manual-kits',
        component: () => import("../views/ManualKit/List.vue")
    },
    {
        name: 'app_login',
        path: '/login',
        component: () => import("../views/User/Login.vue")
    },
    {
        name: 'app_register',
        path: '/register',
        component: () => import("../views/User/Registration.vue")
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
