// ==UserScript==
// @name         Dragon Cave - Cave Reload
// @namespace    http://tampermonkey.net/
// @version      1.0.5
// @description  Cave shuffles every minutes - but does not update exactly at every 5th minute
// @author       kakol20
// @match        https://dragcave.net/locations/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dragcave.net
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/kakol20/Dragon-Cave-Userscripts/main/cave.js
// @updateURL    https://raw.githubusercontent.com/kakol20/Dragon-Cave-Userscripts/main/cave.js
// ==/UserScript==

(function() {
  'use strict';

  const style = `
    position:fixed;left:10px;top:10px;
    background-color: color-mix(in oklab, Canvas 50%, transparent);
    width: auto;
    color: CanvasText;
    padding:5px;
    border-radius: 5px;`;

  const reloadAtSecond = 3;

  setInterval(() => {
    const dateNow = Date.now();
    const dateStr = new Date(dateNow);
    const dateMinutes = dateStr.getMinutes();
    const dateSeconds = dateStr.getSeconds();

    if (dateMinutes % 5 === 0 && dateSeconds === reloadAtSecond) location.reload();

    let timerDiv = document.getElementById('k20_timer');

    if (timerDiv === null) {
      let createDiv = document.createElement('div');

      createDiv.style.cssText = style;
      createDiv.setAttribute('id', 'k20_timer');
      document.body.appendChild(createDiv);
    }

    let timeLeft = ((Math.ceil(dateMinutes / 5) * 5 * 60) + reloadAtSecond) - (dateMinutes * 60 + dateSeconds);
    if (timeLeft < 0) timeLeft += 5 * 60;
    const minutesLeft = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;

    let output = `<small>${dateStr}
      <br>Time Until Reload:
      ${minutesLeft} ${minutesLeft === 1 ? 'minute' : 'minutes'} &
      ${secondsLeft} ${secondsLeft === 1 ? 'second' : 'seconds'}
      </small>`;

    document.getElementById('k20_timer').innerHTML = output;
  }, 1000);
})();