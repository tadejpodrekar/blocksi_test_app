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
						<v-list-item-title>{{ user }}</v-list-item-title>
						<v-list-item-subtitle>Logged In</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</template>
			<v-divider></v-divider>
			<v-list dense>
				<v-list-item @click="dialog=!dialog, action='Add'">
					<v-list-item-icon>
						<v-icon>mdi-account-multiple-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Add contact</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click="exit">
					<v-list-item-icon>
						<v-icon>mdi-exit-to-app</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-container>
			<v-row>
				<v-col v-for="cont in contacts" :key="cont.firstName" cols="4">
					<v-card class="mx-auto" max-width="344" outlined>
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-title class="headline mb-1">
									{{ cont.username }}
								</v-list-item-title>
								<v-list-item-subtitle>
									{{ cont.firstName }} {{ cont.lastName }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-card-actions>
							<v-btn outlined rounded text @click="dialog = !dialog, action = 'Edit'">
								Edit
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<v-dialog v-model="dialog" max-width="500px" persistent>
			<v-card class="px-4">
				<v-card-title>
					{{ action }} user
				</v-card-title>
				<v-card-text>
					<v-form ref="contactForm" v-model="valid" lazy-validation>
						<v-row>
							<v-col cols="12">
								<v-text-field v-model="username" :rules="[rules.required]" label="Username" prepend-icon="mdi-account-circle" required></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field v-model="email" :rule="[rules.required, rules.emailRule]" label="E-mail" prepend-icon="mdi-email" required></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="6">
								<v-text-field v-model="firstName" label="First Name" maxlength="20" prepend-icon="mdi-account-circle"></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="6">
								<v-text-field v-model="lastName" label="Last Name" maxlength="20"></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field v-model="phoneNum" label="Phone number" prepend-icon="mdi-phone"></v-text-field>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text color="primary" @click="dialog=!dialog, action='Edit',clear()">
						Cancel
					</v-btn>
					<v-btn text color="primary" @click="validate(), action='Add',clear()">
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
        </v-dialog>
	</div>
</template>

<style>

</style>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
	name: 'Contacts',
	mounted () {
		axios.get('/contacts', {headers:{'x-access-token':localStorage.getItem('token')}})
			.then(response => (
				console.log(response),
				this.contacts = response.data.contacts,
				this.user = response.data.username
			))
			.catch(err => (
				console.log(err.message),
				this.$router.push({name:'Entry'})
			))
	},
	methods: {
		validate() {
			console.log('tester')
			if(this.$refs.contactForm.validate()) {
				console.log('valid')
				this.dialog=false
			}
		},
		exit() {
			localStorage.clear()
			this.$router.push({name:'Entry'})
		},
		clear () {
			this.firstName = ''
			this.lastName = ''
			this.username = ''
			this.email = ''
			this.phoneNumber = ''
		}
	},
	data: () => ({
		action: "Add",
		valid: true,
		dialog: false,
		mini: true,
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		phoneNum: "",
		contacts: [],
		user: "",
        items: [
          { title: 'Contacts', icon: 'mdi-home-city' },
          { title: 'Add contact', icon: 'mdi-account' },
          { title: 'Logout', icon: 'mdi-account-group-outline' }
		],
		rules: {
			emailRule: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
			required: value => !!value || "Required."
		}
	}),
};
</script>