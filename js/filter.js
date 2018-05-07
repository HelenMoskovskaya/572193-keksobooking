'use strict';

(function () {

  var MIN_HOUSING_FILTER_PRICE = 10000;
  var MAX_HOUSING_FILTER_PRICE = 50000;

  var mapFilters = document.querySelector('.map__filters');

  var changeHousingType = function (pin) {
    var housingType = mapFilters.querySelector('#housing-type');

    switch (housingType.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.type === housingType.value;
    }
  };

  var changeHousingPrice = function (pin) {
    var housingPrice = mapFilters.querySelector('#housing-price');

    switch (housingPrice.value) {
      case 'low':
        return pin.offer.price <= MIN_HOUSING_FILTER_PRICE;
      case 'middle':
        return pin.offer.price >= MIN_HOUSING_FILTER_PRICE && pin.offer.price <= MAX_HOUSING_FILTER_PRICE;
      case 'high':
        return pin.offer.price >= MAX_HOUSING_FILTER_PRICE;
      default:
        return pin;
    }
  };

  var changeHousingRooms = function (pin) {
    var housingRooms = mapFilters.querySelector('#housing-rooms');

    switch (housingRooms.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.rooms === parseInt(housingRooms.value, 10);
    }
  };

  var changeHousingGuests = function (pin) {
    var housingGuests = mapFilters.querySelector('#housing-guests');

    switch (housingGuests.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.guests === parseInt(housingGuests.value, 10);
    }
  };

  var changeHousingFeatures = function (pin) {
    var housingFeatures = mapFilters.querySelectorAll('.map__checkbox');

    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && pin.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var getFiltersPins = function () {
    var newPins = window.pins.slice();

    document.querySelector('.pinsWrapper').innerHTML = '';

    var filters = newPins.filter(changeHousingType).filter(changeHousingPrice).
        filter(changeHousingRooms).filter(changeHousingGuests).filter(changeHousingFeatures);

    window.pin.createPins(filters, 5);
    window.card.setClosePopup();
  };

  var onFiltersChange = function () {
    window.util.debounce(getFiltersPins);
  };

  mapFilters.addEventListener('change', onFiltersChange);

  window.filter = {
    mapFilters: mapFilters
  };

})();
