import SearchBar from "@/components/SearchBar";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
        <View className="flex-1 mt-5">
          <SearchBar
            onSubmit={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>
      </ScrollView>
    </View>
  );
}
