// SignIn.jsx
import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword} from 'firebase/auth'; 
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword( auth, email, password);
      const user = userCredential.user;

      navigation.navigate('User');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  return (
    <View className=" flex-1 justify-start items-center bg-white">
      <Text className="text-xl mb-10 mt-20">Login or Create an account</Text>

      <View className="bg-[#D9D9D9] rounded-2xl p-2 py-4 m-4">
        <View className="flex-row justify-center items-center ">
          <Fontisto name="email" size={24} color="black" /> 
          <TextInput
            className=" border-b border-gray-400 py-2 px-4 mb-1 w-72 rounded-md"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />
        </View>

        <View className="flex-row justify-center items-center ">
          <MaterialIcons name="password" size={24} color="black" />
          <TextInput
            className="border-b border-gray-400 py-2 px-4 mb-1 w-72 rounded-md"
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
      </View>

      <View className="flex-row justify-evenly w-80">
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text className="text-xl font-bold p-3 w-32">Sign Up</Text>   
        </Pressable>
        <Pressable title="Sign In" onPress={handleSignIn}>
          <Text className="text-xl font-bold bg-[#343434] text-white p-4 rounded-full w-32 text-center">Sign In</Text>  
        </Pressable>
      </View>  

    </View>
  );
};

export default SignIn;