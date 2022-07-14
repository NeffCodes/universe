import GalleryCard from './GalleryCard.mjs';
import VideoCard from './VideoCard.mjs';
import { hideLoader } from './loader.mjs';


export const fetchData = async (offset = 0) => {
  await fetch('/.netlify/functions/getPhotos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: offset
  })
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      hideLoader();
      data = data.reverse()
      // console.log(data)
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