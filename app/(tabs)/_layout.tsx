import type { Ionicons as IoniconsType } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useSegments } from "expo-router";
import {
  GestureResponderEvent,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_HEIGHT = 80;
const TAB_BAR_RADIUS = 30;
const BUTTON_HEIGHT = 60;

// Calculate proportional button radius to match tab bar curvature
const BUTTON_RADIUS = Math.round(TAB_BAR_RADIUS * (BUTTON_HEIGHT / TAB_BAR_HEIGHT));

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
  const mergedStyle = [
    styles.tabButtonContainer,
    style,
    { justifyContent: "center" as const },
    Platform.OS === "android" && styles.androidTabButton,
  ];

  return (
    <TouchableOpacity
      onPress={onPress || (() => {})}
      testID={testID}
      className="flex-1 items-center justify-center"
      style={mergedStyle}
      activeOpacity={0.7}
    >
      <View
        className="items-center justify-center px-4 min-w-[70px]"
        style={[
          {
            backgroundColor: isSelected ? "rgba(168, 181, 219, 0.2)" : "transparent",
            borderRadius: BUTTON_RADIUS,
            minHeight: BUTTON_HEIGHT,
          },
          Platform.OS === "android" && { overflow: "hidden" },
        ]}
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

const styles = StyleSheet.create({
  tabButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  androidTabButton: {
    backgroundColor: "transparent",
    borderRadius: 0,
    elevation: 0,
    overflow: "hidden",
  },
});

const Layout = () => {
  const segments = useSegments();
  const currentTab = segments[1] || "index";
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A8B5DB",
        tabBarInactiveTintColor: "#9CA4AB",
        tabBarStyle: {
          backgroundColor: "rgba(12, 12, 20, 0.92)",
          height: TAB_BAR_HEIGHT,
          justifyContent: "center",
          borderTopWidth: 0,
          borderRadius: TAB_BAR_RADIUS,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.08)",
          marginHorizontal: 20,
          marginBottom: insets.bottom + 8,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 8 },
          position: "absolute",
        },
        tabBarItemStyle: {
          height: TAB_BAR_HEIGHT,
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
