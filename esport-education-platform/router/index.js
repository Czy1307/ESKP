import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import User from '@/views/User'
import CourseDetail from '@/views/CourseDetail'
import ChangePassword from '@/components/LoginComponents/changePassword.vue'
import CourseLibrary from '@/views/CourseLibrary'
import Info from '@/views/User/Info'
import History from '@/views/User/History'
import CourseOrder from '@/views/CourseOrder'
import MyCourse from '@/views/User/MyCourse'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/user',
        name: 'User',
        component: User,
        redirect: 'info',
        children: [
            {
                path: "/info",
                name: 'info',
                component: Info
            },
            {
                path: "/history",
                name: 'history',
                component: History
            },
            {
                path: "/myCourse",
                name: 'myCourse',
                component: MyCourse
            }
        ]
    },
    {
        path: '/courseDetail',
        name: 'CourseDetail',
        component: CourseDetail
    },
    {
        path: '/changePassword',
        name: 'ChangePassword',
        component: ChangePassword
    },
    {
        path: '/courseLibrary',
        name: 'CourseLibrary',
        component: CourseLibrary
    },
    {
        path: '/courseOrder',
        name: 'CourseLibrary',
        component: CourseOrder
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router