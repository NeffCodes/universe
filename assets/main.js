fetch('/.netlify/functions/getPhotos')
	.then(res => res.json()) // parse response as JSON
	.then(data => {
		console.log(data)
		console.log(data.url)

		document.querySelector('img').src = data.url
		document.querySelector('h2').innerText = data.title;
		document.querySelector('p').innerText = data.explanation
	})
	.catch(err => {
          console.log(`error ${err}`)
  })