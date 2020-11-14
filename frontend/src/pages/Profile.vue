<template>
	<div class="q-pa-md">
		<div v-if="status == 0">
			<p>Register for {{ email }}</p>
			<q-input v-model="name" label="Name" stack-label />
			<q-input v-model="password" label="Password" type="password" stack-label />
		    <q-file v-model="avatar" label="Avatar" accept=".jpg, image/*">
		        <template v-slot:prepend>
		        	<q-icon name="attach_file" />
		        </template>
		    </q-file>
			<q-btn color="primary" label="Save" @click="saveProfile()" />
		</div>
		<div v-if="status == 1">
			<h4>Profile</h4>
			<img :src="image" />
			<p>{{ name }}</p>
			<p>{{ email }}</p>
		</div>
		<div v-if="status == 2">
			<p>Invalid invite.</p>
		</div>
	</div>
</template>

<script>
import Users from '../services/users.js'
import { BASE_URL } from '../constants.js'

export default {
	data () {
		return {
			name: '',
			password: '',
			email: '',
			avatar: null,
			image: '',
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
		if (user.avatar) {
			this.image = user.avatar
		}
	},
	methods: {
		async saveProfile() {
			try {
				await Users.saveProfile({
					invite: this.invite,
					email: this.email,
					name: this.name,
					password: this.password,
					avatar: this.avatar
				})
				if (this.avatar) {
					const image = await Users.saveAvatar(this.avatar, this.email)
					this.image = BASE_URL + '/' + image
				}
			} catch (error) {
				console.log(error.status)
			}
			this.status = 1
		}
	}
}
</script>
