import GalleryCard from "./GalleryCard.mjs";

export default class VideoCard extends GalleryCard {
	constructor (parentElement, cardData){
		super(parentElement, cardData)
		this.isYoutube = this.url.includes('youtube')
	}

	container() {
		const container = document.createElement('article');
		container.classList.add('tile');
		container.onclick = this.onClick.bind(this);

		const thumbnail = document.createElement('img');

		//set default to telescope svg
		thumbnail.src = 'assets/images/telescope.svg';

		//if youtube video, get thumbnail from youtube
		if(this.isYoutube){
			const youtubeID = this.url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop()
			thumbnail.src = `https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg`
		}
		

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
		document.querySelector('body').classList.add('noscroll')
		const modal = document.createElement('div');
		modal.classList.add('modal');

		const closeBtn = document.createElement('span');
		closeBtn.classList.add('close');
		closeBtn.innerHTML = '&times;'
		closeBtn.onclick = () => {
			document.querySelector('body').classList.remove('noscroll')
			modal.remove();
		}

		const iframeContainer = document.createElement('div');
		this.isYoutube ? 
			iframeContainer.classList.add('video-container', 'youtube_video') :
			iframeContainer.classList.add('video-container');
		
		if(this.isYoutube){
			iframeContainer.innerHTML = `
				<iframe 
					width="560" 
					height="315" 
					src="${this.url}" 
					title="${this.title}" 
					frameborder="0" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				>
				</iframe>
			`
		} else {
			iframeContainer.innerHTML = `
				<iframe 
					src="${this.url}" 
					title="${this.title}" 
					frameborder="0" 
				>
				</iframe>
			`
		}

		
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

		modal.append(iframeContainer, closeBtn, titleContainer,textContainer)
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
