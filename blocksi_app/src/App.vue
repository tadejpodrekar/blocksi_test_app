<template>
	<v-app>
		<v-main>
			<Entry/>
		</v-main>
	</v-app>
</template>

<script>
import Entry from './components/Entry';

export default {
	name: 'App',
	components: {
		Entry
	},
	data: () => ({
	}),
};
</script>
