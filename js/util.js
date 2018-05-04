'use strict';

(function () {

  var variablesConst = {

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    MAP_PIN_MAIN_WIDTH: 65,
    MAP_PIN_MAIN_HEIGHT: 87,
    URL_GET: 'https://js.dump.academy/keksobooking/data',
    URL_POST: 'https://js.dump.academy/keksobooking'
  };

  var deletePins = function () {
    var pins = document.querySelector('.map__pins');
    var buttons = pins.querySelectorAll('button');

    for (var j = 1; j < buttons.length; j++) {
      pins.removeChild(buttons[j]);
    }
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

  /**//**//**//**/

  window.util = {
    variablesConst: variablesConst,
    loadErrorPopup: loadErrorPopup,
    deletePins: deletePins
  };

})();
