<script setup>
import { computed, onMounted } from 'vue';
import { useMainStore } from '@/store';
import { useAuthStore } from '@/authStore';
import AdminEventCard from '@/components/AdminEventCard.vue';
import { RouterLink, useRouter } from 'vue-router';

const store = useMainStore();
const auth = useAuthStore();
const router = useRouter();

onMounted(async () => {
    // Fetches all events, even those with visibility set to false
    await store.fetchEvents(false);
});

// Groups the events in future (including today's) and past events
const futureEvents = computed(() => Object.fromEntries(Object.entries(store.events).filter(([_, event]) => new Date().valueOf() < new Date(event.endDate).valueOf())));
const pastEvents = computed(() => Object.fromEntries(Object.entries(store.events).filter(([_, event]) => !Object.values(futureEvents.value).includes(event))));
</script>

<template>
<div class="admin">
    <div class="admin-header">
        <h3>Sångbok Adminpanel</h3>
        <div>
            <RouterLink to="/admin/edit/new">
                <button>Lägg till evenemang</button>
            </RouterLink>
            <button @click="auth.logout(router)" class="sign-out-button">Logga ut</button>
        </div>
    </div>
    <div class="events">
        <p class="events-title">Kommande evenemang</p>
        <div class="event-grid">
            <AdminEventCard v-for="id in Object.keys(futureEvents)" :id="id" />
        </div>
    </div>
    <div class="events">
        <p class="events-title">Tidigare evenemang</p>
        <div class="event-grid">
            <AdminEventCard v-for="id in Object.keys(pastEvents)" :id="id" />
        </div>
    </div>
</div>
</template>

<style scoped>
.admin {
    width: 100%;
    max-width: 1280px;
    text-align: left;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 1em 0.5em 1.5em;
    border: 2px solid var(--futf-color-200);
    border-radius: 1em;
}

.admin-header button {
    background: var(--futf-color-50);
}

.sign-out-button {
    margin-left: 0.5em;
}

.event-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 0.5em;
}
</style>