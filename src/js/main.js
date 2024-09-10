'use strict';

import config from '../../config/config.js';

{
  // OpenWeatherMap APIのキーをここに入力
  const apiKey = config.apiKey;
  // 対象の都市
  const city = 'Tokyo';
  // OpenWeatherMapのAPIエンドポイント
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // 天気情報を取得する関数
  async function getWeather() {
    try {
      const response = await fetch(apiUrl); // APIリクエスト

      const data = await response.json(); // レスポンスをJSON形式に変換
      
      if (response.ok) {
        // 必要なデータを取得
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const cityName = data.name;

        // HTMLに表示
        document.getElementById('weather').innerHTML = `
        <p>City: ${cityName}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${description}</p>
      `;
      } else {
        document.getElementById('weather').innerHTML = `Error: ${data.message}`;
      }
    } catch (error) {
      document.getElementById('weather').innerHTML = `Error: ${error.message}`;
    }
  }

  // ページがロードされたら天気情報を取得
  window.onload = getWeather;
}