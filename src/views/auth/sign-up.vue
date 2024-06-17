<template>
    <VForm class="container-auth" id="kt_login_signin_form" @submit="signUp" :validation-schema="SIGNUP">
        <h1>Sign Up</h1>
        <div class="auth-inputs">
            <div class="fv-row">
                <div class="d-flex flex-stack">
                    <label class="form-label fw-bold fs-6 m-0">Your Name</label>
                </div>
                <Field class="form-control form-control-solid" type="text" name="name" tabindex="1" placeholder="Ex: John"/>
                <div class="fv-plugins-message-container">
                    <div class="fv-help-block text-danger">
                        <ErrorMessage name="name" />
                    </div>
                </div>
            </div>
            <div class="fv-row">
                <div class="d-flex flex-stack">
                    <label class="form-label fw-bold fs-6 m-0">E-mail</label>
                </div>
                <Field class="form-control form-control-solid" type="email" name="email" tabindex="2" placeholder="example@email.com"/>
                <div class="fv-plugins-message-container">
                    <div class="fv-help-block text-danger">
                        <ErrorMessage name="email" />
                    </div>
                </div>
            </div>
            <div class="fv-row">
                <div class="d-flex flex-stack">
                    <label class="form-label fw-bold fs-6 m-0">Password</label>
                </div>

                <Field class="form-control form-control-solid" type="password" name="password" tabindex="3" placeholder="******"/>
                <div class="fv-plugins-message-container">
                    <div class="fv-help-block text-danger">
                        <ErrorMessage name="password" />
                    </div>
                </div>
            </div>
            <div class="fv-row">
                <div class="d-flex flex-stack">
                    <label class="form-label fw-bold fs-6 m-0">Confirm Password</label>
                </div>

                <Field class="form-control form-control-solid" type="password" name="password_confirm" tabindex="4" placeholder="*******"/>
                <div class="fv-plugins-message-container">
                    <div class="fv-help-block text-danger">
                        <ErrorMessage name="password_confirm" />
                    </div>
                </div>
            </div>
        </div>
        <div class="auth-actions">
            <button type="button" class="btn btn-secondary" disabled v-if="awaitRequest">
                <div class="spinner-border" style="width: 2rem; height: 2rem; border-width: 2px;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </button>
            <button type="submit" class="btn btn-primary" v-else>Create account</button>
            <RouterLink :to="{ name: ROUTE_SIGNIN }" class="btn btn-secondary">Sign In</RouterLink>
        </div>
    </VForm>
</template>

<script lang="js">
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { ROUTE_SIGNIN, ROUTE_DASHBOARD } from "@/router/index.js";
import { SIGNUP } from "@/helpers/schemas";
import { useAuthStore } from "@/stores/auth.js";
import ToastHelper from '@/config/ToastHelper';

export default {
    components: {
        VForm,
        ErrorMessage,
        Field,
    },
    setup() {
        const store = useAuthStore();

        return {
            ROUTE_SIGNIN,
            SIGNUP,
            store,
            ToastHelper
        }
    },
    data() {
        return {
            awaitRequest: false
        }
    },
    methods: {
        async signUp(values) {
            this.awaitRequest = true;

            await this.store.signUp(values);
            const { error, user } = this.store;

            this.awaitRequest = false;

            if (error.length > 0) {
                ToastHelper.error(error[0])
                return;
            }

            ToastHelper.success(`Welcome Sr(a). ${user.data.name}`)

            this.$router.push({ name: ROUTE_DASHBOARD });
        }
    }
}
</script>
