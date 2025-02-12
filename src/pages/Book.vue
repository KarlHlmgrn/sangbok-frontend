<script setup>
import { ref, watch } from 'vue';
import { useMainStore } from '@/store';

const store = useMainStore();

const searchTerm = ref('');
const matchedSongs = ref([]);
const searchedSong = ref('');

watch(searchTerm, (newVal) => {
    // Updates the matched songs if the search term changes
    matchedSongs.value = store.searchSongs(newVal);
});

function scrollToSong(id) {
    // Scrolls to the song the user has clicked on
    const song = document.getElementById(id);
    searchTerm.value = '';
    searchedSong.value = id;
    window.scrollBy({ top: song.getBoundingClientRect().top - 80, behavior: 'smooth' })
};

const closeResults = () => {
    searchTerm.value = '';
};
</script>

<template>
    <div class="book">
        <h3>Sångboken</h3>
        <div class="search-input" :class="{results: matchedSongs.length > 0}" v-click-outside="closeResults">
            <input v-model="searchTerm" placeholder="Sök efter låt">
            <div class="search-results" v-if="matchedSongs.length > 0">
                <div class="search-result" v-for="(song, i) in matchedSongs" @click="scrollToSong(song.id)" :key="'search' + song.id">
                    <h4>
                        <template v-for="(part, i) in song.matchedName.split('{match}')">
                            <span v-if="i % 2 == 0">{{ part }}</span>
                            <span v-else class="match">{{ part }}</span>
                        </template>
                    </h4>
                    <p v-if="song.melody" class="melody">
                        <template v-for="(part, i) in song.matchedMelody.split('{match}')">
                            <span v-if="i % 2 == 0">{{ part }}</span>
                            <span v-else class="match">{{ part }}</span>
                        </template>
                    </p>
                    <span class="lyrics-result" :class="{'no-fade-start': song.matchedLyrics.split('{match}')[0] === ''}">
                        <template v-for="(part, i) in song.matchedLyrics.split('{match}')">
                            <span v-if="i % 2 == 0">{{ part }}</span>
                            <span v-else class="match">{{ part }}</span>
                        </template>
                    </span>
                </div>
            </div>
        </div>
        <div class="songs">
            <div v-for="song in store.originalSongs" class="song" :class="{matched: searchedSong === song.id}" :id="song.id">
                <h4>{{ song.name.split('(A/N')[0] }}</h4>
                <p v-if="song.melody" class="melody">{{ song.melody }}</p>
                <p class="lyrics">{{ song.lyrics.replace(/\<br\>/g, '\r\n') }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.book {
    width: min(100%, 30em);
    min-height: 100vh;
}

.songs {
    text-align: left;
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.song {
    padding: 1em;
    background: #f8f8f8;
    border-radius: 1em;
}

.lyrics {
    margin: 0.5em 0 0;
    padding: 0;
    line-height: normal;
    white-space: pre-wrap;
}

.search-input {
    position: sticky;
    top: 1em;
    box-shadow: 0 0 2em #fff;
}

.search-input input {
    width: 100%;
    box-sizing: border-box;
}

.results input {
    outline: 4px auto var(--futf-color);
}

.search-results {
    position: absolute;
    padding: 1.6em 1em 1em 1em;
    top: calc(100% - 0.75em);
    left: 0;
    width: calc(100% - 2em - 3px);
    background-color: #fff;
    border: 2px solid var(--futf-color);
    border-radius: 0 0 0.75em 0.75em;
    border-top: none;
    z-index: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    max-height: 80vh;
    overflow-y: auto;
}

.search-result {
    background: #f8f8f8;
    border-radius: 1em;
    padding: 0.5em;
    cursor: pointer;
}

.search-result:hover {
    background: #f0f0f0;
}

h4 {
    margin: 0;
    padding: 0;
    line-height: normal;
}

.melody {
    margin: 0;
    padding: 0.25em 0 0 0;
    line-height: normal;
    font-style: italic;
    color: #8f8f8f;
}

.lyrics-result {
    position: relative;
    display: block;
    margin: 0.5em 0 0 0;
    padding: 0;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
}

.lyrics-result::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(90deg, #f8f8f8 0%, #ffffff00 5%, #ffffff00 95%, #f8f8f8 100%);
}

.search-result:hover .lyrics-result::after {
    background-image: linear-gradient(90deg, #f0f0f0 0%, #ffffff00 5%, #ffffff00 95%, #f0f0f0 100%);
}

.lyrics-result.no-fade-start::after {
    background-image: linear-gradient(90deg, #ffffff00 0%, #ffffff00 95%, #f8f8f8 100%);
}

.search-result:hover .lyrics-result.no-fade-start::after {
    background-image: linear-gradient(90deg, #ffffff00 0%, #ffffff00 95%, #f0f0f0 100%);
}

.match {
    color: var(--futf-color);
}

@keyframes flash {
    0% {
        outline: 2px solid transparent;
    }
    50% {
        outline: 2px solid var(--futf-color);
    }
    100% {
        outline: 2px solid transparent;
    }
}

.matched {
    animation: flash 2s ease-in 1s;
}
</style>