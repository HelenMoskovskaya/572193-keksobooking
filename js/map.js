'use strict';

(function () {

  var MAP_PIN_BUTTON_START_LEFT = 570;
  var MAP_PIN_BUTTON_START_TOP = 375;
  var mapPinMain = window.pin.map.querySelector('.map__pin--main');

  // Координаты главного пина (до активации) //

  var getMainButtonCoordinate = function () {
    var mapPinButtonCoordinate = Math.floor((parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2)) + ' , '
    + Math.floor((parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetWidth / 2));

    window.form.inputAddress.value = mapPinButtonCoordinate;
    return mapPinButtonCoordinate;
  };

  // Координаты главного пина //

  var getPinMainCoordinate = function () {
    var mapPinMainCoordinate = Math.floor((parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2)) + ' , '
    + Math.floor((parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight + window.util.variablesConst.PIN_TIP_HEIGHT));

    return mapPinMainCoordinate;
  };

  // Активация страницы //

  var activatePage = function () {
    window.pin.map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');

    for (var i = 0; i < window.form.formFieldset.length; i++) {
      window.form.formFieldset[i].removeAttribute('disabled');
    }

    window.form.inputAddress.value = getPinMainCoordinate();

    var onSuccessLoad = function (dataServer) {
      window.pins = dataServer;
      window.pin.createPins(window.pins, 5);
    };

    window.backend.requestData(window.util.variablesConst.URL_GET, 'GET', null, onSuccessLoad,
        window.util.loadErrorPopup);

    mapPinMain.addEventListener('mousedown', window.dragAndDrop.onMapPinMainMove);
    mapPinMain.removeEventListener('mouseup', onButtonMainPinClick);
    mapPinMain.removeEventListener('keydown', onButtonMainPinKeyDown);
  };

  var onButtonMainPinClick = function () {
    activatePage();
  };

  var onButtonMainPinKeyDown = function (evt) {
    if (evt.keyCode === window.util.variablesConst.ENTER_KEYCODE) {
      activatePage();
    }
  };

  var showPage = function () {
    mapPinMain.addEventListener('mouseup', onButtonMainPinClick);
    mapPinMain.addEventListener('keydown', onButtonMainPinKeyDown);
  };


  var getInputsDisabled = function () {
    for (var i = 0; i < window.form.formFieldset.length; i++) {
      window.form.formFieldset[i].setAttribute('disabled', '');
    }
  };

  var resetMapAndForm = function () {
    window.pin.map.classList.add('map--faded');
    window.form.form.classList.add('ad-form--disabled');
    getInputsDisabled();
    mapPinMain.style.left = MAP_PIN_BUTTON_START_LEFT + 'px';
    mapPinMain.style.top = MAP_PIN_BUTTON_START_TOP + 'px';
    document.querySelector('.pinsWrapper').innerHTML = '';
    window.card.setCloseCard();
    window.form.form.reset();
    getMainButtonCoordinate();
    showPage();
    window.form.changeType();
    window.filters.mapFilters.reset();
  };

  var onButtonResetClick = function () {
    resetMapAndForm();
  };

  var onButtonResetKeydown = function (evt) {
    if (evt.keyCode === window.card.enterKeycode) {
      resetMapAndForm();
    }
  };

  var setReset = function () {
    var resetButton = window.form.form.querySelector('.ad-form__reset');

    resetButton.addEventListener('click', onButtonResetClick);
    resetButton.addEventListener('keydown', onButtonResetKeydown);
  };

  var initMap = function () {
    showPage();
    setReset();
  };

  initMap();

  window.map = {
    mapPinMain: mapPinMain,
    getMainButtonCoordinate: getMainButtonCoordinate,
    getPinMainCoordinate: getPinMainCoordinate,
    resetMapAndForm: resetMapAndForm
  };

})();
