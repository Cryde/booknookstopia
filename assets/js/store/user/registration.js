import {defineStore} from 'pinia'
import {computed, ref} from 'vue';
import registerApi from "../../api/user/register.js";

export const useUserRegistrationStore = defineStore('userRegistration', () => {

    // state
    const isRegistrationSentLoadingState = ref(false);
    const errorsState = ref([]);
    const isRegisteredState = ref(false);

    // getter
    const isRegistrationSentLoading = computed(() => isRegistrationSentLoadingState.value);
    const errors = computed(() => errorsState.value);
    const isRegistered = computed(() => isRegisteredState.value);

    async function register(username, email, password) {
        errorsState.value = [];
        isRegistrationSentLoadingState.value = true;
        try {
            await registerApi.register(username, email, password);
            isRegisteredState.value = true;
        } catch (e) {
            if (e.status === 422) {
                errorsState.value = e.response.data.violations.map(v => v.message);
            } else {
                errorsState.value = ['Unknow error. Please contact us'];
            }
        }
        isRegistrationSentLoadingState.value = false;
    }

    return {
        // state
        isRegistrationSentLoadingState,
        errorsState,
        isRegisteredState,

        // getter
        isRegistrationSentLoading,
        errors,
        isRegistered,

        // actions
        register
    }
});
