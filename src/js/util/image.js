import Rx from 'rx';

const load = (path) => Rx.Observable.create(observer => {
	const image = new Image();

	image.src = path;

	image.onload = () => {
		console.log('loaded image' + path);
		observer.onNext(image);
		observer.onCompleted();
	};

	image.onError = (err) => observer.onError(err);

});

const getData = (image) => {
	const canvas = document.createElement('canvas');
	canvas.width = image.width;
	canvas.height = image.height;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);
	return ctx.getImageData(0, 0, image.width, image.height);
};

export default {load, getData};
