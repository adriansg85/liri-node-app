# Adrian's Awesome LIRI app

### Overview

Welcome to Adrian's Awesome LIRI app, with this simple js app you will be able to find concert dates for your favorite artists, your favorite movies, and last but not least, your favorite songs.

### Before You Begin

Go to the root of the project and run `npm init -y` &mdash; this will initialize a `package.json` file for your use. If you fail to initialize a `package.json` file, it will be troublesome, and at times almost impossible to run the code.

You will need to navigate to spotify to obtain an API key and a secret. After you get this information create a file named `.env`, add the following to it, replacing the values below with your API keys from spotify (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```

- This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to my computer that node is running on, and since I am gitignoring this file, it won't be pushed to github.

When you finish, your test of the app should look like this:

Here is the app Menu, you can choose 4 different paths:
![Image of songs](https://github.com/adriansg85/liri-node-app/blob/master/images/menu.png)

To look for a song just navigate to 'Search for Spotify Song' and type your input.
![Image of songs](https://github.com/adriansg85/liri-node-app/blob/master/images/song.png)

To look for a movie just navigate to 'Search for a Movie' and type your input.
![Image of movies](https://github.com/adriansg85/liri-node-app/blob/master/images/movie.png)

To search for a concert just navigate to 'Concerts of Favorite Bands' and type your input.
![Image of concerts](https://github.com/adriansg85/liri-node-app/blob/master/images/concerts.png)

And to do what the text file says just navigate to 'Do what it says' and hit enter to see the magic.
![Image of random text](https://github.com/adriansg85/liri-node-app/blob/master/images/dowhat.png)
