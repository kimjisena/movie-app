import React from 'react';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from '../api/moviedb';

const ios = Platform.OS === 'ios';

export default function HomeScreen () {
  const [trending, setTrending] = React.useState([]);
  const [upcoming, setUpcoming] = React.useState([]);
  const [topRated, setTopRated] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();
  
  React.useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setTrending(data.results);
    }
    setLoading(false);
  }

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) {
      setUpcoming(data.results);
    }
  }

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) {
      setTopRated(data.results);
    }
  }

  return (
    <View className="flex-1 bg-neutral-800">
      { /* search bar and logo goes here */ }
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView
            showVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}
          >
            {/* trending movies carousel goes here */}
            {trending.length && <TrendingMovies data={trending} />} 
            
            {/* upcoming, top rated movies rows go here */}
            <MovieList title="Upcoming" data={upcoming} />
            <MovieList title="Top rated" data={topRated} />     
          </ScrollView>
        )
      }
    </View>
  );
}

