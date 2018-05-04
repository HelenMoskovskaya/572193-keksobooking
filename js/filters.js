'use strict';

(function () {

  var MIN_HOUSING_FILTER_PRICE = 10000;
  var MAX_HOUSING__FILTER_PRICE = 50000;

  var mapFilters = document.querySelector('.map__filters-container');

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
        return pin.offer.price >= MIN_HOUSING_FILTER_PRICE && pin.offer.price <= MAX_HOUSING__FILTER_PRICE;
      case 'high':
        return pin.offer.price >= MAX_HOUSING__FILTER_PRICE;
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

  var filteredPins = function () {
    var newPins = window.pin.pins.slice();
    var filters = newPins.filter(changeHousingType).filter(changeHousingPrice).
        filter(changeHousingRooms).filter(changeHousingGuests).filter(changeHousingFeatures);
    window.map.deletePins();
    window.card.setCloseCard();
    window.pin.createPins(filters, 5);
  };

  var onFiltersChange = function () {
    window.debounce.debounce(filteredPins, window.debounce.debounceInterval);
  };

  mapFilters.addEventListener('change', onFiltersChange);

})();
