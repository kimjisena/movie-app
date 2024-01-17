import { View, Image, TouchableWithoutFeedback, TouchableOpacity, TextInput, ScrollView, Text, Dimensions, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === ios;
const verticalMargin = ios ? '' : 'my-3';

export default function SearchScreen() {
  const navigation = useNavigation();
  const movieName = 'Kingdom II: Far and Away';
  const [results, setResults] = React.useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = React.useState(false);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View
        className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full"
      >
        <TextInput
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
                      key={idx}
                      onPress={() => navigation.push('Movie', item)}
                    >
                      <View className="space-y-2 mb-4">
                        <Image 
                          className="rounded-3xl"
                          source={require('../assets/images/suzanne-with-color-and-hat.png')}
                          style={{
                            width: width * .44,
                            height: height * .3
                          }}
                        />
                        <Text className="text-neutral-300 ml-1">
                          {
                            movieName.length > 22 ? movieName.slice(0, 22) + '...' : movieName
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
