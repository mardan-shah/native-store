import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database, storage } from '../firebaseConfig';
import { ref, remove, onValue } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const openSignInScreen = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      {user ? (
        <>
          {user.email && <Text>{user.email}</Text>}
          <Button title="Logout" onPress={handleSignOut} className="mt-4 bg-blue-500" />
        </>
      ) : (
        <>
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl mb-3">Please sign in to view your profile</Text>
            <TouchableOpacity onPress={openSignInScreen}>
              <Text className="text-xl font-bold bg-[#343434] text-white p-4 rounded-full w-32 text-center">Sign In</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Profile;
