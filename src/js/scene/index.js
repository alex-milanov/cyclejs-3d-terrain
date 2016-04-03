
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

	//this.scene.add( new THREE.AmbientLight( 0x555555 ) );

	const light = new THREE.DirectionalLight(0xdfebff, 1.8);
	light.position.set(40, 50, 40);
	light.position.multiplyScalar(1.3);

	light.castShadow = true;
	//light.shadowCameraVisible = true;

	light.shadowMapWidth = 1024;
	light.shadowMapHeight = 1024;

	var d = 300;

	light.shadowCameraLeft = -d;
	light.shadowCameraRight = d;
	light.shadowCameraTop = d;
	light.shadowCameraBottom = -d;

	light.shadowCameraFar = 1000;
	light.shadowDarkness = 0.5;

	scene.add(light);

	return {scene, light, renderer, camera};
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
