<template>
    <div class="container-login">
        <h1 class="text-white mb-4">Login</h1>
        <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="-" v-model="email">
            <label for="email" class="text-white">Email</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="-" v-model="password">
            <label for="password" class="text-white">Password</label>
        </div>

        <button type="button" class="btn btn-primary mt-4" v-on:click="Login()">Login</button>
        <RouterLink to="/register" class="btn btn-secondary">Create account</RouterLink>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null,
        }
    },
    methods: {
        Login() {
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>