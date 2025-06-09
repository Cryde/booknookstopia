<template>

        <nav class="relative px-6 sm:px-8 lg:px-20 py-4 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <LogoSvg height="50" width="30" class="dark:invert-100"/>
                    <div class="text-surface-900 dark:text-surface-0 font-semibold text-lg leading-normal">Booknooktopia</div>
                </div>
                <a
                    v-styleclass="{
                        selector: '#navbar-7',
                        enterFromClass: 'hidden',
                        enterActiveClass: 'animate-fadein',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'animate-fadeout',
                        hideOnOutsideClick: true
                    }"
                    class="cursor-pointer block lg:hidden text-surface-700 dark:text-surface-100"
                >
                    <i class="pi pi-bars !text-xl !leading-normal" />
                </a>
                <div class="flex items-center relative lg:flex" v-if="!isAuthenticatedLoading"
                :class="{'gap-2' : !isAuthenticated, 'gap-8' : isAuthenticated}"
                >
                    <Button @click="toggleDarkMode()" class="h-8" icon="pi pi-sun"/>
                    <template v-if="isAuthenticated">

                        <a class="cursor-pointer">
                            <i class="pi pi-cog !text-xl !leading-normal text-surface-600 dark:text-surface-300" />
                        </a>
                        <Avatar v-if="user" :label="user.username.split('')[0]" class="cursor-pointer" shape="circle" />
                        <a class="cursor-pointer">
                            <i class="pi pi-sign-out !text-xl !leading-normal text-surface-600 dark:text-surface-300" />
                        </a>
                    </template>
                    <template v-else>
                        <Button raised severity="secondary" v-slot="slotProps" asChild>
                            <RouterLink :to="{name: 'app_register'}" :class="slotProps.class">
                                <i class="pi pi-user-plus"></i>
                                Register
                            </RouterLink>
                        </Button>
                        <Button raised severity="info" v-slot="slotProps" asChild>
                            <RouterLink :to="{name: 'app_login'}" :class="slotProps.class">
                                <i class="pi pi-sign-in"></i>
                                Login
                            </RouterLink>
                        </Button>
                    </template>
                </div>
            </div>
            <div class="h-px bg-surface-200 dark:bg-surface-700 mt-4 hidden lg:block" />
            <div
                id="navbar-7"
                class="lg:static absolute top-full left-0 px-6 sm:px-10 lg:px-0 w-full lg:block hidden py-4 lg:pt-4 lg:pb-0 bg-surface-0 dark:bg-surface-900 shadow-sm lg:shadow-none"
            >
                <ul class="flex lg:flex-row flex-col lg:items-center gap-4">
                    <li v-for="(item, index) of navs" :key="index">
                        <RouterLink :to="{name: item.to}"
                            :class="[
                                'flex items-center gap-2 px-2.5 py-2 rounded-border cursor-pointer transition-colors duration-150 border',
                                selectedNav === item.label
                                    ? 'bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700'
                                    : 'bg-surface-0 dark:bg-surface-900 border-transparent hover:bg-surface-50 dark:hover:bg-surface-800 hover:border-surface-200 dark:hover:border-surface-700'
                            ]"
                            @click="selectedNav = item.label"
                        >
                            <i :class="[`${item.icon} !text-base !leading-normal`, selectedNav === item.label ? 'text-surface-900 dark:text-surface-0' : 'text-surface-500 dark:text-surface-400']" />
                            <span :class="['font-medium text-base leading-normal', selectedNav === item.label ? 'text-surface-900 dark:text-surface-0' : 'text-surface-600 dark:text-surface-300']">{{ item.label }}</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </nav>

</template>
<script setup>
import { ref } from 'vue';
import LogoSvg from "./LogoSvg.vue";
import {useUserSecurityStore} from "../../store/user/security.js";
import {storeToRefs} from "pinia";

const userSecurityStore = useUserSecurityStore();

const {isAuthenticatedLoading, isAuthenticated, user} = storeToRefs(userSecurityStore);

console.log(user.username);

const navs = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        to: 'app_home'
    },
    {
        label: 'Manual kits',
        icon: 'pi pi-book',
        to: 'app_manual_kits'
    },
]);

const selectedNav = ref('Home');

function toggleDarkMode() {
    document.documentElement.classList.toggle('app-mode');
}
</script>
