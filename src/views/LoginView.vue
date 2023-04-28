<template>
    <div class="container-login">
        <h1 class="text-white mb-4">Login</h1>
        <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="-" v-model="email" v-on:keypress.enter="Login">
            <label for="email" class="text-white">Email</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="-" v-model="password" v-on:keypress.enter="Login">
            <label for="password" class="text-white">Password</label>
        </div>
        <button type="button" class="btn btn-secondary mt-4" disabled v-if="awaitLogin">
            <div class="spinner-border" style="width: 2rem; height: 2rem; border-width: 2px;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>
        <button type="button" class="btn btn-primary mt-4" v-on:click="Login()" v-else>Login</button>
        <RouterLink to="/register" class="btn btn-secondary">Create account</RouterLink>
    </div>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";

export default {
    inject: ['db'],
    data() {
        return {
            email: '',
            password: '',
            awaitLogin: false
        }
    },
    methods: {
        Validate() {
            if (!this.email || !this.password) {
                this.$toast.error('It is necessary to fill in all fields', {
                    position: "top-right"
                })
                return false
            }
            return true
        },
        async Login() {
            if (!this.Validate()) {
                return false
            }

            this.awaitLogin = true;

            const tableUsers = collection(this.db, "users");
            const dataUsers = query(tableUsers, where("email", "==", this.email.toLowerCase()), where("password", "==", btoa(this.password)));
            const querySnapshot = await getDocs(dataUsers);

            if (querySnapshot.empty) {
                this.$toast.error('Login incorrect', {
                    position: "top-right"
                })
                this.awaitLogin = false;
                return
            }

            const doc = querySnapshot.docs[0];

            const data = {
                name: doc.data().name,
                email: doc.data().email.toLowerCase(),
                id: doc.data().ID
            }
            window.localStorage.setItem(btoa('userdata'), btoa(JSON.stringify(data)));

            this.$toast.success(`Welcome Sr(a). ${data.name}`, {
                position: "top-right"
            })

            this.$router.push({ name: 'Home' })
        }
    },
    mounted() {
        if (window.localStorage.getItem(btoa('userdata'))) {
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>