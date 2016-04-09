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
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const everyFirstOutOfFour = (d, i) => (i + 3) / 4 === parseInt((i + 3) / 4);

const simplifyData = (res) => res.data.filter(everyFirstOutOfFour);

export default {load, getData, simplifyData};
