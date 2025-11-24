import type { Ionicons as IoniconsType } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useSegments } from "expo-router";
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface TabButtonProps {
  onPress?: ((e: GestureResponderEvent | any) => void) | undefined;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  isSelected: boolean;
  label: string;
  iconName: {
    focused: keyof typeof IoniconsType.glyphMap;
    unfocused: keyof typeof IoniconsType.glyphMap;
  };
  activeColor: string;
  inactiveColor: string;
}

const TabButton = ({
  onPress,
  style,
  testID,
  isSelected,
  label,
  iconName,
  activeColor,
  inactiveColor,
}: TabButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress || (() => {})}
      testID={testID}
      className="flex-1 items-center justify-center"
      style={style}
    >
      <View
        className={`items-center justify-center rounded-[20px] py-2 px-4 min-h-[60px] min-w-[70px] ${
          isSelected ? "bg-light-100/20" : "bg-transparent"
        }`}
      >
        <Ionicons
          name={isSelected ? iconName.focused : iconName.unfocused}
          size={24}
          color={isSelected ? activeColor : inactiveColor}
        />
        <Text
          className={`text-xs font-semibold mt-1 ${
            isSelected ? "text-light-100" : "text-light-300"
          }`}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Layout = () => {
  const segments = useSegments();
  const currentTab = segments[1] || "index";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A8B5DB",
        tabBarInactiveTintColor: "#9CA4AB",
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopColor: "#1C1C1C",
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarButton: (props) => {
            const { onPress, style, testID } = props;
            return (
              <TabButton
                onPress={onPress}
                style={style}
                testID={testID}
                isSelected={currentTab === "index"}
                label="Home"
                iconName={{ focused: "home", unfocused: "home-outline" }}
                activeColor="#A8B5DB"
                inactiveColor="#9CA4AB"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarButton: (props) => {
            const { onPress, style, testID } = props;
            return (
              <TabButton
                onPress={onPress}
                style={style}
                testID={testID}
                isSelected={currentTab === "search"}
                label="Search"
                iconName={{ focused: "search", unfocused: "search-outline" }}
                activeColor="#A8B5DB"
                inactiveColor="#9CA4AB"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarButton: (props) => {
            const { onPress, style, testID } = props;
            return (
              <TabButton
                onPress={onPress}
                style={style}
                testID={testID}
                isSelected={currentTab === "saved"}
                label="Saved"
                iconName={{ focused: "bookmark", unfocused: "bookmark-outline" }}
                activeColor="#A8B5DB"
                inactiveColor="#9CA4AB"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarButton: (props) => {
            const { onPress, style, testID } = props;
            return (
              <TabButton
                onPress={onPress}
                style={style}
                testID={testID}
                isSelected={currentTab === "profile"}
                label="Profile"
                iconName={{ focused: "person", unfocused: "person-outline" }}
                activeColor="#A8B5DB"
                inactiveColor="#9CA4AB"
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default Layout;
