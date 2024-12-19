import * as THREE from "three";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initial detail level
let detailLevel = 1;
let geometry = new THREE.IcosahedronGeometry(1, detailLevel);

const positions = geometry.attributes.position.array;
const colors = [];

// Color the vertices
for (let i = 0; i < positions.length; i += 9) {
  const x = positions[i];
  const y = positions[i + 1];
  const z = positions[i + 2];

  const color = new THREE.Color(Math.random() * 0xffffff);

  colors.push(color.r, color.g, color.b);
  colors.push(color.r, color.g, color.b);
  colors.push(color.r, color.g, color.b);
}

geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

// Create material with vertex colors
const material = new THREE.MeshBasicMaterial({
  vertexColors: true,
  wireframe: true
});

// Create icosahedron mesh
let icosahedron = new THREE.Mesh(geometry, material);
scene.add(icosahedron);

// Camera position
camera.position.z = 3;

// Create slider element to control detail
const slider = document.createElement('input');
slider.type = 'range';
slider.min = 0;
slider.max = 5;
slider.value = detailLevel;
slider.step = 1;
slider.style.position = 'absolute';
slider.style.top = '10px';
slider.style.left = '10px';
document.body.appendChild(slider);

// Function to update geometry based on slider value
slider.addEventListener('input', () => {
  detailLevel = parseInt(slider.value);
  geometry.dispose(); // Dispose of old geometry
  geometry = new THREE.IcosahedronGeometry(1, detailLevel);

  const positions = geometry.attributes.position.array;
  const colors = [];

  // Recolor the vertices
  for (let i = 0; i < positions.length; i += 9) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];

    const color = new THREE.Color(Math.random() * 0xffffff);

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  icosahedron.geometry = geometry; // Update geometry
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  icosahedron.rotation.x += 0.005;
  icosahedron.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();
