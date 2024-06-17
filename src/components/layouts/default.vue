<template>
    <router-view></router-view>
    <FooterComponent />
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';

export default {
    name: 'defautLayout',
    components: { FooterComponent }
}
</script>