import THREE from 'three';

const createPlane = (scene, heightMap, size = 256, gap = 60, modifier = 0.02) => {

	console.log('creating plane');

	const geometry = new THREE.PlaneGeometry(gap, gap, size, size);

	for (let i = 0, l = geometry.vertices.length; i < l; i++) {
		geometry.vertices[i].z = heightMap[i] * modifier;
	}

	const material = new THREE.MeshPhongMaterial({
		color: 0x156289,
		emissive: 0x072534,
		side: THREE.DoubleSide,
		shading: THREE.FlatShading
	});

	const plane = new THREE.Mesh(geometry, material);
	scene.add(plane);

	plane.rotation.x -= 1;

	console.log(plane);

	return {scene, plane};
};

export default {createPlane};
