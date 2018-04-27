'use strict';

(function () {

// Копируем шаблон и заполняем данными блок пина

  var DIFF_PIN_X = 50 / 2; // 50 - ширина блока img с пином (пин находится посередине, поэтому делим на 2)
  var DIFF_PIN_Y = 70; // 70 - высота блока img с пином
  var QUANTITY_ADVERT = 8;
  var data;

  var successHandler = function (dataServer) {
    data = dataServer;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.style.margin = '0 auto';
    node.style.width = 1200 + 'px';
    node.style.textAlign = 'center';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '25px';
    node.style.backgroundColor = 'blue';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var renderPin = function (advert, i) {
    var mapPin = window.card.template.content.querySelector('.map__pin');
    var filtersBlock = window.map.map.querySelector('.map__filters-container');
    var pinElement = mapPin.cloneNode(true); // Копируем шаблон
    var pinX = advert.location.x - DIFF_PIN_X; // координаты метки по оси X
    var pinY = advert.location.y - DIFF_PIN_Y; // координаты метки по оси Y
    pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    pinElement.querySelector('img').src = 'img/avatars/user' + '0' + (i + 1) + '.png';
    pinElement.querySelector('img').alt = advert.offer.title;
    pinElement.setAttribute('data-index', i);
    var openCard = function (evt) {
      var target = evt.target;
      var buttonClick = target.closest('button');
      if (!buttonClick) {
        return;
      }
      window.map.map.insertBefore(window.card.renderCard(data[i]), filtersBlock);
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

  var createPins = function () {
    var pinBlock = window.map.map.querySelector('.map__pins');
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < QUANTITY_ADVERT; i++) {
      pinFragment.appendChild(renderPin(data[i], i));
    }
    pinBlock.appendChild(pinFragment);
  };
  /**//**//**//**/

  window.pin = {
    createPins: createPins,
    errorHandler: errorHandler,
  };

})();
