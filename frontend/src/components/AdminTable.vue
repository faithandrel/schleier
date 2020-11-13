<template>
	<div class="q-pa-md">
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
	data () {
	    return {
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
		console.log(users)
		this.rows = users
	}
}
</script>
