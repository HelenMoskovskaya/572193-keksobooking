'use strict';

(function () {

  var lastTimeout;

  var debounce = function (fun, interval) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(fun, interval);
  };

  window.debounce = {
    debounce: debounce
  };

})();
