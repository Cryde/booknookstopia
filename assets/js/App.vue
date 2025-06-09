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

const userSecurityStore = useUserSecurityStore();

userSecurityStore.checkAuthInfo();
</script>
