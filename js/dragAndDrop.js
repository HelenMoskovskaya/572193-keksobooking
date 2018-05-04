'use strict';

(function () {

  // Перемещение главного пина //

  var onMapPinMainMove = function (evt) {
    evt.preventDefault();

    var maxLeft = 1200 - window.util.variablesConst.MAP_PIN_MAIN_WIDTH;
    var minLeft = 0;
    var maxTop = 500 - window.util.variablesConst.MAP_PIN_MAIN_HEIGHT;
    var minTop = 150 - window.util.variablesConst.MAP_PIN_MAIN_HEIGHT;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newTop = window.map.mapPinMain.offsetTop - shift.y;
      var newLeft = window.map.mapPinMain.offsetLeft - shift.x;

      if (newLeft < minLeft) {
        newLeft = minLeft;
      } else if (newLeft > maxLeft) {
        newLeft = maxLeft;
      }

      if (newTop < minTop) {
        newTop = minTop;
      } else if (newTop > maxTop) {
        newTop = maxTop;
      }

      window.map.mapPinMain.style.left = newLeft + 'px';
      window.map.mapPinMain.style.top = newTop + 'px';
    };

    var onWheelMove = function (wheelEvt) {
      wheelEvt.preventDefault();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.inputAddress.value = window.map.getPinMainCoordinate();
      onMouseMove(upEvt);
      document.removeEventListener('mousemove', onWheelMove);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onWheelMove);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

    /**//**//**//**/

  window.dragAndDrop = {
    onMapPinMainMove: onMapPinMainMove,
  };


})();
