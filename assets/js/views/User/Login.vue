<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div
            class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-xl mx-auto flex flex-col gap-8">
            <div class="flex flex-col items-center gap-4">
                <div class="flex items-center gap-4">
                    <LogoSvg height="70" width="40" class="dark:invert-100"/>
                </div>
                <div class="flex flex-col items-center gap-2 w-full">
                    <div
                        class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight text-center w-full">
                        Welcome Back
                    </div>
                    <div class="text-center w-full">
                        <span class="text-primary font-medium ml-1 cursor-pointer hover:text-primary-emphasis">Don't have an account?</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-6 w-full">
                <Message v-if="errors.length" severity="error" icon="pi pi-times-circle" class="mb-2">
                    {{ errors.join(', ') }}
                </Message>


                <div class="flex flex-col gap-2 w-full">
                    <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium leading-normal">Email
                        Address</label>
                    <InputText id="email1" type="text" placeholder="Email address" v-model="username"
                               @keyup.enter="login"
                               class="w-full px-3 py-2 shadow-sm rounded-lg"
                    />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium leading-normal">Password</label>
                    <InputText id="password1" type="password" placeholder="Password" v-model="password"
                               @keyup.enter="login"
                               class="w-full px-3 py-2 shadow-sm rounded-lg"/>
                </div>
                <div
                    class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0">
                    <!--div class="flex items-center gap-2">
                        <Checkbox id="rememberme1" v-model="checked1" :binary="true" />
                        <label for="rememberme1" class="text-surface-900 dark:text-surface-0 leading-normal">Remember me</label>
                    </div-->
                    <a class="text-primary font-medium cursor-pointer hover:text-primary-emphasis">Forgot your
                        password?</a>
                </div>
            </div>
            <Button label="Sign In"
                    :disabled="!isValid"
                    :loading="isLoginLoading"
                    icon="pi pi-user"
                    @click="login"
                    class="w-full py-2 rounded-lg flex justify-center items-center gap-2">
            </Button>
        </div>
    </div>
</template>
<script setup>
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import {useUserSecurityStore} from '../../store/user/security.js';
import { useToast } from 'primevue/usetoast';
import {computed, ref} from 'vue';
import LogoSvg from "../global/LogoSvg.vue";
import {storeToRefs} from "pinia";
import router from "../../router/index.js";

const toast = useToast();
const store = useUserSecurityStore();

const {isLoginLoading, errors, isAuthenticated} = storeToRefs(store);

if (isAuthenticated.value) {
    router.replace({name: 'app_home'});
}

const username = ref('');
const password = ref('');

const isValid = computed(() => username.value.length && password.value.length);

async function login() {
    if (!isValid.value) {
        return;
    }

    await store.login(username.value, password.value)
    toast.add({ severity: 'success', summary: 'Login successful.', detail: 'Welcome, you\'re now logged in!', life: 3000 });
}

</script>
