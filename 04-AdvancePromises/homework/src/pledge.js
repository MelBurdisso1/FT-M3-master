"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
  if (typeof executor !== "function")
    throw new TypeError("Executor must be a function");

  this._state = "pending";

  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (value) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = value;
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (value) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = value;
    this._callHandlers();
  }
};

$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb !== "function") successCb = false;
  if (typeof errorCb !== "function") errorCb = false;
  const downstreamPromise= new $Promise(function(){})
  this._handlerGroups.push({ successCb, errorCb, downstreamPromise});
  if (this._state !== "pending") {
    this._callHandlers();
  }
  return downstreamPromise;
};

$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length) {
    let callback = this._handlerGroups.shift();

    if (this._state === "fulfilled") {
      callback.successCb && callback.successCb(this._value);
    } else callback.errorCb && callback.errorCb(this._value);
  }
};

$Promise.prototype.catch = function (errorCb) {
  this.then(null, errorCb);
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
