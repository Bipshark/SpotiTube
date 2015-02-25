/** @jsx React.DOM */
var React = require("react");
var ReactAddons = require("react-addons");

var SearchResult = React.createClass({
    render: function() {
        if (this.props.data.url) {
            return <div className="result">{this.props.data.title} <a href={this.props.data.url}>{this.props.data.url}</a></div>;
        } else {
            return <div className="result">{this.props.data.title}</div>;
        }
    }
});

var App = React.createClass({
    mixins: [ReactAddons.LinkedStateMixin],
    getInitialState: function() {
        return {
            query: "",
            results: []
        };
    },
    componentDidMount: function() {
        document.title = "SpotiTube";
    },
    search: function(e) {
        e.preventDefault();

        $.getJSON("/backend/search", { query: this.state.query }, function(data) {
            if (data.error) {
                console.log(data.error);

                return;
            }

            if (data.results) {
                this.setState( { results: data.results });
            }

        }.bind(this));
    },
    render: function() {
        return (
            <div>
                <a href="./">
                    <img src="img/header.jpg" alt="" />
                </a>
                <form onSubmit={this.search}>
                    <textarea ref="URIs" valueLink={this.linkState("query")} id="content" />
                    <input type="submit" value="Search" />
                </form>
                <div id="results">
                    {this.state.results.map(function(result, index) {
                        return <SearchResult key={index} data={result} />
                    })}
                </div>
            </div>
        );
    }

});

module.exports = App;
