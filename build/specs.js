(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./specs/App-spec.js":[function(require,module,exports){
var App = require('./../app/App.js');
var TestUtils = require('react-addons').TestUtils;

describe("App", function() {

  it("should be wrapped with a div", function() {
    var app = TestUtils.renderIntoDocument(App());
    expect(app.getDOMNode().tagName).toEqual('DIV');
  });

});
},{"./../app/App.js":"/Users/nikteg/Projects/SpotiTube/app/App.js","react-addons":"react-addons"}],"/Users/nikteg/Projects/SpotiTube/app/App.js":[function(require,module,exports){
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

},{"flux-react":"flux-react"}]},{},["./specs/App-spec.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcGVjcy9BcHAtc3BlYy5qcyIsImFwcC9BcHAuanMiLCJhcHAvU3RvcmUuanMiLCJhcHAvYWN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBcHAgPSByZXF1aXJlKCcuLy4uL2FwcC9BcHAuanMnKTtcbnZhciBUZXN0VXRpbHMgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMnKS5UZXN0VXRpbHM7XG5cbmRlc2NyaWJlKFwiQXBwXCIsIGZ1bmN0aW9uKCkge1xuXG4gIGl0KFwic2hvdWxkIGJlIHdyYXBwZWQgd2l0aCBhIGRpdlwiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXBwID0gVGVzdFV0aWxzLnJlbmRlckludG9Eb2N1bWVudChBcHAoKSk7XG4gICAgZXhwZWN0KGFwcC5nZXRET01Ob2RlKCkudGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG4gIH0pO1xuXG59KTsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkFwcFwiLFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdWx0czogU3RvcmUuZ2V0UmVzdWx0cygpXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJTcG90aVR1YmVcIjtcbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICAgIH0sXG4gICAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgcmVzdWx0czogU3RvcmUuZ2V0UmVzdWx0cygpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyUmVzdWx0czogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCByZXN1bHQpXG4gICAgICAgICk7XG4gICAgfSxcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5VUklzLmdldERPTU5vZGUoKTtcbiAgICAgICAgYWN0aW9ucy5zZWFyY2goaW5wdXQudmFsdWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyBmb3JcIiwgaW5wdXQudmFsdWUpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImZvcm1cIiwge29uU3VibWl0OiB0aGlzLnNlYXJjaH0sIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiwge3JlZjogXCJVUklzXCJ9KSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJzdWJtaXRcIn0pXG4gICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yZXN1bHRzLm1hcCh0aGlzLnJlbmRlclJlc3VsdHMpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gICAgcmVzdWx0czogW10sXG4gICAgYWN0aW9uczogW1xuICAgICAgICBhY3Rpb25zLnNlYXJjaFxuICAgIF0sXG4gICAgc2VhcmNoOiBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJxdWVyeVwiLCBxdWVyeSk7XG5cbiAgICAgICAgJC5nZXQoXCIvYmFja2VuZC9zZWFyY2hcIiwgeyBcInF1ZXJ5XCI6IHF1ZXJ5IH0sIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHRcIiwgcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuICAgIGV4cG9ydHM6IHtcbiAgICAgICAgZ2V0UmVzdWx0czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0cztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgICAnc2VhcmNoJ1xuXSk7XG4iXX0=
