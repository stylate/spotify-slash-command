var key = require('../utils/key');
var SpotifyWebApi = require('spotify-web-api-node');
var createTemplate = require('../utils/template.js').resolver;
var _ = require('underscore');

// in-email representation
module.exports = function (req, res) {
    var term = req.query.text.trim();
}
