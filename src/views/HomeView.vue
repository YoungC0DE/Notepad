<template>
  <div class="container-home">
    <h1 class="text-white">TASKLIST</h1>
    <HeaderComponent />
    <TableComponent />
    <DetailsModal />
  </div>
  <LogoutButton />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import TableComponent from '@/components/TableComponent.vue'
import DetailsModal from '@/components/Modals/DetailsModal.vue'

export default {
  components: { HeaderComponent, LogoutButton, TableComponent, DetailsModal },
  data() {
    return {
      sticky: false
    }
  },
  methods: {
    onScroll(event) {
      console.log(event.target)
      if (event.target.scrollTop > 0) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }
  }
}
</script>
