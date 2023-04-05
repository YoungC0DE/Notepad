<template>
  <main class="main-container">
    <h1 class="text-white">TASKLIST</h1>
    <HeaderComponent />
    <router-view></router-view>
    <FooterComponent />
  </main>
</template>

<script lang="js">
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: { HeaderComponent, FooterComponent }
}
</script>
