<template>
    <button type="button" class="btn btn-danger rounded-circle btn-loggout ms-3 mb-3" title="Logout" v-on:click="Logout()">
        <i class="bi bi-power"></i>
    </button>
</template>

<script>
export default {
    methods: {
        Logout() {
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>