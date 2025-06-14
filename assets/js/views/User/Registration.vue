<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div v-if="isRegistered" class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-xl mx-auto flex flex-col gap-8">
            <div class="flex flex-col items-center gap-2 w-full">
                <div
                    class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight text-center w-full">
                    You're almost in!
                </div>
                <div class="text-center w-full">
                    <span class="text-primary font-medium ml-1 cursor-pointer hover:text-primary-emphasis">Still one step to do</span>
                </div>
            </div>
            <div class="flex flex-col gap-6 w-full">
                <Message size="large" icon="pi pi-envelope">
                    Check your email (including spam) to confirm your address and activate your account.
                </Message>
            </div>
        </div>
        <div v-else
            class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-xl mx-auto flex flex-col gap-8">
            <div class="flex flex-col items-center gap-4">
                <div class="flex flex-col items-center gap-2 w-full">
                    <div
                        class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight text-center w-full">
                        Create your account
                    </div>
                    <div class="text-center w-full">
                        <span class="text-primary font-medium ml-1 cursor-pointer hover:text-primary-emphasis">It's free</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-6 w-full">

                <Message v-if="errors.length" severity="error" icon="pi pi-times-circle" class="mb-2">
                    {{ errors.join(', ') }}
                </Message>

                <div class="flex flex-col gap-2 w-full">
                    <label for="email" class="text-surface-900 dark:text-surface-0 font-medium leading-normal">
                        Email Address
                    </label>
                    <InputText id="email" type="text" placeholder="Email address" v-model="email"
                               @keyup.enter="register"
                               class="w-full px-3 py-2 shadow-sm rounded-lg"
                    />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="username" class="text-surface-900 dark:text-surface-0 font-medium leading-normal">
                        Username
                    </label>
                    <InputText id="username" type="text" placeholder="Email address" v-model="username"
                               @keyup.enter="register"
                               class="w-full px-3 py-2 shadow-sm rounded-lg"
                    />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="password" class="text-surface-900 dark:text-surface-0 font-medium leading-normal">Password</label>

                    <Password v-model="password" toggle-mask
                              input-class="w-full px-3 py-2 shadow-sm rounded-lg">
                        <template #header>
                            <div class="font-semibold text-xm mb-4">Pick a password</div>
                        </template>
                    </Password>
                </div>
            </div>
            <Button label="Register"
                    :disabled="!isValid"
                    :loading="isRegistrationSentLoading"
                    icon="pi pi-user"
                    @click="register"
                    class="w-full py-2 rounded-lg flex justify-center items-center gap-2">
            </Button>
        </div>
    </div>
</template>

<script setup>
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import {useUserSecurityStore} from '../../store/user/security.js';
import { useToast } from 'primevue/usetoast';
import {computed, ref} from 'vue';
import {storeToRefs} from "pinia";
import router from "../../router/index.js";
import {useUserRegistrationStore} from "../../store/user/registration.js";

const toast = useToast();
const userSecurity = useUserSecurityStore();
const userRegistration = useUserRegistrationStore();

const {isAuthenticated} = storeToRefs(userSecurity);
const {errors, isRegistrationSentLoading, isRegistered} = storeToRefs(userRegistration);

if (isAuthenticated.value) {
    router.replace({name: 'app_home'});
}

const email = ref('');
const username = ref('');
const password = ref('');

const isValid = computed(() => username.value.length && email.value.length && password.value.length > 5);

async function register() {
    if (!isValid.value) {
        return;
    }

    await userRegistration.register(username.value, email.value, password.value)
}

</script>
