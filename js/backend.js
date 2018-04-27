'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';

  var getData = function (onLoad, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    var onXhrLoad = function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
    var onXhrError = function () {
      onError('Произошла ошибка соединения');
    };
    var onXhrTimeout = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };
    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);
    xhr.timeout = 10000;
    if (method === 'GET') {
      xhr.open('GET', URL_GET);
      xhr.send();
    } else {
      xhr.open('POST', URL_POST);
      xhr.send(data);
    }
  };

  var load = function (onLoad, onError) {
    getData(onLoad, onError, 'GET');
  };

  var upLoad = function (data, onLoad, onError) {
    getData(onLoad, onError, 'POST', data);
  };

  /**//**//**//**/

  window.backend = {
    load: load,
    upLoad: upLoad
  };

})();
