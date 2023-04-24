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
        <button type="button" class="btn btn-secondary mt-4" disabled v-if="awaitRegister">
            <div class="spinner-border" style="width: 2rem; height: 2rem; border-width: 2px;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>
        <button v-else type="button" class="btn btn-primary mt-4" v-on:click="Register">Register</button>
        <RouterLink to="/" class="btn btn-secondary">Login</RouterLink>
    </div>
</template>

<script lang="js">
import { collection, query, where, getDocs, addDoc, orderBy, limit } from "firebase/firestore";

export default {
    inject: ['db'],
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            awaitRegister: false
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
        async Register() {
            if (!this.Validate()) {
                return false
            }
            
            this.awaitRegister = true

            const tableUsers = collection(this.db, "users");

            const dataUsers = query(tableUsers, where("email", "==", this.email.toLowerCase()));
            const querySnapshot = await getDocs(dataUsers);

            if (!querySnapshot.empty) {
                this.awaitRegister = false
                this.$toast.error('This e-mail already is used', {
                    position: "top-right"
                })
                return
            }

            // Recover the last ID used in collection 'users'
            const lastUser = await getDocs(query(tableUsers, orderBy("ID", "desc"), limit(1)));
            let lastID = 0;
            if (!lastUser.empty) {
                const lastData = lastUser.docs[0].data();
                lastID = lastData.ID;
            }

            // Increment the last id and add a new user
            const newID = lastID + 1;
            const newUser = {
                name: this.name,
                email: this.email.toLowerCase(),
                password: btoa(this.password),
                ID: newID
            };
            await addDoc(tableUsers, newUser);

            this.$toast.success('Account created successfully, proceed with login!', {
                position: "top-right"
            })
            this.$router.push({ name: 'Login' })
            return
        }
    }
}
</script>
