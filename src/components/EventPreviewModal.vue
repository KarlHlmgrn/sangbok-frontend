<script setup>
import { ref, onMounted, watch } from 'vue';
import { useMainStore } from '@/store';
import EventDetails from '@/components/EventDetails.vue';

const store = useMainStore();

const props = defineProps({
    id: String,
    modalObject: Object
});

const event = ref({});

const modal = ref(null);
const eventDetails = ref(null);

onMounted(async () => {
    try {
        event.value = await store.getEvent(props.id);
    } catch (e) {
        console.error(e);
    }
    // TODO: Proper error handling, probably isn't needed because we now that all events
    // already have been loaded
});

watch(modal, (value) => {
    // When the modal ref has been set the provided object that will contain the modal
    // gets the modal appended
    props.modalObject.modal = value;
});

const modalClickOutsideHandler = (e) => {
    // Closes the modal if the user clicks outside of it
    if (e.target === modal.value) {
        modal.value.close();
    }
};
</script>

<template>
<dialog ref="modal" @click="modalClickOutsideHandler">
    <EventDetails ref="eventDetails" v-if="event" :event="event" showDescription />
    <button class="close-button" @click="modal.close()">Stäng</button>
</dialog>
</template>

<style scoped>
dialog {
    width: min(30em, 100%);
    box-sizing: border-box;
    padding: 1em;
    border: none;
    background: white;
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.5);
    border-radius: 1.5em;
    transition: display 0.2s allow-discrete, overlay 0.2s allow-discrete;
    animation: fade-out 0.2s ease-in-out;

    &[open] {
        opacity: 1;
        animation: fade-in 0.2s ease-in-out;
    }

    &[open]::backdrop {
        opacity: 1;
        animation: fade-in 0.2s ease-in-out;
    }
}

dialog::backdrop {
    animation: fade-out 0.2s ease-in-out;
}

.close-button {
    margin-top: 1em;
    float: right;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>