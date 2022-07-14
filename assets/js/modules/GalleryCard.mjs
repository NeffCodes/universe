export default class GalleryCard {
	constructor(parentElement, cardData){
		this.parentElement = parentElement;
		this.url = cardData.url;
		this.date = cardData.date;
		this.title = cardData.title;
		this.description = cardData.explanation;
	}

	container() {
		const container = document.createElement('article');
		container.classList.add('tile');
		container.onclick = this.onClick.bind(this);

		const thumbnail = document.createElement('img');
		thumbnail.src = this.url;

		const titleEl = document.createElement('h2');
		titleEl.innerText = this.title;

		const dateEl = document.createElement('h3');
		dateEl.innerText = this.date;

		const titleContainer = document.createElement('div')
		titleContainer.append(dateEl, titleEl)

		container.append(thumbnail, titleContainer)

		return container
	}

	removeModal(){
		const modals = document.querySelectorAll('.modal')
		modals.forEach(modal => modal.remove());
	}

	onClick() {
		// console.log('click')
		this.parentElement.append(this.createModal())
	}

	createModal() {
		document.querySelector('body').classList.add('noscroll')
		const modal = document.createElement('div');
		modal.classList.add('modal');

		const closeBtn = document.createElement('span');
		closeBtn.classList.add('close');
		closeBtn.innerHTML = '&times;'
		closeBtn.onclick = () => {
			document.querySelector('body').classList.remove('noscroll')
			this.removeModal();
		}

		const image = document.createElement('img');
		image.src = this.url;
		
		const titleEl = document.createElement('h2');
			titleEl.innerText = this.title;
		const dateEl = document.createElement('h3');
			dateEl.innerText = this.date;
		const titleContainer = document.createElement('div');
			titleContainer.append(dateEl,titleEl);
			titleContainer.classList.add('title');

		const descriptionEl = document.createElement('p');
			descriptionEl.innerText = this.description;
		const textContainer = document.createElement('div');
			textContainer.append(descriptionEl);
			textContainer.classList.add('description');

		modal.append(image, closeBtn, titleContainer ,textContainer)
		return modal;
	}

}