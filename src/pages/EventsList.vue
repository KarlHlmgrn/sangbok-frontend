<script setup>
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/store';
import { RouterLink } from 'vue-router';
import EventCard from '@/components/EventCard.vue';
import EventPreviewModal from '@/components/EventPreviewModal.vue';
import axios from 'axios';

const store = useMainStore();

const events = ref([]);
const todaysEvents = ref([]);
const futureEvents = ref([]);
const futureEventsModals = ref({});
const pastEvents = ref([]);

onMounted(async () => {
    // Fetches all events
    await store.fetchEvents();
    events.value = store.events;

    // Splits the event in three categories: today's, future and past events
    todaysEvents.value = Object.fromEntries(Object.entries(events.value).filter(([_, event]) => new Date().toDateString() === new Date(event.startDate).toDateString()));
    futureEvents.value = Object.fromEntries(Object.entries(events.value).filter(([_, event]) => new Date().toDateString() !== new Date(event.startDate).toDateString() && new Date().valueOf() < new Date(event.startDate).valueOf()));

    // Object for every future event that will contain its modal
    futureEventsModals.value = Object.fromEntries(Object.entries(futureEvents.value).map(([id, _]) => [id, {}]));

    pastEvents.value = Object.fromEntries(Object.entries(events.value).filter(([_, event]) => !Object.values(todaysEvents.value).includes(event) && !Object.values(futureEvents.value).includes(event)));
});

// Purely for development use
const createTestAccount = async () => {
    try {
        const res = await axios.post('/user/create', {
            username: 'futf',
            password: 'kulnästanjämt'
        });

        alert('Användare med namn: futf och lösenord: kulnästanjämt har skapats');
    } catch (e) {
        alert(e.response?.data.message || 'Oväntat fel uppstod')
    }
};
</script>

<template>
<div class="events-list">
    <div class="event-group" v-if="Object.keys(todaysEvents).length > 0">
        <span>Dagens evenemang</span>
        <template v-for="id in Object.keys(todaysEvents)">
            <RouterLink :to="`/event/${id}`">
                <EventCard :id="id" />
            </RouterLink>
        </template>
    </div>
    <div class="event-group">
        <RouterLink to="/book">
            <EventCard :id="''" />
        </RouterLink>
    </div>
    <div class="event-group" v-if="Object.keys(futureEvents).length > 0">
        <span>Kommande evenemang</span>
        <div class="event-grid">
            <template v-for="id in Object.keys(futureEvents)">
                <EventCard :id="id" @click="futureEventsModals[id].modal.showModal()" />
                <EventPreviewModal :id="id" :modalObject="futureEventsModals[id]" />
            </template>
        </div>
    </div>
    <div class="event-group" v-if="Object.keys(pastEvents).length > 0">
        <span>Tidigare evenemang</span>
        <div class="event-grid">
            <template v-for="id in Object.keys(pastEvents)">
                <RouterLink :to="`/event/${id}`">
                    <EventCard :id="id" />
                </RouterLink>
            </template>
        </div>
    </div>
    <div class="test-buttons">
        <h3>Test knappar</h3>
        <button @click="createTestAccount">Skapa test-användare</button>
        <RouterLink to="/admin/login">
            <button>Logga in</button>
        </RouterLink>
    </div>
</div>
</template>

<style scoped>
.events-list {
    width: min(100%, 30em);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    gap: 1em;
}

.event-group {
    background: rgba(0, 0, 0, 0.125);
    padding: 1em;
    width: 100%;
    border-radius: 2em;
    box-sizing: border-box;
}

.event-group span {
    display: block;
    font-size: 14pt;
    text-align: left;
    margin: 0 0 0.5em 0.5em;
    color: #292929;
}

.event-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em;
    width: 100%;
}

@media (max-width: 768px) {
    .event-grid {
        grid-template-columns: 1fr;
    }
}
</style>