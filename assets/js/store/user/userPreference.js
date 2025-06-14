import {defineStore} from 'pinia'
import {computed, ref} from 'vue';
import * as Cookies from "es-cookie";

export const useUserPreferenceStore = defineStore('userPreference', () => {

    // state
    const isDarkModeOnState = ref(getDarkModeCookieValue());

    const isDarkModeOn = computed(() => isDarkModeOnState.value);

    function initDarkMode() {
        if (isDarkModeOnState.value) {
            document.documentElement.classList.add('app-mode');
        } else {
            document.documentElement.classList.remove('app-mode');
        }
    }
    async function toggleDarkMode() {
        isDarkModeOnState.value = !isDarkModeOnState.value;

        Cookies.set('is_dark_mode', isDarkModeOnState.value ? 1 : 0);

        if (isDarkModeOnState.value) {
            document.documentElement.classList.add('app-mode');
        } else {
            document.documentElement.classList.remove('app-mode');
        }
    }

    function getDarkModeCookieValue() {
        return !!Cookies.get('is_dark_mode');
    }

    return {
        // state
        isDarkModeOnState,

        isDarkModeOn,
        // action
        toggleDarkMode,
        initDarkMode
    }
});
