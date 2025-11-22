import { julian, sidereal } from 'astronomia';

// Load full star catalog JSON
let starCatalog = [];
fetch('assets/starCatalog.json')
  .then(res => res.json())
  .then(data => starCatalog = data);

function calculateVisibleStars(lat, lon, dateTime) {
    const jd = julian.CalendarGregorianToJD(dateTime.getFullYear(), dateTime.getMonth()+1, dateTime.getDate());
    const lst = sidereal.apparentInRa(jd, lon); // simplified example
    const visibleStars = starCatalog.map(star => {
        // Convert RA/DEC to Alt/Az relative to observer
        // Filter out stars below horizon
        // Map to x/y for 2D canvas and x/y/z for 3D sphere
        return {
            x: 0, y: 0, z:0, size: 1, color: '#fff', name: star.name
        }
    });
    return visibleStars;
}

// Export for rendering
export { calculateVisibleStars };
