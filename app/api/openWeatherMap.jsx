const axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/';
const DEFAULT_UNIT = 'imperial';

module.exports = {
	getCurrentWeather: function (location) {
		const encodedLocation = encodeURIComponent(location);
		const requestUrl = `${OPEN_WEATHER_MAP_URL}weather?appid=${API_KEY}&units=${DEFAULT_UNIT}&q=${encodedLocation}`;

		return axios.get(requestUrl).then(function (res) {
			if (res.data.cod && res.data.message) { //if true, something went wrong
				throw new Error(res.data.message); //send to error handler in Weather.jsx
			} else {
				return res.data; //send to success case in Weather.jsx
			}
		}, function (res) {
			throw new Error(res.data.message); //if api sends an error, we pull then show to user
		});
	},

	get5DayForecast: function (location) {
		const encodedLocation = encodeURIComponent(location);
		const requestUrl = `${OPEN_WEATHER_MAP_URL}forecast?appid=${API_KEY}&units=${DEFAULT_UNIT}&q=${encodedLocation}`;

		return axios.get(requestUrl).then(function (res) {
			const apiDataHasError = res.data.cod !== '200';
			if (apiDataHasError && res.data.message) { //if true, something went wrong
				throw new Error(res.data.message); //send to error handler in WeatherForecast.jsx
			} else {
				return res.data; //send to success case in WeatherForecast.jsx
			}
		}, function (res) {
			throw new Error(res.data.message); //if api sends an error, we pull then show to user
		});
	}

};
