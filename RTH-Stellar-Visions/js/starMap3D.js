import { calculateVisibleStars } from './starMapGenerator.js';

let scene, camera, renderer;

function init3D() {
    const container = document.getElementById('starMap3DContainer');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, 0.1, 2000);
    camera.position.z = 500;

    renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}

function renderStars3D(lat, lon, dateTime) {
    const stars = calculateVisibleStars(lat, lon, dateTime);
    scene.clear();

    stars.forEach(star => {
        const geometry = new THREE.SphereGeometry(star.size, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: star.color });
        const mesh = new THREE.Mesh(geometry, material);
        // Convert azimuth/altitude to 3D Cartesian
        const radius = 400;
        const az = (star.x/360)*2*Math.PI;
        const alt = (star.y/90)*(Math.PI/2);
        mesh.position.x = radius*Math.cos(alt)*Math.sin(az);
        mesh.position.y = radius*Math.sin(alt);
        mesh.position.z = radius*Math.cos(alt)*Math.cos(az);
        scene.add(mesh);
    });

    // Add watermark plane
    const texture = new THREE.TextureLoader().load('assets/watermark.png');
    const planeGeo = new THREE.PlaneGeometry(200,50);
    const planeMat = new THREE.MeshBasicMaterial({map:texture, transparent:true});
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.set(0,-150,200);
    scene.add(plane);

    renderer.render(scene, camera);
}

export { init3D, renderStars3D };
