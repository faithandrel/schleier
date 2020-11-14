<template>
	<div class="q-pa-md">
		<div>
			<q-btn label="Add User" color="primary" @click="prompt = true" />
			<q-btn label="Disable" color="red"
				   v-if="selected.length > 0 " @click="disableUsers()" />
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
	      row-key="email"
	      selection="multiple"
	      :selected.sync="selected"
	    >
	    	<template v-slot:body="props">
				<q-tr :props="props" @click="props.selected = true">
        			<q-td>
          				<q-checkbox v-model="props.selected" color="primary" />
        			</q-td>
        			<q-td v-for="col in props.cols" :key="col.name" :props="props">
        				<span v-if="col.name != 'avatar'">{{col.value}}</span>
        				<span v-else>
        					<img :src="col.value" />
        				</span>
        			</q-td>
      			</q-tr>
			</template>
		</q-table>
  	</div>
</template>

<script>
import { date } from 'quasar'
import Users from '../services/users.js'
import { BASE_URL } from '../constants.js'

export default {
	data() {
	    return {
	    	prompt: false,
	    	newEmail: '',
	    	newUser: '',
	    	selected: [],
			columns: [
				{
					name: 'avatar',
					label: 'Avatar',
					align: 'left',
					field: 'avatar',
					format: (val, row) => {
						if (!val) {
							return ''
						}
						const ext = val.substr(val.lastIndexOf('.') + 1)
						return BASE_URL + '/avatars/' + row.id + '/thumbnail.' + ext
					},
					sortable: true
				},
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
					format: (val, row) => {
						if (!val) {
							return ''
						}
						return date.formatDate(val, 'YYYY-MM-DD')
					},
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
							return ''
						}
						return date.formatDate(val, 'YYYY-MM-DD')
					},
					sortable: true
				}

			],
			rows: []
		}
	},
	async mounted() {
		this.updateUsers()
	},
	methods: {
		async updateUsers() {
			const users = await Users.getAllUsers()
			this.rows = users
		},
		async saveNewUser() {
			this.newUser = ''
			this.newEmail = ''
			await Users.saveNewUser(this.newUser, this.newEmail)
			this.updateUsers()
		},
		async disableUsers() {
			const userIds = this.selected.map((user) => user.id)
			await Users.disableUsers(userIds)
			this.updateUsers()
		}
	}
}
</script>
