<template>
    <VForm class="container-auth" id="kt_login_signin_form" @submit="signIn" :validation-schema="SIGNIN">
        <h1>Sign In</h1>
        <div class="auth-inputs">
            <div class="fv-row">
                <div class="d-flex flex-stack">
                    <label class="form-label fw-bold fs-6 m-0">E-mail</label>
                </div>
                <Field class="form-control form-control-solid" type="email" name="email" tabindex="1" placeholder="example@email.com" />
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

                <Field class="form-control form-control-solid" type="password" name="password" tabindex="2" placeholder="******" />
                <div class="fv-plugins-message-container">
                    <div class="fv-help-block text-danger">
                        <ErrorMessage name="password" />
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
            <button type="submit" class="btn btn-primary" v-else>Sign In</button>
            <RouterLink :to="{ name: ROUTE_SIGNUP }" class="btn btn-secondary">Create account</RouterLink>
        </div>
    </VForm>
</template>

<script>
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { ROUTE_SIGNUP, ROUTE_DASHBOARD } from "@/router/index.js";
import { SIGNIN } from "@/helpers/schemas";
import { useAuthStore } from "@/stores/auth.js";
import ToastHelper from '@/config/ToastHelper';

export default {
    name: 'sign-in',
    components: {
        VForm,
        ErrorMessage,
        Field,
    },
    data() {
        return {
            awaitRequest: false
        }
    },
    setup() {
        const store = useAuthStore();

        return {
            ROUTE_SIGNUP,
            SIGNIN,
            store,
        }
    },
    methods: {
        async signIn(values) {
            this.awaitRequest = true;

            await this.store.signIn(values);
            let { error, user } = this.store;

            this.awaitRequest = false;
            if (error.length > 0) {
                ToastHelper.error(error[0])
                return;
            }

            ToastHelper.success(`Welcome Sr(a). ${user.data.name}`)
            this.$router.push({ name: ROUTE_DASHBOARD });
        }
    },
}
</script>