import { displayLoader } from './modules/loader.mjs';
import fetchData from './modules/fetchData.js';

//show loading info
displayLoader('Peering into the telescope....')

fetchData(0);





