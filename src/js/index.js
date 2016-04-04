
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
		.map(data => ({action: 'createPlane', data}));

	const keyDowns$ = Rx.Observable.fromEvent(document, 'keydown');
	const keyUps$ = Rx.Observable.fromEvent(document, 'keyup');
	const keyActions$ = Rx.Observable
		.merge(keyDowns$, keyUps$)
		.distinctUntilChanged(function(e) { return e.type + (e.key || e.which); })
		.map(data => ({action: 'keyAction', data}));

	// keyActions.subscribe(function(e) {
	// 	console.log(e.type, e.key || e.which, e.keyIdentifier);
	// });

	// init
	const init$ = Rx.Observable.just().map(() => scene.init()).map(data => ({action: 'init', data}));

	const state$ = Rx.Observable.merge(
		init$, heightMap$, keyActions$
	)
		.scan((state, event) => {
			console.log(state, event);
			let newState;
			switch (event.action){
				case 'init':
					newState = Object.assign({},event.data);
				break;
				case 'createPlane':
					newState = Object.assign({},
						state,
						threeUtil.createPlane(state.scene, event.data, Math.sqrt(event.data.length)));
				break;
				case 'keyAction':
					let pressedKeys = [].concat(state.pressedKeys);
					pressedKeys = (['Left', 'Right', 'Up', 'Down'].indexOf(event.data.keyIdentifier) > -1)
						? (event.data.type == 'keyup')
							? pressedKeys.filter(key => key != event.data.keyIdentifier)
							: pressedKeys.concat([event.data.keyIdentifier])
						: pressedKeys;
					newState = Object.assign({}, state, {pressedKeys});
				break;
			}
			return newState;
		}, {});

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
