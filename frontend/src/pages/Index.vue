<template>
  <q-page class="flex flex-center">
    <AdminTable />
  </q-page>
</template>

<script>
import AdminTable from 'components/AdminTable.vue'

export default {
  name: 'PageIndex',
  components: { AdminTable }
}

</script>
