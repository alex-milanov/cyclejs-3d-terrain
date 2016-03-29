
import THREE from 'three';
import Rx from 'rx';

import {run} from '@cycle/core';
import {makeDOMDriver, div, canvas} from '@cycle/dom';
import {makeAnimationDriver} from 'cycle-animation-driver';

import scene from './scene';

function main({DOM, animation}) {

	// init
	const init$ = Rx.Observable.just().map(() => scene.init());

	return {
		DOM: animation.pluck('timestamp')
			.withLatestFrom(init$, (timestamp, threeData) => {

				// render
				scene.render(threeData);

				// ui
				return div([
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
