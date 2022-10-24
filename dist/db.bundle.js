/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/db.js":
/*!**********************!*\
  !*** ./public/db.js ***!
  \**********************/
/***/ (() => {

eval("let db;\r\nconst request = indexedDB.open(\"budget\", 1);\r\n\r\nrequest.onupgradeneeded = function(event) {\r\n  const db = event.target.result;\r\n  db.createObjectStore(\"pending\", { autoIncrement: true });\r\n};\r\n\r\nrequest.onsuccess = function(event) {\r\n  db = event.target.result;\r\n\r\n  // check if app is online before reading from db\r\n  if (navigator.onLine) {\r\n    checkDatabase();\r\n  }\r\n};\r\n\r\nrequest.onerror = function(event) {\r\n  console.log(\"Woops! \" + event.target.errorCode);\r\n};\r\n\r\nfunction saveRecord(record) {\r\n  const transaction = db.transaction([\"pending\"], \"readwrite\");\r\n  const store = transaction.objectStore(\"pending\");\r\n\r\n  store.add(record);\r\n}\r\n\r\nfunction checkDatabase() {\r\n  const transaction = db.transaction([\"pending\"], \"readwrite\");\r\n  const store = transaction.objectStore(\"pending\");\r\n  const getAll = store.getAll();\r\n\r\n  getAll.onsuccess = function() {\r\n    if (getAll.result.length > 0) {\r\n      fetch(\"/api/transaction/bulk\", {\r\n        method: \"POST\",\r\n        body: JSON.stringify(getAll.result),\r\n        headers: {\r\n          Accept: \"application/json, text/plain, */*\",\r\n          \"Content-Type\": \"application/json\"\r\n        }\r\n      })\r\n      .then(response => response.json())\r\n        .then(() => {\r\n          // delete records if successful\r\n          const transaction = db.transaction([\"pending\"], \"readwrite\");\r\n          const store = transaction.objectStore(\"pending\");\r\n          store.clear();\r\n        });\r\n    }\r\n  };\r\n}\r\n\r\n// listen for app coming back online\r\nwindow.addEventListener(\"online\", checkDatabase);\r\n\n\n//# sourceURL=webpack://budget-app/./public/db.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/db.js"]();
/******/ 	
/******/ })()
;