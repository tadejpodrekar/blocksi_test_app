<template>
	<v-app id="app">
		<v-app-bar app color="blue" dark>
			<v-toolbar-title>Contacts App</v-toolbar-title>
		</v-app-bar>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'app',
	data: () => ({ drawer: null })
};
</script>
