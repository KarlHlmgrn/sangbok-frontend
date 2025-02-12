<script setup>
import { ref, onMounted, watch } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';

const props = defineProps({
    pdfSrc: String,
});

// Set up the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.mjs';

// Reference to the container where the PDF will be rendered
const pdfViewer = ref(null);
const pdfLoading = ref(false);
const pdfLoadError = ref(false);

async function loadAndRenderPDF(pdfSrc) {
    pdfLoadError.value = false;
    pdfLoading.value = true;

    let pdfUrl = pdfSrc;

    // If the PDF isn't stored locally a proxy has to be used to
    // avoid CORS errors
    if (!pdfUrl.includes('localhost')) {
        pdfUrl = 'https://corsproxy.io/' + encodeURIComponent(pdfSrc);
    }

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    // Loop through each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        // Set the scale for the page
        // Higher number = better resolution
        const scale = 2;
        const viewport = page.getViewport({ scale });

        // Create a canvas element for the page
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render the page into the canvas
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        await page.render(renderContext).promise;

        // Append the canvas to the PDF viewer container
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page';
        pageDiv.appendChild(canvas);
        pdfViewer.value.appendChild(pageDiv);
        pdfLoading.value = false;
    }
}

onMounted(async () => {
    // Tries to load and render the provided PDF
    try {
        await loadAndRenderPDF(props.pdfSrc);
    } catch (error) {
        console.error('Error loading or rendering PDF:', error);
        pdfLoadError.value = true;
    }  
});

watch(() => props.pdfSrc, async (newPdfSrc) => {
    // If the PDF source is updated, the current rendered PDF will be removed
    // from the DOM and the new PDF will be rendered
    pdfViewer.value.innerHTML = '';
    await loadAndRenderPDF(newPdfSrc);
});
</script>

<template>
<div>
    <div class="loader-container" v-if="pdfLoading">
        <div class="loader"></div>
    </div>
    <div v-if="pdfLoadError">
        <p>Sångboken kunde inte läsas in</p>
        <button @click="loadAndRenderPDF(pdfSrc)">Försök igen</button>
    </div>
    <div ref="pdfViewer" class="pdf"></div>
</div>
</template>

<style scoped>
.pdf {
    margin-top: 1em;
    width: 100%;
}

.pdf * {
    width: 100%;
}

.loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
}
</style>