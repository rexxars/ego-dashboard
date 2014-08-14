/** @jsx React.DOM */
'use strict';

var xhr = require('xhr');
var React = require('react');
var CheckinsList = require('./checkins-list');
var TopVenues = require('./top-venues');

var App = React.createClass({
    displayName: 'EgoCheckinsApp',

    getInitialState: function() {
        return {
            checkins: []
        };
    },

    fetchCheckins: function() {
        xhr({ url: 'feed/', json: true }, this.onCheckinsFetched);
    },

    assignKeys: function(checkin) {
        checkin.key = checkin.guid;
        return checkin;
    },

    onCheckinsFetched: function(err, xhr, checkins) {
        if (err) {
            return console.error(err);
        }

        this.setState({ checkins: checkins.map(this.assignKeys) });
    },

    componentDidMount: function() {
        this.interval = setInterval(this.fetchCheckins, 1.5 * 60 * 1000);
        this.fetchCheckins();
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    /* jshint trailing:false, quotmark:false, newcap:false */
    render: function() {
        return (
            <div id="app">
                <CheckinsList checkins={this.state.checkins} />
                <TopVenues checkins={this.state.checkins} />
            </div>
        );
    }
});

if (typeof window !== 'undefined') {
    React.renderComponent(new App(), document.querySelector('main'));
}

module.exports = App;