<template>
    <div class="relative min-h-[50rem] bg-surface-50 dark:bg-surface-950">
        <Menu/>
        <router-view/>
    </div>
    <Toast position="bottom-left"/>
</template>

<script setup>
import Menu from './views/global/Menu.vue';
import {useUserSecurityStore} from "./store/user/security.js";
import axios from "axios";
import {useRouter, useRoute} from 'vue-router'
import {storeToRefs} from "pinia";

const router = useRouter()
const route = useRoute()

const userSecurityStore = useUserSecurityStore();

const {isAuthenticated} = storeToRefs(userSecurityStore);

userSecurityStore.checkAuthInfo();

// check before each route if auth required and check if user is auth

axios.interceptors.request.use(async function (config) {
    const url = config.url;
    if (!url.includes('login') && !url.includes('refresh') && !url.includes('registration')) {
        await userSecurityStore.checkAuthInfo();

        if (!isAuthenticated.value && route.meta.isAuthRequired) {
            await router.replace({name: 'app_home'});
        }
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

</script>
