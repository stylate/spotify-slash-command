var key = require('../utils/key');
var SpotifyWebApi = require('spotify-web-api-node');
var createTemplate = require('../utils/template.js').typeahead;
var _ = require('underscore');

async function spotify_auth() {
    var spotifyApi = new SpotifyWebApi({
        clientId: key.client_key,
        clientSecret: key.client_secret
    });
    try {
        var data = await spotifyApi.clientCredentialsGrant();
    } catch (e) {
        console.log("Credentials not granted!");
        console.log(e);
    }
    try {
        await spotifyApi.setAccessToken(data.body['access_token']);
    } catch (e) {
        console.log("Unable to retrieve access token.");
        console.log(e);
    }
    return spotifyApi;
}

/*
 * Retrieve results from searching a song title.
 */
async function get_data(title, spotifyApi) {
    try {
        var resp = await spotifyApi.searchTracks(title);
    } catch (e) {
        console.log("Unable to find song.")
        console.log(e);
    }
    var results;
    try {
        results = _.chain(resp.body.tracks.items)
            /*
            .reject(function(data) {
                return !data.images;
            })*/
            .map(function(data) {
                return {
                    title: createTemplate(data),
                    text: data.external_urls.spotify
                };
            })
            .value();
    } catch (e) {
        console.log("Unable to map data to resolver.")
        console.log(e);
    }
    return results;
}

module.exports = async function(req, res) {
    /* The search string will consist of either: album, song name, or artist.
     */
    var search = req.query.text;
    var spotify_api = await spotify_auth();
    var response = await get_data(search, spotify_api);
    if (response.length === 0) {
        res.json([{
            title: '<i>(no results)</i>',
            text: ''
        }]);
    } else {
        res.json(results);
    }
};
