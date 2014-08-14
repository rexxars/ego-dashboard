/** @jsx React.DOM */
'use strict';

var React = require('react');
var BeerLabel = require('./beer-label');

var CheckinQuote = React.createClass({
    displayName: 'CheckinQuote',

    /* jshint trailing:false, quotmark:false, newcap:false */
    render: function() {
        if (!this.props.text) {
            return null;
        }

        return (
            <div className="quote">
                <i className="fa fa-quote-left" />
                {this.props.text}
                <i className="fa fa-quote-right" />
            </div>
        );
    }
});

var BeerRating = React.createClass({
    displayName: 'BeerRating',

    /* jshint trailing:false, quotmark:false, newcap:false */
    render: function() {
        if (!this.props.rating) {
            return null;
        }

        var rating = parseInt(this.props.rating, 10),
            fractions = null;

        if (this.props.rating % 1 !== 0) {
            fractions = <span className="fractions">½</span>;
        }

        return (<div className="rating">{rating}{fractions}/5</div>);
    }
});

var CheckinLocation = React.createClass({
    displayName: 'CheckinLocation',

    /* jshint trailing:false, quotmark:false, newcap:false */
    render: function() {
        if (!this.props.location) {
            return null;
        }

        return (
            <div className="location">
                <i className="fa fa-map-marker" />
                {this.props.location}
            </div>
        );
    }
});

module.exports = React.createClass({
    displayName: 'Checkin',

    /* jshint trailing:false, quotmark:false, newcap:false */
    render: function() {
        return (
            <li>
                <BeerRating rating={this.props.rating} />
                <BeerLabel beerName={this.props.beer} />
                <h2>{this.props.beer}</h2>
                <CheckinQuote text={this.props.description} />
                <div className="drinker">— {this.props.person}</div>
                <CheckinLocation location={this.props.location} />
            </li>
        );
    }
});