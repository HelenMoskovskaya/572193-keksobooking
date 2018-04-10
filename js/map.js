'use strict';

// удаляем класс для активации карты

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Находим элемент, в который будем вставлять фрагмент

var pinBlock = map.querySelector('.map__pins');

// Находим шаблон для пина

var pinTemplate = document.querySelector('template')
.content.querySelector('.map__pin');

// Находим шаблон для объявления

var cardTemplate = document.querySelector('template')
.content.querySelector('.map__card');



// массивы данных

var OFFER_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_OFFER = ['12:00', '13:00' ,'14:00'];
var CHECKOUT_OFFER = ['12:00', '13:00' ,'14:00'];
var FEATURES_OFFER = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS_OFFER = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var QUANTITY_ADVERT = 8;
var X_COORDINATE_MIN = 300;
var X_COORDINATE_MAX = 900;
var Y_COORDINATE_MIN = 150;
var Y_COORDINATE_MAX = 500;
var DIFF_PIN_X = 50 / 2; // 50 - ширина блока img с пином (пин находится посередине, поэтому делим на 2)
var DIFF_PIN_Y = 70 // 70 - высота блока img с пином
var AVATAR_QUANTITY = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var ROOMS_QUANTITY = 5;
var GUESTS_QUANTITY = 10;

// Поиск случайного числа(number) в диапазоне

var getRandomNumber = function (min, max) {
  return Math.floor (Math.random() * (max - min + 1)) + min;
};

// случайный выбор в массиве

var getRandomValue = function (arr) {
  var max = arr.length - 1;
  var rand = Math.random() * (max + 1);
  rand = Math.floor(rand);
  return rand;
};


// Случайная длина массива

var getRandomArray = function (array) {
    var counter = array.length, temp, index;
    while (counter--) {
        index = (Math.random() * counter) | 0;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}


// Создание основного массива с объектами

var getAdvert = function () {
  var xСoordinate = getRandomNumber(X_COORDINATE_MIN,X_COORDINATE_MAX);
  var yСoordinate = getRandomNumber(Y_COORDINATE_MIN,Y_COORDINATE_MAX);
  var advert = [];
  for (var i = 0; i < QUANTITY_ADVERT; i++) {
    advert[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1,AVATAR_QUANTITY) +'.png'
      },
      offer: {
        title: OFFER_TITLE[getRandomValue(OFFER_TITLE)],
        address: xСoordinate + ',' + yСoordinate,
        price: getRandomNumber(MIN_PRICE,MAX_PRICE),
        type: TYPE_OFFER[getRandomValue(TYPE_OFFER)],
        rooms: getRandomNumber(1,ROOMS_QUANTITY),
        guests: getRandomNumber(1,GUESTS_QUANTITY),
        checkin: CHECKIN_OFFER[getRandomValue(CHECKIN_OFFER)],
        checkout: CHECKOUT_OFFER[getRandomValue(CHECKOUT_OFFER)],
        features: getRandomArray(FEATURES_OFFER.slice(0, getRandomNumber(0, FEATURES_OFFER.length - 1))),
        description: '',
        photos: PHOTOS_OFFER[getRandomValue(PHOTOS_OFFER.sort())]
      },
      location: {
        x: getRandomNumber(X_COORDINATE_MIN,X_COORDINATE_MAX) - DIFF_PIN_X,
        y: getRandomNumber(Y_COORDINATE_MIN,Y_COORDINATE_MAX) - DIFF_PIN_Y
      }
    }
  }
  return advert;
};

var advertShow = getAdvert();



//Копируем шаблон и заполняем данными блок объявления

var renderCard = function (advert) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';

  var cardType = cardElement.querySelector('.popup__type').textContent = advert.offer.type;
  if (advert.offer.type === 'flat') {
    cardType = 'Квартира';
  } else if (advert.offer.type === 'house') {
    cardType = 'Дом';
  } else if (advert.offer.type === 'bungalo') {
    cardType = 'Бунгало';
  } else {
    cardType = 'Дворец';
  }

  var cardRooms;
  if (advert.offer.rooms === 1) {
    cardRooms = 'комната';
  } else if (advert.offer.rooms === 5) {
    cardRooms = 'комнат';
  } else {
      cardRooms = 'комнаты';
    }

  var cardGuests;
  if (advert.offer.guests === 1) {
    cardGuests = 'гостя';
  } else {
    cardGuests = 'гостей'
  }

  cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' ' + ' ' + cardRooms + ' ' + 'для' + ' ' + cardGuests;

  //cardElement.querySelector('.popup__features').textContent = advert.offer.features;
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;

  for (var i = 0; i < PHOTOS_OFFER.length - 1; i++) {
    cardElement.querySelector('.popup__photos').
    appendChild(cardElement.querySelector('.popup__photo').cloneNode(true));
  };

  for (var i = 0; i < PHOTOS_OFFER.length; i++) {
   cardElement.querySelector('.popup__photo').src = advert.offer.photos;
  };

  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

  return cardElement;
};


// Отрисовали блок объявления

var createCard = function(advert) {
  var cardFragment = document.createDocumentFragment();
  for (var i = 0; i < advert.length; i++) {
    cardFragment.appendChild(renderCard(advert[i]));
  }
    pinBlock.appendChild(cardFragment);

};

// запустили объявление в браузер

createCard(advertShow);

//Копируем шаблон и заполняем данными блок пина

var renderPin = function (advert) {
  var pinElement = pinTemplate.cloneNode(true); // Копируем шаблон

  var pinX = advert.location.x; // координаты метки по оси X
  var pinY = advert.location.y; // координаты метки по оси Y

  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  pinElement.querySelector('img').src = advert.author.avatar;
  pinElement.querySelector('img').alt = advert.offer.title;

  return pinElement;
};


// Отрисовали блок пина

var createPin = function(advert) {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < advert.length; i++) {
    pinFragment.appendChild(renderPin(advert[i]));
  }
    pinBlock.appendChild(pinFragment);

};

// запустили пин в браузер

createPin(advertShow);

