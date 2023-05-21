<template>
  <div class="container-home">
    <h1 class="text-white main-title">TASK-LIST</h1>
    <TableComponent />
  </div>
  <LogoutButton />
</template>

<script>
import LogoutButton from '@/components/LogoutButton.vue'
import TableComponent from '@/components/TableComponent.vue'

export default {
  components: { LogoutButton, TableComponent },
}
</script>
