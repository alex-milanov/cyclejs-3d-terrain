
import THREE from 'three';
import Rx from 'rx';

import {run} from '@cycle/core';
import {makeDOMDriver, div, canvas, button} from '@cycle/dom';
import {makeAnimationDriver} from 'cycle-animation-driver';

import scene from './scene';
import imageUtil from './util/image';

function main({DOM, animation}) {

	// intent
	const heightMap$ = DOM.select('#load-height-map').events('click')
		.map(() => console.log('loading height map'))
		.map(() => imageUtil.load('assets/heightmap.png'))
		.concatAll()
		.map(image => imageUtil.getData(image))
		.map(data => console.log(data))
		.startWith(null);

	// init
	const init$ = Rx.Observable.just().map(() => scene.init());

	return {
		DOM: animation.pluck('timestamp')
			.withLatestFrom(init$, heightMap$, (timestamp, threeData) => {

				// render
				scene.render(threeData);

				// ui
				return div([
					button('#load-height-map','Load height map')
					// div('.time', ['Timestamp: ',timestamp.toString()])
				]);

			})
	};
}

const drivers = {
	DOM: makeDOMDriver('#app'),
	animation: makeAnimationDriver()
};

run(main, drivers);
