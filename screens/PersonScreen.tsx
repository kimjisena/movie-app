import { View, Image, TouchableOpacity, ScrollView, Text, Dimensions, Platform } from 'react-native';
import React from 'react';
import MovieList from '../components/MovieList';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === ios;
const verticalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [personMovies, setPersonMovies] = React.useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = React.useState(false);

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
                  source={require('../assets/images/kimjisena.jpg')} 
                  style={{
                    height: height * .43,
                    width: width * .74
                  }}
                />
              </View>
            </View>
            <View className="mt-6 ">
              <Text className="text-3xl text-white font-bold text-center">
                Keanu Reeves
              </Text>
              <Text className="text-base text-neutral-500 text-center">
                London, United Kingdom
              </Text>
            </View>
            <View className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">Male</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">1999-08-04</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-300 text-sm">Acting</Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">4.23</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide">
                 Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
              </Text>
            </View>

            {/* movie list for the actor */}
            <MovieList hideSeeAll title="Movies" data={personMovies} />
          </View>
        )
      }

    </ScrollView>
  )
}
