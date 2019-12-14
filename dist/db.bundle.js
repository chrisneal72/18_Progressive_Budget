/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/db.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/db.js":
/*!**********************!*\
  !*** ./public/db.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let db;\r\nconst request = indexedDB.open(\"budget\", 1);\r\n\r\nrequest.onupgradeneeded = function(event) {\r\n  const db = event.target.result;\r\n  db.createObjectStore(\"pending\", { autoIncrement: true });\r\n};\r\n\r\nrequest.onsuccess = function(event) {\r\n  db = event.target.result;\r\n\r\n  // check if app is online before reading from db\r\n  if (navigator.onLine) {\r\n    checkDatabase();\r\n  }\r\n};\r\n\r\nrequest.onerror = function(event) {\r\n  console.log(\"Woops! \" + event.target.errorCode);\r\n};\r\n\r\nfunction saveRecord(record) {\r\n  const transaction = db.transaction([\"pending\"], \"readwrite\");\r\n  const store = transaction.objectStore(\"pending\");\r\n\r\n  store.add(record);\r\n}\r\n\r\nfunction checkDatabase() {\r\n  const transaction = db.transaction([\"pending\"], \"readwrite\");\r\n  const store = transaction.objectStore(\"pending\");\r\n  const getAll = store.getAll();\r\n\r\n  getAll.onsuccess = function() {\r\n    if (getAll.result.length > 0) {\r\n      fetch(\"/api/transaction/bulk\", {\r\n        method: \"POST\",\r\n        body: JSON.stringify(getAll.result),\r\n        headers: {\r\n          Accept: \"application/json, text/plain, */*\",\r\n          \"Content-Type\": \"application/json\"\r\n        }\r\n      })\r\n      .then(response => response.json())\r\n        .then(() => {\r\n          // delete records if successful\r\n          const transaction = db.transaction([\"pending\"], \"readwrite\");\r\n          const store = transaction.objectStore(\"pending\");\r\n          store.clear();\r\n        });\r\n    }\r\n  };\r\n}\r\n\r\n// listen for app coming back online\r\nwindow.addEventListener(\"online\", checkDatabase);\r\n\n\n//# sourceURL=webpack:///./public/db.js?");

/***/ })

/******/ });