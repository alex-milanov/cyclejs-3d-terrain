
import THREE from 'three';

function init() {

	const instance = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const renderer = new THREE.WebGLRenderer({
		canvas: document.getElementById('main')
	});

	renderer.setSize(640, 480);

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	const cube = new THREE.Mesh(geometry, material);
	instance.add(cube);

	camera.position.z = 5;

	return {instance, renderer, camera, cube};
}

function render({instance, renderer, camera, cube}) {
	if (cube) {
		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;

		renderer.render(instance, camera);
	}
}

export default {init, render};
