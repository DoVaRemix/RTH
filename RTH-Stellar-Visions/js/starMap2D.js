import { calculateVisibleStars } from './starMapGenerator.js';

const canvas = document.getElementById('starMapCanvas');
const ctx = canvas.getContext('2d');

function renderStars2D(lat, lon, dateTime) {
    const stars = calculateVisibleStars(lat, lon, dateTime);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        const x = (star.x/360)*canvas.width;
        const y = canvas.height - ((star.y/90)*canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI*2);
        ctx.fillStyle = star.color;
        ctx.fill();
    });

    // Draw watermark
    const watermark = new Image();
    watermark.src = 'assets/watermark.png';
    watermark.onload = () => ctx.drawImage(watermark, canvas.width-150, canvas.height-50, 140, 40);
}

export { renderStars2D };
