export function displayLoader(loadingText) {
	const gallery = document.querySelector('.gallery')
	gallery.classList.add('hide')

	const container = document.createElement('div');
	const span = document.createElement('span');
	const text = document.createElement('p');

	container.classList.add('temp');
	container.classList.remove('hide');

	span.id ='loading';
	text.innerText = loadingText;

	container.append(span,text)
	document.querySelector('main').append(container)
}

export function hideLoader() {
	const loader = document.querySelector('.temp');
	loader.classList.add("hide")
	const gallery = document.querySelector('.gallery')
	gallery.classList.remove('hide')
}