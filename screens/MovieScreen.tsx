import { View, Image, ScrollView, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, theme } from '../theme';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbackMoviePoster, fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies, image500 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === ios;
const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [cast, setCast] = React.useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [movie, setMovie] = React.useState({});
  const movieName = 'Kingdom II: Far and Away';

  React.useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  }

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) {
      setCast(data.cast);
    }
  }

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20,}}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster goes here */ }
      <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1 ml-4">
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="mr-4" onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon size="35" color={isFavorite ? theme.background: "white"} />
          </TouchableOpacity>
        </SafeAreaView>
        {
          loading ? (
            <Loading />
          ) : (
           <View>
            <Image
              source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}}
              style={{
                width,
                height: height * .55
              }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23, 23, 23, .8)', 'rgba(23, 23, 23, 1)']}
              style={{
                width,
                height: height * .4
              }}
              start={{x: .5, y: 0}}
              end={{x: .5, y: 1}}
              className="absolute bottom-0"
            />
          </View>           
          )
        }
      </View>

      {/* movie details view goes here */}
      <View 
        style={{marginTop: -(height * .09)}}
        className="space-y-3"
      >
        {/* movie title goes here */}
        <Text className="text-white text-center font-bold text-3xl tracking-wider">
          {
            movie?.title 
          }
        </Text>

        {/* status, release date, run time */}
        {
          movie?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} • {movie?.release_date?.split('-')[0] } • {movie?.runtime} min
            </Text>
          ) : null
        }

        {/* genres */}

        <View className="flex-row justify-center mx-4 space-x-2">
        {
          movie?.genres?.map((genre, idx) => {
            let showDot = idx + 1 !== movie.genres.length;

            return (
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {genre?.name}{showDot ? '•' : ''}
              </Text>            
            )
          })
        }
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>

      {/* cast */}
      {
        cast.length && !loading ? (
          <Cast navigation={navigation} cast={cast} />
        ) : null       
      }
     
      {/* similar movies go here */}
      {
        similarMovies.length && !loading ? (
          <MovieList title="Similar movies" hideSeeAll data={similarMovies} />
        ) : null
      }    
    </ScrollView>
  )
}
