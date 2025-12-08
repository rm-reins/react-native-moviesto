import { MovieCard, SearchBar } from "@/components";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/hooks/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Search = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch<Movie[]>(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );

  const moviesList = useMemo(() => movies ?? [], [movies]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        const fetched = await loadMovies();
        const firstMovie = fetched?.[0];

        if (firstMovie) {
          updateSearchCount(searchQuery, firstMovie).catch((error) => {
            console.warn("updateSearchCount failed", error);
          });
        }
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [loadMovies, reset, searchQuery]);

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
        <View className="flex-1 mt-5 px-4">
          <SearchBar
            onSubmit={() => router.push("/search")}
            placeholder="Search for a movie"
            value={searchQuery}
            onChangeText={(text: string) => setSearchQuery(text)}
          />

          {!moviesLoading &&
            !moviesError &&
            searchQuery.trim() &&
            moviesList.length > 0 && (
              <Text className="text-xl text-white font-bold mt-5">
                Search results for <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}

          {moviesLoading ? (
            <ActivityIndicator size="large" color="#A8B5DB" />
          ) : moviesError ? (
            <Text>Error: {moviesError?.message}</Text>
          ) : (
            <FlatList
              data={moviesList}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => `${item.id}`}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                marginBottom: 10,
              }}
              className="mt-5 pb-32"
              scrollEnabled={false}
              ListEmptyComponent={
                !moviesLoading && !moviesError ? (
                  <View className="mt-10 px-5">
                    <Text className="text-center text-gray-500">
                      {searchQuery.trim() ? "No movies found" : ""}
                    </Text>
                  </View>
                ) : null
              }
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
