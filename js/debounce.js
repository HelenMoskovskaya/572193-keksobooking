'use strict';

(function () {

  var lastTimeout;
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (fun, interval) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(fun, interval || DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    debounce: debounce
  };

})();
