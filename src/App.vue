<template>
	<v-app>
		<v-navigation-drawer
			app
			v-if="drawer"
			permanent
		>
			<v-list>
				<v-list-item class="px-2">
					<v-list-item-avatar>
						<v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
					</v-list-item-avatar>
				</v-list-item>

			</v-list>

			<v-divider></v-divider>

			<v-list
				nav
				dense
			>
				<v-list-item link>
					<v-list-item-icon>
						<v-icon>mdi-folder</v-icon>
					</v-list-item-icon>
					<v-list-item-title>My Files</v-list-item-title>
				</v-list-item>
				<v-list-item link>
					<v-list-item-icon>
						<v-icon>mdi-account-multiple</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Shared with me</v-list-item-title>
				</v-list-item>
				<v-list-item link>
					<v-list-item-icon>
						<v-icon>mdi-star</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Starred</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title><router-link to="/" style="text-decoration: none;">時間安排工具</router-link></v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn @click="clear" color="red" icon>
				<v-icon>mdi-autorenew</v-icon>
			</v-btn>
			<v-btn to="/" icon>
				<v-icon>mdi-home</v-icon>
			</v-btn>
			<v-btn to="/cal" icon>
				<v-icon>mdi-eye</v-icon>
			</v-btn>
			<v-btn to="/config" icon>
				<v-icon>mdi-cog</v-icon>
			</v-btn>
			<v-btn to="/add" icon>
				<v-icon>mdi-plus</v-icon>
			</v-btn>

		</v-app-bar>

		<!-- Sizes your content based upon application components -->
		<v-main>

			<!-- Provides the application the proper gutter -->
			<v-container fluid>

				<!-- If using vue-router -->
				<router-view></router-view>
			</v-container>
		</v-main>

		<v-footer app>
			<!-- -->
			Version: {{version}}
		</v-footer>
	</v-app>
</template>

<style lang="scss">
</style>


<script>
export default {
	name: 'App',
	components: {},
	data: () => ({
		drawer: false,
		version: process.env.PACKAGE_VERSION
	}),
	methods:{
		clear(){
			localStorage.removeItem('vuex')
			location.reload()
		}
	},
	mounted() {

	}
}
</script>