// ==UserScript==
// @name         Dragon Cave - Scroll Reload
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  Reload Scroll Every 30 Minutes
// @author       kakol20
// @match        https://dragcave.net/dragons*
// @match        https://dragcave.net/user/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dragcave.net
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/kakol20/Dragon-Cave-Tampermonkey/main/scroll.js
// @updateURL    https://raw.githubusercontent.com/kakol20/Dragon-Cave-Tampermonkey/main/scroll.js
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

  const reloadMinutes = 15;
  const reloadAtSecond = 0;
  const reloadTimeMilliseconds = (reloadMinutes * 60 + reloadAtSecond) * 1000;

  let counter = 0;
  setInterval(() => { 
    const dateNow = Date.now();
    const dateStr = new Date(dateNow);
    const dateMinutes = dateStr.getMinutes();
    const dateSeconds = dateStr.getSeconds();

    if ((Math.floor(dateNow / 1000) * 1000) % reloadTimeMilliseconds === 0 && counter >= 1) location.reload();

    let timerDiv = document.getElementById('k20_timer');

    if (timerDiv === null) {
      let createDiv = document.createElement('div');
      const style = `
        position:fixed;left:10px;top:10px;
        background-color: color-mix(in oklab, Canvas 50%, transparent);
        width: auto;
        color: CanvasText;
        padding:5px;
        border-radius: 5px;`;

      createDiv.style.cssText = style;
      createDiv.setAttribute('id', 'k20_timer');
      document.body.appendChild(createDiv);
    }

    let timeLeft = ((Math.ceil(dateMinutes / reloadMinutes) * reloadMinutes * 60) + reloadAtSecond) - (dateMinutes * 60 + dateSeconds);
    if (timeLeft < 0) timeLeft += reloadMinutes * 60;
    const minutesLeft = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;

    let output = `<small>${dateStr}
      <br>Time Until Reload:
      ${minutesLeft} ${minutesLeft === 1 ? 'minute' : 'minutes'} &
      ${secondsLeft} ${secondsLeft === 1 ? 'second' : 'seconds'}
      </small>`;

    document.getElementById('k20_timer').innerHTML = output;
    ++counter;
  }, 1000); 
})();