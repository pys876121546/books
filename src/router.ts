import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Localforage from 'localforage'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [{
                path: '/',
                name: 'index',
                meta: {
                    requireAuth: true
                },
                component: () => import(/* webpackChunkName: "about" */ './views/index/Index.vue'),
            },{
                path: '/detail/:id',
                name: 'detail',
                meta: {
                    requireAuth: true
                },
                component: () => import(/* webpackChunkName: "about" */ './views/index/Detail.vue'),
            }]
        },
        {
            path: '/bookcase',
            name: 'bookcase',
            meta: {
                requireAuth: true
            },
            component: () => import(/* webpackChunkName: "about" */ './views/Bookcase.vue'),
            children: [{
                path: '/bookcase',
                name: 'bookcase',
                meta: {
                    requireAuth: true
                },
                component: () => import(/* webpackChunkName: "about" */ './views/bookcase/Bookcase.vue'),
            },
                {
                    path: '/ebook/:id',
                    name: 'ebook',
                    meta: {
                        requireAuth: true
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/bookcase/Ebook.vue'),
                    children: []
                },]
        },
        {
            path: '/my',
            name: 'my',
            component: () => import(/* webpackChunkName: "about" */ './views/My.vue'),
            children: [{
                path: '/my',
                name: 'my',
                component: () => import(/* webpackChunkName: "about" */ './views/my/Mypage.vue'),
            },
                {
                    path: '/about',
                    name: 'about',
                    meta: {
                        requireAuth: true
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/my/About.vue'),
                },
                {
                    path: '/suggest',
                    name: 'suggest',
                    meta: {
                        requireAuth: true
                    },
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "about" */ './views/my/Suggest.vue'),
                },
                {
                    path: '/message',
                    name: 'message',
                    meta: {
                        requireAuth: true
                    },
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "about" */ './views/my/Message.vue'),
                },
                {
                    path: '/security',
                    name: 'security',
                    meta: {
                        requireAuth: true
                    },
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "about" */ './views/my/Security.vue'),
                    children: [{
                        path: '/security',
                        name: 'security',
                        meta: {
                            requireAuth: true
                        },
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () => import(/* webpackChunkName: "about" */ './views/my/security/Security.vue'),
                    },
                        {
                            path: '/changephone',
                            name: 'changephone',
                            meta: {
                                requireAuth: true
                            },
                            // route level code-splitting
                            // this generates a separate chunk (about.[hash].js) for this route
                            // which is lazy-loaded when the route is visited.
                            component: () => import(/* webpackChunkName: "about" */ './views/my/security/ChangePhone.vue'),
                        }]
                },
                {
                    path: '/info',
                    name: 'info',
                    meta: {
                        requireAuth: true
                    },
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "about" */ './views/my/Info.vue'),
                },
                {
                    path: '/wallet',
                    name: 'wallet',
                    meta: {
                        requireAuth: true
                    },
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "about" */ './views/my/Wallet.vue'),
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
            children: []
        },
        {
            path: '/reg',
            name: 'reg',
            component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
            children: []
        },
        {
            path: '/uploadbooks',
            name: 'uploadbooks',
            meta: {
                requireAuth: true
            },
            component: () => import(/* webpackChunkName: "about" */ './views/UpLoadBooks.vue'),
            children: []
        },


    ]
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        Localforage.getItem('sessionId').then(value=> {
            if ( value != "undefined" && value != undefined) {// 判断是否登录
                next()
            } else {// 没登录则跳转到登录界面
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}
                })
            }
        })

    } else {
        next()
    }
})
export default router
