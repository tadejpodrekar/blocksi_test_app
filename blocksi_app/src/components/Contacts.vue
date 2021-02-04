<template>
	<div id="contacts">
		<v-navigation-drawer absolute :mini-variant.sync="mini">
			<template v-slot:prepend>
				<v-list-item two-line>
					<v-list-item-icon>
						<v-btn icon @click.stop="mini = !mini">
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Jane Smith</v-list-item-title>
						<v-list-item-subtitle>Logged In</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</template>
			<v-divider></v-divider>
			<v-list dense>
				<v-list-item v-for="item in items" :key="item.title" link>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-container>
			<v-row>
				<v-col v-for="cont in contacts" :key="cont.firstName"	cols="3">
					<v-card class="mx-auto" max-width="344" outlined>
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-title class="headline mb-1">
									{{ cont.username }}
								</v-list-item-title>
								<v-list-item-subtitle>
									Greyhound<br>divisely hello coldly fonwderfully
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-card-actions>
							<v-btn outlined rounded text>
								Edit
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<style>

</style>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000/'
axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default {
	name: 'Contacts',
	mounted () {
		axios.get('/contacts')
			.then(response => (
				console.log(response),
				this.contacts = response.data.contacts
			))
			.catch(err => (
				console.log(err)
			))
	},
	methods: {
	},
	data: () => ({
		drawer: true,
		mini: true,
		contacts: []
	}),
};
</script>