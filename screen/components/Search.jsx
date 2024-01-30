// SearchBar.js
import { View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Search = ({ onClose }) => {
  return (
    <View className="flex-row items-center w-full absolute mt-16">
      <TextInput
        placeholder="Search..."
        className=" flex-1 h-8 border-2 border-gray-700 rounded-md px-3"
      />
      <TouchableOpacity onPress={onClose}>
        <AntDesign name="close" size={26} color="black"  className="ml-10"/>  
      </TouchableOpacity>
    </View>
  );
};

export default Search;
