<template>
    <div class="container-login">
        <h1 class="text-white mb-4">Register</h1>
        <div class="form-floating">
            <input type="text" class="form-control" id="name" v-model="name" placeholder="-" required>
            <label for="name" class="text-white">Name</label>
        </div>
        <div class="form-floating">
            <input type="email" class="form-control" id="email" v-model="email" placeholder="-" required>
            <label for="email" class="text-white">Email</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="-" required>
            <label for="password" class="text-white">Password</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="confirm_password" v-model="confirm_password" placeholder="-" required>
            <label for="confirm_password" class="text-white">Confirm your Password</label>
        </div>
        <button type="button" class="btn btn-primary mt-4" v-on:click="Register">Register</button>
        <RouterLink to="/" class="btn btn-secondary">Login</RouterLink>
    </div>
</template>

<script lang="js">
import axios from "axios";

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    },
    methods: {
        Validate() {
            if (!this.name || !this.email || !this.password) {
                this.$toast.error('It is necessary to fill in all fields', {
                    position: "top-right"
                })
                return false
            }
            if (this.confirm_password != this.password) {
                this.$toast.error('Passwords not match', {
                    position: "top-right"
                })
                return false
            }

            return true
        },
        Register() {
            if (!this.Validate()) {
                return false
            }
            return
            this.$toast.error('This e-mail already is used', {
                position: "top-right"
            })
            this.$toast.success('Account created with success', {
                position: "top-right"
            })
            this.$router.push({ name: 'Login' })
            return
        }
    }
}
</script>