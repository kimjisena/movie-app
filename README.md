# MovieApp

This app was made by following [this](https://youtu.be/Q1xQuCpYIFE) tutorial video.

## Introduction

The movie app utilizes [The Movie DB](https://www.themoviedb.org/) APIs to provide the following functionalities:

1. Highlight top trending movies
2. Browse upcoming movies
3. Browse top rated movies
4. View movie details such as movie name, genres, release date, runtime and cast
5. Highlight similar movies
6. View actor/actress information such as name, place of birth, birthday and featured movies
7. Search movies by using titles

## Technology

This project was implemented using the following technologies:

1. TypeScript
2. React Native
3. Expo
4. Native Wind (TailwindCSS)

## Development

To develop this project:

- Make sure you have NodeJS, and a package manager of your choice (yarn, npm, pnpm, bun)

- Clone the repository
  
    ```sh
    git clone https://github.com/kimjisena/movie-app.git
    ```
- Move into the `movie-app` directory and install dependencies
  
    ```sh
    // yarn (recommended as this project uses yarn)
    yarn

    // npm
    npm install

    // pnpm
    pnpm install

    // bun
    bun install
    ```
- Create `./constants/index.ts` file and export your TMDB API key 

    ```js
    export const apiKey = 'your-tmdb-api-key';
    ```
- Run the development server

    ```sh
    yarn start
    ```
- With Expo Go installed on your phone, use a camera app (iOS) or QR Code scanner (Android) to 
scan the QR code and preview the project with Expo Go

## Android App Bundle

Click [this link](https://expo.dev/artifacts/eas/45cB9UHsd85uU5nvRZd3Fn.aab) to download the movie app for android (AAB)

