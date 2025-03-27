import authApi from '@/api/auth'
// import { resolve } from 'core-js/fn/promise'

const state = {
    isSubmitting: false,
    currentUser: null, 
    validationErrors: null,
    isLoggedIn: null
}

const mutations = {
    registerStart(state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    registerSuccess(state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    registerFailure(state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

const actions = {
    register(context, credentials) {
        return new Promise(resolve => {
            context.commit('registerStart')
            authApi
                .register(credentials)
                .then(response => {
                    // context.commit('registerSuccess', response.data.user)
                    resolve(response.data.user)
                })
                .catch(result => {
                    // context.commit('registerFailure', result.response.data.errors)
                    console.log(result);                    
                });
        });
        // setTimeout(() => {
        //     context.commit('registerStart')
        // }, 1000);
    }
}

export default {
    state,
    mutations,
    actions
}