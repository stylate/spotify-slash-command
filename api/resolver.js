var spotify = require('./spotify.js');
var createTemplate = require('../utils/template.js').resolver;

// in-email representation
module.exports = async function (req, res) {
    var term = req.query.text.trim();
    console.log("term: ", term)
    var spotify_api = await spotify.spotify_auth();
    var response = await spotify.get_track(term, spotify_api);
    console.log("album artwork: ", response.body.album.images[0].url);
    res.json({
        body: createTemplate(response.body)
    });
}
