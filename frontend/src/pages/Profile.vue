<template>
	<div class="q-pa-md">
		<div v-if="status == 0">
			<p>Register for {{ email }}</p>
			<q-input v-model="name" label="Name" stack-label />
			<q-input v-model="password" type="password" stack-label />
			<q-btn color="primary" label="Save" @click="saveProfile()" />
		</div>
		<div v-if="status == 1">
			<p>You have already signed up.</p>
		</div>
		<div v-if="status == 2">
			<p>Invalid invite.</p>
		</div>
	</div>
</template>

<script>
import Users from '../services/users.js'

export default {
	data () {
		return {
			name: '',
			password: '',
			email: '',
			invite: '',
			status: 2
		}
	},
	async mounted() {
		const query = this.$route.query
		const user = await Users.getInvite(query.invite)
		this.name = user.name
		this.invite = query.invite
		this.email = user.email
		this.status = user.status
	},
	methods: {
		async saveProfile() {
			const user = await Users.saveProfile({
					invite: this.invite,
					email: this.email,
					name: this.name,
					password: this.password
				})
			console.log(user)
		}
	}
}
</script>
