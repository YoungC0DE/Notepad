<template>
    <div class="container-login">
        <h1 class="text-white mb-4">Register</h1>
        <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="-">
            <label for="email" class="text-white">Email</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="-">
            <label for="password" class="text-white">Password</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="confirm_password" placeholder="-">
            <label for="confirm_password" class="text-white">Confirm your Password</label>
        </div>
        <button type="button" class="btn btn-primary mt-4">Register</button>
        <RouterLink to="/" class="btn btn-secondary">Login</RouterLink>
    </div>
</template>