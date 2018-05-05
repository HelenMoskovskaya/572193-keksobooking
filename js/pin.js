'use strict';

(function () {

  var DIFF_PIN_X = 50 / 2; // 50 - ширина блока img с пином (пин находится посередине, поэтому делим на 2)
  var DIFF_PIN_Y = 70; // 70 - высота блока img с пином
  var map = document.querySelector('.map');
  var filtersBlock = map.querySelector('.map__filters-container');

  // Копируем шаблон и заполняем данными блок пина

  var renderPin = function (data) {
    var mapPin = window.card.template.content.querySelector('.map__pin');
    var pinElement = mapPin.cloneNode(true); // Копируем шаблон
    var pinX = data.location.x - DIFF_PIN_X; // координаты метки по оси X
    var pinY = data.location.y - DIFF_PIN_Y; // координаты метки по оси Y

    pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    var openCard = function (evt) {
      var target = evt.target;
      var buttonClick = target.closest('button');
      if (!buttonClick) {
        return;
      }

      map.insertBefore(window.card.renderCard(data), filtersBlock);
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
    var getLength = data.length >= k ? k : data.length;
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < getLength; i++) {
      pinFragment.appendChild(renderPin(data[i]));
    }
    window.pinsWrapper.appendChild(pinFragment);
  };

  window.pin = {
    map: map,
    createPins: createPins,
  };

})();
