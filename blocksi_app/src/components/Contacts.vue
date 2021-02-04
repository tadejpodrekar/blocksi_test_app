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
				<v-col v-for="cont in contacts" :key="cont._id" cols="4">
					<v-card class="mx-auto" max-width="300" outlined @click="dialog=!dialog, action='Edit', clear(), oDialog=cont._id">
						<v-list-item five-line>
							<v-list-item-content>
								<v-list-item-title class="headline mb-1">
									{{ cont.username }}
								</v-list-item-title>
								<v-list-item-subtitle>
									{{ cont.firstName }} {{ cont.lastName }}
									<br>
									{{ cont.email }}
									<br>
									{{ cont.phoneNum }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
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
					<v-btn v-if="action=='Edit'" color="red" text @click="deleteContact(), dialog=!dialog">
						Delete
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn text color="primary" @click="dialog=!dialog, oDialog='', clear()">
						Cancel
					</v-btn>
					<v-btn text color="primary" @click="validate(), clear()">
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
		this.getContacts()
	},
	methods: {
		validate() {
			console.log('tester')
			if(this.action == 'Edit'){
				console.log('edit')
				this.updateContact()
			} else if(this.action == 'Add'){
				if(this.$refs.contactForm.validate()) {
					axios.post('/contacts', {
						username:this.username,
						email:this.email,
						firstName:this.firstName,
						lastName:this.lastName,
						phoneNum:this.phoneNum
					},
					{headers:{'x-access-token':localStorage.getItem('token')}})
					.then(response => (
						console.log(response),
						this.getContacts(),
						this.dialog=false
					))
					.catch(err => (
						console.log(err.message)
					))
				}
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
			this.phoneNum = ''
		},
		getContacts () {
			console.log('getContacs')
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
		getContact () {
			axios.get('/contacts/'+this.$route.params.id, {headers:{'x-access-token':localStorage.getItem('token')}} )
			.then(response => (
				console.log(response),
				this.contact = response.data.contact
			))
			.catch(err => (
				console.log(err.message)
			))
		},
		deleteContact() {
			axios.delete('/contacts/'+this.oDialog, {
				headers:{'x-access-token':localStorage.getItem('token')}
			})
			.then(response => (
				console.log(response),
				this.contacts = this.getContacts()
			))
			.catch(err => (
				console.log(err.message)
			))
		},
		updateContact() {
			if(this.$refs.contactForm.validate()) {
				axios.put('/contacts/'+this.$route.params.id, {
						username:this.username,
						email:this.email,
						firstName:this.firstName,
						lastName:this.lastName,
						phoneNum:this.phoneNum
					},
					{headers:{'x-access-token':localStorage.getItem('token')}} )
				.then(response => (
					console.log(response),
					this.contacts = this.getContacts()
				))
				.catch(err => (
					console.log(err.message)
				))
			}
		}
	},
	computed: {
		contacts: {
			get: function () {
				return this.conts
			},
			set: function (val) {
				this.conts = val
			}
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
		user: "",
		oDialog: '',
		conts: [],
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