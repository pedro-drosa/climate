import { config } from './config.js';

document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();
  let inputEl = document.querySelector('#searchInput').value;

  if (inputEl !== '') {
    clearInfo();
    showWarning('Carregando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      inputEl
    )}&appid=${config.appId}&units=metric&lang=pt_br`;

    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning(json.message);
    }
  } else {
    clearInfo();
  }
});

function showInfo(info) {
  showWarning('');

  document.querySelector('.titulo').innerHTML = `${info.name}, ${info.country}`;
  document.querySelector('.tempInfo').innerHTML = `${info.temp} <sup>ºC</sup>`;
  document.querySelector(
    '.ventoInfo'
  ).innerHTML = `${info.windSpeed} <span>Km/h</span>`;

  document
    .querySelector('.temp img')
    .setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${info.tempIcon}@2x.png`
    );

  document.querySelector('.ventoPonto').style.transform = `rotate(${
    info.windAngle - 90
  }deg)`;

  document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}
