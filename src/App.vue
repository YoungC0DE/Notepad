<template>
  <main class="main-container">
    <router-view></router-view>
    <FooterComponent />
  </main>
  <ul class="circles">
    <li v-for="(item, index) in 10" :key="index"></li>
  </ul>
</template>

<script lang="js">
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: { FooterComponent }
}
</script>
