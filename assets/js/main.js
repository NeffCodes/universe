import { displayLoader } from './modules/loader.mjs';
import { fetchData } from './modules/fetchData.js';

//show loading info
displayLoader('Peering into the telescope....')

let imageGroup = 0;
fetchData(imageGroup);

window.onscroll = function(event) {
	console.log('h',imageGroup)
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
		imageGroup++
		fetchData(imageGroup)	
	}
}






