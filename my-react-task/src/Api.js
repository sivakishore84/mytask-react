import axios from 'axios';

const API_KEY = '1635890035cbba097fd5c26c8ea672a1';

export const getWeatherForecast = async (lat, long) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`
        );
        const forecastData = response.data.list.filter(
            (item) => item.dt_txt.includes('12:00:00')
        );

        return forecastData;
    } catch (error) {
        console.error('Error fetching info', error);
        throw error;
    }
};

export const getLatLongfromCity = async (city) => {
    try {
        const response = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
        );

        const coordinatesInfo = response.data;
        if (coordinatesInfo.length > 0) {
            const lat = coordinatesInfo && coordinatesInfo[0].lat;
            const long = coordinatesInfo && coordinatesInfo[0].lon;
            const response = await getWeatherForecast(lat, long);
            return response;
        } else {
            console.log('error');
        }
    } catch (error) {
        throw error;
    }
};
