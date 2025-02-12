<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/authStore';

const auth = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const logInError = ref(false);

const submit = async (e) => {
    e.preventDefault();

    logInError.value = !(await auth.login(username.value, password.value, router));
};
</script>

<template>
<div class="login">
    <form class="login-form" @submit="submit" :class="{error: logInError}">
        <div>
            <label for="username">Användarnamn</label>
            <input type="text" id="username" v-model="username" @keydown="logInError = false">
        </div>
        <div>
            <label for="password">Lösenord</label>
            <input type="password" id="password" v-model="password" @keydown="logInError = false">
        </div>
        <span v-if="logInError" class="error-message">Felaktigt användarnamn eller lösenord</span>
        <div class="submit-container">
            <button type="submit" class="submit-button">Logga in</button>
        </div>
    </form>
</div>
</template>

<style scoped>
.login {
    width: min(30em, 100%);
    box-sizing: border-box;
    height: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-form {
    border-radius: 0.75em;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    padding: 1em;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 0.5em;
}

.login-form.error input {
    border-color: var(--futf-error);
    outline-color: var(--futf-error);
}

.login-form label {
    display: block;
}

.error-message {
    color: var(--futf-error);
    font-size: 10pt;
    margin-top: 0.5em;
}

.submit-container {
    width: 100%;
    margin-top: 0.5em;
    padding-top: 1em;
    border-top: 1px solid #ccc;
}

.submit-button {
    width: 100%;
}
</style>