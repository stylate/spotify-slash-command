var spotify = require('./spotify.js');
var createTemplate = require('../utils/template.js').resolver;

// in-email representation
module.exports = async function (req, res) {
    var term = req.query.text.trim();
    var spotify_api = await spotify.spotify_auth();
    var response = await spotify.get_track(term, spotify_api);
    res.json({
        body: createTemplate(response.body)
    });
}
