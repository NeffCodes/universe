const process = require('process')

const axios = require('axios')
const qs = require('qs')


//Get date range:
const todayDate = new Date();
const endDate = subtractDays(todayDate,12);
const endRange = getDateString(todayDate)
const startRange = getDateString(endDate)

function subtractDays(date,days){
	let result = new Date(date);
  result.setDate(result.getDate() - days + 1);
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
  // apply our function to the queryStringParameters and assign it to a variable
  // const API_PARAMS = qs.stringify(event.queryStringParameters)
  // console.log('API_PARAMS', API_PARAMS)
  // Get env var values defined in our Netlify site UI

  // this is secret too, your frontend won't see this
  const { API_KEY } = process.env
  const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startRange}&end_date=${endRange}`

  console.log('Constructed URL is ...', URL)
  console.log('Body Params:', event.body)

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
