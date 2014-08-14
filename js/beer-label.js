/** @jsx React.DOM */
'use strict';

var React = require('react');
var slug = require('slug');

module.exports = React.createClass({
    displayName: 'BeerLabel',

    getInitialState: function() {
        return {
            failed: false
        };
    },

    onError: function() {
        if (!this.isMounted()) {
            return;
        }

        this.setState({ failed: true });
    },

    /* jshint trailing:false, quotmark:false, newcap:false */
    render: function() {
        var basePath = 'img/labels/', imgPath;
        if (this.state.failed) {
            imgPath = basePath + 'default.svg';
        } else {
            var beerSlug = slug(this.props.beerName).toLowerCase();
            imgPath = basePath + beerSlug + '.jpg';
        }

        return (
            <img className="label" src={imgPath} onError={this.onError} />
        );
    }
});