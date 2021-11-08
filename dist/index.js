"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateArgTypes;

var _controls;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var controls = (_controls = {}, _defineProperty(_controls, Date, 'date'), _defineProperty(_controls, Boolean, 'boolean'), _defineProperty(_controls, String, 'text'), _defineProperty(_controls, Array, 'object'), _defineProperty(_controls, Object, 'object'), _defineProperty(_controls, Number, 'number'), _controls);
/**
 * Generate the arg types based on the component and recursive mixins.
 *
 * @param {object} component
 * @param {object} overrides
 *
 * @returns {object}
 */

function generateArgTypes(component) {
  var overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  function getControl(options) {
    var type;

    if (!Array.isArray(options.type)) {
      type = options.type;
    }

    switch (_typeof(options["default"])) {
      case 'number':
        type = Number;
        break;
    }

    if (Array.isArray(options.type) && !type) {
      type = options.type[0];
    }

    return controls[type];
  }

  function getArgs(component) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    args = _objectSpread(_objectSpread(_objectSpread({}, component.mixins ? component.mixins.reduce(function (args, mixin) {
      return _objectSpread(_objectSpread({}, args), getArgs(mixin, args));
    }, {}) : {}), args), component.props || {});
    return args;
  }

  var args = getArgs(component);
  var generatedArgTypes = Object.entries(args).reduce(function (args, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        arg = _ref2[0],
        argOptions = _ref2[1];

    return _objectSpread(_objectSpread({}, args), {}, _defineProperty({}, arg, {
      control: getControl(argOptions)
    }));
  }, {});
  return _objectSpread(_objectSpread({}, generatedArgTypes), overrides);
}