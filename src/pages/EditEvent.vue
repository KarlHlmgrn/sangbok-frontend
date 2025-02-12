<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/store';
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import PdfViewer from '@/components/PdfViewer.vue';

const store = useMainStore();

const route = useRoute();
const router = useRouter();

const event = ref({});
const newEvent = ref(false);
const previewPdf = ref(false);

const newlySaved = ref(false);

// Keeps track of if the navigation was done programatically to not
// alert the user in the navigation guard
let navigationDoneProgramatically = false;

// The input elements require a specific format, this is fixed here
const fixDatesForInput = (ev) => ({
    ...ev,
    startDate: ev?.startDate ? new Date(ev.startDate).toISOString().replace(/:[0-9]{2}.[0-9]{3}Z/, '') : '',
    endDate: ev?.endDate ? new Date(ev.endDate).toISOString().replace(/:[0-9]{2}.[0-9]{3}Z/, '') : ''
});

// Preliminary event template, will be switched for the real JSON DB template
// in onMounted
let eventTemplate = {
    name: '',
    imgSrc: '',
    startDate: null,
    endDate: null,
    description: '',
    location: '',
    hosts: [],
    pdfSrc: '',
    visible: false
}

onMounted(async () => {
    if (route.params.id === 'new') {
        // If this is a new event the real JSON DB template will be fetched
        newEvent.value = true;

        eventTemplate = await store.fetchEventTemplate();

        event.value = JSON.parse(JSON.stringify(eventTemplate));

        return;
    }

    try {
        // Fetches the latest version of the event and updates the local version
        const fetchedEvent = await store.fetchEvent(route.params.id);
        event.value = fixDatesForInput(JSON.parse(JSON.stringify(fetchedEvent)));
    } catch (error) {
        // TODO: Proper error handling
        console.error(error);
    }
});

const typedHost = ref('');

const addHost = (e) => {
    // Adds a host to the hosts array

    // Prevents the form from being submitted
    e.preventDefault();
    e.stopPropagation();
    
    if (typedHost.value) {
        event.value.hosts.push(typedHost.value);
        typedHost.value = '';
    }
};

const removeHost = (host) => {
    // Removes a host from the hosts array
    event.value.hosts.splice(event.value.hosts.indexOf(host), 1);
};

const save = async (e) => {
    // Saves the event to the server

    e.preventDefault();

    // Reverts the fixed dates to Date objects
    const eventData = {
        ...JSON.parse(JSON.stringify(event.value)),
        startDate: event.value.startDate ? new Date(event.value.startDate) : null,
        endDate: event.value.endDate ? new Date(event.value.endDate) : null
    };

    if (newEvent.value) {
        // Saves the new event
        const { success, id } = await store.createEvent(eventData);

        if (success) {
            // Redirects the user on successful save to the new edit page with the
            // correct ID
            navigationDoneProgramatically = true;
            router.push(`/admin/edit/${id}`);
            return;
        }
        // TODO: Proper error handling
    }

    // Updates the event 
    const success = await store.updateEvent(eventData);
    if (success) {
        // Gets the updated event
        const updatedEvent = await store.getEvent(route.params.id, false);
        event.value = fixDatesForInput(JSON.parse(JSON.stringify(updatedEvent)));

        newlySaved.value = true;
        setTimeout(() => {
            newlySaved.value = false;
        }, 3000);
    }
    // TODO: Proper error handling
};

const fileUpload = async (e, type) => {
    // Uploads a file to the server
    const file = e.target.files[0];
    const fileSrc = await store.uploadFile(file);

    // Updates the file source based on what type of file was uploaded
    event.value[`${type}Src`] = fileSrc;
    // TODO: Proper error handling
};

// Computed property for if the user has made any changes, used in navigation guard
const changesMade = computed(() => (newEvent.value && JSON.stringify(event.value) !== JSON.stringify(eventTemplate)) || (event.value.id !== undefined && JSON.stringify(event.value) !== JSON.stringify(fixDatesForInput(store.events[route.params.id]))));

function handleUnload(e) {
    // Handles basic unload event from the window (reload, exit)
    // Displays an alert if there are changes made
    if (changesMade.value) {
        e.preventDefault();
        e.returnValue = '';
    }
}

// Registers the beforeunload event handler
window.addEventListener('beforeunload', handleUnload);

// Registers a navigation guard
const routerRemoveHandler = router.beforeEach((to, from, next) => {
    // Handles navigation (forwards, backwards navigation)
    
    if (navigationDoneProgramatically) {
        // The navigation was done programatically, so we don't need to alert the user
        next();
        return;
    }

    if (changesMade.value) {
        // Alerts the user if there are changes made, if the user clicks
        // "OK" the navigation will be approved, else not
        if (confirm('Du har osparade ändringar. Vill du verkligen lämna sidan?')) {
            next();
        } else {
            next(false);
        }
    } else {
        // Let the user navigate if no changes have been made
        next();
    }
});

onBeforeUnmount(() => {
    // Removes the event listener and the navigation guard
    window.removeEventListener('beforeunload', handleUnload);
    routerRemoveHandler();
});
</script>

<template>
<div class="edit-event" :class="{'pdf-view': event.pdfSrc && previewPdf}">
    <form class="edit-form" @submit="save">
        <img v-if="event.imgSrc" :src="event.imgSrc" alt="">

        <div>
            <label for="image" class="file-label">Bild <span class="max-file-size">Max filstorlek 10MB</span></label>
            <div class="upload-button">
                <input type="file" id="image" accept="image/png, image/jpeg" @change="(e) => fileUpload(e, 'img')" />
                <div class="upload-button-content">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>
                    <span>Ladda upp{{ event.imgSrc ? ' ny' : '' }} bild</span>
                </div>
            </div>
        </div>

        <div>
            <label for="name">Namn</label>
            <input type="text" id="name" v-model="event.name" />
        </div>

        <div>
            <label for="start-date">Börjar</label>
            <input type="datetime-local" id="start-date" v-model="event.startDate" />
        </div>

        <div>
            <label for="end-date">Slutar</label>
            <input type="datetime-local" id="end-date" v-model="event.endDate" />
        </div>

        <div>
            <label for="location">Plats</label>
            <input type="text" id="location" v-model="event.location" />
        </div>

        <div>
            <label for="description">Beskrivning</label>
            <div class="description-container">
                <textarea id="description" v-model="event.description"></textarea>
            </div>
        </div>

        <div>
            <label for="hosts">Arrangörer</label>
            <div class="hosts-container">
                <button type="button" class="host" v-for="host in event.hosts" @click="removeHost(host)">
                    {{ host }}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="512" width="512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                </button>
            </div>
            <input type="text" v-model="typedHost" @keydown.enter="addHost" id="hosts" placeholder="Skriv sektionen och tryck sedan Enter">
        </div>

        <div>
            <label for="pdf" class="file-label">PDF <span class="max-file-size">Max filstorlek 10MB</span></label>
            <div class="pdf-buttons">
                <div class="upload-button">
                    <input type="file" id="pdf" accept=".pdf" @change="(e) => fileUpload(e, 'pdf')" />
                    <div class="upload-button-content">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>
                        <span>Ladda upp{{ event.imgSrc ? ' ny' : '' }} PDF</span>
                    </div>
                </div>
                <button v-if="event.pdfSrc" type="button" @click="previewPdf = !previewPdf" :class="{'showing-pdf': previewPdf}">{{ previewPdf ? 'Göm' : 'Visa' }} PDF</button>
            </div>
        </div>

        <div>
            <label for="visibility">Synlighet</label>
            <div class="visibility-checkbox">
                <input id="visibility" type="checkbox" v-model="event.visible" />
                <label for="visibility">Evenemanget är {{ event.visible ? 'synligt' : 'dolt' }}</label>
            </div>
        </div>

        <div class="edit-form-footer">
            <div class="times">
                <template v-if="!newEvent">
                    <div>Skapad: {{ new Date(event.createdAt).toLocaleString('sv-SE', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</div>
                    <div>Uppdaterad: {{ new Date(event.updatedAt).toLocaleString('sv-SE', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</div>
                </template>
            </div>
            <div class="submit-button-container">
                <div v-if="newlySaved" class="newly-saved">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                    <span>Sparad</span>
                </div>
                <button type="submit">Spara</button>
            </div>
        </div>
    </form>
    <PdfViewer v-if="event.pdfSrc && previewPdf" :pdfSrc="event.pdfSrc" />
</div>
</template>

<style scoped>
.edit-event {
    width: min(30em, 100%);
    text-align: left;
    display: grid;
    gap: 1em;
    grid-auto-rows: auto;
}

.pdf-view {
    grid-template-columns: repeat(auto-fill, minmax(30em, 1fr));
}

@media (min-width: 65em) {
    .pdf-view {
        width: min(61em, 100%);
    }
}

.edit-form {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
    padding: 1em;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    height: fit-content;
}

img {
    width: 50%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5em;
}

.file-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.max-file-size {
    font-size: 10pt;
    color: #9e9e9e;
}

.upload-button {
    overflow: hidden;
    position: relative;
    border-radius: 0.5em;
    border: 1px solid var(--futf-color);
}

.upload-button input {
    cursor: pointer;
}

.upload-button-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0.6em 1em;
    box-sizing: border-box;
    background: var(--futf-color);
    color: white;
    pointer-events: none;
    display: flex;
    align-items: center;
    gap: 0.75em;
}

.upload-button:hover .upload-button-content {
    background: var(--futf-color-500);
}

.upload-button-content svg {
    height: 80%;
    object-fit: cover;
    fill: white;
}

label {
    display: block;
}

.edit-form-footer {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.5em;
    padding-top: 1.25em;
    border-top: 1px solid #ccc;
}

.submit-button-container {
    position: relative;
}

.newly-saved {
    position: absolute;
    top: 50%;
    right: calc(100% + 1em);
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 0.25em;
    color: #5e5e5e;
    opacity: 0;
    animation: fade 3s ease-in;
}

@keyframes fade {
    0% {
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.newly-saved svg {
    width: 1em;
    height: 1em;
    fill: var(--futf-success)
}

.times {
    font-size: 10pt;
    color: #5e5e5e;
    line-height: 12pt;
}

input {
    width: 100%;
}

.hosts-container {
    display: flex;
    align-items: center;
    gap: 0.25em;
    width: 100%;
    margin-bottom: 0.25em;
}

.hosts-container input {
    border: none;
    outline: none;
}

.host {
    padding: 0.5em 0.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75em;
    border-radius: 0.5em;
    height: 50%;
    line-height: 0.5;
}

.host svg {
    height: 0.75em;
    width: 0.75em;
    fill: #4f4f4f;
}

.description-container {
    width: 100%;
    height: 10em;
    color: black;
    border-radius: 0.5em;
    border: 1px solid var(--futf-color);
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    transition: border-color 0.25s;
    box-sizing: border-box;
    overflow: hidden;
}

.description-container:focus-within {
  outline: 4px auto var(--futf-color);
}

.description-container textarea {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    font-family: inherit;
    padding: 0.6em 1em;
}

.pdf-buttons {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    white-space: nowrap;
    gap: 0.5em;
}

.pdf-buttons .upload-button {
    flex-grow: 1;
}

.pdf-buttons button {
    border-radius: 0.5em;
}

.showing-pdf {
    background: var(--futf-color);
    color: white;
}

.showing-pdf:hover {
    background: var(--futf-color-500);
}

.visibility-checkbox {
    display: flex;
    align-items: center;
    justify-content: start;
    color: #5e5e5e;
}

.visibility-checkbox input {
    margin: 0.25em 0.5em 0 0;
}
</style>