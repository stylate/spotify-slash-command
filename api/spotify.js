var key = require('../utils/key');
var SpotifyWebApi = require('spotify-web-api-node');


/* Creates a Spotify API instance and authenticate credentials. */
async function spotify_auth() {
    var spotifyApi, data;
    try {
        spotifyApi = new SpotifyWebApi({
            clientId: key.client_key,
            clientSecret: key.client_secret
        });
    } catch (e) {
        console.log("Unable to initialize Spotify API.");
        throw new Error(e);
    }
    try {
        var data = await spotifyApi.clientCredentialsGrant();
    } catch (e) {
        console.log("Credentials not granted!");
        throw new Error(e);
    }
    try {
        await spotifyApi.setAccessToken(data.body['access_token']);
    } catch (e) {
        console.log("Unable to retrieve access token.");
        throw new Error(e);
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
        // throw new Error(e);
    }
    return resp;
}

/* Retrieve a track object given the unique Spotify ID. */
async function get_track(ID, spotifyApi) {
    try {
        var resp = await spotifyApi.getTrack(ID);
    } catch (e) {
        console.log("Unable to retrieve track.");
    }
    return resp;
}

module.exports = {
    spotify_auth: spotify_auth,
    get_data: get_data,
    get_track: get_track
};
