import Vue from 'vue'
import Router from 'vue-router'
import entry from '../components/Entry.vue'
import contacts from '../components/Contacts.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', name:'Entry', component: entry },
		{ path: '/contacts', name:'Contacts', component: contacts }
	]
})