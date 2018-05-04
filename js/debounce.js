'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 200; // ms

  var lastTimeout;

  var debounce = function (fun) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    debounce: debounce,
    debounceInterval: DEBOUNCE_INTERVAL
  };

})();
