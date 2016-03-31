
import THREE from 'three';

function init() {

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
	camera.position.z = 30;

	const renderer = new THREE.WebGLRenderer({
		canvas: document.getElementById('main')
	});

	renderer.setSize(640, 480);

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	return {scene, renderer, camera};
}

function render({scene, renderer, camera, plane}) {
	if (plane) {
		// plane.rotation.x += 0.005;
		// plane.rotation.y += 0.005;
	}
	if (scene) {
		renderer.render(scene, camera);
	}
}

export default {init, render};
