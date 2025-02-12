<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/authStore';
import axios from 'axios';
import { onMounted } from 'vue';

const auth = useAuthStore();
const router = useRouter();

// Creates a respone interceptor to handle if the user receives a 401 status code
// That means that the user has created an unauthenticated request while trying to
// access protected material, redirects the user to the log in page
axios.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  if (error.response.status === 401) {
    // Double checks if the user is unauthenticated
    const authenticated = await auth.checkAuth();
    if (authenticated) return Promise.reject(error);

    auth.logout();
    router.push('/admin/login');
  }
  return Promise.reject(error);
});

// Variable to see if the authentication check yet has been done
let authCheched = false;

// Protects the admin pages from users that are not authenticated
// Due to that every admin page makes a request to a protected resource we can
// lazily check the user's authenticated status here
router.beforeEach(async (to, from, next) => {
  if (!to.path.startsWith('/admin') && to.path !== '/admin/login') {
    return next();
  } else if (to.path === '/admin/login') {
    if (auth.loggedIn) return next('/admin');
    return next();
  }

  // Waits for the authentication check to be done,
  // only done on first launch of page
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (authCheched) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });

  if (auth.loggedIn) return next();

  next('/admin/login');
});

onMounted(async () => {
  // Checks the authentication status of user to be able to update loggedIn state
  // on first launch of site
  await auth.checkAuth();
  authCheched = true;
})
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
