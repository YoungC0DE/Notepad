<template>
    <i class="bi bi-power btn btn-danger rounded-circle btn-loggout ms-3 mb-3" title="Logout" v-on:click="Logout()"></i>
</template>

<script>
import { ROUTE_SIGNIN } from "@/router/index.js";

export default {
    methods: {
        Logout() {
            this.$router.push({ name: ROUTE_SIGNIN })
            window.localStorage.clear()
            sessionStorage.clear()
        }
    }
}
</script>