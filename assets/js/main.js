import { fetchData } from './modules/fetchData.js';

let imageGroup = 0;
fetchData(imageGroup);

window.onscroll = function(event) {
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
		imageGroup++
		fetchData(imageGroup)	
	}
}






