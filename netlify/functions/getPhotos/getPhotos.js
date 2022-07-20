const process = require('process')
const axios = require('axios');
const { start } = require('repl');
// const qs = require('qs')


//Get date range:
const LIMIT = 12;

function getStartDate (offset, limit){
  const today = new Date();
  today.setDate(today.getDate() - (offset * limit));
  return today
}

function getEndDate(startDate, limit){
	const result = new Date(startDate);
  result.setDate(result.getDate() - limit + 1);
  return result;
}

function getDateString(date){
	let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
	month = month + 1
	month = month > 9 ? month : `0${month}`
	day = day > 9 ? day : `0${day}`
	return `${year}-${month}-${day}`
}

//Handle api data
const handler = async function (event) { 
  // this is secret too, your frontend won't see this
  const { API_KEY } = process.env
  const startDate = getStartDate(event.body, LIMIT);
  const endDate = getEndDate(startDate, LIMIT);

  const endRange = getDateString(startDate)
  const startRange = getDateString(endDate)

  const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startRange}&end_date=${endRange}`

  // console.log('Constructed URL is ...', URL)
  // console.log('Body Params:', event.body)

  try {
    const { data } = await axios.get(URL)
    // refer to axios docs for other methods if you need them
    // for example if you want to POST data:
    //    axios.post('/user', { firstName: 'Fred' })
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { data, headers, status, statusText } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }
}

module.exports = { handler }
