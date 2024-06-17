<template>
  <div class="container-home">
    <h1 class="text-white main-title">NOTEPAD</h1>
    <TableComponent />
    <LogoutButton />
  </div>
</template>

<script>
import LogoutButton from '@/components/LogoutButton.vue'
import TableComponent from '@/components/dashboard/Table.vue'

export default {
  components: { LogoutButton, TableComponent },
}
</script>
