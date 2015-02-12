/** @jsx React.DOM */
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var App = React.createClass({
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
            <a href={result}>{result}</a>
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
            <div>
                <form onSubmit={this.search}>
                    <textarea ref="URIs" />
                    <input type="submit" />
                </form>
                {this.state.results.map(this.renderResults)}
            </div>
        );
    }

});

module.exports = App;
