import axios from 'axios';
import { apiKey } from '../constants';

// base URL 
const apiBaseUrl = 'https://api.themoviedb.org/3'; 

// endpoints 
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?language=en-US&api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?language=en-US&api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?language=en-US&api_key=${apiKey}`;

// dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?language=en-US&api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?language=en-US&api_key=${apiKey}`;
const movieSimilarEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?language=en-US&api_key=${apiKey}`;

// image paths
export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// fallback images 
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {}
  }

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('tenemos un error', error);
    return {};
  }
}

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
}

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
}

export const fetchSimilarMovies = (id) => {
  return apiCall(movieSimilarEndpoint(id));
}
