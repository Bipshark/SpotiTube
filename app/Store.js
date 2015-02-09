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
