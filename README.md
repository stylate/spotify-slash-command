# Spotify Slash Command for Mixmax

An open source slashcommand for Mixmax's API. https://sdk.mixmax.com/ This command will allow you to input tracks from Spotify.

## Running locally

1. Clone this repository: `https://github.com/stylate/spotify-slash-command`
2. Install necessary packages with `npm install`.
3. Start the server using `npm start`. By default, the server location is at `localhost:9145`.
4. Add a slash command in the Mixmax dashboard:
    - Log into Mixmax and enter the dashboard. `https://app.mixmax.com/dashboard/settings/developer`
    - Click the `Add Slash Command` button.
    - Follow the Spotify slash command with the following settings:
    ```
    Name: Spotify
    Command: spotify
    Parameter placeholder: [Search]
    Typeahead API URL: https://localhost:9145/typeahead
    Resolver API URL: https://localhost:9145/resolver
    ```
5. Restart Chrome using the following command on OSX/Linux: `open -a Google\ Chrome --args --ignore-certificate-errors`.
6. Compose a message in Gmail with the Mixmax extension. Type in `/spotify` and you'll get the following: 
