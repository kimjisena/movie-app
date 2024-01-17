import { View, Image, TouchableWithoutFeedback, TouchableOpacity, TextInput, ScrollView, Text, Dimensions, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';
import { debounce } from 'lodash';
import { searchMovies, image185, fallbackMoviePoster } from '../api/moviedb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === ios;
const verticalMargin = ios ? '' : 'my-3';

export default function SearchScreen() {
  const navigation = useNavigation();
  const movieName = 'Kingdom II: Far and Away';
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      const data = await searchMovies({
        query: value,
        include_adult: false,
        language: 'en-US',
        page: '1'
      });
      setLoading(false);
      if (data && data.results) {
        setResults(data.results);
      }
    } else {
      setLoading(false);
      setResults([]);
    }
  }

  const handleTextDebounce = React.useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View
        className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full"
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Search movie'
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 font-semibold text-base text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => {navigation.navigate('Home')}}
          className="rounded-full p-3 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* search results */}
      {
        loading ? (
          <Loading />
        ) : 
         results.length ? (
          <ScrollView
            showsVerticalScrollIndicatore={false}
            contentContainerStyle={{
              paddingHorizontal: 15
            }}
            className="space-y-3"
          >
            <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
            <View className="flex-row justify-between flex-wrap">
              {
                results.map((item, idx) => {
                  return (
                    <TouchableWithoutFeedback
                      key={item?.id}
                      onPress={() => navigation.push('Movie', item)}
                    >
                      <View className="space-y-2 mb-4">
                        <Image 
                          className="rounded-3xl"
                          source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                          style={{
                            width: width * .44,
                            height: height * .3
                          }}
                        />
                        <Text className="text-neutral-300 ml-1">
                          {
                            item?.title?.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title
                          }
                        </Text>
                      </View>

                    </TouchableWithoutFeedback>
                  );
                })
              }
            </View>
          </ScrollView>
        ) : (
          <View className="flex-row justify-center">
            <Image 
              source={require('../assets/images/movieTime.png')}
              className="h-96 w-96"
            />
          </View>
        )
      } 
    </SafeAreaView>
  )
}
