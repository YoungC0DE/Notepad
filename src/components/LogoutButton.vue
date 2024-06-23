<template>
    <i class="bi bi-power btn btn-danger btn-loggout" title="Logout" v-on:click="logout"></i>
</template>

<script>
import { useAuthStore } from "@/stores/auth.js"

export default {
    setup() {
        const store = useAuthStore();
        const logout = () => {
            store.purgeAuth();
        }

        return {
            logout
        }
    }
}
</script>