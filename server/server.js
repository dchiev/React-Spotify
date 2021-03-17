const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});
app.post("/login", (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/",
    clientId: "48b1946b2a6a4ce0b70c1018e3f04761",
    clientSecret: "3e96855ab7a84e38b005387f4d1e798e",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((date) => {
      res.json({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      });
    })
    .catch(() => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.listen(3001);
