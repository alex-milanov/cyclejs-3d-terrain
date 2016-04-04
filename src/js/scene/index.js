
import THREE from 'three';

function init() {

	const scene = new THREE.Scene();
	const canvas = document.getElementById('main');
	const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 50);
	camera.position.z = 30;

	const renderer = new THREE.WebGLRenderer({
		canvas
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

	const d = 300;

	light.shadowCameraLeft = -d;
	light.shadowCameraRight = d;
	light.shadowCameraTop = d;
	light.shadowCameraBottom = -d;

	light.shadowCameraFar = 1000;
	light.shadowDarkness = 0.5;

	scene.add(light);

	return {scene, light, renderer, camera};
}

function render({scene, renderer, camera, plane, pressedKeys}) {
	if (plane && pressedKeys) {

		if (pressedKeys.indexOf('Left') > -1) {
			plane.rotation.z += 0.01;
		} else if (pressedKeys.indexOf('Right') > -1) {
			plane.rotation.z -= 0.01;
		}

		if (pressedKeys.indexOf('Up') > -1) {
			camera.position.z -= 0.1;
		} else if (pressedKeys.indexOf('Down') > -1) {
			camera.position.z += 0.1;
		}
		// plane.rotation.x += 0.005;
		// plane.rotation.y += 0.005;
	}
	if (scene) {
		renderer.render(scene, camera);
	}
}

export default {init, render};
