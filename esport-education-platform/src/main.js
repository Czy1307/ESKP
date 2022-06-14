import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import '@/assets/style/reset.css'
import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { getStore } from '@/utils/storage'

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
}).$mount('#app')