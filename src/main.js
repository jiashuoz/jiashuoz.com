import './style.css'

const img = document.getElementById('collage-image');
let isDragging = false;
let startX, startY, initialTranslateX = 0, initialTranslateY = 0;
let currentTranslateX = 0, currentTranslateY = 0;

img.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    // Prevent default drag behavior (ghost image)
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    currentTranslateX = initialTranslateX + dx;
    currentTranslateY = initialTranslateY + dy;

    updateTransform();
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    initialTranslateX = currentTranslateX;
    initialTranslateY = currentTranslateY;
});

// Zoom logic
let scale = 1;
const zoomSensitivity = 0.001;

img.addEventListener('wheel', (e) => {
    e.preventDefault();

    const delta = e.deltaY;
    const newScale = scale - delta * zoomSensitivity;

    // Limit scale range
    scale = Math.min(Math.max(0.5, newScale), 3);

    updateTransform();
}, { passive: false });

function updateTransform() {
    img.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${scale})`;
}
