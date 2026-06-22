// ==UserScript==
// @name         Dragon Cave - Cave Reload
// @namespace    http://tampermonkey.net/
// @version      1.0.7
// @description  Cave shuffles every 5 minutes
// @author       kakol20
// @match        https://dragcave.net/locations/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dragcave.net
// @downloadURL  https://raw.githubusercontent.com/kakol20/Dragon-Cave-Userscripts/main/cave.js
// @updateURL    https://raw.githubusercontent.com/kakol20/Dragon-Cave-Userscripts/main/cave.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  const fontName = 'Cascadia Code';

  // https://fonts.google.com/selection/embed
  const link1 = document.createElement('link');
  link1.rel = 'preconnect';
  link1.href = 'https://fonts.googleapis.com';

  const link2 = document.createElement('link');
  link2.rel = 'preconnect';
  link2.crossOrigin = 'anonymous';

  const link3 = document.createElement('link');
  link3.rel = 'stylesheet';
  link3.href = 'https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap';

  GM_addStyle(`
    .cascadia-code-cascadia {
      font-family: "Cascadia Code", sans-serif;
      font-optical-sizing: auto;
      font-weight: 200;
      font-style: normal;
    }
  `);

  // Ensure the head exists before appending (important for document-start)
  const target = document.head || document.documentElement;
  target.appendChild(link1);
  target.appendChild(link2);
  target.appendChild(link3);

  const style = `
    font-family: '${fontName}';
    position:fixed;left:10px;top:10px;
    background-color: color-mix(in oklab, Canvas 75%, transparent);
    width: auto;
    color: CanvasText;
    padding:5px;
    border-radius: 5px;
  `;

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