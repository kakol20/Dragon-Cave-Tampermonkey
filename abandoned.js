// ==UserScript==
// @name         Dragon Cave - Abandoned Reload
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  try to take over the world!
// @author       kakol20
// @match        https://dragcave.net/abandoned
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dragcave.net
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/kakol20/Dragon-Cave-Tampermonkey/main/abandoned.js
// @updateURL    https://raw.githubusercontent.com/kakol20/Dragon-Cave-Tampermonkey/main/abandoned.js
// ==/UserScript==

(function() {
  'use strict';
  const reloadTimeSeconds = 12;
  const reloadTimeMilliseconds = reloadTimeSeconds * 1000;

  let counter = 0;
  setInterval(() => {
    const dateNow = Date.now();
    const dateStr = new Date(dateNow);
    // const dateMinutes = dateStr.getMinutes();
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

    // const dateReloadTime = Math.ceil(dateNow / (reloadTime * 1000)) * (reloadTime * 1000);

    const dateOfReload = Math.ceil(dateNow / reloadTimeMilliseconds) * reloadTimeMilliseconds;
    const millisecondsLeft = dateOfReload - dateNow;
    const secondsLeft = Math.ceil(millisecondsLeft / 1000);

    let output = `<small>${dateStr}
      <br>Time Until Reload:
      ${secondsLeft} ${secondsLeft === 1 ? 'second' : 'seconds'}
      </small>`;

    document.getElementById('k20_timer').innerHTML = output;
    ++counter;
  }, 1 * 1000);
})();