'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var renderTitle = function renderTitle(title, reveal) {
  return _react2.default.createElement(
    'span',
    { className: (0, _classnames2.default)('card-title', 'grey-text', 'text-darken-4', { 'activator': reveal }) },
    title,
    reveal && _react2.default.createElement(
      _Icon2.default,
      { right: true },
      'more_vert'
    )
  );
};

var renderReveal = function renderReveal(title, reveal) {
  return _react2.default.createElement(
    'div',
    { className: 'card-reveal' },
    _react2.default.createElement(
      'span',
      { className: 'card-title grey-text text-darken-4' },
      title,
      _react2.default.createElement(
        _Icon2.default,
        { right: true },
        'close'
      )
    ),
    reveal
  );
};

var renderAction = function renderAction(actions) {
  return _react2.default.createElement(
    'div',
    { className: 'card-action' },
    actions
  );
};

var Card = function Card(_ref) {
  var title = _ref.title,
      header = _ref.header,
      className = _ref.className,
      textClassName = _ref.textClassName,
      actions = _ref.actions,
      reveal = _ref.reveal,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ['title', 'header', 'className', 'textClassName', 'actions', 'reveal', 'children']);

  var classes = { card: true };

  return _react2.default.createElement(
    'div',
    _extends({}, props, { className: (0, _classnames2.default)(className, classes) }),
    header,
    _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('card-content', textClassName) },
      title && renderTitle(title, reveal),
      _react2.default.createElement(
        'div',
        null,
        children
      )
    ),
    renderReveal(title, reveal),
    actions && renderAction(actions)
  );
};

Card.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  title: _propTypes2.default.string,
  textClassName: _propTypes2.default.string,
  reveal: _propTypes2.default.element,
  header: _propTypes2.default.element,
  // The buttons to be displayed at the action area
  actions: _propTypes2.default.arrayOf(_propTypes2.default.element)
};

exports.default = Card;