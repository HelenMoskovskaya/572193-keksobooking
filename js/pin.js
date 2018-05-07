'use strict';

(function () {

  var map = document.querySelector('.map');
  var filtersBlock = map.querySelector('.map__filters-container');

  // Копируем шаблон и заполняем данными блок пина

  var renderPin = function (data) {
    var mapPin = window.card.template.content.querySelector('.map__pin');
    var mapButton = map.querySelector('.map__pins button');
    var pinElement = mapPin.cloneNode(true); // Копируем шаблон
    var pinX = data.location.x - mapButton.offsetWidth / 2; // координаты метки по оси X
    var pinY = data.location.y - mapButton.offsetHeight; // координаты метки по оси Y

    pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    var openCard = function (evt) {
      var target = evt.target;
      var buttonClick = target.closest('button');
      if (!buttonClick) {
        return;
      }

      map.insertBefore(window.card.renderPopup(data), filtersBlock);
      document.addEventListener('keydown', window.card.onPopupEscPress);
    };

    var onPinOpenCardClick = function (evt) {
      openCard(evt);
    };

    var onPinOpenCardKeydown = function (evt) {
      if (evt.keyCode === window.util.variablesConst.ENTER_KEYCODE) {
        openCard(evt);
      }
    };

    pinElement.addEventListener('click', onPinOpenCardClick);
    pinElement.addEventListener('keydown', onPinOpenCardKeydown);
    return pinElement;
  };

  // Создаем блок для пинов

  (function () {
    window.pinsWrapper = document.createElement('div');
    window.pinsWrapper.classList.add('pinsWrapper');
    map.insertBefore(window.pinsWrapper, filtersBlock);
  })();

  // Отрисовываем пины в браузере

  var createPins = function (data, k) {
    var lengthPins = data.length >= k ? k : data.length;
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < lengthPins; i++) {
      pinFragment.appendChild(renderPin(data[i]));
    }
    window.pinsWrapper.appendChild(pinFragment);
  };

  window.pin = {
    map: map,
    createPins: createPins,
  };

})();
