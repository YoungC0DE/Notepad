<template>
  <defautLayout />
  <ul class="circles">
    <li v-for="i in CIRCLES_AMOUNT" :key="i"></li>
  </ul>
</template>

<script lang="js">
import defautLayout from '@/components/layouts/default.vue'

export default {
  components: { defautLayout },
  setup() {
    const CIRCLES_AMOUNT = 10;

    return {
      CIRCLES_AMOUNT,
    }
  },
}
</script>
