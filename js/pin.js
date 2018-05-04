'use strict';

(function () {

// Копируем шаблон и заполняем данными блок пина

  var DIFF_PIN_X = 50 / 2; // 50 - ширина блока img с пином (пин находится посередине, поэтому делим на 2)
  var DIFF_PIN_Y = 70; // 70 - высота блока img с пином
  var QUANTITY_ADVERT = 5;
  var pins = [];

  var onSuccessLoad = function (dataServer) {
    pins.push(...dataServer);
  };

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('errorMessage');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccessLoad, onErrorLoad);

  var mapPin = window.card.template.content.querySelector('.map__pin');

  var renderPin = function (data) {
    var filtersBlock = window.map.map.querySelector('.map__filters-container');
    var pinElement = mapPin.cloneNode(true); // Копируем шаблон
    var pinX = data.location.x - DIFF_PIN_X; // координаты метки по оси X
    var pinY = data.location.y - DIFF_PIN_Y; // координаты метки по оси Y
    pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    pinElement.querySelector('img').src = data.author.avatar
    pinElement.querySelector('img').alt = data.offer.title;
    var openCard = function (evt) {
      var target = evt.target;
      var buttonClick = target.closest('button');
      if (!buttonClick) {
        return;
      }
      window.map.map.insertBefore(window.card.renderCard(data), filtersBlock);
      document.addEventListener('keydown', window.card.onPopupEscPress);
    };
    var onPinOpenCardClick = function (evt) {
      openCard(evt);
    };
    var onPinOpenCardKeydown = function (evt) {
      if (evt.keyCode === window.card.enterKeycode) {
        openCard(evt);
      }
    };
    pinElement.addEventListener('click', onPinOpenCardClick);
    pinElement.addEventListener('keydown', onPinOpenCardKeydown);
    return pinElement;
  };
  // Отрисовали блок пина

    var createPins = function (data, k) {
    var getLength = data.length >= k ? k : data.length;
    var pinBlock = window.map.map.querySelector('.map__pins');
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < getLength; i++) {
      pinFragment.appendChild(renderPin(data[i]));
    }

    pinBlock.appendChild(pinFragment);
    return pinBlock;
  };

  /**//**//**//**/

  window.pin = {
    createPins: createPins,
    pins: pins,
    mapPin: mapPin,
    renderPin: renderPin,
  };

})();
