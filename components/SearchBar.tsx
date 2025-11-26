import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  onSubmit?: () => void;
  placeholder: string;
}

const SearchBar = ({ placeholder, onSubmit }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Ionicons name="search" size={24} color="#A8B5DB" />
      <TextInput
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#A8B5DB"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
