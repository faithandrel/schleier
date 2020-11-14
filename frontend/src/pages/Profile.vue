<template>
	<div class="q-pa-md">
		<div v-if="status == 0">
			<p>Register for {{ email }}</p>
			<div v-if="formErrors.length > 0">
				<p class="text-red" v-for="(item, index) in formErrors" v-bind:key="index">
					{{ item }}
				</p>
			</div>
			<q-input v-model="name" label="Name" stack-label />
			<q-input v-model="password" label="Password" type="password" stack-label />
		    <q-file v-model="avatar" label="Avatar" accept=".jpg, image/*">
		        <template v-slot:prepend>
		        	<q-icon name="attach_file" />
		        </template>
		    </q-file>
		    <div class="q-pa-sm">
				<q-btn color="primary" label="Save" @click="saveProfile()" />
			</div>
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
			status: 2,
			formErrors: []
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
			this.formErrors = []

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
				this.status = 1
			} catch (error) {
				if (error.response.status === 422 && error.response.data.errors) {
					for (const i in error.response.data.errors) {
						const fieldErrors = error.response.data.errors[i]
						for (const j in fieldErrors) {
							this.formErrors.push(fieldErrors[j])
						}
					}
				}
			}
		}
	}
}
</script>
