'use strict';

var QUANTITY_ADVERT = 8;
var X_COORDINATE_MIN = 300;
var X_COORDINATE_MAX = 900;
var Y_COORDINATE_MIN = 150;
var Y_COORDINATE_MAX = 500;
var DIFF_PIN_X = 50 / 2; // 50 - ширина блока img с пином (пин находится посередине, поэтому делим на 2)
var DIFF_PIN_Y = 70; // 70 - высота блока img с пином
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var ROOMS_QUANTITY = 5;
var GUESTS_QUANTITY = 10;

var MAP_PIN_BUTTON_SIZE = 65;
var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 87;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// массивы данных

var AVATARS_PHOTO = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

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
var CHECKIN_OFFER = ['12:00', '13:00', '14:00'];
var CHECKOUT_OFFER = ['12:00', '13:00', '14:00'];
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


// Находим элемент, в который будем вставлять фрагмент

var map = document.querySelector('.map');
var pinBlock = map.querySelector('.map__pins');

// Находим шаблоны для объявления

var cardTemplate = document.querySelector('template');
var mapPin = cardTemplate.content.querySelector('.map__pin');
var mapCard = cardTemplate.content.querySelector('.map__card');

var filtersBlock = map.querySelector('.map__filters-container');


// Поиск случайного числа(number) в диапазоне

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// случайный выбор в массиве

var getRandomValue = function (arr) {
  var max = arr.length - 1;
  var rand = Math.random() * (max + 1);
  rand = Math.floor(rand);
  return rand;
};

// Перемешивание массива

var getRandomSort = function (array) {
  return array.sort(function () {
    return 0.5 - Math.random();
  });
};

// Случайное число элементов массива для features

var getRandomArray = function () {
  var array = getRandomSort(FEATURES_OFFER);
  var arraySize = getRandomNumber(1, array.length);
  var newArray = [];
  for (var i = 0; i < arraySize; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

// Создание основного массива с объектами

var getAdvert = function () {
  var xСoordinate = getRandomNumber(X_COORDINATE_MIN, X_COORDINATE_MAX);
  var yСoordinate = getRandomNumber(Y_COORDINATE_MIN, Y_COORDINATE_MAX);
  var adverts = [];
  for (var i = 0; i < QUANTITY_ADVERT; i++) {
    adverts[i] = {
      author: {
        avatar: AVATARS_PHOTO[i]
      },
      offer: {
        title: OFFER_TITLE[getRandomValue(OFFER_TITLE)],
        address: xСoordinate + ',' + yСoordinate,
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: TYPE_OFFER[getRandomValue(TYPE_OFFER)],
        rooms: getRandomNumber(1, ROOMS_QUANTITY),
        guests: getRandomNumber(1, GUESTS_QUANTITY),
        checkin: CHECKIN_OFFER[getRandomValue(CHECKIN_OFFER)],
        checkout: CHECKOUT_OFFER[getRandomValue(CHECKOUT_OFFER)],
        features: getRandomArray(),
        description: '',
        photos: getRandomSort(PHOTOS_OFFER)
      },
      location: {
        x: getRandomNumber(X_COORDINATE_MIN, X_COORDINATE_MAX) - DIFF_PIN_X,
        y: getRandomNumber(Y_COORDINATE_MIN, Y_COORDINATE_MAX) - DIFF_PIN_Y
      }
    };
  }
  return adverts;
};
var cards = getAdvert();

// Функция создания features

var createFeaturesElement = function (array) {
  var featuresFragment = document.createDocumentFragment();
  for (var j = 0; j < array.length; j++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + array[j]);
    featuresFragment.appendChild(featureElement);
  }
  return featuresFragment;
};

// Копируем шаблон и заполняем данными блок объявления

var cardElement = mapCard.cloneNode(true);

var renderCard = function (advert) {
  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';

  var cardType;
  switch (advert.offer.type) {
    case 'flat':
      cardType = 'Квартира';
      break;
    case 'house':
      cardType = 'Дом';
      break;
    case 'bungalo':
      cardType = 'Бунгало';
      break;
    default:
      cardType = 'Дворец';
      break;
  }

  cardElement.querySelector('.popup__type').textContent = cardType;

  var cardRooms;
  switch (advert.offer.rooms) {
    case 1:
      cardRooms = 'комната';
      break;
    case 5:
      cardRooms = 'комнат';
      break;
    default:
      cardRooms = 'комнаты';
      break;
  }

  var cardGuests;
  switch (advert.offer.guests) {
    case 1:
      cardGuests = 'гостя';
      break;
    default:
      cardGuests = 'гостей';
      break;
  }

  cardElement.querySelector('.popup__text--capacity').textContent =
advert.offer.rooms + ' ' + ' ' + cardRooms + ' ' + 'для' + ' ' + advert.offer.guests + ' ' + cardGuests;

  cardElement.querySelector('.popup__text--time').textContent =
'Заезд после' + ' ' + advert.offer.checkin + ',' + ' ' + 'выезд до' + ' ' + advert.offer.checkout;

  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(createFeaturesElement(advert.offer.features));
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;

  var photoList = cardElement.querySelector('.popup__photos');
  var photoItem = photoList.querySelector('.popup__photo');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advert.offer.photos.length; i++) {
    var photoElement = photoItem.cloneNode(true);
    photoElement.src = advert.offer.photos[i];
    fragment.appendChild(photoElement);
  }
  while (photoList.querySelector('.popup__photo')) {
    photoItem = photoList.querySelector('.popup__photo');
    photoList.removeChild(photoItem);
  }

  photoList.appendChild(fragment);

  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
  cardElement.classList.remove('hidden');

  var cardClose = cardElement.querySelector('.popup__close');

  var closeCard = function () {
    cardElement.classList.add('hidden');
  };

  var onButtonCloseClick = function () {
    closeCard();
  };

  var onButtonCloseTab = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  cardClose.addEventListener('click', onButtonCloseClick);
  cardClose.addEventListener('keydown', onButtonCloseTab);

  return cardElement;
};


// Копируем шаблон и заполняем данными блок пина

var renderPin = function (advert, i) {

  var pinElement = mapPin.cloneNode(true); // Копируем шаблон

  var pinX = advert.location.x; // координаты метки по оси X
  var pinY = advert.location.y; // координаты метки по оси Y

  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  pinElement.querySelector('img').src = advert.author.avatar;
  pinElement.querySelector('img').alt = advert.offer.title;
  pinElement.setAttribute('data-index', i);

  var openPin = function (evt) {
    var target = evt.target.closest('button');
    var index = target.dataset.index;
    renderCard(cards[index]);
  };

  var onPinOpenClick = function (evt) {
    openPin(evt);
  };

  var onPinOpenTab = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPin(evt);
    }
  };

  pinElement.addEventListener('click', onPinOpenClick);
  pinElement.addEventListener('keydown', onPinOpenTab);

  return pinElement;
};


// Отрисовали блок пина

var createPins = function () {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < cards.length; i++) {
    pinFragment.appendChild(renderPin(cards[i], i));
  }
  pinBlock.appendChild(pinFragment);
};


// Активация страницы //

var form = document.querySelector('.ad-form');
var formFieldset = form.querySelectorAll('fieldset');
var inputAddress = form.querySelector('input[name="address"]');
var mapPinMain = map.querySelector('.map__pin--main');


var mapPinButtonCoordinate = Math.floor((parseInt(mapPinMain.style.left, 10) + MAP_PIN_BUTTON_SIZE / 2)) + ' , '
+ Math.floor((parseInt(mapPinMain.style.top, 10) + MAP_PIN_BUTTON_SIZE / 2));
inputAddress.value = mapPinButtonCoordinate;

var mapPinMainCoordinate = Math.floor((parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2)) + ' , '
+ Math.floor((parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT));


var activatePage = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');


  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].removeAttribute('disabled');
  }

  inputAddress.value = mapPinMainCoordinate;
  createPins(cards);

  map.insertBefore(renderCard(cards[0]), filtersBlock);
  cardElement.classList.add('hidden');
};

var onMapPinMainMouseup = function () {
  activatePage();
};

var onMapPinMainTab = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
};

mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);
mapPinMain.addEventListener('keydown', onMapPinMainTab);

