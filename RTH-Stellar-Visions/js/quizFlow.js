import { renderStars2D } from './starMap2D.js';
import { init3D, renderStars3D } from './starMap3D.js';

const OPENCAGE_API_KEY = 'b21d4c8188ee424980d966f33861cc7b'; // Your API key

async function geocodeLocation(location) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${OPENCAGE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { lat, lon: lng };
    } else {
        alert("Location not found. Please enter a valid city or address.");
        return null;
    }
}

function startQuiz() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `
      <input id="eventType" placeholder="Event Type"/>
      <input type="date" id="eventDate"/>
      <input type="time" id="eventTime"/>
      <input id="location" placeholder="City, Country"/>
      <button id="generateMapBtn">Generate Star Map</button>
    `;

    document.getElementById('generateMapBtn').addEventListener('click', async () => {
        const eventType = document.getElementById('eventType').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const locationInput = document.getElementById('location').value;

        const geo = await geocodeLocation(locationInput);
        if(!geo) return;

        const { lat, lon } = geo;
        const dateTime = new Date(`${date}T${time}`);

        renderStars2D(lat, lon, dateTime);
        renderStars3D(lat, lon, dateTime);
    });

    init3D();
}

startQuiz();

