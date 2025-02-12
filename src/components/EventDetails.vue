<script setup>
import { ref } from 'vue';

const props = defineProps({
    event: Object,
    showDescription: {
        type: Boolean,
        default: false
    }
});

const showDescription = ref(props.showDescription);
</script>

<template>
<div class="event-header" :style="`background-image: url('${event.imgSrc}');`">
    <div class="image-and-info">
        <img :src="event.imgSrc" alt="">
        <div class="event-info">
            <div>
                <h3>{{ event.name }}</h3>
                <span v-if="event.startDate">{{ new Date(event.startDate).toLocaleString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) }}<br></span>
                <span v-if="event.hosts?.length === 1">{{ event.hosts[0] }}</span>
                <span v-else>{{ event.hosts?.slice(0, -1).join(', ') }} och {{ event.hosts?.slice(-1)[0] }}</span>
            </div>
        </div>
    </div>
    <template v-if="event.description">
        <div class="description" :class="{'showing-description': showDescription}">
            <span>{{ event.description }}</span>
        </div>
        <button class="show-description" :class="{'showing-description': showDescription}" @click="showDescription = !showDescription">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
            Beskrivning
        </button>
    </template>
</div>
</template>

<style scoped>
.event-header {
    position: relative;
    display: grid;
    /* flex-direction: column; */
    /* align-items: center; */
    /* grid-template-rows: 60% 40%; */
    gap: 0.5em;
    /* height: 8em; */
    padding: 1em;
    background-size: 0;
    border-radius: 1em;
    background-color: rgba(0, 0, 0, 0.01);
    overflow: hidden;
}

.event-header::before {
    content: "";
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    background-image: inherit;
    background-size: 100%;
    background-position: -50%;
    z-index: -1;
    filter: blur(6px) opacity(0.75);
}

.image-and-info {
    height: 5em;
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 0.75em;
}

.event-header img {
    height: 100%;
    object-fit: cover;
    border-radius: 0.5em;
}

.event-info {
    text-align: left;
    flex-grow: 1;
    /* background: rgba(0, 0, 0, 0.125); */
    background-image: linear-gradient(90deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%);
    border-radius: 0.5em;
    padding: 0 0.5em;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
}

.description {
    display: grid;
    grid-template-rows: 0fr;
    text-align: left;
    color: transparent;
    background: rgba(0, 0, 0, 0.125);
    border-radius: 0.5em;
    transition: all 0.5s ease-out;
}

.description span {
    margin: 0 0.5em;
    overflow: hidden;
    box-sizing: border-box;
    transition: margin 0.5s ease-in-out;
}

.description.showing-description span {
    margin: 0.5em;
}

.description.showing-description {
    color: white;
    grid-template-rows: 1fr;
}

.show-description {
    text-align: right;
    background: none;
    padding: 0 0.25em 0 0 ;
    color: white;
    border: none;
    outline: none;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
}

.show-description:hover {
    color: #dfdfdf;
}

.show-description svg {
    height: 1em;
    object-fit: cover;
    fill: white;
    transform: translateY(1px);
    transition: all 0.5s ease-in-out;
}

.show-description.showing-description svg {
    transform: rotateZ(180deg) translateY(-3px);
}

.event-info h3 {
    margin: 0;
    padding: 0;
    line-height: normal;
}
</style>