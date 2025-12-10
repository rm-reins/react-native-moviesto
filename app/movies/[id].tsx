import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>

    <Text className="text-light-100 font-bold text-sm mt-2">{value || "N/A"}</Text>
  </View>
);

const MovieDetails = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch<MovieDetails>(() =>
    fetchMovieDetails(id as string)
  );

  if (loading || !movie) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#A8B5DB" />
      </View>
    );
  }

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
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 96,
        }}
      >
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
            className="w-full h-[500px]"
            resizeMode="stretch"
          />

          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>

            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">
                {movie?.release_date?.split("-")[0]}
              </Text>

              <Text className="text-light-200 text-sm">{movie?.runtime} min</Text>
            </View>

            <View className="flex-row items-center justify-between my-1">
              <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md mt-2 gap-x-1">
                <Ionicons name="star" color="#FCBF49" size={16} />
                <Text className="text-sm text-white font-bold uppercase">
                  {movie?.vote_average.toFixed(1)}/10
                </Text>
                <Text className="text-light-200 text-sm">
                  ({movie?.vote_count} votes)
                </Text>
              </View>
            </View>

            <MovieInfo label="Overview" value={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
            />

            <View className="flex flex-row justify-between w-1/2">
              <MovieInfo
                label="Budget"
                value={
                  movie?.budget != null
                    ? `$${(movie.budget / 1_000_000).toFixed(1)} mil`
                    : "N/A"
                }
              />

              <MovieInfo
                label="Revenue"
                value={
                  movie?.revenue != null
                    ? `$${(Math.round(movie.revenue) / 1_000_000).toFixed(1)} mil`
                    : "N/A"
                }
              />
            </View>

            <MovieInfo
              label="Production Companies"
              value={movie?.production_companies?.map((c) => c.name).join(" - ") || "N/A"}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
        className="absolute left-0 right-0 mx-5 flex-row items-center justify-center rounded-full bg-dark-100/90 border border-white/10 py-3.5 gap-x-2 z-50 shadow-lg"
        style={{ bottom: insets.bottom + 12 }}
      >
        <Ionicons name="chevron-back-outline" color="#FFF" size={18} />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
