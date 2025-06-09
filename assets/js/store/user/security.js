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
        console.log(jwt);
        if (!jwt) {
            isAuthenticatedState.value = false;
            isAuthenticatedLoadingState.value = false;
            return;
        }

        const decodedJwt = jwtDecode(jwt);
        if (isTokenExpired(decodedJwt)) {
            console.log('is expired');
            // commit(UPDATE_AUTH_REQUESTED, true);
            //refresh
            await security.refreshToken();
            // commit(UPDATE_AUTH_REQUESTED, false);
            // displayLoading && commit(UPDATE_IS_LOADING, false);
            // commit(UPDATE_AUTH_STATE, {token: resp.token, refresh_token: resp.refresh_token});
            // commit(UPDATE_LOCALE_STORAGE, {token: resp.token, refresh_token: resp.refresh_token});
        }

        userState.value = {roles: decodedJwt.roles, username: decodedJwt.username};
        isAuthenticatedState.value = true;
        isAuthenticatedLoadingState.value = false;
    }

    function isTokenExpired(decodedJwt) {
        return decodedJwt.exp - 240 <= (Date.now() / 1000).toFixed(0);
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
        checkAuthInfo
    }
});
