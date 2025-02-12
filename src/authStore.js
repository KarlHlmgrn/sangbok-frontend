import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loggedIn: false
    }),
    actions: {
        async login(username, password, router) {
            // Logs the user in, the access token is stored in a cookie and thus we don't
            // need to handle it in the store
            try {
                const res = await axios.post('/user/login', { username, password })
                if (!res.data.success) {
                    return false
                }

                // State used for lazy authentication checks
                this.loggedIn = true

                // Redirects the user to the admin panel on success
                if (router) {
                    router.push('/admin')
                }
                return true
            } catch (e) {
                return false
            }
        },
        async createUser(username, password) {
            // try {
            //     const res = await axios.post('/user/create', { username, password })
            //     this.token = res.data.token
            // } catch (e) {
            //     console.error(e)
            // }
        },
        async logout(router) {
            // Logs the user out, the server will clear the access cookie
            const res = await axios.post('/user/logout')

            if (!res.data.success) {
                return
            }

            this.loggedIn = false

            // Redirects the user to the main page
            if (router) {
                router.push('/')
            }
        },
        async checkAuth() {
            // Checks the user's authentication status with the server
            const res = await axios.get('/user/check')

            if (!res.data.success) {
                this.loggedIn = false
                return false
            }

            this.loggedIn = true
            return true
        }
    }
})

// Used for hot module replacement (HMR) during development
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}