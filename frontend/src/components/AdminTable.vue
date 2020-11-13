<template>
	<div class="q-pa-md">
		<div>
			<q-btn label="Add User" color="primary" @click="prompt = true" />
		</div>
		<q-dialog v-model="prompt" persistent>
			<q-card style="min-width: 350px">
				<q-card-section>
				  <div class="text-h6">Name</div>
				</q-card-section>
				<q-card-section class="q-pt-none">
				  <q-input dense v-model="newUser" autofocus />
				</q-card-section>

				<q-card-section>
				  <div class="text-h6">Email</div>
				</q-card-section>
				<q-card-section class="q-pt-none">
				  <q-input dense v-model="newEmail" />
				</q-card-section>

				<q-card-actions align="right" class="text-primary">
				  <q-btn flat label="Cancel" v-close-popup />
				  <q-btn flat label="Save" @click="saveNewUser()" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	    <q-table
	      title="Users"
	      :data="rows"
	      :columns="columns"
	      row-key="name"
	    />
  	</div>
</template>

<script>
import Users from '../services/users.js'

export default {
	data() {
	    return {
	    	prompt: false,
	    	newEmail: '',
	    	newUser: '',
			columns: [
				{
					name: 'name',
					label: 'Name',
					align: 'left',
					field: 'name',
					sortable: true
				},
				{
					name: 'email',
					label: 'Email',
					align: 'left',
					field: 'email',
					sortable: true
				},
				{
					name: 'created_at',
					label: 'Created At',
					align: 'left',
					field: 'created_at',
					sortable: true
				},
				{
					name: 'status',
					label: 'Status',
					align: 'left',
					field: 'status',
					format: (val, row) => {
						let status = ''
						switch (val) {
							case 0:
								status = 'pending'
								break
							case 1:
								status = 'accepted'
								break
							case 2:
								status = 'disabled'
								break
							default:
								status = 'pending'
						}
						return status
					},
					sortable: true
				},
				{
					name: 'signed_up_at',
					label: 'Sign Up Date',
					align: 'left',
					field: 'signed_up_at',
					format: (val, row) => {
						if (!val) {
							return 'N/A'
						}
						return val
					},
					sortable: true
				}

			],
			rows: []
		}
	},
	async mounted() {
		const users = await Users.getAllUsers()
		this.rows = users
	},
	methods: {
		async saveNewUser() {
			const user = await Users.saveNewUser(this.newUser, this.newEmail)
			console.log(user)
		}
	}
}
</script>
