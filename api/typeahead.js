var createTemplate = require('../utils/template.js').typeahead;
var _ = require('underscore');
var spotify = require('./spotify.js');

module.exports = async function(req, res) {
    /* The search string will consist of either: album, song name, or artist.
     */
    var search = req.query.text;
    var spotify_api = await spotify.spotify_auth();
    var response = await spotify.get_data(search, spotify_api);
    var results;
    try {
        results = _.chain(response.body.tracks.items)
            .reject(function(data) {
                return !data.album.images;
            })
            .map(function(data) {
                return {
                    title: createTemplate(data),
                    text: data.external_urls.spotify
                };
            })
            .value();
    } catch (e) {
        console.log("Unable to map data to resolver.")
        throw new Error(e);
    }
    if (results.length === 0) {
        res.json([{
            title: '<i>(no results)</i>',
            text: ''
        }]);
    } else {
        res.json(results);
    }
};
