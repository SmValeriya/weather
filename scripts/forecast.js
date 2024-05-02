class Forecast {
  constructor() {
    this.key = '5290e9de3e08499fbe591406243004';
    this.weatherURI = 'https://api.weatherapi.com/v1/forecast.json';
    this.searchURI = 'https://api.weatherapi.com/v1/search.json';
  }

  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.id);

    return weather;
  }

  async getWeather(id) {
    const query = `?key=${this.key}&q=id:${id}&days=3&aqi=yes&alerts=no`;

    const response = await fetch(this.weatherURI + query);
    const data = await response.json();

    return data;
  }

  async getCity(city) {
    const query = `?key=${this.key}&q=${city}`;

    const response = await fetch(this.searchURI + query);
    const data = await response.json();

    return data[0];
  }
}