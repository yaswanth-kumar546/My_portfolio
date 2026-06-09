// three-scene.js
// Setup Three.js Scene for AI Network / Particle Background

const canvas = document.getElementById('bg-canvas');

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // Transparent background
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles Data
const particlesCount = 800; // Number of nodes
const positions = new Float32Array(particlesCount * 3);
const velocities = [];

// Initialize particle positions and velocities
for (let i = 0; i < particlesCount; i++) {
    // Random positions between -20 and 20
    positions[i * 3] = (Math.random() - 0.5) * 40;     // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40; // z

    velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
    });
}

// Particle Geometry & Material
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Create a circular texture for particles
const canvasTexture = document.createElement('canvas');
canvasTexture.width = 16;
canvasTexture.height = 16;
const context = canvasTexture.getContext('2d');
const gradient = context.createRadialGradient(8, 8, 0, 8, 8, 8);
gradient.addColorStop(0, 'rgba(0, 242, 254, 1)');
gradient.addColorStop(1, 'rgba(0, 242, 254, 0)');
context.fillStyle = gradient;
context.fillRect(0, 0, 16, 16);
const particleTexture = new THREE.CanvasTexture(canvasTexture);

const material = new THREE.PointsMaterial({
    size: 0.15,
    map: particleTexture,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

// Create Points Mesh
const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);

// Add some subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Position camera
camera.position.z = 15;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Smoothly interpolate rotation towards mouse position
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
    
    // Slowly rotate the entire system automatically
    particlesMesh.rotation.z += 0.0005;

    // Update individual particle positions slightly for a floating effect
    const positions = particlesMesh.geometry.attributes.position.array;
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] += Math.sin(elapsedTime * 0.5 + i) * 0.002;
        positions[i * 3 + 1] += Math.cos(elapsedTime * 0.5 + i) * 0.002;
    }
    particlesMesh.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();
