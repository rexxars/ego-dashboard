/** @jsx React.DOM */
'use strict';

var _ = require('lodash');
var React = require('react');

var Venue = React.createClass({
    displayName: 'Venue',

    /* jshint trailing:false, quotmark:false, newcap:false */
    render: function() {
        return (
            <li className="cf">
                <h3 className="venue-name">{this.props.name}</h3>
                <span className="count">{this.props.checkins}</span>
            </li>
        );
    }
});

module.exports = React.createClass({
    displayName: 'TopVenues',

    sortByCheckins: function(checkins) {
        var grouped = _.groupBy(checkins, 'location');

        var venues = [], key;
        for (key in grouped) {
            if (key === 'null') { continue; }
            venues.push({ name: key, checkins: grouped[key].length, key: key });
        }

        return _.sortBy(venues, 'checkins').reverse();
    },

    /* jshint trailing:false, quotmark:false, newcap:false */
    render: function() {
        var topVenues = this.sortByCheckins(this.props.checkins);

        return (
            <div className="top-venues">
                <h2>Top venues</h2>
                <ul>
                    {topVenues.map(Venue)}
                </ul>
            </div>
        );
    }
});