import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/config/services/token'

export const ROUTE_SIGNIN = 'sign-in'
export const ROUTE_SIGNUP = 'sign-up'
export const ROUTE_DASHBOARD = 'notepad'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    component: () => import('@/components/layouts/default.vue'),
    routes: [
        {
            path: '/signin',
            name: ROUTE_SIGNIN,
            component: () => import('@/views/auth/sign-in.vue'),
            meta: {
                title: 'Sign In',
                requiresAuth: false
            }
        },
        {
            path: '/signup',
            name: ROUTE_SIGNUP,
            component: () => import('@/views/auth/sign-up.vue'),
            meta: {
                title: 'Sign Up',
                requiresAuth: false
            }
        },
        {
            path: '/',
            name: ROUTE_DASHBOARD,
            component: () => import('@/views/Dashboard.vue'),
            meta: {
                title: 'Notepad',
                requiresAuth: true
            }
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth === true && !getToken()) {
        return next({ name: ROUTE_SIGNIN })
    }

    return next()
})

export default router
