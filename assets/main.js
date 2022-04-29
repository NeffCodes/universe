fetch('/.netlify/functions/getPhotos')
	.then(res => res.json()) // parse response as JSON
	.then(data => {
		data = data.reverse()
		console.log(data)
		console.log(data.url)

		// document.querySelector('img').src = data.url
		// document.querySelector('h2').innerText = data.title;
		// document.querySelector('p').innerText = data.explanation
		let main = document.querySelector('main');
		let imgs = main.querySelectorAll('a')
		imgs.forEach( (a,i) => a.style.backgroundImage = `url(${data[i].url})` )
	})
	.catch(err => {
          console.log(`error ${err}`)
  })