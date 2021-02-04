<template>
	<v-dialog v-model="dialog" max-width="500px" persistent>
		<v-card class="px-4">
			<v-card-title>
				Edit user
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
				<v-btn color="red" text @click="deleteContact()">
					Delete
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn text color="primary" @click="close()">
					Cancel
				</v-btn>
				<v-btn text color="primary" @click="updateContact()">
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
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
		this.getContact()
	},
	methods: {
		close () {
			this.$router.push({name: 'Contacts'})
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
			axios.delete('/contacts/'+this.$route.params.id, {
				headers:{'x-access-token':localStorage.getItem('token')}
			})
			.then(response => (
				console.log(response),
				this.contact = response.data.contact
			))
			.catch(err => (
				console.log(err.message)
			)),
			this.close()
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
					console.log(response)

				))
				.catch(err => (
					console.log(err.message)
				)),
				this.close()
			}
		}
	},
	data: () => ({
		valid: true,
		dialog: true,
		contact: {},
		username: "",
		email: "",
		firstName: "",
		lastName: "",
		phoneNum: "",
		rules: {
			emailRule: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
			required: value => !!value || "Required."
		}
	}),
};
</script>