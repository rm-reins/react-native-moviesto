import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

const TrendingCard = ({
  movie: { movie_id, poster_url, title },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: poster_url
              ? poster_url
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="pointer-events-none absolute bottom-2 left-2">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-5xl leading-none">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={require("../assets/images/rankingGradient.png")}
              className="w-16 h-16"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text className="mt-2 text-sm font-bold text-white" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
