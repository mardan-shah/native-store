// SignUp.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../firebaseConfig';
import { set, ref } from 'firebase/database';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // Write user information to the database
      await set(ref(database, `users/${user.uid}`), {
        email: user.email,
        username: username,
      });

      // Navigate to the profile page
      navigation.navigate('User');

      // Show success alert
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error signing up:', errorMessage);
      Alert.alert('Error signing up:', errorMessage);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Text className="text-2xl font-bold mb-4">Create an Account</Text>

      <View className="border border-gray-400 rounded-md p-2 mb-4 w-72">
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          className="w-full p-2"
        />
      </View>

      <View className="border border-gray-400 rounded-md p-2 mb-4 w-72">
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          className="w-full p-2"
        />
      </View>

      <View className="border border-gray-400 rounded-md p-2 mb-4 w-72">
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          className="w-full p-2"
        />
      </View>

      <View className="border border-gray-400 rounded-md p-2 mb-4 w-72">
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
          className="w-full p-2"
        />
      </View>

      <Pressable onPress={handleSignUp} className="bg-[#343434] rounded-full overflow-hidden w-72 mb-4">
        <Text className="text-xl font-bold text-white p-3 text-center">Sign Up</Text>
      </Pressable>

      <Text>
        Already have an account?{' '}
        <Text
          className="text-blue-500 underline"
          onPress={() => navigation.navigate('SignIn')}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
};

export default SignUp;
