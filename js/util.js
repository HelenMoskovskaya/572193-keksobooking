'use strict';

(function () {

  var variablesConst = {

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    PIN_TIP_HEIGHT: 22,
    MAX_LIMIT_TOP: 500,
    MIN_LIMIT_TOP: 150,
    URL_GET: 'https://js.dump.academy/keksobooking/data',
    URL_POST: 'https://js.dump.academy/keksobooking',
    DEBOUNCE_INTERVAL: 500
  };

  var loadErrorPopup = function (errorMessage) {
    var popup = document.createElement('div');
    popup.classList.add('loadPopup');

    var errorMessege = document.createElement('p');
    errorMessege.classList.add('loadMessege');
    errorMessege.textContent = errorMessage;
    popup.appendChild(errorMessege);

    var loadPopupButton = document.createElement('button');
    loadPopupButton.classList.add('loadPopupButton');
    loadPopupButton.textContent = 'Закрыть';
    popup.appendChild(loadPopupButton);

    loadPopupButton.addEventListener('click', function () {
      popup.style.display = 'none';
    });

    document.body.insertAdjacentElement('afterbegin', popup);
    return popup;
  };

  window.util = {
    variablesConst: variablesConst,
    loadErrorPopup: loadErrorPopup,
  };

})();
