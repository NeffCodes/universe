fetch('/.netlify/functions/getPhotos')
	.then(res => res.json()) // parse response as JSON
	.then(data => {
		data = data.reverse()
		console.log(data)
		data.forEach( (cardData) => {
			const gallery = document.querySelector('.gallery');
			let card;
			
			cardData.media_type === 'video' ?
			card = new VideoCard(gallery, cardData ) :
			card = new GalleryCard(gallery, cardData ) ;

			gallery.appendChild(card.container())
		})
	})
	.catch(err => {
  	console.log(`error ${err}`)
  })


class GalleryCard {
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

	onClick() {
		console.log('click')
		
		this.parentElement.append(this.createModal())
	}

	createModal() {
		const modal = document.createElement('div');
		modal.classList.add('modal');

		const closeBtn = document.createElement('span');
		closeBtn.classList.add('close');
		closeBtn.innerHTML = '&times;'
		closeBtn.onclick = () => {
			modal.remove();
		}

		const image = document.createElement('img');
		image.src = this.url;
		
		const titleEl = document.createElement('h2');
		titleEl.innerText = this.title;

		const dateEl = document.createElement('h3');
		dateEl.innerText = this.date;

		const descriptionEl = document.createElement('p');
		descriptionEl.innerText = this.description;

		const textContainer = document.createElement('div')
		textContainer.append(dateEl, titleEl, descriptionEl)

		modal.append(image, closeBtn, textContainer)
		return modal;
	}

}


class VideoCard extends GalleryCard {
	constructor (parentElement, cardData){
		super(parentElement, cardData)
	}

	container() {
		const container = document.createElement('article');
		container.classList.add('tile');
		container.onclick = this.onClick.bind(this);

		const thumbnail = document.createElement('img');
		const youtubeID = this.url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop()
		thumbnail.src = `https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg`
		

		const titleEl = document.createElement('h2');
		titleEl.innerText = this.title;

		const dateEl = document.createElement('h3');
		dateEl.innerText = this.date;

		const titleContainer = document.createElement('div')
		titleContainer.append(dateEl, titleEl)

		container.append(thumbnail, titleContainer)

		return container
	}

	createModal() {
		const modal = document.createElement('div');
		modal.classList.add('modal');

		const closeBtn = document.createElement('span');
		closeBtn.classList.add('close');
		closeBtn.innerHTML = '&times;'
		closeBtn.onclick = () => {
			modal.remove();
		}

		const iframeContainer = document.createElement('div');
		iframeContainer.innerHTML = `
		<iframe 
			width="560" 
			height="315" 
			src="${this.url}" 
			title="YouTube video player" 
			frameborder="0" 
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		>
		</iframe>`
		
		const titleEl = document.createElement('h2');
		titleEl.innerText = this.title;

		const dateEl = document.createElement('h3');
		dateEl.innerText = this.date;

		const descriptionEl = document.createElement('p');
		descriptionEl.innerText = this.description;

		const textContainer = document.createElement('div')
		textContainer.append(dateEl, titleEl, descriptionEl)

		modal.append(iframeContainer, closeBtn, textContainer)
		return modal;
	}
}

document.querySelector('#info').addEventListener('click', toggleFooterInfo)

function toggleFooterInfo() {
	const footer = document.querySelector('footer');
	footer.classList.toggle('show');
	const about = document.querySelector('#info')
	about.classList.toggle('show');
}