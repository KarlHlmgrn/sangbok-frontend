<script setup>
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/store';
import { RouterLink } from 'vue-router';

const store = useMainStore();

const props = defineProps({
  id: String
});

const event = ref({});

onMounted(async () => {
    try {
        event.value = await store.getEvent(props.id);
    } catch (e) {
        console.error(e);
    }
});
</script>

<template>
<div class="card">
    <img :src="event.imgSrc" alt="">
    <div class="card-content">
        <h3>{{ event.name }}</h3>
        <span v-if="event.startDate">{{ new Date(event.startDate).toLocaleString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }) }}</span>
        -
        <span v-if="event.endDate">{{ new Date(event.endDate).toLocaleString('sv-SE', { hour: 'numeric', minute: 'numeric' }) }}</span>
        <br>
        <span>{{ event.location }}</span>
        <RouterLink :to="`/admin/edit/${id}`">
            <button class="edit-button">Redigera</button>
        </RouterLink>
    </div>
</div>
</template>

<style scoped>
.card {
    border-radius: 1em;
    /* border: 1px solid var(--futf-color); */
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


.card-content {
    padding: 0.5em;
    white-space: nowrap;
}

.card-content h3 {
    margin: 0;
}

.edit-button {
    display: block;
    width: 100%;
    margin-top: 0.5em;
}
</style>