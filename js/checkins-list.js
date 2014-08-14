/** @jsx React.DOM */
'use strict';

var React = require('react');
var Checkin = require('./checkin');

module.exports = React.createClass({
    displayName: 'CheckinsList',

    /* jshint trailing:false, quotmark:false, newcap:false */
    render: function() {
        return (
            <ul className="checkins cf">
                {this.props.checkins.map(Checkin)}
            </ul>
        );
    }
});