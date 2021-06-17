"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("../css/App.css");

var _icons = require("@material-ui/icons");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Backend url constant
var backend_uri = "http://localhost:5000";

function downloadRequest(url, downloadFormat) {
  var customUrl, res;
  return regeneratorRuntime.async(function downloadRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Send download request to custom url
          customUrl = "".concat(backend_uri, "/download?url=").concat(url, "&format=").concat(downloadFormat);
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(customUrl));

        case 3:
          res = _context.sent;

          try {
            if (res.status === 200) {
              // Open custom url to initiate download
              window.location.assign(customUrl);
            }
          } catch (e) {
            console.error(e);
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function App() {
  // State
  var _useState = (0, _react.useState)("mp4"),
      _useState2 = _slicedToArray(_useState, 2),
      selectedDownloadOption = _useState2[0],
      setSelectedDownloadOption = _useState2[1]; // Web page html

}

var _default = App;
exports["default"] = _default;