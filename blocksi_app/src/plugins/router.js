import Vue from 'vue'
import Router from 'vue-router'
import entry from '../components/Entry.vue'
import contacts from '../components/Contacts.vue'
import contactView from '../components/ContactView.vue'
import empty from '../components/EmptyRouterView.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', name:'Entry', component: entry },
        { path: '/contacts', component: empty,
            children: [{
                    name: 'Contacts',
                    path: '',
                    component: contacts
                }, {
                    name: 'contactDialog',
                    path: ':id',
                    components: {
                        default: contacts,
                        dialog: contactView
                    }
                }
            ]
        }
	]
})