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

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === ios;
const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [cast, setCast] = React.useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = React.useState([1, 2, 3, 4, 5]);
  const movieName = 'Kingdom II: Far and Away';

  React.useEffect(() => {
    // call the api to get the movie dits 

    return () => {
     // to be implemented 
    }
  }, [item])
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
        <View>
          <Image
            source={require('../assets/images/suzanne-with-color-and-hat.png')}
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
      </View>

      {/* movie details view goes here */}
      <View 
        style={{marginTop: -(height * .09)}}
        className="space-y-3"
      >
        {/* movie title goes here */}
        <Text className="text-white text-center font-bold text-3xl tracking-wider">
          {
            movieName
          }
        </Text>

        {/* status, release date, run time */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released • 2020 • 170 min
        </Text>

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thriller 
          </Text>
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate.         
        </Text>
      </View>

      {/* cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies go here */}
      <MovieList title="Similar movies" hideSeeAll data={similarMovies} />
    </ScrollView>
  )
}
