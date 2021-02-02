import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import Entry from './components/Entry.vue'
import contacts from './components/Contacts.vue'

Vue.config.productionTip = false
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'entry',
			component: Entry
		},
		{
			path: '/contacts',
			name: 'contacts',
			component: contacts
		}
	]
})

new Vue({
	vuetify,
	render: h => h(App)
}).$mount('#app')
