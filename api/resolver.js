var spotify = require('./spotify.js');
var createTemplate = require('../utils/template.js').resolver;

// in-email representation
module.exports = async function (req, res) {
    var term = req.query.text.trim();
    var spotify_api = await spotify.spotify_auth();
    var response = await spotify.get_data(term, spotify_api);
    console.log("resolver resp: ", response.body.tracks.items[0]);
    res.json({
        body: createTemplate(response.body.tracks.items[0])
    });
}
