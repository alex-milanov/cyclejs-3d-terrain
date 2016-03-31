
import THREE from 'three';
import Rx from 'rx';

import {run} from '@cycle/core';
import {makeDOMDriver, div, canvas, button} from '@cycle/dom';
import {makeAnimationDriver} from 'cycle-animation-driver';

import scene from './scene';
import imageUtil from './util/image';
import threeUtil from './util/three';

function main({DOM, animation}) {

	// intent
	const heightMap$ = DOM.select('#load-height-map').events('click')
		.map(() => console.log('loading height map'))
		.map(() => imageUtil.load('assets/heightmap.png'))
		.concatAll()
		.map(imageUtil.getData)
		.map(imageUtil.simplifyData)
		.startWith(null);

	// init
	const init$ = Rx.Observable.just().map(() => scene.init());

	const state$ = init$.combineLatest(heightMap$).map(([state, heightMap]) => {
		console.log(state, heightMap);
		let newState = Object.assign({}, state);
		if (heightMap !== null) {
			newState = Object.assign({},
				newState,
				threeUtil.createPlane(state.scene, heightMap, Math.sqrt(heightMap.length))
			);
		}
		return newState;
	});

	return {
		DOM: animation.pluck('timestamp')
			.withLatestFrom(state$, (timestamp, state) => {

				// render
				scene.render(state);

				// ui
				return div([
					button('#load-height-map','Load height map'),
					div('.time', ['Timestamp: ',timestamp.toString()])
				]);

			})
	};
}

const drivers = {
	DOM: makeDOMDriver('#app'),
	animation: makeAnimationDriver()
};

run(main, drivers);
