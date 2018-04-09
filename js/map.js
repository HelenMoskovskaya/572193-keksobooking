'use strict';

// удаляем класс для активации карты

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Находим элемент, в который будем вставлять фрагмент

var pinBlock = map.querySelector('.map__pins');

// Находим шаблон

var pinTemplate = document.querySelector('template')
.content.querySelector('.map__pin');


// массивы данных

var offerTitle = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var typeOffer = ['palace', 'flat', 'house', 'bungalo'];
var checkinOffer = ['12:00', '13:00' ,'14:00'];
var checkoutOffer = ['12:00', '13:00' ,'14:00'];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var photosOffer = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

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

var getRandomArray = function (array, length) {
  var randomArray = [];
  if (!length) {
    length = getRandomValue(1, array.length, true);
  }

  var i = 0;
  while (i < length) {
    var currentElement = array[getRandomValue(0, length - 1, true)];
    if (!ifContains(randomArray, currentElement)) {
      randomArray[i] = currentElement;
      i++;
    }
  }
  return randomArray;
};

// Создание основного массива с объектами

var getAdvert = function () {
  var xСoordinate = getRandomNumber(300,900);
  var yСoordinate = getRandomNumber(150,500);
  var advert = [];
  for (var i = 0; i < 8; i++) {
    advert[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1,8) +'.png'
      },
      offer: {
        title: offerTitle[getRandomValue(offerTitle)],
        address: xСoordinate + ',' + yСoordinate,
        price: getRandomNumber(1000,1000000),
        type: typeOffer[getRandomValue(typeOffer)],
        rooms: getRandomNumber(1,5),
        guests: getRandomNumber(1,10),
        checkin: checkinOffer[getRandomValue(checkinOffer)],
        checkout: checkoutOffer[getRandomValue(checkoutOffer)],
        features: features[getRandomArray(features)],
        description: '',
        photos: photosOffer[getRandomArray(photosOffer)]
      },
      location: {
        x: xСoordinate,
        y: yСoordinate
      }
    }
  }
  return advert;
};

//Копируем шаблон и заполняем данными

var renderPin = function (advert) {
  var pinElement = pinTemplate.cloneNode(true); // Копируем шаблон

  var pinX = advert.location.x; // координаты метки по оси X
  var pinY = advert.location.y; // координаты метки по оси Y

  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  pinElement.querySelector('img').src = advert.author.avatar;
  pinElement.querySelector('img').alt = advert.offer.title;

  return pinElement;
};


// Отрисовали блок

var createPin = function(advert) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advert.length; i++) {
    fragment.appendChild(renderPin(advert[i]));
  }
    pinBlock.appendChild(fragment);

};

createPin(getAdvert());




