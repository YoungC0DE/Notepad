<template>
  <div class="container-home">
    <h1 class="text-white">TASKLIST</h1>
    <HeaderComponent />
    <TableComponent />
  </div>
  <LogoutButton />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import TableComponent from '@/components/TableComponent.vue'

export default {
  components: { HeaderComponent, LogoutButton, TableComponent },
}
</script>
