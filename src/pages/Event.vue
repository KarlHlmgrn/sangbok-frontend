<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/store';
import EventDetails from '@/components/EventDetails.vue';
import PdfViewer from '@/components/PdfViewer.vue';

const route = useRoute();
const router = useRouter();
const store = useMainStore();

onMounted(async () => {
    try {
        // Gets the event based on the current URL
        event.value = await store.getEvent(route.params.id);
        if (event.value.futureEvent) {
            // Redirects the user if this is a future event
            router.push('/');
            return;
        }
    } catch (e) {
        // TODO: Proper error handling
        console.error(e);
        return;
    }
});

const event = ref({});
</script>

<template>
<div class="event">
    <EventDetails v-if="event" :event="event" />
    <PdfViewer v-if="event.pdfSrc" :pdfSrc="event.pdfSrc" />
</div>
</template>

<style scoped>
.event {
    width: min(100%, 30em);
    height: 100vh;
}
</style>