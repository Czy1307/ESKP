import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import '@/assets/style/reset.css'
import axios from 'axios'
import store from '../store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { getStore } from '@/utils/storage'

// 全局组件的引入
import Bottom from "@/components/Bottom"
import Navigation from "@/components/Navigation"
import Swiper from "@/components/Swiper"
import CourseDisplay from "@/components/CourseDisplay"
import LoginPage from "@/components/LoginPage"

// 全局组件注册
Vue.component(Bottom.name, Bottom)
Vue.component(Navigation.name, Navigation)
Vue.component(Swiper.name, Swiper)
Vue.component(CourseDisplay.name, CourseDisplay)
Vue.component(LoginPage.name, LoginPage)

// 将token加到请求头
axios.interceptors.request.use(config => {
	const token = getStore('token')
	if (token) {
		config.headers.common['Authorization'] = token
	}
	return config
}, error => {
	return Promise.reject(error)
})

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'

new Vue({
	router,
	render: h => h(App),
	store
}).$mount('#app')