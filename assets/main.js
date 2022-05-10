fetch('/.netlify/functions/getPhotos')
	.then(res => res.json()) // parse response as JSON
	.then(data => {
		data = data.reverse()
		console.log(data)
		data.forEach( (img,idx) => {
			img.media_type === 'video' ?
			createVideoCard(img) :
			createImageCard(img,idx)
		})
	})
	.catch(err => {
          console.log(`error ${err}`)
  })

	function createVideoCard( vidData ){
		console.log('video', vidData.date)
		const gallery = document.querySelector('.gallery');
		//create each node
		const article = document.createElement('article');
		const div = document.createElement('div')
		const date = document.createElement('h3');
		const title = document.createElement('h2');

		article.innerHTML = `<iframe 
			width="560" 
			height="315" 
			src="${vidData.url}" 
			title="YouTube video player" 
			frameborder="0" 
			allow="encrypted-media; gyroscope; picture-in-picture" 
			allowfullscreen
			loading="lazy"
		></iframe>`

		//add data to nodes
		title.innerText = vidData.title;
		date.innerText = vidData.date;

		//style nodes
		article.classList.add('tile')

		//build out video tree
		div.append(date, title);

		article.appendChild(div);
		gallery.appendChild(article);
	}



	function createImageCard( imgData, index ){
		const gallery = document.querySelector('.gallery');
		//create each node
		const article = document.createElement('article');
		// const anchor = document.createElement('a');
		const img = document.createElement('img');
		
		const div = document.createElement('div')
		const date = document.createElement('h3');
		const desc = document.createElement('p');
		const title = document.createElement('h2');

		
		//add data to nodes
		article.setAttribute('data-tile',index)
		title.innerText = imgData.title;
		img.src = imgData.url;
		date.innerText = imgData.date;
		desc.innerText = imgData.explanation
		
		//add event listener
		article.addEventListener('click', enlargePhoto)

		//style nodes
		article.classList.add('tile')

		//build out card tree
		div.append(date,title, desc);
		article.append(img, div);
		gallery.appendChild(article);
	}

function enlargePhoto(e) {
	imgSrc = e.target.src
	divData = e.target.nextSibling.cloneNode(true);
	imgModal(imgSrc, divData);
}

function imgModal( imgSrc, divData) {
	//create modal
	const modal = document.createElement("div");
	modal.classList.add('modal');

	//add modal to main
	const main =  document.querySelector('main')
	main.append(modal)

	//create image
	const img = document.createElement('img');
	img.src = imgSrc;

	//allow to close modal
	const closeBtn = document.createElement('span');
	closeBtn.classList.add('close');
	closeBtn.innerHTML = '&times;'
	closeBtn.onclick = () => {
		modal.remove();
	}

	//add elements to modal
	modal.append(img,divData,closeBtn)
}

document.querySelector('#info').addEventListener('click', toggleFooterInfo)

function toggleFooterInfo() {
	const footer = document.querySelector('footer');
	footer.classList.toggle('show');
	const about = document.querySelector('#info')
	about.classList.toggle('show');
}