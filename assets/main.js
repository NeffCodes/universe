fetch('/.netlify/functions/getPhotos')
	.then(res => res.json()) // parse response as JSON
	.then(data => {
		data = data.reverse()
		data.forEach( img => createImageCard(img))
	})
	.catch(err => {
          console.log(`error ${err}`)
  })

	function createImageCard( imgData ){
		const gallery = document.querySelector('.gallery');
		//create each node
		const article = document.createElement('article');
		const anchor = document.createElement('a');
		const img = document.createElement('img');
		const h2 = document.createElement('h2');
		const p = document.createElement('p');

		//add data to nodes
		h2.innerText = imgData.title;
		img.src = imgData.url;
		// p.innerText = imgData.explanation;
		
		//style nodes
		article.classList.add('tile')

		//build out card tree
		anchor.appendChild(img);
		article.appendChild(anchor);
		article.appendChild(h2);
		article.appendChild(p);

		gallery.appendChild(article);
	}

