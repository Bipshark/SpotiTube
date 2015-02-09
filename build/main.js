(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/main.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var App = require('./App.js');
React.render(React.createElement(App, null), document.body);
},{"./App.js":"/Users/nikteg/Projects/SpotiTube/app/App.js","react":"react"}],"/Users/nikteg/Projects/SpotiTube/app/App.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var App = React.createClass({displayName: "App",
    getInitialState: function () {
        return {
            results: Store.getResults()
        };
    },
    componentDidMount: function() {
        document.title = "SpotiTube";
    },
    componentWillMount: function () {
        Store.addChangeListener(this.changeState);
    },
    componentWillUnmount: function () {
        Store.removeChangeListener(this.changeState);
    },
    changeState: function () {
        this.setState({
          results: Store.getResults()
        });
    },
    renderResults: function (result) {
        return (
            React.createElement("div", null, result)
        );
    },
    search: function(event) {
        event.preventDefault();
        var input = this.refs.URIs.getDOMNode();
        actions.search(input.value);
        console.log("Searching for", input.value);
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("form", {onSubmit: this.search}, 
                    React.createElement("textarea", {ref: "URIs"}), 
                    React.createElement("input", {type: "submit"})
                ), 
                this.state.results.map(this.renderResults)
            )
        );
    }

});

module.exports = App;

},{"./Store.js":"/Users/nikteg/Projects/SpotiTube/app/Store.js","./actions.js":"/Users/nikteg/Projects/SpotiTube/app/actions.js","react":"react"}],"/Users/nikteg/Projects/SpotiTube/app/Store.js":[function(require,module,exports){
var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
    results: [],
    actions: [
        actions.search
    ],
    search: function (query) {
        console.log("query", query);

        $.get("/backend/search", { "query": query }, function(result) {
            console.log("result", result);
            this.results.push(result);
            this.emitChange();
        }.bind(this));
    },
    exports: {
        getResults: function () {
            return this.results;
        }
    }
});

},{"./actions.js":"/Users/nikteg/Projects/SpotiTube/app/actions.js","flux-react":"flux-react"}],"/Users/nikteg/Projects/SpotiTube/app/actions.js":[function(require,module,exports){
var flux = require('flux-react');

module.exports = flux.createActions([
    'search'
]);

},{"flux-react":"flux-react"}]},{},["./app/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvbWFpbi5qcyIsImFwcC9BcHAuanMiLCJhcHAvU3RvcmUuanMiLCJhcHAvYWN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQXBwID0gcmVxdWlyZSgnLi9BcHAuanMnKTtcblJlYWN0LnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KEFwcCwgbnVsbCksIGRvY3VtZW50LmJvZHkpOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiQXBwXCIsXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN1bHRzOiBTdG9yZS5nZXRSZXN1bHRzKClcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIlNwb3RpVHViZVwiO1xuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gICAgfSxcbiAgICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICByZXN1bHRzOiBTdG9yZS5nZXRSZXN1bHRzKClcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXJSZXN1bHRzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIHJlc3VsdClcbiAgICAgICAgKTtcbiAgICB9LFxuICAgIHNlYXJjaDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLlVSSXMuZ2V0RE9NTm9kZSgpO1xuICAgICAgICBhY3Rpb25zLnNlYXJjaChpbnB1dC52YWx1ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIGZvclwiLCBpbnB1dC52YWx1ZSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCB7b25TdWJtaXQ6IHRoaXMuc2VhcmNofSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7cmVmOiBcIlVSSXNcIn0pLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInN1Ym1pdFwifSlcbiAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJlc3VsdHMubWFwKHRoaXMucmVuZGVyUmVzdWx0cylcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICByZXN1bHRzOiBbXSxcbiAgICBhY3Rpb25zOiBbXG4gICAgICAgIGFjdGlvbnMuc2VhcmNoXG4gICAgXSxcbiAgICBzZWFyY2g6IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInF1ZXJ5XCIsIHF1ZXJ5KTtcblxuICAgICAgICAkLmdldChcIi9iYWNrZW5kL3NlYXJjaFwiLCB7IFwicXVlcnlcIjogcXVlcnkgfSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdFwiLCByZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG4gICAgZXhwb3J0czoge1xuICAgICAgICBnZXRSZXN1bHRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRzO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZUFjdGlvbnMoW1xuICAgICdzZWFyY2gnXG5dKTtcbiJdfQ==
