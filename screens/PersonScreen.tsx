import { View, Image, TouchableOpacity, ScrollView, Text, Dimensions, Platform } from 'react-native';
import React from 'react';
import MovieList from '../components/MovieList';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchPersonDetails, fetchPersonMovies, image342, fallbackPersonImage } from '../api/moviedb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === ios;
const verticalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {
  const navigation = useNavigation();
  const {params: item} = useRoute();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [personMovies, setPersonMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [person, setPerson] = React.useState({});

  React.useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) {
      setPerson(data);
    }
    setLoading(false);
  }
  
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  }

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom: 20}}>
      {/* back button and fav button */}
      <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4" + verticalMargin}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1 ml-4">
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity className="mr-4" onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon size="35" color={isFavorite ? 'red': "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details go here */}
      {
        loading ? (
          <Loading />
            ) : (
          <View>
            <View
              style={{
                shadowColor: 'gray',
                shadowOffset: {width: 0, height: 5},
                shadowRadius: 40,
                shadowOpacity: 1,
              }}
              className="flex-row justify-center"
            >
              <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                <Image 
                  source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                  style={{
                    height: height * .43,
                    width: width * .74
                  }}
                />
              </View>
            </View>
            <View className="mt-6 ">
              <Text className="text-3xl text-white font-bold text-center">
                {person?.name}
              </Text>
              <Text className="text-base text-neutral-500 text-center">
                {person?.place_of_birth}
              </Text>
            </View>
            <View className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">
                    {person?.gender === 1 ? 'Female' : person?.gender === 2 ? 'Male' : 'N/A'}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">{person?.birthday || 'N/A'}</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-300 text-sm">{person?.known_for_department || 'N/A'}</Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)} %</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide">
                  {person?.biography || 'N/A'}
              </Text>
            </View>

            {/* movie list for the actor/actriz */}
            <MovieList hideSeeAll title="Movies" data={personMovies} />
          </View>
        )
      }

    </ScrollView>
  )
}
