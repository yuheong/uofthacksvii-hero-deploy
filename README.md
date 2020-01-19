# Hero Deploy

## How to use

## Running the app

- `cd` into the `app` directory and run `yarn` or `npm install`
- Open `app` with [`expo start`](https://docs.expo.io/versions/latest/workflow/expo-cli/), try it out.

### Running the server (optional)

- Not needed currently, as backend is hosted on GCP App Engine.
- `cd` into the `backend` directory and run `yarn` or `npm install`, then run `yarn start`
- Install [ngrok](https://ngrok.com/download) and run `ngrok http 3000` and copy the https url that looks something like this `https://f7333e87.ngrok.io`. This is required because WebSockets require https.
- Open `app/main.js` and change the `SocketEndpoint` at the top of the file to point to your endpoint.

## Technologies used

- React Native
- Express
- Socket.IO
- Fetch API
- React-Native-Maps
