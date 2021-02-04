<template>
	<v-app id="app">
		<v-app-bar app color="primary" dark>
			<v-toolbar-title>Contacts App</v-toolbar-title>
		</v-app-bar>
		<v-main>
			<router-view></router-view>
			<router-view name="dialog"></router-view>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'app',
	data: () => ({ drawer: null })
};
</script>
