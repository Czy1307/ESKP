import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'
import User from '@/components/User.vue'
import CourseDetail from '@/components/CourseDetail.vue'
import ChangePassword from '@/components/LoginComponents/changePassword.vue'
import CourseLibrary from '@/components/courseLibrary.vue'
import info from '@/components/userPage/info.vue'
import history from '@/components/userPage/history.vue'
import CourseOrder from '@/components/courseOrder.vue'
import myCourse from '@/components/userPage/myCourse.vue'

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
                component: info
            },
            {
                path: "/history",
                name: 'history',
                component: history
            },
            {
                path: "/myCourse",
                name: 'myCourse',
                component: myCourse
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