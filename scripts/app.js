const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (weather) => {
  details.innerHTML = `
        <h5 class="my-3">${weather.location.name}</h5>
        <div class="my-3">${weather.current.condition.text}</div>
        <div class="display-4 my-4">
          <span>${weather.current.temp_c}</span>
          <span>&deg;C</span>
        </div>
  `;
  time.src = weather.current.is_day ? 'img/day.svg' : 'img/night.svg';
  icon.src = `https://${weather.current.condition.icon}`;
  card.classList.remove('d-none');
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
  forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}