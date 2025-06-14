import {defineStore} from 'pinia'
import {computed, ref} from 'vue';
import security from "../../api/user/security.js";
import * as Cookies from 'es-cookie';
import { jwtDecode } from "jwt-decode";
import router from "../../router/index.js";

export const useUserSecurityStore = defineStore('userSecurity', () => {

    // state
    const isAuthenticatedState = ref(false);
    const isAuthenticatedLoadingState = ref(true);
    const isLoginLoadingState = ref(false);
    const errorsState = ref([]);
    const userState = ref(null);

    // getter
    const isLoginLoading = computed(() => isLoginLoadingState.value);
    const isAuthenticatedLoading = computed(() => isAuthenticatedLoadingState.value);
    const isAuthenticated = computed(() => isAuthenticatedState.value);
    const errors = computed(() => errorsState.value);
    const user = computed(() => userState.value);

    async function login(login, password) {
        errorsState.value = [];
        isLoginLoadingState.value = true;
        try {
            await security.login(login, password);
            await checkAuthInfo();
            await router.replace({name: 'app_home'});
        } catch (e) {
            if (e.status === 401) {
                errorsState.value = ['Invalid login'];
            } else {
                errorsState.value = ['Unknow error. Please contact us.'];
            }
        }
        isLoginLoadingState.value = false;
    }

    async function checkAuthInfo() {
        isAuthenticatedLoadingState.value = true;
        const jwt = Cookies.get('jwt_hp');
        if (!jwt) {
            isAuthenticatedState.value = false;
            isAuthenticatedLoadingState.value = false;

            return false;
        }

        const decodedJwt = jwtDecode(jwt);
        if (isTokenExpired(decodedJwt)) {
            console.log('is expired');
            await security.refreshToken();

            return checkAuthInfo();
        }

        userState.value = {roles: decodedJwt.roles, username: decodedJwt.username};
        isAuthenticatedState.value = true;
        isAuthenticatedLoadingState.value = false;

        return true;
    }

    function isTokenExpired(decodedJwt) {
        // we refresh it if it expire in 240 seconds
        return decodedJwt.exp - 240 <= (Date.now() / 1000).toFixed(0);
    }

    async function logout() {
        await security.logout();
        await checkAuthInfo();
    }

    return {
        // state
        isAuthenticatedState,
        isLoginLoadingState,
        isAuthenticatedLoadingState,
        userState,
        errorsState,

        // getter
        isLoginLoading,
        isAuthenticatedLoading,
        isAuthenticated,
        errors,
        user,

        // actions
        login,
        checkAuthInfo,
        logout
    }
});
