import GalleryCard from './GalleryCard.mjs';
import VideoCard from './VideoCard.mjs';

export const fetchData = async (offset = 0) => {
  await fetch('/.netlify/functions/getPhotos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: offset
  })
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      // randomly change loader text
      const loaderText = document.querySelector('.loader>p');
      const textOptions = [
        'Looking for more views',
        'Searching for extraterrestrial life',
        'Making sure the cap is off of the lens',
        'Adjusting scope calibration',
        'Relocating telescope',
        'Waiting for clouds to clear',
        'Cleaning spot off of the lens',
      ]
      loaderText.innerText = `${textOptions[Math.floor(Math.random()*textOptions.length)]}...`

      //add data in reverse order
      data = data.reverse()
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
}