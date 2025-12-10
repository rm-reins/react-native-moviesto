import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center gap-x-1">
            <Ionicons name="star" color="#FCBF49" size={16} />
            <Text className="text-xs text-white font-bold uppercase">
              {vote_average.toFixed(1)}/10
            </Text>
          </View>
          <Text className="text-xs text-light-300 font-medium">
            {release_date?.split("-")[0]}
          </Text>
        </View>

        <Text className="text-sm font-bold text-white" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
