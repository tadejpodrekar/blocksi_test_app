<template>
	<v-app id="contacts">
		<v-app-bar app shrink-on-scroll>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
			<v-toolbar-title>Application</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>

		<v-main>
			<v-container>
				<v-row>
					<v-col v-for="n in 24" :key="n"	cols="4">
						<v-card height="200"></v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<style>
	
</style>

<script>
var axios = require('axios');
axios.defaults.baseURL = 'http://localhost:5000/';
export default {
	name: 'Contacts',
	computed: {
	},
	methods: {
	},
	data: () => ({
	}),
};
</script>