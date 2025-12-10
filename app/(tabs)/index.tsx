import { MovieCard, TrendingCard } from "@/components";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/hooks/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1">
      <StatusBar style="light" />

      <LinearGradient
        colors={["#030014", "#A8B5DB"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 2, y: 2 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top }}
      >
        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator size="large" color="#A8B5DB" />
        ) : moviesError || trendingMoviesError ? (
          <View className="m-5 px-2 gap-2">
            {moviesError && (
              <Text className="text-red-400 text-xl">
                Error loading latest movies: {moviesError.message}
              </Text>
            )}
            {trendingMoviesError && (
              <Text className="text-red-400 text-xl">
                Error loading trending movies: {trendingMoviesError.message}
              </Text>
            )}
          </View>
        ) : (
          <View className="flex-1 mt-5 px-4">
            <Text className="text-3xl text-accent font-bold text-center">
              Welcome to Moviesto!
            </Text>

            {trendingMovies && (
              <View>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending Movies
                </Text>

                <FlatList
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  horizontal
                  className="mb-4 mt-3"
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
