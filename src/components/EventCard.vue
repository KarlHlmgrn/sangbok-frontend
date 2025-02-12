<script setup>
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/store';

const store = useMainStore();

const props = defineProps({
  id: String
});

const event = ref({});
const originalBook = ref(false);

onMounted(async () => {
    // Will not show an image if this is the sångbok
    if (props.id === '') {
        originalBook.value = true;
        return
    }
    try {
        event.value = await store.getEvent(props.id);
    } catch (e) {
        console.error(e);
    }
});
</script>

<template>
<div class="card" :class="{basutbudet: originalBook}">
    <img :src="event.imgSrc" alt="" v-if="!originalBook">
    <div class="card-content">
        <h3 v-if="!originalBook">{{ event.name }}</h3>
        <h3 v-else>Sångbokens låtar</h3>
        <span v-if="event.startDate">{{ new Date(event.startDate).toLocaleString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) }}</span>
    </div>
</div>
</template>

<style scoped>
.card {
    width: 100%;
    aspect-ratio: 1.6;
    border-radius: 1em;
    position: relative;
    overflow: hidden;
    transition: all 0.25s ease-in-out;
}

.basutbudet {
    background: linear-gradient(90deg, #f1b434 0%, #c09537 50%, #e8a516 100%);
    aspect-ratio: 3;
}

.card:hover {
    cursor: pointer;
    filter: brightness(0.8);

}

.card-overlay {
    position: absolute;
    width: calc(100% - 1em);
    height: calc(100% - 1em);
    background-image: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%);
    top: 0.5em;
    left: 0.5em;
    backdrop-filter: blur(2px);
    border-radius: 0.5em;
}

.card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}

@media (max-width: 768px) {
    .event-grid .card {
        aspect-ratio: 3;
    }
    .event-grid .card img {
        object-position: -50%;
    }
}

.card-content {
    position: absolute;
    top: 0.5em;
    left: 0.5em;
    width: calc(100% - 3em);
    color: white;
    text-align: left;
    padding: 1em;
    background-image: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%);
    backdrop-filter: blur(2px);
    border-radius: 0.5em;
}

.card-content h3 {
    margin: 0;
}

</style>